const GiftModel = require("../models/GiftModel");
const RedeemModel = require("../models/RedeemModel");
const RatingModel = require("../models/RatingModel");
const RedeemDetailModel = require("../models/RedeemDetailModel");
const StockHistoryModel = require("../models/StockHistoryModel");
const config = require('./../../../config/config.json')
const Paging = require("./../helper/HandlePaging");
const { Db } = require("../../../config/database");

const getAll = async (req, res)=>{    
    try{
        // SET ATRIBUT YANG DIGUNAKAN PADA SAAAT MELAKUKAN PENCARIAN BY Q(STRING)
        let atribut = ['name']
        const queryPage = await Paging(req, atribut, RatingModel);
        // GET TOTAL PAGE
        const total = await GiftModel.count(queryPage.kondisi);
        // QUERY 
        const model = await GiftModel.findAll(queryPage.kondisi)
        if(!model) throw model;
        res.status(200).json({
            code:1,
            message: "Successfully get data Gift",
            data: {
                meta: {
                    model: "Gift",
                    page: queryPage.page,
                    total: total,
                    limit: queryPage.limit,
                    sortBy: `${queryPage.sort} ${queryPage.type}`
                },
                data: model,
            }
        })
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error",
            data: err
        })
    }
}

const getOne = async (req, res) => {
    try{
        const model = await GiftModel.findOne({where : {id : req.params.id}, include: RatingModel});
        if(!model) throw model;
        res.status(200).json({
            code:1,
            message: "Successfully get data Gift",
            data: {
                meta: {
                    model: 'Gift',
                    page: 1,
                    total: 1,
                    limit: 1,
                    sort: ""
                },
                data: model,
            }
        })
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error",
            data: err
        })
    }
}

const post = async (req, res) => {
    try{
        let data = {...req.body, user_create: config.user.id};
        const model = await GiftModel.create(data, { validate: true });
        if(!model) throw model;
        res.status(200).json({
            code:1,
            message: "Successfully insert data Gift",
            data: model,
        })
    }catch(err){
        res.status(500).json({
            code: -1,
            message: err,
        })
    }
}

const deleteOne = async (req, res) => {
    try{
        const model = await GiftModel.destroy({ where: { id: req.params.id } });
        if(model){
            res.status(200).json({
                code:1,
                message: "Successfully delete",
                data: req.params.id
            })
        }
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error server",
            data: err
        })
    }
}

const update = async (req, res)=>{
    try{
        const model = await GiftModel.update(req.body, { where: { id: req.params.id } });
        if(model){
            res.status(200).json({
                code:1,
                message: "Successfully update",
                data: req.params.id
            })
        }
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error server",
            data: err
        })
    }
}

const redeem = async (req, res) => {
    let t = await Db.transaction();
    try {
        let redeemPost = await RedeemModel.create(
            {...req.body.redeem, user_create: config.user.id},
            {validate: true, transaction: t}
        )
        
        let tmpRedeemDetailData=[];
        for (let i = 0; i < req.body.redeemDetails.length; i++) {
            let { gift_id, quantity} = await req.body.redeemDetails[i];
            let stok = await checkStock(gift_id, quantity)
            if (!stok){
                throw `Stok gift dengan id ${gift_id} tidak cukup`;
            } 
            await GiftModel.update(
                { stok: Db.literal(`stok - ${quantity}`) },
                { where: { id: gift_id }, transaction: t }
            );
            tmpRedeemDetailData.push({...req.body.redeemDetails[i], redeem_id: redeemPost.dataValues.id})
        }

        let redeemDetailPost = await RedeemDetailModel.bulkCreate(
            tmpRedeemDetailData, 
            { validate: true, transaction: t }
        )

        if(!redeemPost||!redeemDetailPost) throw 'error';
        await t.commit()
        res.status(200).json({
            code: 1,
            message: "Successfully insert redeem data",
            data: {
                redeem: redeemPost,
                redeemDetail: redeemDetailPost
            }
        })
    } catch (error) {
        await t.rollback()
        res.status(500).json({
            code: -1,
            message: error
        })
    }
}

const rating = async (req, res) => {
    try {
        let data = {...req.body, user_create: config.user.id};
        let checkRedeemUser_ = await checkRedeemUser(data);
        if(!checkRedeemUser_) res.status(500);
        let postRating_ = await postRating(data);
        if(!postRating_.status) res.status(500).json({'code': -1, 'data': postRating_.data});
        res.status(200).json({
            code:1,
            message: "Successfully insert data Rating",
            data: postRating_.data,
        })
    } catch (error) {
        res.status(500).json({'code': -1, 'data': error});
    }
}

const addStok = async (req, res) => {
    let t = await Db.transaction();
    try {
        let tmpErrorRespon=[];
        let tmpSuccessRespon=[];
        for (let i = 0; i < req.body.length; i++) {
            let model = await StockHistoryModel.create(req.body[i], { validate: true, transaction: t });
            if(model){
                tmpSuccessRespon.push(req.body[i].gift_id);
                let updateStok = await GiftModel.update(
                    { stok: Db.literal(`stok + ${req.body[i].quantity}`) },
                    { 
                        where: { id: req.body[i].gift_id }, 
                        transaction: t
                    }
                );
                if(!updateStok) throw updateStok;
            }else{
                tmpErrorRespon.push(req.body[i].gift_id);
            }
        }
        await t.commit();
        res.status(200).json({
            message: 'Success add stok',
            data: {
                success: tmpSuccessRespon,
                error: tmpErrorRespon
            }
        })
    }catch(error) {
        res.status(500).json({
            meesage: error
        })
    }
}

const postRating = async (data) => {
    try {
        await RatingModel.create(data, {validate: true});
        let dataRating = await RatingModel.findOne({
            attributes: [
                [Db.literal('ROUND(ROUND((SUM(rating*2))/COUNT(id),0)),1'), 'rating_total'],
                [Db.literal('COUNT(id)'), 'filed_total'],
            ],
            where: {
                gift_id: data.gift_id,
            }
        });
        let updateGift = await GiftModel.update({
            user_rating: dataRating.dataValues.filed_total,
            rating: dataRating.dataValues.rating_total
        },{
            where: {
                id: data.gift_id
            },
        })
        if(updateGift) return { status: true, data: updateGift }
    } catch (error) {
        return { status: false, data: error };
    }
}

const checkStock = async (id, quantity) => {
    try {
        let model = await GiftModel.findByPk(id);
        if(model.stok>=quantity) return true;
        return false
    } catch (error) {
        return false;
    }
}

const checkRedeemUser = async (data) => {
    try {
        let model = await RedeemModel.findAndCountAll({
            where:
            {
                user_create: config.user.id
            },
            include : [
                {
                    model: RedeemDetailModel, as:'redeem_details',
                    where: {
                        gift_id: data.gift_id,
                        redeem_id: data.redeem_id
                        
                    }
                }
            ]
        });
        if(model.count>0) return true;
        return false
    } catch (error) {
        return false;
    }
}

module.exports = { getAll, getOne, post, deleteOne, update, redeem, rating, addStok };
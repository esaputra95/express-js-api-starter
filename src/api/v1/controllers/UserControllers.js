const UserModel = require("./../models/UserModel");
const bcrypt = require('bcrypt');
const Paging = require("./../helper/HandlePaging");

const getAll = async function(req, res){
    try{
        // ATRIBUT SEARCH && SET DATA PAGING
        let atribut = ['name', 'username']
        const queryPage = await Paging(req, atribut);  
        // GET TOTAL PAGE
        const total = await UserModel.count(queryPage.kondisi);
        // QUERY 
        const model = await UserModel.findAll(queryPage.kondisi);
        if(model.length>0){
            res.status(200).json({
                code:1,
                status:200,
                message: "Successfully get data User",
                data: {
                    meta: {
                        model: 'User',
                        page: queryPage.page,
                        total: total,
                        limit: queryPage.limit,
                        sortBy: `${queryPage.sort} ${queryPage.type}`
                    },
                    data: model,
                }
            })
        }else{
            res.status(204)
        }
        
    }catch(err){
        res.status(500).json({
            code: -1,
            status:500,
            message: "Error",
            data: err
        })
    }
}

const getOne = async function(req, res){
    try{
        const model = await UserModel.findByPk(req.params.id);
        if(model){
            res.status(200).json({
                code:1,
                message: "Successfully get data user",
                data: {
                    meta: {
                        model: 'user',
                        total: 1,
                        limit: 1,
                    },
                    data: model,
                }
            })
        }else{
            res.status(204)
        }
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error",
            data: err
        })
    }
}

const post = async function(req, res){
    const salt = await bcrypt.genSalt();
    const newPass = await bcrypt.hash(req.body.password, salt);
    const data = { ...req.body, password: newPass };
    try{
        const model = await UserModel.create(data, { validate: true });
        if(model){
            res.status(200).json({
                code:1,
                message: "Successfully insert data user",
                data: {
                    meta: {
                        model: 'user',
                        total: 1,
                    },
                    data: model,
                }
            })
        }else{
            res.status(200).json({
                code:1,
                status:204,
                message: "Successfully but empty",
                data: []
            })
        }
    }catch(err){
        res.status(500).json({
            code: -1,
            status:500,
            message: "Error",
            data: err
        })
    }
}

const deleteOne = async function(req, res){
    try{
        const model = await UserModel.destroy({ where: { id: req.params.id }, force: true });
        if(!model) throw model
        res.status(200).json({
            code:1,
            message: "Successfully delete",
            data: req.params.id
        })
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error server",
            data: err
        })
    }
}

const update = async (req, res) => {
    try{
        const model = await UserModel.update(req.body, { where: { id: req.params.id } });
        if(!model) throw model;
        res.status(200).json({
            code:1,
            message: "Successfully get data User",
            data: {
                meta: {
                    model: 'User',
                    page: 1,
                    total: model[0],
                }
            }
        })
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error server",
            data: err
        })
    }
}

module.exports = { getAll, getOne, post, deleteOne, update };
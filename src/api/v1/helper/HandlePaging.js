const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Paging = async function(req, atribut, includeRelation){
    let page = req.query?.page || 1;
    let limit = req.query.limit?+req.query.limit:50;
    let q = req.query.q?req.query.q:"";
    let sortfield = req.query.kriteria?req.query.kriteria:"";
    let sorttype = req.query.sortingby?req.query.sortingby:"";
    let offset = (page-1)*limit;

    let kondisi = {
        where:{
            [Op.or]:
            atribut.map(val=>({[val]:{
                [Op.substring]: q
            }}))
        },
        offset: offset,
        limit: limit,
        include: includeRelation
    }
    
    if(sortfield&&sorttype){
        kondisi = { ...kondisi, ...{
            order: [
                [sortfield,sorttype],
            ]
        }};
    }

    return {
        offset: offset,
        limit: limit,
        q: q,
        sort: sortfield,
        type: sorttype,
        kondisi: kondisi
    }
}
module.exports = Paging;
const UserModel = require("./../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async function(req, res){
    try {
        const User = await UserModel.findAll({
            where: {
                username : req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, User[0].password);
        if(!match) return res.status(401).json({message: "Wrong username or password"});
        const id = User[0].id
        const username = User[0].username;
        const name = User[0].name;
        const accessToken = jwt.sign({id, username, name}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '1036800s'
        });

        res.json({accessToken})
        
    } catch (error) {
        res.status(404).json({message: "Username not exist"})
    }
}

const refreshToken = async function(req, res){
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.send(401);
        const Pengguna = await PenggunaModel.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if(!Pengguna[0]) return res.send(403),
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if(err) return res.send(403);
            const id = Pengguna[0].id
            const username = Pengguna[0].username;
            const name = Pengguna[0].name;
            const accessToken = jwt.sign({id, username, name}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn : '3600s'
            });
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { login, refreshToken }
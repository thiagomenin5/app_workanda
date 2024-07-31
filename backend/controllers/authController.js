// VOY POR EL AUTCONTROLLER.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async(req,res) => {
    const {username, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword})
    }catch (error){
        res.status(500).json({error: 'Error al registro el usuario'})
    }
};

const login = async (req,res)=>{
    const { username, password} = req.body;
    try{
        const user = await User.findOne({where: {username}});
        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(401).json({error: 'Credenciales inválidas'})
        }
        const token = jwt.sign({userId: user.id}, 'secretKet', {expiresIn: '1h'});
    } catch(error){
        res.status(500).json({error: 'Error al iniciar sesión'})
    }
};

module.exports = {
    register,
    login
};
const {User} = require('../models');

const getUsers = async(req,res) =>{
    try {
        const users = await User.findAll();
        res.json(users);
    } catch(error) {
        res.status(500).json({error: 'Error al obtener los usuarios'})
    }
};

const createUser= async (req,res)=>{
    const {username, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword});
        res.json(user);
    } catch(error){
        res.status(500).json({error: 'Error al crear el usuario'});
    }
};

const updateUser = async (req,res) =>{
    const {id} = req.params;
    const {username, password}= req.body;
    try { 
        const user = await User.findByPk(id);
        if(user){
            user.username = username;
            user.password = await bcrypt.hash(password,10);
            await user.save();
        }else{
            res.status(404).json({error: 'Usuario no encontrado'})
        }
    } catch(error){
        res.status(500).json({error: 'Error al actualizar los datos del usuario'})
    }
};

const deleteUser= async (req,res) => {
    const {id} = req.params;
    try{
        const user = await User.findByPk(id);
        if(user){
            await user.destroy();
            res.json({message: 'Usuario eliminado exitosamente'});
        }else{
            res.status(404).json({error: 'Usuario no encontrado'})
        }
    }catch(error){
        res.status(500).json({error: 'Error al eliminar el usuario'})
    }
};

module.exports= {getUsers, createUser, updateUser, deleteUser};
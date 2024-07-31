const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});
sequelize.sync().then(()=>{
    app.listen(3000, ()=>{
        console.log('Servidor corriendo en el puerto 3000')
    })
})
const express =  require("express");
const cors = require("cors");

const config = require("../config");

const app = express();

const roles = require("../routes/rol.routes");

//middlewares de configuracion
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config
app.set('port',config.app.port);//middlewares de configuracion
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config
app.set('port',config.app.port);

//Rutas
app.use("/api/rol", roles);

module.exports = app;
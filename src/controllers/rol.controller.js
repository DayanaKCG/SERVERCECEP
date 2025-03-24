const Rol = require("../models/rol.model");
const response = require("../res/response");

const getAll = async(req, res, next)=>{
    try {    
        const roles = await Rol.findAll();
        let data = "";
        if (roles.length>0) {
            data = {
                total_registros: roles.length,
                registros: roles
            }
        } else {
            data = {
                message: "no hay registros en la tabla"
            }
        } 
        response.success(req,res,data,200);
    } catch (error) {
        next(error)
    }
};

const getOne = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const rol = await Rol.findOne({where:{id}})
        let data = "";
        if (rol) {
            data = {
                registro: rol
            }
        } else {
            data = {
                message: "no hay registro con ese id"
            }
        } 
        response.success(req,res,data,200);
    } catch (error) {
        next(error)
    }
};

const create = async(req,res,next)=>{
    try {
        const data = req.body;
        await Rol.sync();
        const createdRol = await Rol.create(data);
        let message;
        if (createdRol.id) {
            message = {
                msg: "registro efectuado exitosamente",
                regId: createdRol.id
            }
        } else {
            message = {
                msg: "error, usuario no creado"
            }
        }
        response.success(req,res,message,201);
    } catch (error) {
        next(error);
    }
};

const update = async(req,res,next)=>{
    try {
        const data = req.body;
        const id = req.params.id
        const updatedRol = await Rol.update(data,{ where: {id}});
        message = {
            msg: "registro actualizado exitosamente",
            regId: id
        }
        response.success(req,res,message,200);
    } catch (error) {
        next(error);
    }
};

const deleted = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const deleteRol = await Rol.destroy({where:{id}})
        let message = {
            msg: "Registro eliminado exitosamente",
            regId: id
        }
        response.success(req,res,message,200);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleted
}
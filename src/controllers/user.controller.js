const User = require("../models/user.model");
const response = require("../res/response");

const getAll = async(req, res, next) => {
    try {    
        const user = await User.findAll();
        let data = "";
        if (user.length > 0) {
            data = {
                total_registros: user.length,
                registros: user
            };
        } else {
            data = {
                message: "no hay registros en la tabla"
            };
        }
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
};

const getOne = async(req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id } });
        let data = "";
        if (user) {
            data = {
                registro: user
            };
        } else {
            data = {
                message: "no hay registro con ese id"
            };
        }
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
};

const create = async(req, res, next) => {
    try {
        const data = req.body;
        await User.sync();
        const createdUser = await User.create(data);
        let message;
        if (createdUser.id) {
            message = {
                msg: "registro efectuado exitosamente",
                regId: createdUser.id
            };
        } else {
            message = {
                msg: "error, usuario no creado"
            };
        }
        response.success(req, res, message, 201);
    } catch (error) {
        next(error);
    }
};

const update = async(req, res, next) => {
    try {
        const data = req.body;
        const id = req.params.id;
        await User.update(data, { where: { id } });
        const message = {
            msg: "registro actualizado exitosamente",
            regId: id
        };
        response.success(req, res, message, 200);
    } catch (error) {
        next(error);
    }
};

const deleted = async(req, res, next) => {
    try {
        const id = req.params.id;
        await User.destroy({ where: { id } });
        const message = {
            msg: "Registro eliminado exitosamente",
            regId: id
        };
        response.success(req, res, message, 200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleted
};

const Auth = require("../models/auth.model");
const response = require("../res/response");

const getAll = async (req, res, next) => {
    try {
        const auth = await Auth.findAll();
        let data = "";
        if (auth.length > 0) {
            data = {
                total_registros: auth.length,
                registros: auth
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

const getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const auth = await Auth.findOne({ where: { id } });
        let data = "";
        if (auth) {
            data = {
                registro: auth
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

const create = async (req, res, next) => {
    try {
        const data = req.body;
        await Auth.sync();
        const createdAuth = await Auth.create(data);
        let message;
        if (createdAuth.id) {
            message = {
                msg: "registro efectuado exitosamente",
                regId: createdAuth.id
            };
        } else {
            message = {
                msg: "error, autenticación no creada"
            };
        }
        response.success(req, res, message, 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const data = req.body;
        const id = req.params.id;
        await Auth.update(data, { where: { id } });
        const message = {
            msg: "registro actualizado exitosamente",
            regId: id
        };
        response.success(req, res, message, 200);
    } catch (error) {
        next(error);
    }
};

const deleted = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Auth.destroy({ where: { id } });
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

import express from "express";
import { error, success } from "../../../network/response.js";
import controladores  from "./index.js"

import multer from "multer";

export const authenticacion = express.Router()

authenticacion.get("/" , (req, res) => {
    controladores.listarUsuarios()
        .then((lista) => {
            success(req, res, lista, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
authenticacion.get("/:id" , (req, res) => {
    controladores.obtenerUsuario(req.params.id)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
authenticacion.put("/", (req, res) => {
    controladores.actualizarUsuario(req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
authenticacion.post("/", (req, res) => {
    controladores.crearUsuario(req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
authenticacion.delete("/:id", (req, res) => {
    controladores.borrarUsuario(req.params.id)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
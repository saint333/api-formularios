import express from "express";
import { error, success } from "../../../network/response.js";
import controladores  from "./index.js"

export const router = express.Router()

router.get("/" , (req, res) => {
    controladores.listarUsuarios()
        .then((lista) => {
            success(req, res, lista, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
router.get("/:id" , (req, res) => {
    controladores.obtenerUsuario(req.params.id)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
router.put("/", (req, res) => {
    controladores.actualizarUsuario(req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
router.post("/", (req, res) => {
    controladores.crearUsuario(req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
router.delete("/:id", (req, res) => {
    controladores.borrarUsuario(req.params.id)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
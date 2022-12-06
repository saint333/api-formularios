import express from "express";
import { error, success } from "../../../network/response.js";
import controladores  from "./index.js"

export const forms = express.Router()

forms.get("/:id" , (req, res) => {
    controladores.obtenerFormularios(req.params.id)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
forms.get("/obtener/:id" , (req, res) => {
    controladores.getForms(req.params.id)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
forms.delete("/", (req, res) => {
    console.log(req.body);
    controladores.borrarForms(req.body)
        .then((dele) => {
            success(req, res, dele, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
forms.post("/", (req, res) => {
    controladores.crearForms(req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((err) => {
            error(req, res, err.message, err.status)
        })
})
forms.post("/agregar/", (req, res) => {
    console.log(req.body);
    // controladores.actualizarForm(req.body)
    //     .then((user) => {
    //         success(req, res, user, 200)
    //     })
    //     .catch((err) => {
    //         error(req, res, err.message, err.status)
    //     })
})
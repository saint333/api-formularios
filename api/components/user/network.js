import express from "express";
import { error, success } from "../../../network/response.js";
import controladores  from "./index.js"
import multer from "multer";
import {dirname, extname, join} from "path"
import { fileURLToPath } from "url";

export const router = express.Router()
const current_dir = dirname(fileURLToPath(import.meta.url))

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join(current_dir, "../../../images"),
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname)
            const fileName = file.originalname.split(fileExtension)[0]
            cb(null, `${fileName}-${Date.now()}${fileExtension}`)
        }
    }),
    limits: {
        fieldSize: 10000000,
    }
})

router.post("/upload", multerUpload.single("file"), (req, res) => {
    console.log(req.file);
    success(req,res, "ok",200)
})

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
    console.log(req);
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
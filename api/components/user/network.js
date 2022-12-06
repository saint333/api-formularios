import express from "express";
import { error, success } from "../../../network/response.js";
import controladores  from "./index.js"
import multer from "multer";
import {dirname, extname, join} from "path"
import { fileURLToPath } from "url";
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs-extra";

cloudinary.config({ 
    cloud_name: 'dmbma2idu', 
  api_key: '463973851689167', 
  api_secret: 'dzDynJt8iywkT77qC5qZSjW202o'
});

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
    const uploadImage = async (imagePath) => {

        // Use the uploaded file's name as the asset's public ID and 
        // allow overwriting the asset with new versions
        const options = {
            folder: "Fotos de Registrados"
        };
    
        try {
          // Upload the image
          const result = await cloudinary.uploader.upload(imagePath, options);
          await fs.remove(req.file.path)
        //   controladores.guardarImagen("fotos_usuarios",result.url)
        controladores.guardarImagen("foto_usuario",result.url)
            .then((info) => {

                success(req,res,{info,url: result},200)
            })
        } catch (error) {
          console.error(error);
        }
    };
    uploadImage(req.file.path)
})

router.get("/upload", (req,res) => {
    controladores.obtenerImagenes()
     .then((imagenes) => {
        success(req, res, imagenes, 200)
     })
     .catch((err) => {
        error(req, res, err.message, err.status)
    })
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

router.put('/sesion/:id', (req, res) => {
    console.log(req.body);
    // controladores.sesion('usuarios',req.params.id,req.body)
    controladores.sesion('usuario',req.params.id,req.body)
    .then((sesion) => {
        success(req, res, sesion, 200)
    })
    .catch((err) => {
        error(req, res, err.message, err.status)
    })
})
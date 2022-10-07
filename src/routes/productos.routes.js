import {Router} from 'express';
import { subirImagen } from '../controllers/productos.controller.js';
import Multer from 'multer';

// sirve para indicar el formato el cual se va a tratar el archivo
// diskStorage > indicar que el archivo se almacenara en el disco
const almacenamiento = Multer.diskStorage({
    destination: "src/imagenes",
    filename: (req, archivo, cb) => {
        console.log(archivo);
        const{mimetype}=archivo;
        if(mimetype=="image/jpeg" || mimetype=="application/pdf"){
            cb(null, archivo.originalname);
        }else{
            cb(new Error("Formato no valido"), false);
        }
    }
});

const multerMiddleware = Multer({
    storage: almacenamiento,
    limits: {
        // 1byte * 1024 > 1kb * 1024 > 1mb* 1024 > 1gb
        fileSize: 5 * 1024 * 1024,
    },
});

export const productoRouter = Router();

productoRouter.post(
    '/subir-imagen', 
    multerMiddleware.single('imagen'), 
    subirImagen
    );




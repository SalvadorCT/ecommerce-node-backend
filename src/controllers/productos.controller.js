import conexion from '../prisma.js';
import fs from 'fs';
import path from 'path';

export const crearProducto = async (req, res) => {
    //const productoCreado = await conexion.producto.create ({data: req.body});
    const resultado = fs.readdirSync("./src/imagenes")
    //console.log(__dirname);
    console.log(resultado);
    const {imagen} = req.body;
    //usando el metodo some de los arreglos validar si existe esa imagen o no existe en la carpeta imagenes
    const existe = resultado.some((e) => e === imagen);
    if(existe){
        const productoCreado = await conexion.producto.create ({data: req.body});
        return res.status(201).json({
            content: productoCreado,
            message: "Producto creado exitosamente",
        });
    }else{
        return res.status(400).json({
            message: "La imagen no existe",
            content: null,
        });
    }
};

export const subirImagen = async (req, res) => {
    console.log(req.body)

    return res.status(201).json({
        message: 'Imagen subida exitosamente',
        nombre: req.file.filename,
    });
};
import mercadopago from "mercadopago";

// TODO: Deberiamos de hacerlo desde el pedido creado en la base de datos, osea, crear un endpoint para agregar el producto a un pedido de un usuario
// /agregar-producto
// BODY: {
// productoId: 1
// cantidad : 1
// usuarioId: 1
// }

// Validar si el usuario tiene un pedido ya creado agregar este detalle a ese pedido, caso contrario, crearemos el pedido de ese usuario

export const crearPreferencia = async (req, res) => {
    const preferencia = await mercadopago.preferences.create({
        items: [
            {
                id: 1, // el id del producto
                title: "Pera de agua", // el nombre del producto
                quantity: 5,
                currency_id: "USD", // https://es.wikipedia.org/wiki/ISO_4217
                unit_price: 10.5, // el precio del detalle del pedido
            },
        ],
        payer: {
            name: "Eduardo", // nombre del cliente
            surname: "De Rivero", // apellido del cliente
            email: "ederiveroman@gmail.com", // correo del cliente
            phone: {
                area_code: "04002",
                number: 974207075,
            },
        },
    });
    console.log(preferencia.body.init_point);

    return res.status(200).json({
        content: preferencia,
        message: "Preferencia creada exitosamente",
    });
};
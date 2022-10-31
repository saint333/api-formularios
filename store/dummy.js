const db = {
    users: [
        {id: 1,correo: "david@gmail.com", password: "hola"},
        {id: 2, correo: "prueba@gmail.com", password: "123"}
    ]
}

async function crear(tabla,data) {
    db[tabla].push(data)
    return data
}

async function listar(tabla) {
    return db[tabla]
}

async function obtener(tabla, id) {
    let datos = await listar(tabla)
    let sesion = datos.find(item => item.id === parseInt(id))
    if(sesion){
        sesion["sesion"] = true
        return sesion
    }

    throw new Error("Usuario no encontrado")
}

async function actualizar(tabla, data) {
    db[tabla].forEach(item => {
        if (item.id === parseInt(data.id)) {
            item.correo = data.correo
            item.password = data.password
        }
    })
    let datos = await obtener(tabla, data.id)
    return datos
}

async function borrar(tabla, id) {
    let indice = db[tabla].map(user => user.id ).indexOf(parseInt(id))
    if(indice !== -1){
        db[tabla].splice(indice, 1)
        return "usuario eliminado"
    }
    throw new Error("Usuario no existe")
}

export const metodos = {
    crear,
    obtener,
    listar,
    actualizar,
    borrar
}
import {metodos} from "../../../store/dummy.js"

const TABLA = "auth"

export const controladores = (injectedStore) => {
    let metodo = injectedStore

    if (!metodo) {
        metodo = metodos
    }

    function trasformar(data) {
        const authData = {
            id: data.id
        }

        if(data.correo){
            authData.correo = data.correo
        }

        if (data.password) {
            authData.password = data.password
        }

        return metodo.actualizar(TABLA, authData)
    }

    return {
        trasformar
    }
}
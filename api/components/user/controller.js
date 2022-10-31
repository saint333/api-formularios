import {metodos} from "../../../store/dummy.js"
import { nanoid } from 'nanoid'

const TABLA = "users"

export const controladores = (injectedStore) => {
    let metodo = injectedStore

    if (!metodo) {
        metodo = metodos
    }

    function listarUsuarios() {
        return metodo.listar(TABLA)
    }

    function obtenerUsuario(id) {
        return metodo.obtener(TABLA,id)
    }

    function crearUsuario(data) {
        return metodo.crear(TABLA, data)
    }

    function actualizarUsuario(data) {
        const user = {
            correo: data.correo,
            password: data.password
        }

        if(data.id){
            user.id = data.id
        }else{
            user.id = nanoid()
        }
        return metodo.actualizar(TABLA, user)
    }

    function borrarUsuario(id){
        return metodo.borrar(TABLA, id)
    }

    return {
        listarUsuarios,
        obtenerUsuario,
        crearUsuario,
        actualizarUsuario,
        borrarUsuario
    }
}
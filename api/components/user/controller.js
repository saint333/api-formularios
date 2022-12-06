import {metodos} from "../../../store/dummy.js"
import { nanoid } from 'nanoid'

// const TABLA = "usuarios"
const TABLA = "usuario"

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
        return metodo.actualizar(TABLA, user)
    }

    function borrarUsuario(id){
        return metodo.borrar(TABLA, id)
    }

    function guardarImagen(tabla, data) {
        return metodo.imagen(tabla, data)
    }

    function obtenerImagenes() {
        // return metodo.getImagen("fotos_usuarios")
        return metodo.getImagen("foto_usuario")
    }

    function sesion(tabla, id, data) {
        return metodo.sesion(tabla,id, data.sesion)
    }

    return {
        listarUsuarios,
        obtenerUsuario,
        crearUsuario,
        actualizarUsuario,
        borrarUsuario,
        guardarImagen,
        obtenerImagenes,
        sesion
    }
}
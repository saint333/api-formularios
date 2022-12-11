import {metodos} from "../../../store/dummy.js"
import { nanoid } from 'nanoid'

const TABLA = "formularios"

export const controladores = (injectedStore) => {
    let metodo = injectedStore

    if (!metodo) {
        metodo = metodos
    }

    function obtenerFormularios(id) {
        return metodo.obtenerForms(TABLA,id)
    }

    function getForms(id) {
        return metodo.obtenerFormulario(id)
    }

    function crearForms(data) {
        return metodo.crearForm(data)
    }

    function actualizarForm(data) {
        return metodo.actualizarForms(data)
    }

    function actualizarFormulario(data) {
        const json = {
            id: data.id,
            campos: JSON.stringify(data.campos),
            diseno_general: JSON.stringify(data.diseno_general),
            estructura: data.estructura,
            estilo: data.estilo
        }
        return metodo.actualizarFormu(json)
    }

    function borrarForms(datos){
        return metodo.eliminarForms(TABLA, datos)
    }

    return {
        obtenerFormularios,
        borrarForms,
        crearForms,
        actualizarForm,
        getForms,
        actualizarFormulario
    }
}
import mysql from "mysql";
import { mysqlconf } from "../config.js";

const dbconfig = {
    host: mysqlconf.host,
    user: mysqlconf.user,
    password: mysqlconf.password,
    database: mysqlconf.database,
};

let conexion;

function conexionDB() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log(err);
            setTimeout(conexionDB(), 2000);
        } else {
            console.log("conectado");
        }
    });

    conexion.on("error", (err) => {
        console.log(err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            conexionDB();
        } else {
            throw err;
        }
    });
}

conexionDB();

function imagen(table, data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `insert into ${table} (foto) values(?) `, [data],
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

function getImagen(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function listar(table) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function obtener(table, id) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT * FROM ${table} where dni=${id} or idfoto_usuario=${id}`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            }
        );
    });
}

// `SELECT * FROM ${table} where dni=${id} or idfoto_usuario=${id}`,

function obtenerForms(table, id) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT * FROM ${table} where usuarios_dni=${id}`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            }
        );
    });
}

function obtenerFormulario(id) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT * FROM formularios
            inner join registros_totales_formularios on registros_totales_formularios.idformularios = ${id}
            inner join extructura_formulario on extructura_formulario.idformularios = ${id}
            where formularios.idformularios = ${id}`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            }
        )
    })
}

function crear(table, data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `insert into ${table} set ?`,
            data,
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

function actualizar(table, data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `insert into ${table} set ?`,
            data,
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

function sesion(tabla, id, valor) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET sesion_activa = ?  WHERE dni = ${id}`, valor,(err, data) =>{
            if (err) {
                return reject(err);
            }
            resolve(obtener(tabla,id));
        })
    })
}

function eliminarForms(table, datos) {
    console.log(datos);
    return new Promise((resolve, reject) => {
        conexion.query(
            `delete formularios, registros_totales_formularios, extructura_formulario 
            from formularios 
            inner join  registros_totales_formularios on registros_totales_formularios.idformularios = ${datos.id} 
            inner join  extructura_formulario on extructura_formulario.idformularios = ${datos.id} 
            where formularios.idformularios = ${datos.id} and usuarios_dni=${datos.dni}`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            }
        );
    });
}

function actualizarForms(data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `
            update formularios, registros_totales_formularios
            set formularios.cantidad_de_registro = ?, registros_totales_formularios.cantidad_registro = ?, registros_totales_formularios.campos_registro = ?
            where registros_totales_formularios.idformularios = ${data.id} and formularios.idformularios = ${data.id}`,
            [Number(data.cantidad) + 1,Number(data.cantidad) + 1,data.data],
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

function actualizarFormu(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        conexion.query(
            `
            update extructura_formulario, formularios
            set campos = ?, diseno_general=?, estructura=?, estilo=?, nombre_formulario=?
            where extructura_formulario.idformularios = ? and formularios.idformularios = ?`,[data.campos,data.diseno_general,data.estructura,data.estilo,data.titulo,data.id,data.id],
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

async function crearForm(data) {
    const data_1 = {
        idformularios: data.id,
        campos: JSON.stringify(data.campos),
        diseno_general: JSON.stringify(data.diseno_general),
        estructura: data.estructura,
        estilo: data.estilo
    }
    let id_extructura = await extructuraForms(data_1)
    const data_3 = {
        idformularios: data.id,
        campos_registro: JSON.stringify([]),
        cantidad_registro: data.registro
    }
    await registroForms(data_3)
    const data_2 = {
        idformularios: data.id,
        cantidad_de_registro: data.registro,
        nombre_formulario: data.titulo,
        fecha_creacion: data.fecha,
        usuarios_dni: data.usuario,
        idextructura_formulario: id_extructura.insertId
    }
    return new Promise((resolve, reject) => {
        conexion.query(
            `insert into formularios set ?`,
            [data_2],
            (err, data) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

function extructuraForms(data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `insert into extructura_formulario (idformularios,campos, diseno_general, estructura, estilo) VALUES (?,?,?,?,?)`,
            [data.idformularios,data.campos, data.diseno_general, data.estructura, data.estilo],
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

function registroForms(data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO registros_totales_formularios (idformularios,campos_registro, cantidad_registro) VALUES (?, ?, ?)`,
            [data.idformularios, data.campos_registro, data.cantidad_registro],
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

function updateRegistros(data,id) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO registros_totales_formularios (idformularios,campos_registro, cantidad_registro) VALUES (?, ?, ?)`,
            [data.idformularios, data.campos_registro, data.cantidad_registro],
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}
// UPDATE `myforms`.`registros_totales_formularios` SET `campos_registro` = [jidadj] WHERE (`idformularios` = '1669934273605');


export const metodo = {
    listar,
    obtener,
    crear,
    actualizar,
    imagen,
    getImagen,
    sesion,
    obtenerForms,
    eliminarForms,
    actualizarForms,
    crearForm,
    extructuraForms,
    registroForms,
    obtenerFormulario,
    actualizarFormu
};

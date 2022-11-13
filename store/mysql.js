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
                console.log(data);
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
            `SELECT * FROM ${table} where dni=${id} or fotos_usuarios_idfotos_usuarios=${id}`,
            (err, data) => {
                if (err) return reject(err);
                resolve(data);
            }
        );
    });
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

export const metodo = {
    listar,
    obtener,
    crear,
    actualizar,
    imagen,
    getImagen,
    sesion
};

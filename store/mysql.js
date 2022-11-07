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

function listar(table, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) return reject(err)
            resolve(data)
        })
    })
}

export const metodo = {
    listar,
} 
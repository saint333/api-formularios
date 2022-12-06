export const api = {
    port: process.env.API_PORT || 9000,
};

export const mysqlconf = {
    host: process.env.MYSQL_HOST || "167.172.158.47",
    user: process.env.MYSQL_USER || "gnxcode",
    password: process.env.MYSQL_PASS || "gnxcode*90",
    database: process.env.MYSQL_DB || "bdformulario",
}

// export const mysqlconf = {
//     host: process.env.MYSQL_HOST || "localhost",
//     user: process.env.MYSQL_USER || "root",
//     password: process.env.MYSQL_PASS || "Joseph23@",
//     database: process.env.MYSQL_DB || "myforms",
// }
export const success = (req, res, messege, status) => {
    let statusCode = status || 200
    let statusMessege = messege || ""
    res.status(statusCode).send({
        estado: true,
        status: statusCode,
        body: statusMessege
    })
}

export const error = (req, res, messege, status) => {
    let statusCode = status || 500
    let statusMessege = messege || "Internal server error"
    res.status(statusCode).send({
        estado: false,
        status: statusCode,
        body: statusMessege
    })
}
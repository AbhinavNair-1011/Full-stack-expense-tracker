let { users, Users } = require("../models/users");
const bcrypt = require("bcrypt")
module.exports.addUser = (req, res, next) => {


    let name = req.body.name;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;

    bcrypt.hash(password, 10, (err, hash) => {
        console.log(hash)
        let user = new Users(name, email, phoneNumber, hash, false);
        user.addUser()
            .then(result => {
                return res.status(200).json({
                    status: "successfull"
                })
            })
            .catch(err => {
                if (err.name === "SequelizeUniqueConstraintError") {
                    return res.status(409).json({
                        status: "user already exists",
                        errorName: err.name,
                        errorType: err.errors[0].path,
                        errorValue: err.errors[0].value
                    })
                } else {
                    return res.status(404).json({
                        status: "failed",
                        errorMsg: err
                    })
                }

            })

    })





}
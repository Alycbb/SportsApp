const {User} = require("../models/user");

const params = (req, res, next) =>{
    var id = req.params("id");
    User.findUserID(key).then((user) =>{
        if(!user){
            return Promise.reject();
        } else{
            req.user = user;
            req.id = id;
            next();
        }
    }).catch((error) =>{a
        res.status(401).send();
    });
}

module.exports = params;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
      },
      
    email:{
        type: String,
        trim:true,
        required: true,
        minlength:3,
        unique: true
    },

    password:{
        type: String,
        trim:true,
        required: true,
        minlength:8
    },

    userType:{
        type: String,
    },

    gender:{
        type: String,
    },

    height:{
        type: String,
    },

    weight:{
        type: String
    },

    category:{
        type: String,
    },

    //it's an array
    //since coach can have many teams
    team:{
        type: [String],
    },

    coach:{
        type: String,
    },

    status:{
        type: String,
    },

    personalQues:{
        type: String,
    },

//Multiple devices
    tokens: [
        {
            access:{
                type: String,
                required:true
            },
            token:{
                type: String,
                required:true
            }
        }
    ]

    
});

//show the body format
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    return _.pick(userObject, ["_id", "name", "email", "password", "userType", "coach", "team", "status","weight", "height"]);
    console.log(userObject)
}

//generate specific auth token
userSchema.methods.generateAuthToken = function(){
    const user = this;
    const access = "auth";

    const token = jwt.sign({_id: user._id.toHexString(),access}, 'QWDFECS').toString();

    user.tokens.push({access,token});

    return user.save().then(() =>{
        return token;
    });
}

//hash the password when creating user
userSchema.pre("save",function(next){
    const user = this;
    if(user.isModified("password")){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

//hash password when updating user information
userSchema.pre("findOneAndUpdate", async function(next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    if (docToUpdate.password !== this._update.password && this._update.password !== undefined) {
      const newPassword = await bcrypt.hash(this._update.password, 10)
      this._update.password = newPassword
    }else if(this._update.password == undefined){
        next();
    }
  });

// userSchema.pre('findOneAndUpdate', function () {
//     this._update.password = bcrypt.hash(this._update.password, 10)
// })


//login
userSchema.statics.findUserByCredentails = function(email,password){
    const User = this;
    return User.findOne({email}).then((user) =>{
        if(!user){
            return Promise.reject('cannot connect');
        }else{
            return new Promise((resolve,reject) =>{
                bcrypt.compare(password, user.password,(err,res) =>{
                    if(res){
                        resolve(user);
                    }else{
                        reject('wrong pwd or email');
                    }
                })
            })
        }
    });
}

userSchema.statics.findUserByToken = function(token) {
    const User = this;
    let decoded;

    try{
        decoded = jwt.verify(token,"QWDFECS");
    } catch (e){
        return Promise.reject();
    }

    return User.findOne({
        "_id": decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    });
}

userSchema.methods.removeToken = function(token){
    const user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
}

const User = mongoose.model('User',userSchema);
module.exports = {User}; 
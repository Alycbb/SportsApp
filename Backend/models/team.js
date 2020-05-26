const mongoose = require("mongoose");
const {User} = require("../models/user");


const teamSchema = new mongoose.Schema({
    TeamName: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
      },
    
    //it's an array
    Coaches:{
        type: [String]
    },

    //it's an array
    Athletes:{
        // type: mongoose.Schema.Types.ObjectId, 
        // ref: 'User',
        type: [String]
    },

    Questionnaire:{
        type: String,
    }
    
});



const Team = mongoose.model('team',teamSchema);
module.exports = {Team}; 
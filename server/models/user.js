const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const bcyrpt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    address: {type: Schema.Types.ObjectId, ref: 'Address'} // 1:1 relation with Address -> povezujemo sa Address Schema (relationship), napravit cemo odvojeno da nebi pretrpali ovu UserSchemu
});


//ezn2nnev31WCqSjU

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    address: {type: Schema.Types.ObjectId, ref: 'Address'} // 1:1 relation with Address -> povezujemo sa Address Schema (relationship), napravit cemo odvojeno da nebi pretrpali ovu UserSchemu
});

UserSchema.pre('save', function(next) {         //before saving user object in DB 
    let user = this;
    if(this.isModified('password') || this.isNew) { //chech if user object is newly created or user password is modified
        bcrypt.genSalt(10, function(err, salt){
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, null, function(err,has){
                if(err) {
                    return next(err);
                }

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
})


module.exports = mongoose.model('User', UserSchema);
/**modules required for this model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**This is the table where user information will be stored 
 * @author Bhaskar Pawar
*/
let userSchema = new Schema({
    userId: {
        type: String,
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: Number,
        default: ''
    },
    countryCode: { // user to identify based on roles
        type: String,
        default: ''
    },
    countryName: {
        type: String,
        default: ''
    },
    countryPhoneCode: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    meetings: [
        {
            meetingId: {
                index: true,
                type: String
            },
            title: {
                type: String,
                default: ''
            },
            start: {
                type: Date,
                default: ''
            },
            end: {
                type: Date,
                default: ''
            },
            purpose: {
                type: String,
                default: ''
            },
            place: {
                type: String
            },
            createdBy: {
                type: String,
                default: ''
            }
        }
    ],
    createdOn: {
        type: Date,
        default: new Date()
    }

})// end of user model

module.exports = mongoose.model('User', userSchema);
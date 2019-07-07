/** required modules for user controller */
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('../libs/loggerLib');
const checkLib = require('../libs/checkLib');
const tokenLib = require('../libs/tokenLib');
const responseLib = require('../libs/responseLib');
const passwordLib = require('../libs/generatePasswordLib');
const validateInput = require('../libs/paramsValidationLib');
const time = require('../libs/timeLib');
const nodeMailer = require('nodemailer');
let UserModel = mongoose.model('User');
let AuthModel = mongoose.model('Auth');
let GlobalConfigModel = mongoose.model('GlobalConfig');

/**
 * @author Bhaskar Pawar
 * @description will return all the users except admin
 * @param {*} req 
 * @param {*} res
 * @returns {object} response
 */
const getAllNormalUers = async (req, res) => {
    try {
       
        let result = await getNormalUsers();
        let apiResponse = responseLib.generateResponse(false, 'fetched all normal users !', 200, result);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        res.status(err.status).send(err);
    }
}//END getAllNormalUers

const getNormalUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.find({}, 'userId fullName countryName -_id').where('isAdmin', false)
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'userController: getAllNormalUers:getNormalUsers()', 10)
                let apiResponse = responseLib.generateResponse(true, 'Failed To find Users', 500, null)
                reject(apiResponse);
            }
            else if (checkLib.isEmpty(result)) {
                logger.error('no users found', 'userController: getAllNormalUers:getNormalUsers()', 10)
                let apiResponse = responseLib.generateResponse(true, 'no Users found', 201, null)
                reject(apiResponse);
            }
            else {
                resolve(result);
            }
        })
    })
}//END getNormalUsers


/**
 * @author Bhaskar Pawar
 * @description will return all the users emails except admin
 */
const getNormalUsersEmails = () => {
    return new Promise((resolve, reject) => {
        UserModel.find({}).select('email -_id').where('isAdmin', false)
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'userController: getAllNormalUersEmails:getNormalUsersEmails()', 10);
                reject(err);
            }
            else if (checkLib.isEmpty(result)) {
                logger.error('no users found', 'userController: getAllNormalUersEmails:getNormalUsersEmails()', 10);
                reject(result);
            }
            else {
                resolve(result);
            }
        })
    })
}//END getNormalUsersEmails

/**
 * @description new user will be added to the system
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let signUp = async (req, res) => {

    try {
        await validateUserInput(req.body.email, req.body.password);
        let result = await createUser(req);
        let apiResponse = responseLib.generateResponse(false, 'Signed up successfully !', 200, result);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        res.status(err.status).send(err);
    }

}// end of sign up function

let validateUserInput = (email, password) => {
    return new Promise((resolve, reject) => {
        if (email) {
            if (validateInput.validateEmail(email)) {
                let apiResponse = responseLib.generateResponse(true, 'Invalid email', 500, null);
                reject(apiResponse);
            } else if (checkLib.isEmpty(password)) {
                let apiResponse = responseLib.generateResponse(true, 'password parameter is missing', 202, null)
                reject(apiResponse);
            } else {
                if (validateInput.validatePassword(password)) {
                    let apiResponse = responseLib.generateResponse(true, 'Password:Minimum 8 characters which contain only characters,numeric digits, underscore and first character must be a letter', 201, null)
                    reject(apiResponse);
                }
                else {
                    resolve();
                }
            }
        } else {
            logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
            let apiResponse = responseLib.generateResponse(true, 'One or More Parameter(s) is missing', 202, null)
            reject(apiResponse)
        }
    })
}// end validate user input

let createUser = (req) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: req.body.email }).
            lean()
            .exec((err, retrievedUserDetails) => {
                if (err) {
                    logger.error(err.message, 'userController: createUser', 10)
                    let apiResponse = responseLib.generateResponse(true, 'Failed To Create User', 500, null)
                    reject(apiResponse);
                } else if (checkLib.isEmpty(retrievedUserDetails)) {
                    let newUser = new UserModel({
                        userId: shortid.generate(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName || '',
                        fullName: req.body.firstName + " " + req.body.lastName,
                        mobileNumber: req.body.mobileNumber,
                        countryName: req.body.countryName,
                        countryCode: req.body.countryCode,
                        countryPhoneCode: req.body.countryPhoneCode,
                        email: req.body.email,
                        isAdmin: req.body.isAdmin,
                        password: passwordLib.hashpassword(req.body.password),
                        createdOn: time.now()
                    })
                    newUser.save((err, newUser) => {
                        if (err) {
                            logger.error(err.message, 'userController: createUser', 10)
                            let apiResponse = responseLib.generateResponse(true, 'Failed to create new User', 500, null)
                            reject(apiResponse)
                        } else {
                            let newUserObj = newUser.toObject();
                            delete newUserObj.password;
                            delete newUserObj._id;
                            delete newUserObj.__v;
                            resolve(newUserObj);
                        }
                    })
                } else {
                    logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                    let apiResponse = responseLib.generateResponse(true, 'User Already Present With this Email', 202, null)
                    reject(apiResponse)
                }
            })
    })
}// end create user function


/**
 * @description logs in user to the application
 * @author Bhaskar Pawar
 * @param {Request} req 
 * @param {Response} res 
 */
let login = async (req, res) => {

    try {
        let userDetails = await findUser(req.body.email);
        let userInfo = await validatePassword(req.body.password, userDetails);
        let userInfoWithSecret = await getSecretKeyFromDB(userInfo);
        let tokenDetails = await generateToken(userInfoWithSecret);
        let saveTokenDetails = await saveToken(tokenDetails);
        let apiResponse = responseLib.generateResponse(false, 'login successful', 200, saveTokenDetails);
        res.status(200);
        res.status(apiResponse.status).send(apiResponse);
        logger.info('login successful', 'userController:login()', 1);

    } catch(err) {
        res.status(err.status).send(err);
        logger.error('login failed', 'userController:login()', 1);
    }

}// end of login

let findUser = (email) => {
    return new Promise((resolve, reject) => {
        if (email) {
            logger.info('email is not empty', 'userController:login:findUser()', 10);
            UserModel.findOne({ email: email })
                .lean().exec((err, userDetails) => {
                    if (err) {
                        logger.error('Error in fetching user information', 'UserController:login:findUser()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'Internal server error occured while fetching user information', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(userDetails)) {
                        logger.info('Requested user is not found', 'UserController:login:findUser()', 2);
                        let apiResponse = responseLib.generateResponse(true, 'User with this email not found Kindly sign up to continue ', 201, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info('User Found', 'UserController:login:findUser()', 1);
                        resolve(userDetails);
                    }
                })
        }
    })
}//end of find User

let validatePassword = (password,userDetails) => {
    return new Promise((resolve, reject) => {
        passwordLib.comparePassword(password, userDetails.password, (err, isMatch) => {
            if (err) {
                logger.error('Error in validating password', 'UserController:login:validatePassword()', 1);
                let apiResponse = responseLib.generateResponse(true, 'Could not validate your password', 500, null);
                reject(apiResponse);
            }
            else if (isMatch) {
                logger.info('Password matched', 'UserController:login:validatePassword()', 1);
                let retrievedUserInfo = responseLib.returnFilteredObj(userDetails);
                resolve(retrievedUserInfo);
            }
            else {
                logger.info('password is not matched', 'UserController:login:validatePassword()', 1);
                let apiResponse = responseLib.generateResponse(true, 'Incorrect password entered', 202, null);
                reject(apiResponse);
            }
        })
    })
}// end of validate password

getSecretKeyFromDB = (apiResponse) => {
    return new Promise((resolve, reject) => {
        GlobalConfigModel.find({}, 'secretKey').select('-_id')
            .lean()
            .exec((err, secretKeyDB) => {
                if (err) {
                    logger.error('error fetching secretKey', ' tokenLib:generateToken()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'Error in fetching secretkey', 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(secretKeyDB)) {
                    logger.error('error fetching secretKey', ' tokenLib:generateToken()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'Error in fetching secretkey', 500, null);
                    reject(apiResponse);
                }
                else {
                    apiResponse.secretKey = secretKeyDB[0].secretKey;
                    resolve(apiResponse);
                }
            })
    })
}//  end of get secretKeyFromDB

let generateToken = (retrievedUserInfo) => {
    return new Promise((resolve, reject) => {
        tokenLib.generateToken(retrievedUserInfo, (err, tokenDetails) => {
            if (err) {
                logger.error('failed to generate token', 'UserController:login:generateToken()', 1);
                let apiResponse = responseLib.generateResponse(true, 'Internal Error:Token generation failed', 500, null);
                reject(apiResponse);
            }
            else {
                delete retrievedUserInfo.secretKey;
                tokenDetails.userDetails = retrievedUserInfo;
                resolve(tokenDetails);
            }
        })
    })
}//end of generate Token

let saveToken = (tokenDetails) => {
    return new Promise((resolve, reject) => {
        AuthModel.findOne({ userId: tokenDetails.userDetails.userId }, (err, retrievedTokenDetails) => {
            if (err) {
                logger.error('unable to save token', 'userController:login:saveToken()', 1);
                let apiResponse = responseLib.generateResponse(true, 'token saving failed', 500, null);
                reject(apiResponse);
            }
            else if (checkLib.isEmpty(retrievedTokenDetails)) {
                let newAuthToken = new AuthModel({
                    userId: tokenDetails.userDetails.userId,
                    authToken: tokenDetails.token,
                    tokenSecret: tokenDetails.tokenSecret,
                    tokenGenerationTime: time.now()
                })
                newAuthToken.save((err, result) => {
                    if (err) {
                        logger.error('error saving new token', 'userController:login:saveToken()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'new token saving failed', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let response = {
                            authToken: result.authToken,
                            userDetails: tokenDetails.userDetails
                        }
                        resolve(response);
                    }
                })
            }
            else {
                    retrievedTokenDetails.authToken = tokenDetails.token,
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret,
                    retrievedTokenDetails.tokenGenerationTime = tokenDetails.tokenGenerationTime
                    retrievedTokenDetails.save((err, authDetails) => {
                    if (err) {
                        logger.error('error updating existing token', 'userController:login:saveToken()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'token updation failed', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let response = {
                            authToken: authDetails.authToken,
                            userDetails: tokenDetails.userDetails
                        }
                        resolve(response);
                    }
                })
            }
        })
    })
}//end of save token


/**
 * @description check whether user is present or not
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let checkUserExistence = (req, res) => {
    UserModel.findOne({ email: req.query.email }, (err, details) => {
        if (err) {
            logger.error('Error in fetching user information', 'UserController:checkUserExistence()', 1);
            let apiResponse = responseLib.generateResponse(true, 'Internal server error occured while fetching user information', 500, null);
            res.status(apiResponse.status).send(apiResponse);
        }
        else if (checkLib.isEmpty(details)) {
            logger.info('Requested user is not found', 'UserController:checkUserExistence', 2);
            let apiResponse = responseLib.generateResponse(true, 'User with this email not found Kindly sign up to continue ', 201, null);
            res.status(apiResponse.status).send(apiResponse);
        }
        else {
            logger.info('User Found', 'UserController:checkUserExistence', 1);
            let apiResponse = responseLib.generateResponse(false, 'User found', 200, details);
            res.status(apiResponse.status).send(apiResponse);
        }
    })
}// end of check user existence

/**
 * @description This is to send email to the user for resetting password
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let sendEmail = async (req, res) => {
    
    try {
        let emailInfo = await sendNewEmail(req);
        let apiResponse = responseLib.generateResponse(false, 'reset password link sent successfully ! check your inbox', 200, emailInfo);
        res.status(apiResponse.status).send(apiResponse);

    } catch(err) {
        res.status(err.status).send(err);
    }

}//end send email

sendNewEmail = (req) => {
    return new Promise((resolve, reject) => {

        var transporter = nodeMailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: '465',
            secure: true,
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PASSWORD}`
            }
        });
        const mailOptions = {
            from: `${process.env.EMAIL}`, // sender address
            to: req.body.email, // list of receivers
            subject: 'Reset Password', // Subject line
            html: `<p><a href=${req.body.clientUrl}/reset?email=${req.body.email}>Click here</a> to reset password</p>`// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                logger.error('error in sending email', 'UserController:sendEmail()', 1);
                let apiResponse = responseLib.generateResponse(true, 'Internal Server Error', 500, null);
                reject(apiResponse);
            }
            else {
                logger.info('sent email', 'UserController:sendEmail()', 1);
                resolve(info);
            }
        });
    })
}//end of send new email


/**
 * @author Bhaskar Pawar
 * @description function to logout user.
 * @param {String} userId
 */
let logout = (req, res) => {
    AuthModel.findOneAndRemove({ userId: req.body.userId }).
        lean().exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'user Controller: logout', 10)
                let apiResponse = responseLib.generateResponse(true, `error occurred: ${err.message}`, 202, null)
                res.send(apiResponse)
            } else if (checkLib.isEmpty(result)) {
                let apiResponse = responseLib.generateResponse(true, 'Already Logged Out or Invalid UserId', 202, null)
                res.send(apiResponse)
            } else {
                let apiResponse = responseLib.generateResponse(false, 'Logged Out Successfully', 200, null)
                res.send(apiResponse)
            }
        })
} // end of the logout function.

/**
 * @author Bhaskar Pawar
 * @description resets the requested password
 * @param {*} req 
 * @param {*} res 
 */
let resetPassword = (req, res) => {

    UserModel.findOne({ email: req.body.email }, 'userId email password', (err, details) => {
        if (err) {
            logger.error('error in resetting password', 'UserController:resetPassword()', 1);
            let apiResponse = responseLib.generateResponse(true, 'password reset failed', 500, null);
            res.send(apiResponse);
        }
        else {
            passwordLib.comparePassword(req.body.password, details.password, (err, isMatch) => {
                if (err) {
                    logger.error('Error in validating paaword', 'UserController:login:resetPassword()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'Could not validate your password', 500, null);
                    res.send(apiResponse);
                }
                else if (isMatch) {
                    logger.info('Old and New Password can not be same', 'UserController:resetPassword()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'password is equal to old password', 201, null);
                    res.send(apiResponse);
                }
                else {
                    details.password = passwordLib.hashpassword(req.body.password);
                    details.save((err, userDetails) => {
                        if (err) {
                            logger.error('error in saving  password', 'UserController:resetPassword()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'password reset failed', 500, null);
                            res.send(apiResponse);
                        }
                        else {
                            let response = {
                                userId: userDetails.userId,
                                email: userDetails.email
                            }
                            logger.info('password reset successfully', 'UserController:resetPassword()', 1);
                            let apiResponse = responseLib.generateResponse(false, 'password reset successful !', 200, response);
                            res.send(apiResponse);
                        }
                    })
                }
            })
        }
    })
}//end reset password

module.exports = {
    login: login,
    signUp: signUp,
    checkUserExistence: checkUserExistence,
    getAllNormalUers: getAllNormalUers,
    getNormalUsersEmails: getNormalUsersEmails,
    sendEmail: sendEmail,
    resetPassword: resetPassword,
    logout: logout
}

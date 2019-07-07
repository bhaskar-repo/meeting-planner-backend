/** required modules for user controller */
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('../libs/loggerLib');
const checkLib = require('../libs/checkLib');
const responseLib = require('../libs/responseLib');
const userController = require('../controllers/userController');
const time = require('../libs/timeLib');
const moment = require('moment');
const nodeMailer = require('nodemailer');
let UserModel = mongoose.model('User');

/**
 * @author Bhaskar Pawar
 * @description This will get all the meetings created by admin
 * @returns {object} response
 */
const getAllMeetings = async (req, res) => {
    try {
        let meetings = await getmeetings(req.params.userId);
        meetings.forEach(meeting => {
            delete meeting._id;
            delete meeting.__v;
        })
        let apiResponse = responseLib.generateResponse(false, 'meetings fetched from DB', 200, meetings);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        res.status(err.status).send(err);
    }
}//END getAllMeetings   

let getmeetings = (userId) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ userId: userId }).select('meetings')
            .exec((err, result) => {
                if (err) {
                    logger.error('could not fetch meetings', 'meetingController:getAllMeetings:getmeetings()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'error in getting meetings', 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(result)) {
                    logger.error('no users found', 'meetingController:getAllMeetings:getmeetings()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'no users found in the system', 201, null);
                    reject(apiResponse);
                }
                else {
                    resolve(result.meetings);
                }
            })
    })
}//END getMeertings


/**
 * @author Bhaskar Pawar
 * @description This will get the single meeting created by admin
 * @returns {object} response
 */
const getSingleMeeting = async (req, res) => {
    try {
        let meeting = await getMeeting(req.params.userId, req.params.meetingId);
        let apiResponse = responseLib.generateResponse(false, 'meeting fetched from DB', 200, meeting);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        res.status(err.status).send(err);
    }
}//END getSingleMeeting

let getMeeting = (userId, meetingId) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ userId: userId }).select('meetings')
            .exec((err, result) => {
                if (err) {
                    logger.error('could not fetch meeting', 'meetingController:getSingleMeeting:getMeeting()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'error in getting meeting', 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(result)) {
                    logger.error('no users found', 'meetingController:getSingleMeeting:getMeeting()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'no users found in the system', 201, null);
                    reject(apiResponse);
                }
                else {
                    console.log(meetingId);
                    let meeting = result.meetings.find(meeting => meeting.meetingId === meetingId);
                    delete meeting._id;
                    delete meeting.__v;
                    resolve(meeting);
                }
            })
    })
}//END getMeeting

/**
 * @author Bhaskar Pawar
 * @description This will add meeting to all the users
 * @param {*} req 
 * @param {*} res
 * @returns {object} response
 */
const createNewMeeting = async (req, res) => {

    try {
        let meeting = await saveMeeting(req.body);
        let apiResponse = responseLib.generateResponse(false, 'New meeting created successfully !', 200, meeting);
        res.status(apiResponse.status).send(apiResponse);
        sendEmail('New Meeting Created by Admin', meeting, null);
    } catch (err) {
        console.log(err);
        res.status(err.status).send(err);
    }

}//END createNewMeeting

const saveMeeting = (meetingDetails) => {
    return new Promise((resolve, reject) => {
        UserModel.find({}).select('meetings')
            .exec((err, result) => {
                if (err) {
                    logger.error('can not get user meetings', 'meetingController:saveMeeting()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'error in getting user meetings', 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(result)) {
                    logger.error('no users found', 'meetingController:saveMeeting()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'no users found in the system', 201, null);
                    reject(apiResponse);
                }
                else {

                    let newMeeting = {
                        meetingId: shortid.generate(),
                        title: meetingDetails.title,
                        start: meetingDetails.start,
                        end: meetingDetails.end,
                        purpose: meetingDetails.purpose,
                        place: meetingDetails.place,
                        createdBy: meetingDetails.createdBy
                    }
                    result.forEach(obj => obj.meetings.push(newMeeting));
                    result.forEach(obj => obj.save((err, result) => {
                        if (err) {
                            logger.error('can not save user meetings', 'meetingController:saveMeeting()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'error in saving user meeting', 500, null);
                            reject(apiResponse);
                        }
                        else {
                            resolve(newMeeting);
                        }
                    }))
                }
            })
    })
}//END saveMeeting

/**
 * @author Bhaskar Pawar
 * @description edits the meeting requested by client
 * @param {*} req 
 * @param {*} res 
 * @returns {object} response
 */
const editMeeting = async (req, res) => {

    try {
        let meeting = await editMeetingInDB(req.params.meetingId, req.body);
        let apiResponse = responseLib.generateResponse(false, 'meeting details updated successfully !', 200, meeting);
        res.status(apiResponse.status).send(apiResponse);
        sendEmail('Meeting Edited by Admin', meeting, null);
    } catch (err) {
        res.status(err.status).send(err);
    }
}//END editMeeting

const editMeetingInDB = (meetingId, editedMeeting) => {

    return new Promise((resolve, reject) => {
        UserModel.find({}).select('meetings')
            .exec((err, result) => {
                if (err) {
                    logger.error('could not edit the meeting', 'meetingController:editMeeting:editMeetingInDB()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'error in editing meeting', 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(result)) {
                    logger.error('no users found', 'meetingController:editMeeting:editMeetingInDB()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'no users found in the system', 201, null);
                    reject(apiResponse);
                }
                else {

                    result.forEach(obj => {
                        let meeting = obj.meetings.find(meeting => meeting.meetingId === meetingId);
                        if (meeting !== undefined){
                            meeting.title = editedMeeting.title;
                            meeting.start = editedMeeting.start;
                            meeting.end = editedMeeting.end;
                            meeting.purpose = editedMeeting.purpose;
                            meeting.place = editedMeeting.place;
                        } 
                    })

                    result.forEach(obj => obj.save((err, result) => {
                        if (err) {
                            logger.error('could not save edited meeting', 'meetingController:editMeeting:editMeetingInDB()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'error in saving edited meeting', 500, null);
                            reject(apiResponse);
                        }
                        else {
                            resolve(editedMeeting);
                        }
                    }))

                }
            })
    })
}//END editMeetingInDB

/**
 * @author Bhaskar Pawar
 * @description Wiil delete the meeting requested by the client
 * @param {*} req 
 * @param {*} res
 * @returns {object} response
 */
const deleteMeeting = async (req, res) => {
    try {
        let meeting = await deleteMeetingFromDB(req.params.meetingId);
        let apiResponse = responseLib.generateResponse(false, 'meeting deleted successfully !', 200, meeting);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        res.status(err.status).send(err);
    }
}//END deleteMeeting

const deleteMeetingFromDB = (meetingId) => {

    return new Promise((resolve, reject) => {
        UserModel.find({}).select('meetings')
            .exec((err, result) => {
                if (err) {
                    logger.error('could not delete meeting', 'meetingController:deleteMeeting:deleteMeetingFromDB()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'error in deleting meeting', 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(result)) {
                    logger.error('no users found', 'meetingController:deleteMeeting:deleteMeetingFromDB()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'no users found in the system', 201, null);
                    reject(apiResponse);
                }
                else {

                    result.forEach(obj => {
                        let removeIndex = obj.meetings.findIndex(meeting => meeting.meetingId === meetingId);
                        obj.meetings.splice(removeIndex, 1);
                    })

                    result.forEach(obj => obj.save((err, result) => {
                        if (err) {
                            logger.error('could not delete meeting', 'meetingController:deleteMeeting:deleteMeetingFromDB()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'error in deleting meeting', 500, null);
                            reject(apiResponse);
                        }
                        else {
                            resolve('deleted');
                        }
                    }))
                }
            })
    })
}//END deleteMeetingFromDB

/**
 * This will send email 1 minute before meeting
 * @param {*} req 
 * @param {*} res 
 * @returns {object} repsonse
 */
const sendMailBeforeMeeting = async (req, res) => {
    console.log(req.body);
    try {
    
        await sendEmail('You have a meeting in a minute', req.body, req.params.email);
        let apiResponse = responseLib.generateResponse(false, 'email sent successfully !', 200, req.body);
        res.status(apiResponse.status).send(apiResponse);
    }catch(err) {
        console.log(err)
        res.status(err.status).send(err);
    }
}

/**
 * @author Bhaskar Pawar
 * @description This will send updates abour the meeting through email
 */
const sendEmail = async (subject, meetingDetails, singleUserMail) => {
    
    let receipients = null;
    if (null === singleUserMail) {
        receipients =  await userController.getNormalUsersEmails();
    }
    else {
        receipients = singleUserMail;
    }

    console.log(receipients);
  
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
            to: receipients, // list of receivers
            subject: subject, // Subject line
            html: `
            <div class="modal-header">
                <h5 class="modal-title"><i class="fas fa-bell">Notification</i> Meeting Details</h5>
            </div>
            <div class="modal-body">
                <div class="card" style="width: 17rem;">
                <div class="card-body">
                    <h5 class="card-title">${meetingDetails.title}</h5>
                    <p class="card-text">${meetingDetails.createdBy}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Starts at: ${meetingDetails.start}</li>
                    <li class="list-group-item">Ends at: ${meetingDetails.end}</li>
                    <li class="list-group-item">Purpose: ${meetingDetails.purpose}</li>
                    <li class="list-group-item">Place: ${meetingDetails.place}</li>
                </ul>
                </div>
            </div>`// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                logger.error('error in sending email', 'meetingController:sendEmail()', 1);
            }
            else {
                logger.info('sent email', 'meetingController:sendEmail()', 1);
            }
        });
}

module.exports = {
    createNewMeeting: createNewMeeting,
    editMeeting: editMeeting,
    deleteMeeting: deleteMeeting,
    getAllMeetings: getAllMeetings,
    getSingleMeeting: getSingleMeeting,
    sendEmail: sendEmail,
    sendMailBeforeMeeting: sendMailBeforeMeeting
}



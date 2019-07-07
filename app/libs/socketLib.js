const socketio = require('socket.io');
const logger = require('../libs/loggerLib');
const tokenLib = require("../libs/tokenLib.js");
const checkLib = require("../libs/checkLib.js");
const mongoose = require('mongoose');
const AuthModel = mongoose.model('Auth');
const events = require('events');
const eventEmitter = new events.EventEmitter();


/**
 * @description all the real time communication handled by this method
 * @author Bhaskar Pawar
 * @param {*} server 
 */
let setServer = (server) => {
    let io = socketio.listen(server);
    let myIo = io.of('/');
    myIo.on('connection', (socket) => {
        socket.emit('verify-user', "");
        socket.on('set-user', (userDetails) => {
            AuthModel.findOne({ authToken: userDetails.authToken }, (err, authDetails) => {
                if (err) {
                    logger.error(err.message, 'Socket Connection', 1);
                } else if (checkLib.isEmpty(authDetails)) {
                    logger.error('No AuthorizationKey Is Present', 'Socket Connection', 1);
                } else {
                    tokenLib.verifyToken(authDetails.authToken, authDetails.tokenSecret, (err, decoded) => {
                        if (err) {
                            logger.error(err.message, 'Socket Connection', 1);
                        }
                        else {
                            let currentUser = decoded.data;
                            if (!userDetails.userInfo.isAdmin) {
                                socket.join('normalusers');
                            }
                            
                        }
                    });// end verify token
                }
            })
        })

        socket.on('add-meeting' , (data) => {
            data.action = 'Created New Meeting';
            socket.emit('meeting-added', data);
            socket.broadcast.emit('meeting-added', data);
            socket.join('normalusers');
            socket.to('normalusers').broadcast.emit('notify-meeting', data);
        })//END add meeting listen event


        socket.on('edit-meeting' , (data) => {
            data.action = 'Edited Meeting';
            socket.emit('meeting-edited', data);
            socket.broadcast.emit('meeting-edited', data);
            socket.join('normalusers');
            socket.to('normalusers').broadcast.emit('notify-meeting', data);
        })//END add meeting listen event

        socket.on('delete-meeting' , (data) => {
            socket.broadcast.emit('meeting-deleted', data);
        })//END delete meeting listen event


        socket.on('notify-before-meeting' , (data) => {
            socket.emit('notify-before-meeting', data);
        })//END notify-before-meeting event

    })
}

module.exports = {
    setServer: setServer
}


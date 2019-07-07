const meetingController = require('../controllers/meetingController');
const appConfig = require('../../config/appConfig');
const authMiddleWare = require('../middlewares/auth');

/**
 * This method is used to define routes for this module
 * @author Bhaskar Pawar
 * @param {*} app 
 */
const setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/meetings`;

    /**
 * @apiGroup meetings
 * @apiVersion  1.0.0
 * @api {post} /api/v1/meetings/create api for user to create new meeting.
 * @apiParam {string} title title of the meeting (body params)(required)
 * @apiParam {date} start start time of the meeting (body params)(required)
 * @apiParam {date} end end time of the meeting (body params)(required)
 * @apiParam {string} purpose purpose of the meeting (body params)(required)
 * @apiParam {string} place place of the meeting (body params)(required)
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * @apiSuccessExample {object} Success-Response:
 * {
      "error": false,
      "message": "New meeting created successfully !",
      "status": 200,
      "data": {
          "meetingId": "Y-CALv5Dd"
      }
  }
     @apiErrorExample {json} Error-Response:
     {
          "error": true,
          "message": "Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request",
          "status": "500 || 404",
          "data" : "null"
     }

*/
    app.post(`${baseUrl}/create`, authMiddleWare.isAuthorized, meetingController.createNewMeeting);
    /**
   * @apiGroup meetings
   * @apiVersion  1.0.0
   * @api {get} /api/v1/meetings/:userId/all api for user to get all meetings associated with user.
   * @apiParam {string} userId userId of the system (request params)(required)
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * @apiSuccessExample {object} Success-Response:
   * {
        "error": false,
        "message": "meetings fetched from DB",
        "status": 200,
        "data": [
            {
                "title": "meeting1",
                "start": "2019-07-07T05:55:45.000Z",
                "end": "2019-07-07T05:56:45.000Z",
                "purpose": "status meeting",
                "createdBy": "admin user",
                "meetingId": "xu0VEteB_",
                "place": "meeting room1"
            },
            {
                "title": "meeting2",
                "start": "2019-07-07T05:55:45.000Z",
                "end": "2019-07-07T05:55:45.000Z",
                "purpose": "status meeting",
                "createdBy": "admin user",
                "meetingId": "Y-CALv5Dd",
                "place": "meeting room2"
            }
        ]
    }
       @apiErrorExample {json} Error-Response:
       {
            "error": true,
            "message": "Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request",
            "status": "500 || 404",
            "data" : "null"
       }

  */
    app.get(`${baseUrl}/:userId/all`, authMiddleWare.isAuthorized, meetingController.getAllMeetings);
    /**
 * @apiGroup meetings
 * @apiVersion  1.0.0
 * @api {get} /api/v1/meetings/:userId/:meetingId/get api for user to get single meeting associated with user.
 * @apiParam {string} userId of the system (request params)(required)
 * @apiParam {string} meetingId of the meeting (request params)(required)
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * @apiSuccessExample {object} Success-Response:
 * {
        "error": false,
        "message": "meeting fetched from DB",
        "status": 200,
        "data": {
            "title": "dfdf",
            "start": "2019-07-07T05:55:45.000Z",
            "end": "2019-07-07T05:56:45.000Z",
            "purpose": "dgdgd",
            "createdBy": "admin user",
            "meetingId": "xu0VEteB_",
            "place": "dgdgdddd"
        }
    }
     @apiErrorExample {json} Error-Response:
     {
          "error": true,
          "message": "Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request",
          "status": "500 || 404",
          "data" : "null"
     }

*/
    app.get(`${baseUrl}/:userId/:meetingId/get`, authMiddleWare.isAuthorized, meetingController.getSingleMeeting);
   /**
 * @apiGroup meetings
 * @apiVersion  1.0.0
 * @api {put} /api/v1/meetings/:meetingId/edit api for user to update existing meeting.
 * @apiParam {string} meetingId meetingId of the meeting (request params)(required)
 * @apiParam {string} title title of the meeting (body params)(required)
 * @apiParam {date} start start time of the meeting (body params)(required)
 * @apiParam {date} end end time of the meeting (body params)(required)
 * @apiParam {string} purpose purpose of the meeting (body params)(required)
 * @apiParam {string} place place of the meeting (body params)(required)
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * @apiSuccessExample {object} Success-Response:
 * {
    "error": false,
    "message": "meeting details updated successfully !",
    "status": 200,
    "data": {}
    }
     @apiErrorExample {json} Error-Response:
     {
          "error": true,
          "message": "Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request",
          "status": "500 || 404",
          "data" : "null"
     }

    */
    app.put(`${baseUrl}/:meetingId/edit`, authMiddleWare.isAuthorized, meetingController.editMeeting);
    
       /**
 * @apiGroup meetings
 * @apiVersion  1.0.0
 * @api {post} /api/v1/meetings/:meetingId/delete api for user to delete single meeting from DB.
 * @apiParam {string} meetingId of the meeting (request params)(required)
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * @apiSuccessExample {object} Success-Response:
 *{
    "error": false,
    "message": "meeting deleted successfully !",
    "status": 200,
    "data": "deleted"
    }
     @apiErrorExample {json} Error-Response:
     {
          "error": true,
          "message": "Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request",
          "status": "500 || 404",
          "data" : "null"
     }

*/
    app.post(`${baseUrl}/:meetingId/delete`, authMiddleWare.isAuthorized, meetingController.deleteMeeting);
       
       /**
 * @apiGroup meetings
 * @apiVersion  1.0.0
 * @api {post} /api/v1/meetings/before/:email/sendmail api for user to send mail before meeting.
 * @apiParam {string} email of the user (request params)(required)
 * @apiParam {string} created by who created the meeting (body params)(required)
 * @apiParam {string} title title of the meeting (body params)(required)
 * @apiParam {date} start start time of the meeting (body params)(required)
 * @apiParam {date} end end time of the meeting (body params)(required)
 * @apiParam {string} purpose purpose of the meeting (body params)(required)
 * @apiParam {string} place place of the meeting (body params)(required)
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * @apiSuccessExample {object} Success-Response:
 *  {
    "error": false,
    "message": "email sent successfully !",
    "status": 200,
    "data": {}
    }
     @apiErrorExample {json} Error-Response:
     {
          "error": true,
          "message": "Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request",
          "status": "500 || 404",
          "data" : "null"
     }

*/
    app.post(`${baseUrl}/before/:email/sendmail`, authMiddleWare.isAuthorized, meetingController.sendMailBeforeMeeting);

}

module.exports = {
    setRouter: setRouter
}
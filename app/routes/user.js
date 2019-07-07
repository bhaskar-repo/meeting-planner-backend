const userController = require('../controllers/userController');
const appConfig = require('../../config/appConfig');
const authMiddleWare = require('../middlewares/auth');

/**
 * This method is used to define routes for this module
 * @author Bhaskar Pawar
 * @param {*} app 
 */
const setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;
    
    /**
   * @apiGroup users
   * @apiVersion  1.0.0
   * @api {get} /api/v1/users/all api for user to get all normal users.
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * @apiSuccessExample {object} Success-Response:
   * {
            "error": false,
            "message": "fetched all normal users !",
            "status": 200,
            "data": [
                {
                    "countryName": "India",
                    "userId": "76xx7rC8z",
                    "fullName": "nilam pawar"
                },
                {
                    "countryName": "India",
                    "userId": "8MD0fx4kz",
                    "fullName": "bhaskar pawar"
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
    app.get(`${baseUrl}/all`, authMiddleWare.isAuthorized, userController.getAllNormalUers);
}

module.exports = {
    setRouter: setRouter
}
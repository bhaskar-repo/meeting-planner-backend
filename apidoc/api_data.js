define({ "api": [
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/:userId/all",
    "title": "api for user to get all meetings associated with user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the system (request params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"meetings fetched from DB\",\n        \"status\": 200,\n        \"data\": [\n            {\n                \"title\": \"meeting1\",\n                \"start\": \"2019-07-07T05:55:45.000Z\",\n                \"end\": \"2019-07-07T05:56:45.000Z\",\n                \"purpose\": \"status meeting\",\n                \"createdBy\": \"admin user\",\n                \"meetingId\": \"xu0VEteB_\",\n                \"place\": \"meeting room1\"\n            },\n            {\n                \"title\": \"meeting2\",\n                \"start\": \"2019-07-07T05:55:45.000Z\",\n                \"end\": \"2019-07-07T05:55:45.000Z\",\n                \"purpose\": \"status meeting\",\n                \"createdBy\": \"admin user\",\n                \"meetingId\": \"Y-CALv5Dd\",\n                \"place\": \"meeting room2\"\n            }\n        ]\n    }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsUseridAll"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/:userId/:meetingId/get",
    "title": "api for user to get single meeting associated with user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the system (request params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>of the meeting (request params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"meeting fetched from DB\",\n        \"status\": 200,\n        \"data\": {\n            \"title\": \"dfdf\",\n            \"start\": \"2019-07-07T05:55:45.000Z\",\n            \"end\": \"2019-07-07T05:56:45.000Z\",\n            \"purpose\": \"dgdgd\",\n            \"createdBy\": \"admin user\",\n            \"meetingId\": \"xu0VEteB_\",\n            \"place\": \"dgdgdddd\"\n        }\n    }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsUseridMeetingidGet"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/before/:email/sendmail",
    "title": "api for user to send mail before meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>of the user (request params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "created",
            "description": "<p>by who created the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "start",
            "description": "<p>start time of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "end",
            "description": "<p>end time of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>purpose of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "place",
            "description": "<p>place of the meeting (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"email sent successfully !\",\n   \"status\": 200,\n   \"data\": {}\n   }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsBeforeEmailSendmail"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/create",
    "title": "api for user to create new meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "start",
            "description": "<p>start time of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "end",
            "description": "<p>end time of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>purpose of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "place",
            "description": "<p>place of the meeting (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"New meeting created successfully !\",\n      \"status\": 200,\n      \"data\": {\n          \"meetingId\": \"Y-CALv5Dd\"\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsCreate"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/:meetingId/delete",
    "title": "api for user to delete single meeting from DB.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>of the meeting (request params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"meeting deleted successfully !\",\n    \"status\": 200,\n    \"data\": \"deleted\"\n    }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsMeetingidDelete"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/meetings/:meetingId/edit",
    "title": "api for user to update existing meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meetingId of the meeting (request params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "start",
            "description": "<p>start time of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "end",
            "description": "<p>end time of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>purpose of the meeting (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "place",
            "description": "<p>place of the meeting (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"meeting details updated successfully !\",\n    \"status\": 200,\n    \"data\": {}\n    }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "PutApiV1MeetingsMeetingidEdit"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/all",
    "title": "api for user to get all normal users.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"fetched all normal users !\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"countryName\": \"India\",\n                    \"userId\": \"76xx7rC8z\",\n                    \"fullName\": \"nilam pawar\"\n                },\n                {\n                    \"countryName\": \"India\",\n                    \"userId\": \"8MD0fx4kz\",\n                    \"fullName\": \"bhaskar pawar\"\n                }\n            ]\n    }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error || AuthorizationToken Is Missing In Request\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"login successful\",\n            \"status\": 200,\n            \"data\": {\n                \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImRsTTBhV3BaSyIsImlhdCI6MTU1OTE3MjUyNjU5MCwiZXhwIjoxNTU5MjU4OTI2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJpc3N1ZVRyYWNraW5nVG9vbCIsImRhdGEiOnsidXNlcklkIjoiY1FnS3J6eDhVIiwiZmlyc3ROYW1lIjoiYmhhc2thciIsImxhc3ROYW1lIjoicGF3YXIiLCJjb3VudHJ5TmFtZSI6IkJhbmdsYWRlc2giLCJjb3VudHJ5Q29kZSI6IkJEIiwiY291bnRyeVBob25lQ29kZSI6Ijg4MCIsImVtYWlsIjoiYmhhc2thckBleGFtcGxlLmNvbSIsInNlY3JldEtleSI6IlRoaXNpc215YXBwbGljYXRpb25zZWNyZXRrZXlzdG9yZWRpbkRCc290aGF0bm9ib2R5Q2FuR3Vlc3MifX0.mTHPf_-zohaLEY0Hcuc9vwZqFLuvDEifANEnsKNUPQo\",\n                \"userDetails\": {\n                    \"userId\": \"cQgKrzx8U\",\n                    \"firstName\": \"bhaskar\",\n                    \"lastName\": \"pawar\",\n                    \"countryName\": \"Bangladesh\",\n                    \"countryCode\": \"BD\",\n                    \"countryPhoneCode\": \"880\",\n                    \"email\": \"bhaskar@example.com\"\n                }\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userauth.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api for user to log out of the application.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"Logged Out Successfully\",\n      \"status\": 200,\n      \"data\": null\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userauth.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/reset",
    "title": "api for user to send email for reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n         \"error\": false,\n         \"message\": \"password reset successful !\",\n         \"status\": 200,\n         \"data\": {\n             \"userId\": \"JKSgbe9-f\",\n             \"email\": \"bhaskar26.pawar@gmail.com\"\n         }\n     }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userauth.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersReset"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/sendemail",
    "title": "api for user to send email for reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ClientUrl",
            "description": "<p>. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"reset password link sent successfully ! check your inbox\",\n           \"status\": 200,\n           \"data\": {\n               \"accepted\": [\n                   \"bhaskar26.pawar@gmail.com\"\n               ],\n               \"rejected\": [],\n               \"envelopeTime\": 1039,\n               \"messageTime\": 1017,\n               \"messageSize\": 389,\n               \"response\": \"250 2.0.0 OK  1559344676 x18sm8075150pfo.8 - gsmtp\",\n               \"envelope\": {\n                   \"from\": \"bhaskar90.pawar@gmail.com\",\n                   \"to\": [\n                       \"bhaskar26.pawar@gmail.com\"\n                   ]\n               },\n               \"messageId\": \"<0114b13d-0f87-af2c-cc5c-32aabe6bf476@gmail.com>\"\n           }\n       }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userauth.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSendemail"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryName",
            "description": "<p>countryName of the user (body Param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>countryCode of the user (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryPhoneCode",
            "description": "<p>of the user (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Signed up successfully !\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"cQgKrzx8U\",\n        \"firstName\": \"bhaskar\",\n        \"lastName\": \"pawar\",\n        \"countryName\": \"Bangladesh\",\n        \"countryCode\": \"BD\",\n        \"countryPhoneCode\": \"880\",\n        \"email\": \"bhaskar@example.com\",\n        \"createdOn\": \"2019-05-29T17:16:41.000Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userauth.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });

define({ "api": [
  {
    "type": "post",
    "url": "/user",
    "title": "",
    "group": "User",
    "name": "createUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "",
    "group": "User",
    "name": "findAll",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Users unique ID.",
    "group": "User",
    "name": "findAll",
    "version": "0.0.0",
    "filename": "controllers/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "",
    "group": "User",
    "name": "login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.controller.js",
    "groupTitle": "User"
  }
] });

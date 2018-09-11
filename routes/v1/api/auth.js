var User = require('../../../models/user.server.model.js');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong: ' + err;
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

// Middleware to run Passport req.isAuthenticated()
// If user is not logged in, send 401
var requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in.'
        });
    }
    next();
};

router.route('/login')
    // Check login attempt with Passport
    .post(function (req, res, next) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return res.json({
                    status: 'failed',
                    message: 'Something went wrong'
                })
            }
            if (!user) {
                return res.json({
                    status: 'failed',
                    message: 'User not found'
                })
            }

            console.log(user);

            return res.json({
                status: 'succeeded',
                data: {
                    username: user.username,
                    email: user.email,
                }
            });
        })(req, res, next);
    });


module.exports = router;
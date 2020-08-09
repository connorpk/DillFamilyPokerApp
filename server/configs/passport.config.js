const passport = require('passport');
const pool = require('./mysql.config');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const saltRounds = 12;


// JWT config
function config(passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: process.env.SESSION_SECRET
    }


    passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
        pool.query('SELECT * FROM user WHERE userid = ?', [jwt_payload.id], (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user[0]) {
                return done(null, user[0]);
            } else {
                return done(null, false);
            }
        })
    }))
};


// Login local strategy for passport
passport.use('local-login', new LocalStrategy(
    (username, password, done) => {
        pool.query('SELECT * FROM user WHERE username = ?', [username], (err, user) => {
            if (err) {
                return done(err, false, "Something went wrong, please try again later.");
            }
            if (user.length == 0) {
                return done(null, false, "Invalid username or password.");
            }
            bcrypt.compare(password, user[0].password, (err, same) => {
                if (err) {
                    return done(err, false, "Something went wrong, please try again later.");
                }
                if (!same) {
                    return done(null, false, "Invalid username or password.");
                }
                return done(null, user[0]);
            })
        })
    }
));


// Signup local strategy for passport
passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    pool.query('SELECT * FROM user WHERE username = ?', [username], (err, user) => {
        console.log(user)
        if (err) {
            return done(err, false, "Something went wrong, please try again later1.");
        }
        if (user.length > 0) {
            return done(null, false, "Username in use, please choose a different username.");
        }
        console.log(password)
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return done(null, false, "Something went wrong, please try again later2.");
            }
            password = hash;
            console.log(req.body)
            console.log([username, req.body.firstname, req.body.lastname, password, req.body.email])
            pool.query('INSERT INTO user (username, firstname, lastname, password, emailaddress) VALUES(?, ?, ?, ?, ?)', [username, req.body.firstname, req.body.lastname, password, req.body.email], (err) => {
                console.log('query happened')
                if (err) {
                    return done(err, false, "Something went wrong, please try again later3.");
                }
                return done(null, true, "Success?");
            })
        })
    })
}));



module.exports = config;
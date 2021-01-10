//Import functions, methods, frameworks etc
const JWT = require("jsonwebtoken");
require("dotenv").config()

module.exports = function () {
    //Obtain token from request header and use split as well as substring token, to remove everything not part of the token
    let token = undefined
    let tokenIsValid = false;
    const authHeader = document.cookie.split("=")[1];
    //alert(document.cookie)
    //console.log(authHeader)
    if(authHeader !== undefined) {
        token = authHeader;
    } else if(token === null || token === undefined) return window.location.href = "http://192.168.0.38:3000/login";

    JWT.verify(token, process.env.REACT_APP_SECRET_TOKEN, (err, user) => {
        if(err) {
            //If token is expired, send user back to loginpage
            tokenIsValid = false
        } else { 
            //If token is valid, continue on
            tokenIsValid = true
        }
    })

    return tokenIsValid
}
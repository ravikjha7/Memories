import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

const check = (token) => {

    for(var i = 0; i < token.length; i++) {
        if(token.charAt(i) < '0' || token.charAt(i) > '9') return true;
    }

    return false;

}

const auth = async(req, res, next) => {

    try {

        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = check(token);

        let decodedData;

        console.log(isCustomAuth + " " + token);

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);

            // console.log(decodedData);

            req.userId = decodedData.id;
        } else {
            req.userId = token;
        }

        next();


    } catch(error) {
        console.log(error);
    }

}

export default auth;
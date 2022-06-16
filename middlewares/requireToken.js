import jwt from 'jsonwebtoken';
import { TokenVerificationErrors } from '../utils/tokenManager.js';

// *驗證header傳送過來的token決定是否放行

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if(!token) throw new Error('token does not exist')

        token = token.split(" ")[1]
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid

        next();
    } catch (error) {
        console.log(error.message);

        return res.status(401).send({error: TokenVerificationErrors[error.message]})
    }
};

// * cookie

/* 
export const requireToken = (req, res, next) => {
    try {
        let token = req.cookies.token
        if(!token) throw new Error('token does not exist')

        token = token.split(" ")[1]
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid

        next();
    } catch (error) {
        console.log(error.message);

        const TokenVerificationErrors = {
            ["invalid signature"]: "JWT簽名無效",
            ["jwt expired"]: "JWT過期",
            ["invalid token"]: "Token無效",
            ["No Bearer"]: "請使用Bearer格式",
            ["jwt malformed"]: "JWT格式無效"
        };

        return res.status(401).send({error: TokenVerificationErrors[error.message]})
    }
};
*/
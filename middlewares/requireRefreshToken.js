import jwt from 'jsonwebtoken';
import { TokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) throw new Error("token不存在")
        const {uid} = jwt.verify(refreshTokenCookie, "process.env.JWT_REFRESH");
        
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error.message);

        return res.status(401).send({error: TokenVerificationErrors[error.message]})

    }
};
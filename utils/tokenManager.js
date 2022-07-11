import jwt from 'jsonwebtoken';

// * 產生token, 刷新token, token錯誤

export const generateToken = (uid) => {
    try {

        const expiresIn = 60 * 15

        // TODO 儲存時間限制

        const token = jwt.sign({uid}, "process.env.JWT_SECRET", {expiresIn})
        return {token, expiresIn}
    } catch (error) {
        console.log(error);
    }
};

// * 4:25:50

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({uid}, "process.env.JWT_REFRESH", {expiresIn})
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !("process.env.MODO" === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        });
    } catch (error) {
        console.log(error);
    }
}

export const TokenVerificationErrors = {
    "invalid signature": "JWT簽名無效",
    "jwt expired": "JWT過期",
    "invalid token": "Token無效",
    "No Bearer": "請使用Bearer格式",
    "jwt malformed": "JWT格式無效或沒有token"
};

/*
export const errorsValidateToken = (error) =>{
    switch (error) {
        case "invalid signature":
            return "JWT簽名無效";
        case "jwt expired":
            return "JWT過期";
        case "invalid token": 
            return "Token無效";
        default:
            return error;
    }
}
*/
import { validationResult } from "express-validator";

// * 獨立出來中介驗證 提交表單內容不可空白

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next()
};
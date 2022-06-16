import axios from "axios";
import { validationResult, body, param } from "express-validator";

// * 獨立出來中介驗證 提交表單內容不可空白

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next()
};

export const bodyLinkValidator = [
    body("longLink", "網址格式不正確")
    .trim()
    .notEmpty()
    .custom( async (value, {req}) => {
        try {

            if(!value.startsWith('https://')){
                value = 'https://' + value
            }
            // console.log(value);
            // req.body.longLink = value
            await axios.get(value);

            return value;
        } catch (error) {
            // console.log(error);
            throw new Error ('找不到網址 404')
        }
    })
    ,validationResultExpress
];

//? param validator

export const paramLinkValidator = [
    param("Id", "內容格式不正確").trim().notEmpty().escape(),
    validationResultExpress,
]

export const bodySignUpValidator =[
    body("Account", "帳號長度不夠")
        .isLength({min: 5}),
    body("Name", "名稱不可空白")
        .isLength({min: 1}),
    body("Password", "密碼最少8碼")
        .trim()
        .isLength({min: 8}),
    // body("Password", "密碼格式錯誤")
    //     .custom((value, {req}) => {
    //         if(value !== req.body.rePassword){
    //             throw new Error ('密碼不一致')
    //         }
    //         return value
    //     }),
    body("Email", "Email格式不正確")
        .trim()
        .isEmail(), 
    body("Address", "地址不可空白")
        .isLength({min: 1}),
    validationResultExpress
    ];

export const bodyLoginValidator =[
    body("Account", "帳號長度不夠")
        .isLength({min: 5}),
    body("Name", "名稱不可空白")
        .isLength({min: 1}),
    body("Password", "密碼最少8碼")
        .trim()
        .isLength({min: 8}),
    validationResultExpress
];

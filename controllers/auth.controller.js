import { miU } from '../models/miU.js';
import bcryptjs from 'bcryptjs'
import  jwt  from "jsonwebtoken";
import { generateRefreshToken, generateToken, TokenVerificationErrors } from '../utils/tokenManager.js';


// ? 過濾重複Name和Account?
// * 成功過濾email


export const signup = async (req, res) => {
    const {Account, Name, Password, Email, Address} = req.body
    try {
        let miUser = await miU.findOne({where: {Account, Email}})
        if(miUser) throw {errno: 1062}
        miUser = miU.create({Account, Name, Password, Email, Address});
        
        const {token, expiresIn} = generateToken(miUser.Id);
        generateRefreshToken(miUser.Id, res);


        /*
        if(miUser){
            throw {errno: 1062}
        } else {
            miUser = miU.create({Account, Name, Password, Email, Address})
            const token = jwt.sign({uid: miUser.Id}, 'torataiga')
            return res.json({ token })
        }
        */
        return res.json({token, expiresIn});

    } catch (error) {
        if(error.errno === 1062){
            return res.status(400).json({error: "此Email已申請過帳號或此使用者帳號已被註冊"})
        }
        return res.status(500).json({error: "伺服器問題"})
    }
};


export const login = async (req, res) => {
    try {
        const {Account, Name, Password} = req.body;
        let miUser = await miU.findOne({where: {Account}})
        if(!miUser) return res.status(403).json({error: "使用者未註冊或帳號密碼錯誤"})
    
        if(!bcryptjs.compareSync(Password, miUser.Password)){
            return res.status(403).json({error: "使用者未註冊或帳號密碼錯誤"})
        }

        // TODO: jwt token
        const {token, expiresIn} = generateToken(miUser.Id)
        generateRefreshToken(miUser.Id, res);

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: !(process.env.MODO === "developer"),
        // });


        return res.json({ token, expiresIn })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "伺服器問題"})
    }
};

export const infoUser = async (req, res) => {
    try {
        const miUser = await miU.findByPk(req.uid);
        return res.json({ uid: miUser.Id, Account: miUser.Account, Email: miUser.Email, Address: miUser.Address });
    } catch (error) {
        return res.status(500).json({error: "伺服器錯誤"});
    }
};

export const refreshToken = (req, res) => {
    try {
        const {token, expiresIn} = generateToken(req.uid)
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "伺服器錯誤"});

    }
};

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ok: true});
}
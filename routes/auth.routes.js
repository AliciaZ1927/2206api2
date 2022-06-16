import { Router } from 'express';
import { body } from 'express-validator';
import { infoUser, login, signup, refreshToken, logout } from '../controllers/auth.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requirerefreshToken.js';
import { bodyLoginValidator, bodySignUpValidator } from '../middlewares/validatorManager.js';

//TODO: 登入驗證 接sequelize 重複email

const router = Router();

// * signup驗證(express validator)

router.post("/signup", bodySignUpValidator, signup);

// * login 驗證 (express validator)

router.post("/login", bodyLoginValidator, login);

router.get("/admin", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout)

export default router;

import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink} from "../controllers/link.controller.js";
import { requireToken } from '../middlewares/requireToken.js';
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

// * GET         /api/v1/links           get all links

// * GET         /api/v1/links/:id       get single link

// * POST        /api/v1/links           create link

// * PATCH/PUT   /api/v1/links/:id       update link

// * DELETE      /api/v1/links/:id       remove link

router.get('/', requireToken, getLinks);
// router.get('/:Id', requireToken, getLinkCRUD);
router.get('/:nanoLink', getLink);
router.post('/', requireToken, bodyLinkValidator, createLink);
router.delete('/:Id', requireToken, paramLinkValidator, removeLink);

router.patch(':/Id', requireToken, paramLinkValidator, bodyLinkValidator, updateLink)
// ! TODO: patch無法使用


export default router;
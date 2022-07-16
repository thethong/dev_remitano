import express from "express";
import ShareController from "../controllers/share.controller.js";
import isAuth from "../middlewares/auth.js";

// Init express router
const router = express.Router();

const shareController = new ShareController();

router.post('/share-movie', isAuth, shareController.shareMovie);
router.get('/list-all-shared-movie', shareController.getListAllSharedMovie);

 // export router
export default router;
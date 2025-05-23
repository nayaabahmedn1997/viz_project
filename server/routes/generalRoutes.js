import express from 'express';
import { getUser, getDashboard } from '../controllers/generalController.js';
const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboard)
export default router;
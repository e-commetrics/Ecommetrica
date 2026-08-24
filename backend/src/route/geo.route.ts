import { Router } from "express";
import { getGeo } from "../controller/geo.controller";

const router = Router();

router.get("/", getGeo);

export default router;

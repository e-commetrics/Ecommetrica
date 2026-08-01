import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { submitContact } from "../controller/contact.controller";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

router.post("/", contactLimiter, submitContact);

export default router;

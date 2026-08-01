import express from "express";
import cors from "cors";
import contactRoute from "./route/contact.route";

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/contact", contactRoute);

export default app;

import express from "express";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "Router working" });
});

export default router;

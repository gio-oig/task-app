import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { tasksRouter } from "./controllers/tasks.controller.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());

app.use(express.json());

app.use("/tasks", tasksRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Task API running on http://localhost:${PORT}`);
});

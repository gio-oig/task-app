import { Router, Request, Response, NextFunction } from "express";
import { taskService } from "../services/task.service.js";
import { CreateTaskRequest, ListQuery } from "../types/index.js";
import { ValidationError } from "../utils/ValidationError.js";

export const tasksRouter = Router();

tasksRouter.post("/", (req: Request<{}, {}, CreateTaskRequest>, res: Response, next: NextFunction): void => {
  try {
    const task = taskService.create(req.body.title);
    res.status(201).json(task);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ error: err.message });
      return;
    }
    next(err);
  }
});

tasksRouter.get("/", (req: Request<{}, {}, {}, ListQuery>, res: Response): void => {
  res.json(taskService.list(req.query));
});

tasksRouter.patch("/:id/complete", (req: Request, res: Response): void => {
  const task = taskService.complete(req.params.id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
});
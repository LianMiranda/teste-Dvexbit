import {Router} from "express";
import { TaskController } from "../controllers/task/task.controller";

const router = Router();

router.get("/", (_, res) => {res.send("API RODANDO!")});

router.post("/task", TaskController.create);


router.get("/tasks", TaskController.findAll)
router.get("/task/:id", TaskController.findById)
router.put("/task/:id")
router.delete("/task/:id", TaskController.delete)



export {router}
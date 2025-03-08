import {Router} from "express";
import { TaskController } from "../controllers/task/task.controller";

const router = Router();

router.get("/", (_, res) => {res.send("API RODANDO!")});

router.post("/task", TaskController.create);


router.get("/tasks")
router.get("/task/:id")
router.put("/task/:id")
router.delete("/task/:id")



export {router}
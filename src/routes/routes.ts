import {Router} from "express";
import { TaskController } from "../controllers/task/task.controller";
import { UserController } from "../controllers/user/user.controller";
import { AuthController } from "../controllers/auth/auth.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/task", TaskController.create);
router.get("/tasks", TaskController.findAll);
router.get("/task/:id", TaskController.findById);
router.put("/task/:id", TaskController.update);
router.delete("/task/:id", TaskController.delete);

router.post("/user", UserController.create);
router.get("/users",auth, UserController.findAll);
router.get("/user/:id", UserController.findById);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

router.post("/auth", AuthController.login);



export {router}
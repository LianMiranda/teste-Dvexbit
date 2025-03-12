import {Router} from "express";
import { TaskController } from "../controllers/task/task.controller";
import { UserController } from "../controllers/user/user.controller";
import { AuthController } from "../controllers/auth/auth.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/task", auth, TaskController.create);
router.get("/tasks", auth,TaskController.findAll);
router.get("/task/:id",auth,TaskController.findById);
router.put("/task/:id", auth,TaskController.update);
router.delete("/task/:id", auth,TaskController.delete);

router.post("/user", UserController.create);
router.get("/users",auth, UserController.findAll);
router.get("/user/:id", auth,UserController.findById);
router.put("/user/:id", auth,UserController.update);
router.delete("/user/:id", auth,UserController.delete);

router.post("/auth", AuthController.login);



export {router}
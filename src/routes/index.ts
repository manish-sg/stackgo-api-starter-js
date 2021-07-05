import { Router } from "express";
import {
  getAllUsers,
  addOneUser,
  updateOneUser,
  deleteOneUser,
  getAUser,
} from "./Users";

import { getInstallLink, hubspotProxy } from "./StackGo";

// User-route
const userRouter = Router();
userRouter.get("/all", getAllUsers);
userRouter.post("/add", addOneUser);
userRouter.put("/update", updateOneUser);
userRouter.delete("/delete/:id", deleteOneUser);
userRouter.get("/get/:email", getAUser);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/users", userRouter);

// StackGo routes
const sgRouter = Router();

sgRouter.get("/install", getInstallLink);
sgRouter.post("/hubspot/proxy", hubspotProxy);

// Export SG call
baseRouter.use("/sg", sgRouter);

export default baseRouter;

import express from "express";
const router = express.Router();
import * as warehousesController from "../controllers/warehouse-controller.js";

router
  .route("/")
  .get(warehousesController.getAllWarehouses)
  .post(warehousesController.addWarehouse);

router
  .route("/:id")
  .get(warehousesController.getOneWarehouse)
  .put(warehousesController.updateWarehouse)
  .delete(warehousesController.removeWarehouse);

router.route("/:id/inventories").get(warehousesController.getInventories);

export default router;

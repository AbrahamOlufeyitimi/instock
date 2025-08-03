import express from "express";
const router = express.Router();
import * as inventoryController from "../controllers/inventory-controller.js";

router
  .route("/")
  .get(inventoryController.getAllInventories)
  .post(inventoryController.addInventory);
router
  .route("/:id")
  .get(inventoryController.getOneInventory)
  .put(inventoryController.updateInventory)
  .delete(inventoryController.removeInventory);

export default router;

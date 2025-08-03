import { inventorySchema } from "../utils/validation.js";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../models/inventory.js";
import { getById as getWarehouseById } from "../models/warehouses.js";
import { validateEmptyFields } from "../utils/validationRequest.js";

const sortAndSearch = (column, order, search) => {
  let inventories = getAll();
  if (column) {
    inventories = inventories.orderBy(column, order);
  }
  if (search) {
    inventories = inventories
      .where("item_name", "like", `%${search}%`)
      .orWhere("warehouse_name", "like", `%${search}%`)
      .orWhere("category", "like", `%${search}%`)
      .orWhere("description", "like", `%${search}%`);
  }
  return inventories;
};

const getAllInventories = async (req, res) => {
  try {
    let { sort_by, order_by = "asc", s } = req.query;
    if (sort_by === "warehouse_id") {
      sort_by = "warehouse_name";
    }
    const inventories = await sortAndSearch(sort_by, order_by, s);
    res.status(200).json(inventories);
  } catch (err) {
    res.status(400).send(`Error retrieving inventories: ${err}`);
  }
};

const addInventory = async (req, res) => {
  try {
    const { error } = inventorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { warehouse_id } = req.body;
    const warehouse = await getWarehouseById(warehouse_id);

    if (!warehouse) {
      return res.status(400).json({
        message: `Error adding inventory. There is no warehouse with ID ${warehouse_id}`,
      });
    }

    const [newInventoryId] = await create(req.body);

    const newInventory = await getById(newInventoryId);
    res.status(200).json(newInventory);
  } catch (error) {
    res.status(400).send(`Error adding inventory: ${error}`);
  }
};

const getOneInventory = async (req, res) => {
  const id = req.params.id;
  try {
    const inventoryItem = await getById(id);

    if (!inventoryItem) {
      return res
        .status(404)
        .json({ message: `Inventory item with ID ${id} not found` });
    }

    return res.status(200).json(inventoryItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the inventory item" });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    const isValid = validateEmptyFields(
      {
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity,
      },
      res
    );

    if (!isValid) return;

    if (typeof req.body.quantity !== "number") {
      return res.status(404).json({
        message: `The quantity is not a number`,
      });
    }

    const warehouse = await getWarehouseById(warehouse_id);

    if (!warehouse) {
      return res.status(404).json({
        message: `The warehouse_id value does not exist in the warehouses table`,
      });
    }

    const rowsUpdated = await update(req.params.id, {
      warehouse_id: warehouse_id,
      item_name: item_name,
      description: description,
      category: category,
      status: status,
      quantity: quantity,
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }

    const updatedInventory = await getById(req.params.id);

    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory with ID ${req.params.id}: ${error}`,
    });
  }
};

const removeInventory = async (req, res) => {
  const id = req.params.id;
  try {
    const inventoryItem = await getById(id);

    if (!inventoryItem) {
      return res
        .status(404)
        .json({ message: `Inventory item with ID ${id} not found` });
    }
    await remove(id);

    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error deleting inventory with ID ${id}: ${error}` });
  }
};

export {
  getAllInventories,
  addInventory,
  getOneInventory,
  updateInventory,
  removeInventory,
};

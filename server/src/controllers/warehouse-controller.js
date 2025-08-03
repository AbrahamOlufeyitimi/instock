import { warehouseSchema } from "../utils/validation.js";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  knex,
} from "../models/warehouses.js";
import { validateEmptyFields } from "../utils/validationRequest.js";
import { getByWarehouseId, removeByWarehouseId } from "../models/inventory.js";

const sortAndSearch = (column, order, search) => {
  let warehouses = getAll();
  if (column) {
    const columns = column.split(",").map((col) => col.trim());
    if (columns.length > 0) {
      columns.forEach((col, index) => {
        const sortOrder = index === 0 ? order : "asc";
        warehouses = warehouses.orderBy(col, sortOrder);
      });
    }
  }

  if (search) {
    warehouses
      .where("warehouse_name", "like", `%${search}%`)
      .orWhere("address", "like", `%${search}%`)
      .orWhere("city", "like", `%${search}%`)
      .orWhere("country", "like", `%${search}%`)
      .orWhere("contact_phone", "like", `%${search}%`)
      .orWhere("contact_email", "like", `%${search}%`);
  }
  return warehouses;
};

const getAllWarehouses = async (req, res) => {
  try {
    const { sort_by, order_by = "asc", s } = req.query;
    const warehouses = await sortAndSearch(sort_by, order_by, s);
    res.status(200).json(warehouses);
  } catch (err) {
    res.status(400).send(`Error retrieving warehouses: ${err}`);
  }
};

const addWarehouse = async (req, res) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  const isValid = validateEmptyFields(
    {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    },
    res
  );

  if (!isValid) return;

  const emailRegex = /^[a-zA-Z]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex =
    /^(?:\+?\d{1,3}[.\s-]?)?(?:\(?\d{1,4}\)?[.\s-]?)?(?:\d{1,4}[.\s-]?)?\d{1,4}[.\s-]?\d{1,9}$/;
  if (!emailRegex.test(contact_email) || !phoneRegex.test(contact_phone)) {
    return res.status(400).json({
      message: "You provided an invalid email address or phone number",
    });
  }

  try {
    const newWarehouse = await create(req.body);
    const newWarehouseId = newWarehouse[0];
    const createdWarehouse = await getById(newWarehouseId);
    const { created_at, updated_at, ...partialData } = createdWarehouse;
    res.status(201).json(partialData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new warehouse: ${error}`,
    });
  }
};

const getOneWarehouse = async (req, res) => {
  const warehouse = await getById(req.params.id);

  if (!warehouse) {
    res
      .status(404)
      .json({ message: `Warehouse with ID ${req.params.id} not found` });
  } else {
    res.status(200).json(warehouse);
  }
};

const getInventories = async (req, res) => {
  try {
    const data = await getByWarehouseId({ warehouse_id: req.params.id });

    if (data.length === 0) {
      return res.status(404).send("Warehouse ID is not found");
    }

    const partialData = data.map(
      ({ id, item_name, category, status, quantity }) => ({
        id,
        item_name,
        category,
        status,
        quantity,
      })
    );
    res.status(200).json(partialData);
  } catch (err) {
    res.status(500).send("Unable to retrieve inventories");
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const { error } = warehouseSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const success = await update(req.params.id, req.body);

    if (success) {
      const updatedWarehouse = await getById(req.params.id);
      const { created_at, updated_at, ...filteredUpdatedWarehouse } =
        updatedWarehouse;
      res.status(200).json(filteredUpdatedWarehouse);
    } else {
      res.status(404).json({ message: `Warehouse ${req.params.id} not found` });
    }
  } catch (err) {
    res.status(400).send(`Error updating warehouse #${req.params.id}: ${err}`);
  }
};

const removeWarehouse = async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const warehouse = await getById(warehouseId);

    if (!warehouse) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${warehouseId} not found` });
    }

    await knex.transaction(async (trx) => {
      await removeByWarehouseId(warehouseId, trx);
      await remove(warehouseId, trx);
    });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Unable to delete warehouse" });
  }
};

export {
  getAllWarehouses,
  getInventories,
  addWarehouse,
  getOneWarehouse,
  updateWarehouse,
  removeWarehouse,
};

import initKnex from "knex";
import configuration from "../../knexfile.js";
const knex = initKnex(configuration);

const getAll = () => {
  return knex
    .select("inventories.*", "warehouses.warehouse_name")
    .from("inventories")
    .leftJoin("warehouses", "inventories.warehouse_id", "warehouses.id");
};

const getById = (id) => {
  return knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .select(
      "inventories.id",
      "warehouses.warehouse_name",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity"
    )
    .where("inventories.id", id)
    .first();
};

const getByWarehouseId = (id) => {
  return knex("inventories").where(id);
};

const create = (inventory) => {
  return knex("inventories").insert(inventory);
};

const update = (id, inventory) => {
  return knex("inventories").where({ id }).update(inventory);
};

const removeByWarehouseId = (id, trx) => {
  const query = knex("inventories").where({ warehouse_id: id }).del();
  return trx ? query.transacting(trx) : query;
};

const remove = (id, trx) => {
  return knex('inventories').where({ id }).del();
};

export {
  getAll,
  getById,
  getByWarehouseId,
  create,
  update,
  remove,
  removeByWarehouseId,
};

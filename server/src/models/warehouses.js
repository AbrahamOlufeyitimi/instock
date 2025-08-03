import initKnex from "knex";
import configuration from "../../knexfile.js";
const knex = initKnex(configuration);

const getAll = () => {
  return knex("warehouses").select("*");
};

const getById = (id) => {
  return knex("warehouses").where({ id }).first();
};

const create = (warehouse) => {
  return knex("warehouses").insert(warehouse);
};

const update = (id, warehouse) => {
  return knex("warehouses").where({ id }).update(warehouse);
};

const remove = (id, trx) => {
  const query = knex("warehouses").where({ id }).del();
  return trx ? query.transacting(trx) : query;
};

export { getAll, getById, create, update, remove, knex };

import Joi from "joi";

const warehouseSchema = Joi.object({
  warehouse_name: Joi.string().min(1).max(255).required(),
  address: Joi.string().min(1).max(255).required(),
  city: Joi.string().min(1).max(255).required(),
  country: Joi.string().min(1).max(255).required(),
  contact_name: Joi.string().min(1).max(255).required(),
  contact_position: Joi.string().min(1).max(255).required(),
  contact_phone: Joi.string()
    .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    .required(),
  contact_email: Joi.string().email().required(),
});

const inventorySchema = Joi.object({
  warehouse_id: Joi.number().integer().positive().required().messages({
    "warehouse_id.base": "Warehouse ID must be a number",
    "warehouse_id.integer": "Warehouse ID must be an integer",
    "warehouse_id.positive": "Warehouse ID must be a positive number",
    "warehouse_id.required": "Warehouse ID is required",
  }),
  item_name: Joi.string().min(1).max(255).required().messages({
    "item_name.base": "Item name must be a string",
    "item_name.min": "Item name must be at least 1 character long",
    "item_name.max": "Item name must be less than or equal to 255 characters",
    "item_name.required": "Item name is required",
  }),
  description: Joi.string().min(1).max(255).required().messages({
    "description.base": "Description must be a string",
    "description.min": "Description must be at least 1 character long",
    "description.max": "Description must be less than or equal to 255 characters",
    "description.required": "Description is required",
  }),
  category: Joi.string().min(1).max(255).required()
    .messages({
      "category.base": "Category must be a string",
      "category.min": "Category must be at least 1 character long",
      "category.max": "Category must be less than or equal to 255 characters",
      "category.required": "Category is required",
    }),
  status: Joi.string()
    .valid("In Stock", "Out of Stock", "Discontinued")
    .required()
    .messages({
      "status.base": "Status must be a string",
      "status.valid":
        "Status must be one of the following values: In Stock, Out of Stock, Discontinued",
      "status.required": "Status is required",
    }),
  quantity: Joi.number().integer().min(0).required().messages({
    "quantity.base": "Quantity must be a number",
    "quantity.integer": "Quantity must be an integer",
    "quantity.min": "Quantity must be at least 0",
    "quantity.required": "Quantity is required",
  }),
});

export { warehouseSchema, inventorySchema };

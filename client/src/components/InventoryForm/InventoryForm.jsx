import { useEffect, useState } from "react";
import InventoryFormSection from "../InventoryFormSection/InventoryFormSection";
import Button from "../Button/Button";
import "./InventoryForm.scss";
import { InStockApi } from "../../scripts/instock-api";
import { useNavigate } from "react-router-dom";

const InventoryForm = ({ initialValues = {}, onSubmit, mode }) => {
  const [formValues, setFormValues] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "Out of Stock",
    quantity: 1,
    warehouse_name: "",
    ...initialValues,
  });
  const [categories, setCategories] = useState([]);
  const [warehouseNames, setWarehouseNames] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();
  const api = new InStockApi(navigate);

  const getInventories = async () => {
    const inventoryList = await api.getAllInventories();
    setCategories([...new Set(inventoryList.map((item) => item.category))]);
  };

  const getWarehouses = async () => {
    const warehouseList = await api.getWarehouses();
    setWarehouses([...new Set(warehouseList.map((item) => item))]);
    setWarehouseNames([
      ...new Set(warehouseList.map((item) => item.warehouse_name)),
    ]);
  };

  useEffect(() => {
    getInventories();
    getWarehouses();
  }, []);

  const [errors, setErrors] = useState({});

  const itemFields = [
    { name: "item_name", label: "Item Name", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories,
    },
  ];

  const availabilityFields = [
    {
      name: "status",
      label: "Status",
      type: "radio",
      options: [
        { value: "In Stock", label: "In Stock" },
        { value: "Out of Stock", label: "Out of Stock" },
      ],
    },
    ...(formValues.status === "In Stock"
      ? [{ name: "quantity", label: "Quantity", type: "number" }]
      : []),
    {
      name: "warehouse_name",
      label: "Warehouse",
      type: "select",
      options: warehouseNames,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      if (name === "status" && value === "Out of Stock") {
        return {
          ...prevValues,
          [name]: value,
          quantity: 0,
        };
      }
      return {
        ...prevValues,
        [name]: value,
      };
    });
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    [...itemFields, ...availabilityFields].forEach(({ name }) => {
      const value = formValues[name];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[name] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(initialValues).length === 0) return;

    const hasChanges = Object.keys(initialValues).some(
      (key) => formValues[key] !== initialValues[key]
    );

    if (hasChanges) {
      setFormValues((prevValues) => ({ ...prevValues, ...initialValues }));
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedWarehouse = warehouses.find(
        (warehouse) => warehouse.warehouse_name === formValues.warehouse_name
      );
      const warehouse_id = selectedWarehouse ? selectedWarehouse.id : null;
      if (!warehouse_id) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          warehouse_name: "Invalid warehouse selected",
        }));
        return;
      }

      onSubmit({
        warehouse_id: warehouse_id,
        item_name: formValues.item_name,
        description: formValues.description,
        category: formValues.category,
        status: formValues.status,
        quantity: parseInt(formValues.quantity),
      });
    }
  };

  return (
    <form className="inventory-form">
      <div className="inventory-form__sections">
        <InventoryFormSection
          title="Item Details"
          fields={itemFields}
          values={formValues}
          onChange={handleChange}
          errors={errors}
        />
        <InventoryFormSection
          title="Item Availability"
          fields={availabilityFields}
          values={formValues}
          onChange={handleChange}
          errors={errors}
        />
      </div>
      <div className="inventory-form__buttons">
        <div className="inventory-form__button inventory-form__button--cancel">
          <Button text="Cancel" path="/inventory" />
        </div>
        <div
          className="inventory-form__button inventory-form__button--submit"
          onClick={handleSubmit}
        >
          <Button text={mode === "edit" ? "Save" : "+ Add Item"} />
        </div>
      </div>
    </form>
  );
};

export default InventoryForm;

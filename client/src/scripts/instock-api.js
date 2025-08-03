import axios from "axios";
import { warehouse_api_url, inventory_api_url } from "../utils/config";

export class InStockApi {
  constructor(navigate) {
    this.WAREHOUSE_URL = warehouse_api_url;
    this.INVENTORY_URL = inventory_api_url;
    if (navigate) this.navigate = navigate;
  }

  //  warehouses
  async getWarehouses(sort_by, order_by, s) {
    const request = `${this.WAREHOUSE_URL}`;
    try {
      const response = await axios.get(request, {
        params: {
          sort_by: sort_by,
          order_by: order_by,
          s: s,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching warehouses: ", error);
    }
  }

  async getWarehouse(id) {
    const request = `${this.WAREHOUSE_URL}/${id}`;
    try {
      const response = await axios.get(request);
      return response.data;
    } catch (error) {
      console.error(`Error fetching warehouse ${id}: ${error}`);
      this.navigate("/");
    }
  }

  async updateWarehouse(id, updatedWarehouse) {
    const request = `${this.WAREHOUSE_URL}/${id}`;
    try {
      const response = await axios.put(request, updatedWarehouse);
      return response.data;
    } catch (error) {
      console.error(`Error updating warehouse ${id}: ${error}`);
      this.navigate(`/warehouses/${id}`);
    }
  }

  async postWarehouse(newWarehouse) {
    try {
      const response = await axios.post(this.WAREHOUSE_URL, newWarehouse);
      return response.data;
    } catch (error) {
      console.error(`Error adding a warehouse: ${error}`);
    }
  }

  async deleteWarehouse(id) {
    const request = `${this.WAREHOUSE_URL}/${id}`;
    try {
      await axios.delete(request);
    } catch (error) {
      console.error(`Error deleting a warehouse: ${error}`);
    }
  }

  //  inventories
  async getAllInventories(sort_by, order_by, s) {
    const request = `${this.INVENTORY_URL}`;
    try {
      const response = await axios.get(request, {
        params: {
          sort_by: sort_by,
          order_by: order_by,
          s: s,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching inventories:", error);
      this.navigate("/");
    }
  }

  async getAllInventoriesByWarehouseId(id) {
    const request = `${this.WAREHOUSE_URL}/${id}/inventories`;
    try {
      const response = await axios.get(request);
      return response.data;
    } catch (error) {
      console.error(`Error fetching inventories for warehouse ${id}: ${error}`);
    }
  }

  async getInventoryItem(id) {
    const request = `${this.INVENTORY_URL}/${id}`;
    try {
      const response = await axios.get(request);
      return response.data;
    } catch (error) {
      console.error(`Error fetching inventory item ${id}: ${error}`);
    }
  }

  async updateInventory(id, updatedInventory) {
    const request = `${this.INVENTORY_URL}/${id}`;
    try {
      const response = await axios.put(request, updatedInventory);
      return response.data;
    } catch (error) {
      console.error(`Error updating inventory ${id}: ${error}`);
      this.navigate(`/inventory/${id}`);
    }
  }

  async postInventory(newInventory) {
    try {
      const response = await axios.post(this.INVENTORY_URL, newInventory);
      return response.data;
    } catch (error) {
      console.error(`Error adding an inventory: ${error}`);
    }
  }

  async deleteInventoryItem(id) {
    const request = `${this.INVENTORY_URL}/${id}`;
    try {
      await axios.delete(request);
    } catch (error) {
      console.error(`Error deleting an inventory item: ${error}`);
    }
  }
}

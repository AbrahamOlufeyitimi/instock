import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import warehouseRoutes from "./src/routes/warehouses.js";
import inventoryRoutes from "./src/routes/inventory.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://instockweb.netlify.app/"
  ]
}));
app.use(express.json());

app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventories", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

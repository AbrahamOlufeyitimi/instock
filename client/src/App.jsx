import { BrowserRouter, Route, Routes } from "react-router-dom";
import Warehouses from "./pages/Warehouses/Warehouses";
import WarehouseItem from "./pages/WarehouseItem/WarehouseItem";
import WarehouseAdd from "./pages/WarehouseAdd/WarehouseAdd";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";
import Inventory from "./pages/Inventory/Inventory";
import InventoryItem from "./pages/InventoryItem/InventoryItem";
import InventoryEdit from "./pages/InventoryEdit/InventoryEdit";
import InventoryAdd from "./pages/InventoryAdd/InventoryAdd";
import Layout from "./components/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Warehouses />} />
          <Route path="/warehouses/:id" element={<WarehouseItem />} />
          <Route path="/warehouses/:id/edit" element={<WarehouseEdit />} />
          <Route path="/warehouses/add" element={<WarehouseAdd />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<InventoryItem />} />
          <Route path="/inventory/:id/edit" element={<InventoryEdit />} />
          <Route path="/inventory/add" element={<InventoryAdd />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

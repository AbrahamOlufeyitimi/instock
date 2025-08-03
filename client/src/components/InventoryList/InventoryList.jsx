import ColumnsInventory from "../ColumnsInventory/ColumnsInventory";
import NoRecords from "../NoRecords/NoRecords";
import RowInventory from "../RowInventory/RowInventory";

const InventoryList = ({
  inventories,
  isWarehouse,
  setInventories,
  onSort,
}) => {
  return (
    <div className="body-medium">
      <ColumnsInventory isWarehouse={isWarehouse} onSort={onSort} />
      {inventories?.length > 0 && inventories !== undefined ? (
        <>
          {inventories.map((inventory) => (
            <RowInventory
              key={inventory.id}
              id={inventory.id}
              inventoryItem={inventory.item_name}
              category={inventory.category}
              status={inventory.status}
              quantity={inventory.quantity}
              warehouse={inventory.warehouse_name}
              setInventories={setInventories}
            />
          ))}
        </>
      ) : (
        <NoRecords text="inventories" />
      )}
    </div>
  );
};

export default InventoryList;

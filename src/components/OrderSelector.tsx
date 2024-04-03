import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface OrderSelectorProps {
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
}

const OrderSelector: React.FC<OrderSelectorProps> = ({ order, setOrder }) => {
  const handleChange = (event: SelectChangeEvent<"asc" | "desc">) => {
    setOrder(event.target.value as "asc" | "desc");
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="order-selector-label">Order</InputLabel>
      <Select
        labelId="order-selector-label"
        id="order-selector"
        value={order}
        onChange={handleChange}
        label="Order"
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default OrderSelector;

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SortSelectorProps {
  onSortChange: (value: string) => void;
}

const SortSelector = ({ onSortChange }: SortSelectorProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onSortChange(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel>Sort By</InputLabel>
      <Select defaultValue="popular" label="Sort By" onChange={handleChange}>
        <MenuItem value="popular">Posts Count</MenuItem>
        <MenuItem value="name">Tag Name</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;

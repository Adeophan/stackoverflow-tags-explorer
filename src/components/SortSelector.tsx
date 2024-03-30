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
    <FormControl fullWidth>
      <InputLabel>Sort By</InputLabel>
      <Select defaultValue="popular" label="Sort By" onChange={handleChange}>
        <MenuItem value="popular">Popularity</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="activity">Activity</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;

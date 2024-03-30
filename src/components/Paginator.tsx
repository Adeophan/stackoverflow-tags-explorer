import { Button, Stack } from "@mui/material";

interface PaginatorProps {
  onPageChange: (direction: string) => void;
}

const Paginator = ({ onPageChange }: PaginatorProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={() => onPageChange("prev")}>Previous</Button>
      <Button onClick={() => onPageChange("next")}>Next</Button>
    </Stack>
  );
};

export default Paginator;

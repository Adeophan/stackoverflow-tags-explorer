import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginatorProps {
  count: number; // Total number of pages
  page: number; // Current page
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Paginator = ({ count, page, onPageChange }: PaginatorProps) => {
  return (
    <Stack spacing={2} justifyContent="center" padding={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
};

export default Paginator;

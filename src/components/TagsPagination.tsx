import React from "react";
import { TablePagination } from "@mui/material";

interface TagsPaginationProps {
  count: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const TagsPagination: React.FC<TagsPaginationProps> = ({
  count,
  page,
  pageSize,
  onPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page - 1}
      onPageChange={(_, newPage) => onPageChange(newPage + 1)}
      rowsPerPage={pageSize}
      onRowsPerPageChange={() => {}}
      rowsPerPageOptions={[]}
    />
  );
};

export default TagsPagination;

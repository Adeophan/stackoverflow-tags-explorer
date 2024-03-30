import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useStackOverflowTags } from "../hooks/useStackOverflowTags";
import Paginator from "./Paginator";
import SortSelector from "./SortSelector";
import { useState } from "react";

interface Tag {
  name: string;
  count: number;
}

const TagsTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("popular");

  const { data, isLoading, error } = useStackOverflowTags(
    page,
    pageSize,
    order,
    sort,
  );

  const handlePageChange = (direction: string) => {
    setPage((prevPage) => prevPage + (direction === "next" ? 1 : -1));
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">An error occurred while fetching tags.</Alert>
      ) : (
        <>
          <FormControl>
            <InputLabel>Page Size</InputLabel>
            <Select
              value={pageSize}
              onChange={
                handlePageSizeChange as (
                  event: SelectChangeEvent<number>,
                ) => void
              }
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={toggleOrder}>Toggle Order</Button>
          <SortSelector onSortChange={handleSortChange} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tag</TableCell>
                <TableCell align="right">Posts Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((tag: Tag) => (
                <TableRow key={tag.name}>
                  <TableCell component="th" scope="row">
                    {tag.name}
                  </TableCell>
                  <TableCell align="right">{tag.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Paginator onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};
export default TagsTable;

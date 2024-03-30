import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormGroup,
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

  const totalItems = data?.total;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">An error occurred while fetching tags.</Alert>
      ) : (
        <>
          <FormGroup row sx={{ ml: 2, gap: 1 }}>
            <SortSelector onSortChange={handleSortChange} />
            <FormControl>
              <InputLabel>Order</InputLabel>
              <Select
                autoWidth
                value={order}
                onChange={(event) =>
                  setOrder(event.target.value as "asc" | "desc")
                }
                label="Order"
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
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
          </FormGroup>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tag</TableCell>
                <TableCell align="right">Posts Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.items.map((tag: Tag) => (
                <TableRow key={tag.name}>
                  <TableCell component="th" scope="row">
                    {tag.name}
                  </TableCell>
                  <TableCell align="right">{tag.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Paginator
            count={totalPages}
            page={page}
            onPageChange={(event, value) => {
              setPage(value); // Assuming setPage updates your component's state for the current page
            }}
          />
        </>
      )}
    </div>
  );
};
export default TagsTable;

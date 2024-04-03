import { useState } from "react";
import {
  CircularProgress,
  Alert,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useStackOverflowTags } from "../hooks/useStackOverflowTags";
import PageSizeSelector from "./PageSizeSelector";
import TagsPagination from "./TagsPagination";
import SortSelector from "./SortSelector";
import OrderSelector from "./OrderSelector";

interface Tag {
  name: string;
  count: number;
}

const TagsTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("popular");

  const { data, isLoading, error } = useStackOverflowTags(
    page,
    pageSize,
    order,
    sort,
  );

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };
  const handleSortChange = (value: string) => {
    if (value === "popular") {
      setOrder("desc");
      setPage(1);
    } else {
      setOrder("asc");
      setPage(1);
    }
    setSort(value);
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">An error occurred while fetching tags.</Alert>
    );

  return (
    <Box>
      <Box sx={{ ml: 2, display: "flex", gap: 1, marginBottom: 2 }}>
        <SortSelector onSortChange={handleSortChange} />
        <OrderSelector
          order={order as "asc" | "desc"}
          setOrder={(value: "asc" | "desc") => {
            setOrder(value);
            setPage(1);
          }}
        />
        <PageSizeSelector
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
        />
      </Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.0rem" }}>
              Tag
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", fontSize: "1.0rem" }}
            >
              Posts Count
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items.map((tag: Tag) => (
            <TableRow key={tag.name}>
              <TableCell>{tag.name}</TableCell>
              <TableCell align="right">{tag.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TagsPagination
        count={data?.total || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default TagsTable;

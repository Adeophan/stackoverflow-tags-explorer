import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormGroup,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { useStackOverflowTags } from "../hooks/useStackOverflowTags";
import SortSelector from "./SortSelector";
import { useState, KeyboardEvent } from "react";

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

  const [tempPageSize, setTempPageSize] = useState(pageSize.toString());
  const [inputError, setInputError] = useState(false);

  const handleTempPageSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    const numValue = Number(newValue);

    if (newValue === "" || isNaN(numValue)) {
      setInputError(true);
      setTempPageSize(newValue);
    } else {
      if (numValue > 100) {
        setTempPageSize("100");
      } else if (numValue < 1) {
        setInputError(true);
        setTempPageSize(newValue);
      } else {
        setInputError(false);
        setTempPageSize(newValue);
      }
    }
  };

  const updatePageSize = () => {
    const numValue = Number(tempPageSize);
    if (!inputError && numValue >= 1 && numValue <= 100) {
      setPageSize(numValue);
    } else {
      setPageSize(10);
      setTempPageSize("10");
      setInputError(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updatePageSize();
    }
  };

  const handleSortChange = (value: string) => {
    if (value === "popular") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
    setSort(value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage + 1);
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
            <FormControl variant="outlined">
              <TextField
                error={inputError}
                helperText={inputError ? "Enter a number (1-100)" : ""}
                InputLabelProps={{ shrink: true }}
                label="Rows per page"
                type="number"
                variant="outlined"
                value={tempPageSize}
                onChange={handleTempPageSizeChange}
                onKeyDown={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() =>
                          setTempPageSize(
                            String(Math.max(Number(tempPageSize) - 1, 1)),
                          )
                        }
                        edge="start"
                        size="small"
                        sx={{ mr: -3 }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setTempPageSize(
                            String(Math.min(Number(tempPageSize) + 1, 100)),
                          )
                        }
                        edge="end"
                        size="small"
                        sx={{ ml: -3 }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: {
                    min: 1,
                    max: 100,
                    style: { textAlign: "center" },
                  },
                }}
                sx={{
                  width: "auto",
                  minWidth: 110,
                  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />
            </FormControl>
            <Button variant="contained" onClick={updatePageSize}>
              Go
            </Button>
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  showFirstButton
                  showLastButton
                  colSpan={3}
                  count={totalItems}
                  rowsPerPage={pageSize}
                  page={page - 1}
                  rowsPerPageOptions={[]}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )}
    </div>
  );
};
export default TagsTable;

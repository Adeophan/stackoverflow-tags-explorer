import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface PageSizeSelectorProps {
  pageSize: number;
  setPageSize: (newPageSize: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  setPageSize,
}) => {
  const [tempPageSize, setTempPageSize] = useState(pageSize.toString());
  const [inputError, setInputError] = useState(false);

  const validatePageSize = (value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      setInputError(false);
      setPageSize(numValue);
      return true;
    } else {
      setPageSize(25);
      setTempPageSize("25");
      setInputError(false);
      return false;
    }
  };

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

  const handleGoClick = () => {
    if (validatePageSize(tempPageSize)) {
      setPageSize(Number(tempPageSize));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <FormControl variant="outlined">
        <TextField
          error={inputError}
          helperText={inputError ? "Enter a number (1-100)" : ""}
          label="Rows per page"
          variant="outlined"
          type="number"
          value={tempPageSize}
          onChange={handleTempPageSizeChange}
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
      <Button variant="contained" size="large" onClick={handleGoClick}>
        Go
      </Button>
    </Box>
  );
};

export default PageSizeSelector;

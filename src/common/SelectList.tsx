import React from "react";
import { Select, SelectProps } from "@mui/material";import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import "./SelectList.css";

export interface otherProps {
  helperText?: string | null;
  error?: boolean;
  allowempty?: boolean;
}

interface MainSelectProps extends otherProps, SelectProps {}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,

      width: "auto",
    },
  },
};

const SelectList: React.FC<MainSelectProps> = ({
  id,
  children,
  value,
  onChange,
  label,
  variant,
  required,
  error,
  helperText,
  allowempty = true,
  ...rest
}) => {
  const labelid = `${id}__label`;

  return (
    <div className="SelectList">
      <FormControl
        size="small"
        required={required}
        fullWidth={true}
        variant={variant}
        error={error}
      >
        <InputLabel id={labelid}>{label}</InputLabel>

        <Select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          fullWidth={true}
          label={label}
          labelId={labelid}
          variant={variant}
          displayEmpty={true}
          error={error}
          MenuProps={MenuProps}
          {...rest}
        >
          <MenuItem disabled={allowempty ? false : true} value="">
            {" "}
          </MenuItem>

          {children}
        </Select>

        {helperText ? (
          <Typography variant="subtitle1" color="error">
            {helperText}
          </Typography>
        ) : null}
      </FormControl>
    </div>
  );
};

export default SelectList;

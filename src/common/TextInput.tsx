import React from "react";

import { TextField, TextFieldProps, Typography } from "@mui/material";

import "./TextInput.css";

import { otherProps } from "./SelectList";

type MainTextProps = otherProps & TextFieldProps;

const TextInput: React.FC<MainTextProps> = ({
  error,

  helperText,

  ...props
}) => {
  return (
    <div className="TextInput">
      <TextField size="small" fullWidth={true} error={error} {...props} />

      {helperText ? (
        <Typography variant="subtitle1" color="error">
          {helperText}
        </Typography>
      ) : null}
    </div>
  );
};

export default TextInput;

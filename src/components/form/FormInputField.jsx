import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

export const FormInputField = ({
  name,
  control,
  type,
  placeholder,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({ name, control });
  return (
    <TextField
      fullWidth
      name={name}
      placeholder={placeholder}
      value={value}
      type={type}
      error={!!error}
      helperText={error?.message}
      onChange={(event) => {
        onChange(event);
        externalOnChange?.(event);
      }}
      onBlur={externalOnBlur}
      ref={ref}
    />
  );
};

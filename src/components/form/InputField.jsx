import React from "react";
import { useController } from "react-hook-form";

export const InputField = ({
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
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={(event) => {
        onChange(event);
        externalOnChange?.(event);
      }}
      onBlur={externalOnBlur}
      ref={ref}
    />
  );
};

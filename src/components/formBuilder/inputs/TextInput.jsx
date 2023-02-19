import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { InputError } from "./InputError";

export function Input({
  append,
  register,
  name,
  label,
  id,
  className,
  labelId,
  labelClassName,
  inputId,
  inputClassName = "input-text",
  value,
  type = "text",
  pattern,
  errors,
  rules,
  ...rest
}) {
  return (
    <div className={className} id={id} style={{position: 'relative'}}>
      {label && (
        <label className={labelClassName}>
          {label === undefined
            ? name.toUpperCase().split("_").join(" ")
            : label}
        </label>
      )}
      <input
        type={type}
        {...register(name, { ...rules })}
        {...rest}
        id={inputId}
        className={inputClassName}
        // pattern={pattern}
      />
      {append}
      <InputError error={errors[name]} className={"mt-1"} />
    </div>
  );
}

import React, { useCallback, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {
  getDateRangeSearchUrlParam,
  parseDateRangeSearchUrlParam,
} from "../../../utils/date-range";
import "./InputCustomStyles.css";
import { InputError } from "./InputError";

const DateRangeInput = ({
  register,
  options,
  className,
  id,
  option_name,
  name,
  label,
  labelClassName,
  labelId,
  inputClassName,
  inputId,
  errors,
  rules,
  init,
  onChange,
  lookupQuery,
  isMulti = false,
  multiSelectAll = false,
  isID,
  show = true,
  disabled = false,
  readOnly = false,
  setValue,
  control,
  isWatchSubscribed,
  dependencies,
  defaultValue,
  dependencyValues,
  placeholder,
  ...rest
}) => {
  return (
    <div className={className} id={id}>
      {label && (
        <label className={labelClassName}>
          {label === undefined
            ? name.toUpperCase().split("_").join(" ")
            : label}
        </label>
      )}
      <Controller
        control={control}
        // defaultValue={defaultValue}
        name={name}
        rules={rules}
        shouldUnregister
        // className='form-control'
        render={({ field: { onChange, value, ref } }) => (
         <>
          <DateRangePicker
            className={"form-control"}
            onChange={(val) => {
              setValue(name, val);
              onChange(getDateRangeSearchUrlParam(val));
            }}
            value={ value ? parseDateRangeSearchUrlParam(value) : null}
            placeHolder='something'
          />
         </>
        )}
      />
      <InputError error={errors[name]} className={"mt-1"} />
    </div>
  );
};

export default DateRangeInput;

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { InputError } from "./InputError";


export function Select({
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
  ...rest
}) {

  const [dropdownData, setDropdownData] = useState([]);

  const getOptionsData = useCallback(async () => {
    if (lookupQuery) {
      const data = await lookupQuery();
      setDropdownData(data);
    } else {
      setDropdownData(options);
    }
  }, [])

  useEffect(() => {
    getOptionsData()
  }, [])


  return (
    <div className={className} id={id}>
      {label && <label className={labelClassName}>
        {label === undefined
          ? name.toUpperCase().split("_").join(" ")
          : label}
      </label>}
      <select
        {...register(name, { ...rules })}
        id={inputId}
        className={inputClassName}
        onChange={onChange}
        {...rest}
      >
        {init && <option value="">{init}</option>}
        {dropdownData?.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <InputError error={errors[name]} className={"mt-1"} />
    </div>
  );
}
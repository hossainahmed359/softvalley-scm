import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { InputError } from "./InputError";

export function SelectInput({
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
}) {
  const [dropdownMeta, setDropdownMeta] = useState(
    options
      ? [
          ...(multiSelectAll
            ? [{ label: "Select All", value: "select_all" }]
            : []),
          ...options,
        ]
      : []
  );


  const performLookupQuery = useCallback(
    async (data) => {
      try {
        const res = await lookupQuery(data);
        setDropdownMeta(
          res?.length
            ? [
                ...(multiSelectAll
                  ? [{ label: "Select All", value: "select_all" }]
                  : []),
                ...res,
              ]
            : []
        );
        if (defaultValue)
          setValue(name, isID ? parseInt(defaultValue) : defaultValue);
      } catch (err) {
        setDropdownMeta([]);
        throw err;
      }
    },
    [defaultValue, isID, name, lookupQuery, multiSelectAll, setValue]
  );

  useEffect(() => {
    if (!lookupQuery || dependencies) return;
    performLookupQuery();
  }, [performLookupQuery]);


  const handleSelect = useCallback(
    (value) => {
      setValue(name, value);
    },
    [name, setValue]
  );

  useEffect(() => {
    if (isWatchSubscribed) handleSelect(defaultValue);
  }, [defaultValue, handleSelect, isWatchSubscribed]);

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
          defaultValue={defaultValue}
        
          name={name}
          rules={rules}
          shouldUnregister
          render={({ field: { onChange, value, ref } }) => (
            <Select
              isDisabled={disabled}
              readOnly={readOnly}
              inputRef={ref}
              placeholder={placeholder}
              classNamePrefix="addl-class form-select"
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 10000 }) }}
              options={
                Array.isArray(value) && value?.includes("select_all")
                  ? [{ label: "Select All", value: "select_all" }]
                  : dropdownMeta
              }
              value={dropdownMeta?.filter((option) =>
                Array.isArray(value)
                  ? value?.includes(option.value)
                  : option.value === value
              )}
              onChange={(val) => {
                !isMulti
                  ? onChange(val?.value)
                  : val.length
                  ? val.find((option) => option.value === "select_all")
                    ? onChange(["select_all"])
                    : onChange(val.map((v) => v.value))
                  : onChange([]);
              }}
              isClearable
              isMulti={isMulti}
            />
          )}
        />
         <InputError error={errors[name]} className={"mt-1"} />
      </div>
  );
}

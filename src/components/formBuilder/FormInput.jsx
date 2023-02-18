import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";

export function Form({
  className,
  defaultValues,
  children,
  onSubmit,
  watchFields = [],
  onChange,
}) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
    control,
    getValues,
    resetField,
    setValue,
  } = useForm({ defaultValues: defaultValues || {} });

  const subscribedWatchFields = watch(watchFields);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={className}
      onChange={onChange}
    >
      {children(
        register,
        errors,
        { control, getValues, resetField, watch, setValue, defaultValues },
        subscribedWatchFields
      )}
    </form>
  );
}



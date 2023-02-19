import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { eventBus } from '../../services/eventBus';

export function Form({
  className,
  defaultValues,
  children,
  onSubmit,
  watchFields = [],
  onChange,
  resetEvent = "reset_form",
}) {
  const formInstance = useForm({ defaultValues: defaultValues || {} });

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
  } = formInstance;

  const subscribedWatchFields = watch(watchFields);

  useEffect(() => {
    eventBus.subscribe(resetEvent, () => formInstance?.reset());

    return () => {
      eventBus.unsubscribe(resetEvent);
    };
  }, [formInstance, resetEvent]);

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



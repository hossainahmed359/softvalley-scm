import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";

export const InputError = ({ error, text, className }) => {
  if (!error) return null;
  return error.type === "required" ? (
    <div className={className}>
      <span role="alert" className="font-size-xs" style={{ color: "red", fontSize: '12px' }}>
        This is required*
      </span>
    </div>
  ) : error.type === "maxLength" ? (
    <div className={className}>
      <span role="alert" className="font-size-xs" style={{ color: "red", fontSize: '12px' }}>
        Max length exceeded
      </span>
    </div>
  ) : (
    <div className={className}>
      <span role="alert" className="font-size-xs"  style={{ color: "red", fontSize: '12px' }}>
        {error.message || "error*"}
      </span>
    </div>
  );
};
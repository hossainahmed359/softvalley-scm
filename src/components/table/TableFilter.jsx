import React from "react";
import {
  getPaginationParams,
  refactorSearchedInputData,
} from "../../utils/urls";
import { eventBus } from "../../services/eventBus";

const TableFilter = ({
  filtersMeta,
  queryService,
  params,
  setParams,
  setCurrentPage,
  pageSize,
}) => {
  const handlerFilterSubmit = (data) => {
    setCurrentPage(1);
    // Object.keys(data).forEach((key) => !data[key] && delete data[key]);
    const newData = refactorSearchedInputData(data);

    const newParams = { page: 1, limit: pageSize, ...newData };
    setParams(newParams);
  };

  const handlerFilterReset = () => {
    eventBus.publish("reset_filter_form");
    setParams({});
  };

  return <>{filtersMeta(handlerFilterSubmit, handlerFilterReset)}</>;
};

export default TableFilter;

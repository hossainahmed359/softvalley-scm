import React from "react";
import { getPaginationParams } from "../../utils/urls";
import { eventBus } from "../../services/eventBus";

const TableFilter = ({
  filtersMeta,
  queryService,
  params,
  setParams,
  setCurrentPage,
}) => {
  const handlerFilterSubmit = (data) => {
    setCurrentPage(1);
    Object.keys(data).forEach((key) => !data[key] && delete data[key]);
    // const newParams = { ...getPaginationParams(params), ...data };
    const newParams = { ...data };
    setParams(newParams);
    queryService();
  };

  const handlerFilterReset = () => {
    eventBus.publish("reset_filter_form");
    setParams({});
  };

  return <>{filtersMeta(handlerFilterSubmit, handlerFilterReset)}</>;
};

export default TableFilter;

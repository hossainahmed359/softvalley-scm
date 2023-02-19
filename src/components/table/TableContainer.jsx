import React, { useCallback, useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { getUrlSearchParams } from "../../utils/urls";
import { eventBus } from "../../services/eventBus";
import TableFilter from './TableFilter';

export const DEFAULT_PAGE_SIZE = 10;

const TableContainer = ({
  filtersMeta,
  queryService,
  columns,
  actions = null,
  refreshEvent = "refresh_table",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageData, setPageData] = useState({ rowData: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(
    getUrlSearchParams(searchParams).page_size || DEFAULT_PAGE_SIZE
  );
  const [goToPageInput, setGoToPageInput] = useState(1);

  const processedActions = actions; // Check for permissions here later

  const performQuery = useCallback(async () => {
    // console.log("Performing Query ========>");
    const urlSearchParams = getUrlSearchParams(searchParams);
    console.log(urlSearchParams)
    setIsLoading(true);
    const response = await queryService(currentPage, urlSearchParams);
    const { total, data } = response;
    setPageData({
      rowData: data || [],
      total: total || 0,
    });
    setIsLoading(false);
  }, [queryService, searchParams, currentPage]);

  useEffect(() => {
    eventBus.subscribe(refreshEvent, performQuery);
    return () => {
      eventBus.unsubscribe(refreshEvent);
    };
  }, [performQuery, refreshEvent]);

  // INITIAL PERFORM
  useEffect(() => {
    performQuery();
  }, [searchParams, performQuery]);

  // HANDLE PAGINATION CHANGE
  const handlePaginationChange = (current, pageSize = DEFAULT_PAGE_SIZE) => {
    setPageLimit(pageSize);
    setCurrentPage(current);
    setGoToPageInput(current);
    setIsLoading(true);

    const newParams = {
      ...getUrlSearchParams(searchParams),
    };
    setSearchParams(newParams);
  };


  return (
    <div>
      {filtersMeta && (
        <TableFilter
          filtersMeta={filtersMeta}
          queryService={performQuery}
          params={searchParams}
          setParams={setSearchParams}
          setCurrentPage={setCurrentPage}
        />
      )}
      <Table
        columns={columns || []}
        data={pageData.rowData || []}
        isLoading={isLoading}
        showRowActionsInDropdown={false}
      />
      <Pagination
        current={currentPage}
        setCurrent={setCurrentPage}
        total={pageData.total}
        onChange={handlePaginationChange}
        pageSize={pageLimit}
        goToPageInput={goToPageInput}
        setGoToPageInput={setGoToPageInput}
      />
    </div>
  );
};

export default TableContainer;

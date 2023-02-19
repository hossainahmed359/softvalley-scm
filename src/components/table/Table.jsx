import React, { useMemo, useRef, useState } from "react";
import { useRowSelect, useTable } from "react-table";
import { useOutsideClickAlerter } from "../../hooks/useOutsideClickAlerter";

const Table = ({
  columns,
  data,
  isLoading,
  manualPagination = false,
  showRowActionsInDropdown = true,
  batchSelection = {},
}) => {
  const [showDropdownItems, setShowDropdownItems] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const columnData = useMemo(
    () => columns?.filter?.((data) => data.accessor !== "actions"),
    [columns]
  );

  const rowActions = useMemo(
    () => columns?.filter?.((data) => data.accessor === "actions"),
    [columns]
  )?.[0]?.options.filter((i) => {
    return true;
  });

  const rowData = useMemo(() => data, [data]);
  const actionButtonRef = useRef();

  useOutsideClickAlerter(actionButtonRef, () => setShowDropdownItems(false), [
    "dropdown_component",
    "modal",
  ]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columnData,
        data: rowData,
        manualPagination,
      },
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) =>
          rowActions
            ? [
                ...columns,
                {
                  id: "Actions",
                  Header: "Action",
                  Cell: ({ row }) => (
                    <>
                      {showRowActionsInDropdown ? (
                        <button
                          ref={actionButtonRef}
                          className={
                            "action_toggler mx-auto w-100 p-0 position-relative"
                          }
                          onClick={() => {
                            setSelectedRow(row);
                            setShowDropdownItems(true);
                          }}
                        >
                          ...
                        </button>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                          {renderRowActions(row.original)}
                        </div>
                      )}
                    </>
                  ),
                },
              ]
            : [...columns]
        );
      }
    );

  const renderRowActions = (record) => {
    return rowActions.map((tableAction) =>
      tableAction(record, () => setShowDropdownItems(false), batchSelection)
    );
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{ height: "50vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive dash-social">
          <table
            id="datatable"
            className="table table-bordered"
            {...getTableProps()}
          >
            <thead className="thead-light">
              {headerGroups?.map((headerGroup, idx) => (
                <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, idx) => (
                    <th
                      key={idx}
                      {...column.getHeaderProps()}
                      className="py-3"
                      style={{
                        color: "#303e67",
                        backgroundColor: "#f1f5fa",
                        borderColor: "#e8ebf3",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {column?.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {
              rowData?.length ? (
                <tbody className="table_body" {...getTableBodyProps()}>
                  {rows?.map((row, idx) => {
                    prepareRow(row);
                    return (
                      <tr
                        key={idx}
                        className="table_row"
                        id="table"
                        {...row.getRowProps()}
                      >
                        {row?.cells.map((cell, idx) => {
                          return (
                            <td
                              key={idx}
                              {...cell.getCellProps()}
                              className="item_cell py-3"
                              style={{ fontSize: "14px" }}
                            >
                              {cell.render("Cell")}
                              {/* Dropdown Render  */}
                              {showDropdownItems &&
                                cell.column?.id === "Actions" &&
                                cell.row?.id === selectedRow.id && (
                                  <div
                                    className="action_submenu"
                                    id="dropdown_component"
                                  >
                                    {renderRowActions(row.original)}
                                  </div>
                                )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              ) : <h4>No Data found</h4>
              // <h4 className="text-no-data">No Data Found</h4>
            }
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;

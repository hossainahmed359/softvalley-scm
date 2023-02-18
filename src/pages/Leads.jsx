import React from "react";
import TableContainer from "../components/table/TableContainer";
import { leadTableData } from "../services/api/queries/lead";
import { SelectInput } from "../components/formBuilder/inputs/SelectInput";
import { Form } from "../components/formBuilder/FormInput";
import { Input } from "../components/formBuilder/inputs/TextInput";
import {  leadStatus,
  leadSource,
  leadAssignee,
} from "../services/api/queries/leadFilters";
import DateRangeInput from '../components/formBuilder/inputs/DateRangeInput';


export const profileAvatar = (
  <svg
    width={14}
    height={14}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6C7.65685 6 9 4.65685 9 3C9 1.34315 7.65685 0 6 0C4.34315 0 3 1.34315 3 3C3 4.65685 4.34315 6 6 6ZM8 3C8 4.10457 7.10457 5 6 5C4.89543 5 4 4.10457 4 3C4 1.89543 4.89543 1 6 1C7.10457 1 8 1.89543 8 3Z"
      fill="black"
    />
    <path
      d="M12 11C12 12 11 12 11 12H1C1 12 0 12 0 11C0 10 1 7 6 7C11 7 12 10 12 11ZM11 10.9965C10.9986 10.7497 10.8462 10.0104 10.1679 9.33211C9.51563 8.67985 8.2891 8 5.99999 8C3.71088 8 2.48435 8.67985 1.8321 9.33211C1.15375 10.0104 1.00142 10.7497 1 10.9965H11Z"
      fill="black"
    />
  </svg>
);

export const columns = [
  {
    Header: "Lead Name",
    accessor: "name",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Followup Date",
    accessor: "followup_date",
    Cell: ({ value }) => <div>{value || "_"}</div>,
  },
  {
    Header: "Last note",
    accessor: "lead_notes",
    Cell: ({ value }) => <div>{value?.[0] || "_"}</div>,
  },
  {
    Header: "Assigned",
    accessor: "lead_assignees",
    Cell: ({ value }) => (
      <div className="d-flex justify-content-start flex-wrap gap-3 w-100">
        {value?.map((el, index) => (
          <div
            key={el?.id + index}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.05)",
              }}
            >
              {profileAvatar}
            </div>
            <span
              style={{
                fontSize: "10px",
                textAlign: "center",
                wordWrap: "break-word",
              }}
            >
              {el?.name}
            </span>
          </div>
        ))}{" "}
      </div>
    ),
  },
  {
    Header: "Preferred Countries",
    accessor: "lead_preferred_countries",
    Cell: ({ value }) => (
      <div>
        {" "}
        {value?.length > 0
          ? value?.map((el, index) => (
              <span key={`preferred_countries_${index + 1}`}>
                {el?.name} {value?.length === index + 1 ? "" : ","}
              </span>
            ))
          : "_"}
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "lead_status",
    Cell: ({ value }) => (
      <span style={{ color: `${value.color || "#000000"}` }}>
        {value?.name}
      </span>
    ),
  },
  {
    Header: "Source",
    accessor: "source",
    Cell: ({ value }) => <span>{value?.name}</span>,
  },
];

const Leads = () => {
  return (
    <div className="">
      <Form onSubmit={(e) => console.log(e)} className="mb-3">
        {(register, errors, { watch, setValue, control }) => (
          <>
            <div className="d-flex">
              <Input
                className={"form-group mb-3"}
                name={"search"}
                type="text"
                inputClassName="form-control rounded-1"
                placeholder={"Search in leads table"}
                register={register}
                errors={errors}
              />
            </div>
            <div className="d-flex gap-2">
              <SelectInput
                className={"col"}
                name={"lead_status_id"}
                placeholder={"Select Status"}
                inputClassName="border-0 w-100 text-muted"
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                init={"Select status"}
                control={control}
                lookupQuery={leadStatus}
                isMulti={true}
              />
              <SelectInput
                className={"col"}
                name={"source_id"}
                placeholder={"Select source"}
                inputClassName="border-0 w-100 text-muted"
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                control={control}
                lookupQuery={leadSource}
                isMulti={true}
              />
              <SelectInput
                className={"col"}
                name={"user_id"}
                placeholder={"Select assignees"}
                inputClassName="border-0 w-100 text-muted"
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                control={control}
                lookupQuery={leadAssignee}
                isMulti={true}
              />
              <DateRangeInput
                className={"col"}
                name={"date_rangle"}
                placeholder={"Select assignees"}
                inputClassName="border-0 w-100 text-muted"
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                control={control}
                lookupQuery={leadAssignee}
                isMulti={true}
              />

              <div className=" d-flex gap-2">
                <button
                  className="btn btn-primary w-100  rounded-1"
                  type="button"
                >
                  Reset
                </button>
                <button
                  className="btn btn-primary w-100  rounded-1"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </Form>

      <TableContainer queryService={leadTableData} columns={columns} />
    </div>
  );
};

export default Leads;

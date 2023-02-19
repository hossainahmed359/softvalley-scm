import { Form } from "../../components/formBuilder/FormInput";
import { Input } from "../../components/formBuilder/inputs/TextInput";
import { SelectInput } from "../../components/formBuilder/inputs/SelectInput";
import DateRangeInput from "../../components/formBuilder/inputs/DateRangeInput";
import {
  leadAssignee,
  leadSource,
  leadStatus,
} from "../../services/api/queries/leadFilters";
import { Fragment } from "react";
import {
  searchIcon,
  filterIcon,
  resetIcon,
  profileAvatar,
} from "../../assets/images/iconsJSX/icons";

export const leadsTableFilter = (handlerFilterSubmit, handlerFilterReset) => {
  return (
    <Form
      onSubmit={handlerFilterSubmit}
      resetEvent="reset_filter_form"
      className="mb-3"
    >
      {(register, errors, { watch, setValue, control, resetField }) => (
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
              append={
                <span
                  style={{
                    opacity: "0.5",
                    position: "absolute",
                    right: "10px",
                    top: "12px",
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  {searchIcon}
                </span>
              }
            />
          </div>
          <div className="d-flex flex-wrap">
            <SelectInput
              className={"col-lg-6 col-xl-3 pe-2 pb-3"}
              name={"lead_status_id"}
              placeholder={"Select Status"}
              inputClassName="border-0 w-100 text-muted"
              label={"Statuses"}
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
              className={"col-lg-6 col-xl-3 pe-2 pb-3"}
              name={"source_id"}
              placeholder={"Select source"}
              inputClassName="border-0 w-100 text-muted"
              label={"Sources"}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              control={control}
              lookupQuery={leadSource}
              isMulti={true}
            />
            <SelectInput
              className={"col-lg-6 col-xl-3 pe-2 pb-3"}
              name={"user_id"}
              placeholder={"Select assignees"}
              inputClassName="border-0 w-100 text-muted"
              label={"Assignees"}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              control={control}
              lookupQuery={leadAssignee}
              isMulti={true}
            />
            <DateRangeInput
              className={"col-lg-6 col-xl-3 pe-2 pb-3"}
              name={"contacted_date"}
              placeholder={"Select assignees"}
              inputClassName="border-0 w-100 text-muted"
              label={"Contacted Date"}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              control={control}
              lookupQuery={leadAssignee}
              isMulti={true}
            />

            <div className="col-4 d-flex justify-content-center align-items-end gap-2">
              <button
                className="btn btn-primary w-100  rounded-1"
                type="submit"
              >
                <span>{filterIcon}</span> Filter
              </button>
              <button
                onClick={handlerFilterReset}
                className="btn btn-primary w-100 rounded-1"
                type="button"
              >
                <span>{resetIcon}</span> Reset Filter
              </button>
            </div>
          </div>
        </>
      )}
    </Form>
  );
};

export const leadsTableColumns = [
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
    Cell: ({ value }) => (
      <div>
        {" "}
        {value.length > 0 ? (
          <span>{value[value.length - 1]?.note}</span>
        ) : (
          "_"
        )}{" "}
      </div>
    ),
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
              <span
                key={`preferred_countries_${index + 1}`}
                className="d-flex flex-wrap"
              >
                <span>
                  {" "}
                  {el?.name} {value?.length === index + 1 ? "" : ","}
                </span>
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

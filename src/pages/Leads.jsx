import React from "react";
import TableContainer from "../components/table/TableContainer";
import { leadTableData } from "../services/api/queries/lead";
import { SelectInput } from "../components/formBuilder/inputs/SelectInput";
import { Form } from "../components/formBuilder/FormInput";
import { Input } from "../components/formBuilder/inputs/TextInput";
import {
  leadStatus,
  leadSource,
  leadAssignee,
} from "../services/api/queries/leadFilters";
import DateRangeInput from "../components/formBuilder/inputs/DateRangeInput";
import { leadsTableColumns, leadsTableFilter } from "../configs/meta/leadsTableMeta";



const Leads = () => {
  return (
    <div className="">
      <TableContainer
        filtersMeta={leadsTableFilter}
        queryService={leadTableData}
        columns={leadsTableColumns}
      />
    </div>
  );
};

export default Leads;

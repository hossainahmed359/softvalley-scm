import { axios, privateAxios } from "../../axiosConfig";
import endpoints from "../../../constants/endpoints";
import { DEFAULT_PAGE_SIZE } from "../../../components/table/TableContainer";

// Lead Table
export const leadTableData = async (params) => {
  const {
    page = 1,
    limit = DEFAULT_PAGE_SIZE,
    search,
    lead_status_id,
    source_id,
    user_id,
    contacted_date,
  } = params;


  const body = {
    search,
    lead_status_id: lead_status_id?.split(",")?.map(Number),
    source_id: source_id?.split(",")?.map(Number),
    user_id: user_id?.split(",")?.map(Number),
    ...(contacted_date && {
      contacted_date_from:
        contacted_date && new Date(contacted_date?.split("|")?.[0]),
      contacted_date_to:
        contacted_date && new Date(contacted_date?.split("|")?.[1]),
    }),
  };

  Object.keys(body).forEach((key) => !body[key] && delete body[key]);


  try {
    const data = await privateAxios.post(
      `${endpoints.LEAD}?page=${page}&limit=${limit}`,
      {
        ...(body && { ...body }),
      }
    );

    return data?.data?.data;
  } catch (error) {
    throw error;
  }
};

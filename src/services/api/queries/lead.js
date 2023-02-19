import { axios, privateAxios } from "../../axiosConfig";
import endpoints from "../../../constants/endpoints";
import { DEFAULT_PAGE_SIZE } from "../../../components/table/TableContainer";

// Lead Table
export const leadTableData = async (params) => {
  // console.log(page, limit)
  const {
    page = 1,
    limit = DEFAULT_PAGE_SIZE,
    search,
    lead_status_id,
    source_id,
    user_id,
  } = params;

  const body = {
    search,
    lead_status_id: lead_status_id?.split(",")?.map(Number),
    source_id: source_id?.split(",")?.map(Number),
    user_id: user_id?.split(",")?.map(Number),
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

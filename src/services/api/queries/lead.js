import { axios, privateAxios } from "../../axiosConfig";
import endpoints from "../../../constants/endpoints";
import { DEFAULT_PAGE_SIZE } from "../../../components/table/TableContainer";

// Lead Table
export const leadTableData = async (params) => {
  // console.log(page, limit)
  const { page = 1, limit = DEFAULT_PAGE_SIZE } = params;

  console.log(params)
  try {
    const data = await privateAxios.post(
      `${endpoints.LEAD}?page=${page}&limit=${limit}`,
      {
        ...(params && { ...params }),
      }
    );

    return data?.data?.data;
  } catch (error) {
    throw error;
  }
};

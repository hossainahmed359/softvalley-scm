import { axios, privateAxios } from "../../axiosConfig";
import endpoints from "../../../constants/endpoints";


// Lead Table
export const leadTableData = async (page = 1, body) => {
  try {
    const data = await privateAxios.post(`${endpoints.LEAD}?page=${page}`, {
      ...(body && { ...body }),
    });

    return data?.data?.data;
  } catch (error) {
    throw error;
  }
};

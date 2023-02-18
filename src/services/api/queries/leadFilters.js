import { privateAxios } from "../../axiosConfig";
import endpoints from "../../../constants/endpoints";

// Lead Status
export const leadStatus = async () => {
  try {
    const data = await privateAxios.get(endpoints.STATUS);
    return data?.data?.data || [];
  } catch (error) {
    throw error;
  }
};

// Lead Source
export const leadSource = async () => {
  try {
    const data = await privateAxios.get(endpoints.SOURCE);
    return data?.data?.data || [];
  } catch (error) {
    throw error;
  }
};

// Lead Assignee
export const leadAssignee = async () => {
  try {
    const data = await privateAxios.get(endpoints.ASSIGNEE);
    return data?.data?.data || [];
  } catch (error) {
    throw error;
  }
};
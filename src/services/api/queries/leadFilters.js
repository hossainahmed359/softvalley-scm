import { privateAxios } from "../../axiosConfig";
import endpoints from "../../../constants/endpoints";

export const createOptions = (arr = [], itemValueKey, itemLabelKey) => {
  const options = [];
  arr.forEach((el, index) => {
    const data = { value: el?.[itemValueKey], label: el?.[itemLabelKey] };
    options.push(data);
  });

  return options;
};

// Lead Status
export const leadStatus = async () => {
  try {
    const data = await privateAxios.get(endpoints.STATUS);
    if (data.data.success === true) {
      const responseArr = data?.data?.data || [];
      const options = createOptions(responseArr, "id", "name");
      return options;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

// Lead Source
export const leadSource = async () => {
  try {
    const data = await privateAxios.get(endpoints.SOURCE);
    if (data.data.success === true) {
      const responseArr = data?.data?.data || [];
      const options = createOptions(responseArr, "id", "name");
      return options;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

// Lead Assignee
export const leadAssignee = async () => {
  try {
    const data = await privateAxios.get(endpoints.ASSIGNEE);
    if (data.data.success === true) {
      const responseArr = data?.data?.data || [];
      const options = createOptions(responseArr, "user_id", "name");
      return options;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

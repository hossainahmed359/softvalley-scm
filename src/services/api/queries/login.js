import { axios } from "../../axiosConfig";
import endpoints from "../../../constants/endpoints";
import {
  removeLocalStorageData,
  setLocalStorageData,
} from "../../storage/storage";
import {
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_USER_DATA,
} from "../../../constants/localstorage";

let user = {
  email: "admin@example.com",
  password: "password",
};

export const userLogin = async (body) => {
  if (!body) return;
  try {
    const data = await axios.post(endpoints.LOGIN, {
      ...body,
    });

    // setLocalStorageData(STORAGE_KEY_ACCESS_TOKEN, data?.data?.data?.token);
    // setLocalStorageData(STORAGE_KEY_USER_DATA, data?.data?.data?.user);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const userLogout = () => {
  removeLocalStorageData(STORAGE_KEY_ACCESS_TOKEN);
  removeLocalStorageData(STORAGE_KEY_USER_DATA);
};

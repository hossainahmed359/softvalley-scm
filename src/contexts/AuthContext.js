import { createContext, useReducer, useEffect } from "react";
import {
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_USER_DATA,
} from "../constants/localstorage";
import {
  getLocalStorage,
  setLocalStorageData,
  removeLocalStorageData,
} from "../services/storage/storage";
import { userLogin } from "../services/api/queries/login";
import { privateAxios, setTokenInHeader } from "../services/axiosConfig";

const setSession = (access_token, user) => {
  if (access_token) {
    setLocalStorageData(STORAGE_KEY_ACCESS_TOKEN, access_token);
    setLocalStorageData(STORAGE_KEY_USER_DATA, user);
  } else {
    // removeLocalStorageData("access_token");
    // removeLocalStorageData("refresh_token");
  }
};

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        access_token: action.payload.access_token,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        access_token: action.payload.access_token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        access_token: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const initialize = () => {
      const access_token = getLocalStorage(STORAGE_KEY_ACCESS_TOKEN);
      const user = getLocalStorage(STORAGE_KEY_USER_DATA);
      if (access_token && user) {
        setSession(access_token, user);
        setTokenInHeader(privateAxios.defaults);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async ({ email, password }) => {
    const response = await userLogin({ email, password });
    if (response.success === true) {
      const { token, user } = response.data;
      setSession(token, user);
      setTokenInHeader(privateAxios.defaults);
      dispatch({
        type: SIGN_IN,
        payload: {
          isInitialized: true,
          isAuthenticated: true,
          access_token: token,
          user,
        },
      });
     
    } else {
      dispatch({
        type: INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
    return response;
  };

  const signOut = () => {
    setSession(null, null);
    setSession(null, null);
    dispatch({ type: SIGN_OUT });
    removeLocalStorageData(STORAGE_KEY_ACCESS_TOKEN);
    removeLocalStorageData(STORAGE_KEY_USER_DATA);
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

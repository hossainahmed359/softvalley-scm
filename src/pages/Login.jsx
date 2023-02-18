import React, {useEffect} from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom'
import { HOME_PATH } from '../constants/routes';

const Login = () => {
  const { signIn , isAuthenticated, isInitialized} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isInitialized) navigate(HOME_PATH);
  }, [isAuthenticated, isInitialized, navigate]);


  return (
    <div>
      <button
        onClick={() => signIn({
            email: "admin@example.com",
            password: "password",
          })
        }
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;

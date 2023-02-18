import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../constants/routes";
import { Form } from "../components/formBuilder/FormInput";
import { Input } from "../components/formBuilder/inputs/TextInput";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isInitialized) navigate(HOME_PATH);
  }, [isAuthenticated, isInitialized, navigate]);

  const handleLoginSubmit = async (e) => {
    setIsLoading(true);
    const { email, password } = e;
    const response = await signIn({ email, password });
    if (response.success) {
      if (isAuthenticated && isInitialized) navigate(HOME_PATH);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: "100vh" }}
      >
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            maxWidth: "650px",
            
          }}
          className="px-5 py-3 rounded"
        >
          <h4 className="text-start my-3">Login</h4>
          <Form onSubmit={handleLoginSubmit} className="mb-2">
            {(register, errors, { watch, setValue }) => (
              <>
                <Input
                  className={"form-group mb-3"}
                  label={"Email"}
                  name={"email"}
                  type="text"
                  inputClassName="form-control"
                  placeholder={"admin@example.com"}
                  register={register}
                  errors={errors}
                  rules={{
                    required: true,
                  }}
                />
                <Input
                  className={"form-group mb-3"}
                  label={"Password"}
                  type="text"
                  name={"password"}
                  inputClassName="form-control"
                  placeholder={"Password: password"}
                  register={register}
                  errors={errors}
                  rules={{
                    required: true,
                  }}
                />

                <div className="mt-6">
                  <button className="btn btn-primary w-100" type="submit">
                    Submit
                  </button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;

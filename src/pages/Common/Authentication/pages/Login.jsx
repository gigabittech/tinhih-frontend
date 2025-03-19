import { Form, Formik } from "formik";
import React from "react";
import { loginSchema as validationSchema } from "../../../../FormSchema/Global/authSchema";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { Link } from "react-router";
import useUserStore from "../../../../store/userStore";
import Spinner from "../../../../components/ui/spinner";
import {
  CardContainer,
  CardBody,
  CardDivider,
} from "../components/CardComponent";

function Login() {
  const loginHandler = useUserStore((state) => state.loginHandler);
  const isLoading = useUserStore((state) => state.isLoading.login);
  const isSuccess = useUserStore((state) => state.isSuccess.login);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    await loginHandler(values);
    if (isSuccess) resetForm();
  };

  return (
    <CardContainer>
      <CardBody>
        <div className="mt-9 md:mt-5  text-center">
          <h4 className="text-[clamp(25px,3vw,32px)] font-bold text-context-dark leading-tight">
            Welcome back
          </h4>
          <p className="text-context-light text-sm">
            Please enter your details to sign in
          </p>
        </div>

        {/* google & Apple button */}

        <CardDivider text="or" />

        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="space-y-3.5">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="username"
                formik={formik}
              />
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  formik={formik}
                />
                <Link
                  to="/password/forgot"
                  className="font-bold mt-2 inline-block text-sm text-primary-800 hover:underline"
                >
                  Forgot password
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full font-bold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span>Signing In</span>
                    <Spinner className="border-t-fixed-100 size-4" />
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-xs mt-5">
          <span className="text-secondary-content">
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            className="font-bold text-context-dark hover:underline"
          >
            Create account
          </Link>
        </p>
      </CardBody>
    </CardContainer>
  );
}

export default Login;

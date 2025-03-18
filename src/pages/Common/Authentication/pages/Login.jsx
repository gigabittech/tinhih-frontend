import { Form, Formik } from "formik";
import React from "react";
import { loginSchema as validationSchema } from "../../../../FormSchema/Global/authSchema";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { Link } from "react-router";
import Logo from "../../../../assets/Logo.png";
import bgImage from "../../../../assets/authBg.svg";
import useUserStore from "../../../../store/userStore";
import Spinner from "../../../../components/ui/spinner";

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
    <div
      className={`auth-card bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <main className="auth-card-body relative">
        <div className="logo-shadow absolute -top-7 left-1/2 -translate-x-1/2 p-1 rounded-full border border-primary-500 ring-3 ring-primary-500/40">
          <img src={Logo} alt="Tinhih Logo" className="h-14" />
        </div>

        <div className="mt-9 md:mt-5  text-center">
          <h4 className="text-[clamp(25px,3vw,32px)] font-bold text-context-dark leading-tight">
            Welcome back
          </h4>
          <p className="text-context-light text-sm">
            Please enter your details to sign in
          </p>
        </div>

        {/* google & Apple button */}

        {/* divider start */}
        <div className="flex items-center justify-center gap-2 mx-4 my-5">
          <span className="flex-1 border-t border-outline-medium"></span>
          <span className="text-context-light text-sm font-medium">OR</span>
          <span className="flex-1 border-t border-outline-medium"></span>
        </div>
        {/* divider end */}

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
      </main>
    </div>
  );
}

export default Login;

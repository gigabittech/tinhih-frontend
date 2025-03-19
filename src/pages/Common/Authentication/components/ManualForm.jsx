import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { Link } from "react-router";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import Spinner from "../../../../components/ui/spinner";

function ManualForm({
  validationSchema,
  initialValues,
  handleSubmit,
  isLoading,
}) {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="space-y-3.5">
          <Input type="name" name="name" placeholder="Name" formik={formik} />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            formik={formik}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            formik={formik}
          />

          <div className="my-5">
            <div className="flex items-center space-x-2">
              <Field
                type="checkbox"
                name="termsAccepted"
                id="termsAccepted"
                className="checkbox rounded-sm h-4 w-4 cursor-pointer focus:outline-none"
              />

              <label
                htmlFor="termsAccepted"
                className="text-xs inline-block text-context-dark/80 tracking-tight leading-tight"
              >
                I agree to the{" "}
                <Link
                  to="/terms-of-service"
                  className="text-context-dark font-bold hover:underline"
                >
                  Terms of Use
                </Link>{" "}
                and the{" "}
                <Link
                  to="/privacy-policy"
                  className="text-context-dark font-bold hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                for my account.
              </label>
            </div>

            <ErrorMessage
              name="termsAccepted"
              component="div"
              className="text-xs text-error mt-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span>Creating new account</span>
                <Spinner className="border-t-fixed-100 size-4" />
              </>
            ) : (
              <span>Create free account</span>
            )}
          </Button>

          <p className="text-sm mt-2">
            <span className="text-context-dark/80">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-context-dark font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default ManualForm;

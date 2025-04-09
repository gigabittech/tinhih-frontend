import React from "react";
import { CardBody, CardContainer, CardDivider } from "./CardComponent";
import { signupSchema as validationSchema } from "../../../../FormSchema/Global/authSchema";
import ManualForm from "./ManualForm";
import useUserStore from "../../../../store/global/userStore";
import GoogleAppleBtn from "./GoogleAppleBtn";

function ProviderRegister() {
  const registerHandler = useUserStore((state) => state.registerHandler);
  const isLoading = useUserStore((state) => state.isLoading.register);
  const isSuccess = useUserStore((state) => state.isSuccess.register);

  const initialValues = {
    email: "",
    password: "",
    role: "provider",
    termsAccepted: true,
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    await registerHandler(values);
    if (isSuccess) resetForm();
  };

  return (
    <CardContainer>
      <CardBody>
        <div className="">
          <h4 className="text-[clamp(25px,3vw,32px)] font-bold text-context-dark leading-tight">
            Powering your clients, and all the work you do!
          </h4>
          <p className="text-context-light text-sm ">
            practice management software is made for solo practitioners and
            teams. Stop paying excessive fees and be part of the revolution.
          </p>
        </div>

        <GoogleAppleBtn />
        <CardDivider text="or" />
        <ManualForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </CardBody>
    </CardContainer>
  );
}

export default ProviderRegister;

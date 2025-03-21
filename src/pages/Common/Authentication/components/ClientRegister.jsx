import React from "react";
import { CardBody, CardContainer, CardDivider } from "./CardComponent";
import { signupSchema as validationSchema } from "../../../../FormSchema/Global/authSchema";
import ManualForm from "./ManualForm";
import useUserStore from "../../../../store/userStore";
import GoogleAppleBtn from "./GoogleAppleBtn";

function ClientRegister() {
  const registerHandler = useUserStore((state) => state.registerHandler);
  const isLoading = useUserStore((state) => state.isLoading.register);
  const isSuccess = useUserStore((state) => state.isSuccess.register);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "client",
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
          <h4
            className="text-[clamp(25px,3vw,32px)] font-bold flex flex-col items-center
          text-context-dark leading-tight"
          >
            <span> Manage your health </span>
            <span> from one place</span>
          </h4>
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

export default ClientRegister;

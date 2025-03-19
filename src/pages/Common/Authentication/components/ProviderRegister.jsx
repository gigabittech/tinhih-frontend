import React from "react";
import { CardBody, CardContainer, CardDivider } from "./CardComponent";
import { signupSchema as validationSchema } from "../../../../FormSchema/Global/authSchema";
import ManualForm from "./ManualForm";
import useUserStore from "../../../../store/userStore";

function ProviderRegister() {
  const registerHandler = useUserStore((state) => state.registerHandler);
  const isLoading = useUserStore((state) => state.isLoading.register);
  const isSuccess = useUserStore((state) => state.isSuccess.register);

  const initialValues = {
    name: "",
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

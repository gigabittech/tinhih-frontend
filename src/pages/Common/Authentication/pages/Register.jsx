import React from "react";
import { useSearchParams } from "react-router";
import ProviderRegister from "../components/ProviderRegister";
import ClientRegister from "../components/ClientRegister";
import SelectRegisterRole from "../components/SelectRegisterRole";

function Register() {
  const [searchParams] = useSearchParams();
  const isProvider = searchParams.get("isProvider") === "true";
  const isClient = searchParams.get("isClient") === "true";

  if (isClient) return <ClientRegister />;
  if (isProvider) return <ProviderRegister />;
  return <SelectRegisterRole />;
}

export default Register;

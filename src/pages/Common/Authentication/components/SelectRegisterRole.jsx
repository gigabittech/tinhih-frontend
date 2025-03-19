import React from "react";
import { CardContainer, SelectionCard } from "./CardComponent";
import providerCardimage from "../../../../assets/auth/provider-card-image.svg";
import clientCardimage from "../../../../assets/auth/client-card-image.svg";

function SelectRegisterRole() {
  return (
    <CardContainer>
      <main className="w-full flex flex-col items-center justify-center">
        <h1 className="mb-5 md:mb-7 lg:mb-10 2xl:mb-12 text-center text-[clamp(25px,3vw,30px)] font-bold">
          Which describes you best?
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
          <SelectionCard
            image={providerCardimage}
            header="For practitioners"
            context="Manage and grow your practice"
            path="/register?isProvider=true"
          />
          <SelectionCard
            image={clientCardimage}
            header="For clients"
            context="I recieve care or health related services"
            path="/register?isClient=true"
          />
        </div>
      </main>
    </CardContainer>
  );
}

export default SelectRegisterRole;

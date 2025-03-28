import React from "react";
import { Outlet } from "react-router";

function ProviderLayout(props) {
  return (
    <div>
      <header className="h-[3rem] hidden md:block"></header>
      <main className="h-svh md:h-[calc(100svh-3rem)]">
        <Outlet />
      </main>
    </div>
  );
}

export default ProviderLayout;

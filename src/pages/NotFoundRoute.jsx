import React from "react";
import { useNavigate } from "react-router";
import { Hammer, Loader2 } from "lucide-react";

function NotFoundRoute() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="pr-12 pl-10 h-[calc(100svh-10rem)] flex items-center justify-center">
      <div className="max-w-7xl">
        <div className="flex justify-center">
          <Hammer className="h-14 w-14 text-primary animate-bounce relative -left-12 " />
        </div>

        <h4 className="text-3xl font-bold font-secondary max-w-md tracking-tight leading-tight mt-5">
          This Page is Under Construction
        </h4>

        <p className="text-primary-800  max-w-xl text-xl leading-snug text-secondary-content/90 mt-3">
          We are working hard to bring you something amazing. Please check back
          soon!
        </p>
      </div>
    </div>
  );
}

export default NotFoundRoute;

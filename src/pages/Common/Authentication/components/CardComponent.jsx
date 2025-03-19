import React from "react";
import bgImage from "../../../../assets/auth/authBg.svg";
import Logo from "../../../../assets/auth/Logo.svg";
import { cn } from "../../../../lib/utils";
import { ArrowRight } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { useNavigate } from "react-router";

function CardContainer({ children, className }) {
  return (
    <div
      className={cn(
        "bg-cover bg-center bg-no-repeat bg-base-200 px-[3vw] min-h-svh flex items-center justify-center",
        className
      )}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {children}
    </div>
  );
}

function CardBody({ children, className }) {
  return (
    <main
      className={cn(
        "relative bg-base-100 shadow-sm rounded-[5px] w-full sm:max-w-sm md:max-w-md  p-5 md:px-6 md:py-7 2xl:px-10 2xl:py-12",
        className
      )}
    >
      <div className="logo-shadow absolute -top-7 left-1/2 -translate-x-1/2 p-1 rounded-full border border-primary-500 ring-3 ring-primary-500/40">
        <img src={Logo} alt="Tinhih Logo" className="h-14" />
      </div>
      {children}
    </main>
  );
}

function CardDivider({ text }) {
  return (
    <div className="flex items-center justify-center gap-2 mx-4 my-5">
      <span className="flex-1 border-t border-outline-medium"></span>
      <span className="text-context-light text-sm font-medium uppercase">
        {text}
      </span>
      <span className="flex-1 border-t border-outline-medium"></span>
    </div>
  );
}

function SelectionCard({ image, alt, header, context, path }) {
  const navigate = useNavigate();

  const navigateHandler = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      onClick={navigateHandler}
      className="overflow-hidden group/role-card bg-base-100 rounded-xl shadow-sm hover:shadow-lg md:shadow-lg md:hover:shadow-2xl cursor-pointer w-full p-5 md:w-sm md:max-w-xs lg:max-w-sm transition-shadow duration-300"
    >
      <div className="bg-base-200 p-4 rounded-xl hidden md:flex items-center justify-center ">
        <img
          src={image}
          alt={alt}
          className="max-h-20 md:max-h-30 lg:max-h-56 w-auto object-contain"
        />
      </div>
      <div className=" md:mt-5">
        <h2 className="font-extrabold text-2xl">{header}</h2>
        <h3 className="text-context-light mt-1 text-sm">{context}</h3>
        <div className="flex items-center gap-1 mt-5">
          <Button
            className="rounded-full h-10 w-[7rem] md:w-0 md:p-0 trans
           md:opacity-0 group-hover/role-card:opacity-100 md:group-hover/role-card:px-4  md:group-hover/role-card:py-2  group-hover/role-card:w-1/2"
          >
            Get Started
          </Button>
          <Button aria-label="next" className="rounded-full h-10 w-10">
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export { CardContainer, CardBody, CardDivider, SelectionCard };

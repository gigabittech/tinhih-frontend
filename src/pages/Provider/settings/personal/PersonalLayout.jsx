import { UserSquareIcon } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router";

function PersonalLayout() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <header className=" px-10 pb-5">
        <div className="flex justify-between items-center gap-3 ">
          <div className="flex items-center gap-3 text-2xl">
            <span className=" p-2 bg-amber-100 text-[#6e6e6e]">
              {" "}
              <UserSquareIcon />
            </span>
            <p className=" font-bold">My Profile</p>
          </div>
        </div>
      </header>
      {/* -------------------- button to switch tabs---------------- */}
      <div className="border-b border-[#dedede] flex px-10">
        <Link to="/settings/personal/details">
          <button
            onClick={() => setActive(0)}
            className={`${
              active === 0 ? "border-primary-600" : "border-transparent"
            } pb-3 border-b-2 px-3 cursor-pointer`}
          >
            Details
          </button>
        </Link>
        <Link to="/settings/personal/ServiceAvailability">
          <button
            onClick={() => setActive(1)}
            className={`${
              active === 1 ? "border-primary-600" : "border-transparent"
            } pb-3 border-b-2 px-3 cursor-pointer`}
          >
            Services availability
          </button>
        </Link>

        <button
          onClick={() => setActive(2)}
          className={`${
            active === 2 ? "border-primary-600" : "border-transparent"
          } pb-3 border-b-2 px-3 cursor-pointer`}
        >
          Connected apps
        </button>
        <button
          onClick={() => setActive(3)}
          className={`${
            active === 3 ? "border-primary-600" : "border-transparent"
          } pb-3 border-b-2 px-3 cursor-pointer`}
        >
          Notifications
        </button>
      </div>
      <div className="px-10 py-5 bg-gray-100 h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default PersonalLayout;

import { UserSquareIcon } from "lucide-react";
import { Link, useLocation, Outlet } from "react-router";

function SettingsLayout({ icon, title, tabs = [] }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* ----------- Header ----------- */}
      <header className="px-10 pb-5">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3 text-2xl">
            <span className="p-2 bg-amber-100 text-[#6e6e6e]">{icon}</span>
            <p className="font-bold">{title}</p>
          </div>
        </div>
      </header>

      {/* ----------- Tabs ----------- */}
      {tabs.length > 0 && (
        <nav className="border-b border-[#dedede] flex px-10">
          {tabs.map((tab, index) => (
            <Link key={index} to={tab.path}>
              <button
                className={`pb-3 border-b-2 px-3 cursor-pointer ${
                  isActive(tab.path)
                    ? "border-primary-600"
                    : "border-transparent"
                }`}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </nav>
      )}

      {/* ----------- Content ----------- */}
      <div className="px-10 py-5 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsLayout;

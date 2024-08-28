import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo/logo-1.jpg";

import { logout, selectCurrentUser } from "../../Auth/AuthSlice";
import { Button } from "../../components/ui/UI/button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { adminSidebarRoutes } from "../AdminRoutes";
import { userSidebarRoutes } from "../UserRoutes";

const DashboardSidebar = ({ sidebarType }: { sidebarType: string }) => {
  const user = useAppSelector(selectCurrentUser);

  const profileText = user?.name?.slice(0, 1).toUpperCase();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-[320px] px-4 py-8 border-r h-screen overflow-y-auto hidden lg:block">
      {/* Logo */}
      <div className="max-w-[160px] pb-4">
        <Logo />
      </div>
      <div className="flex flex-col justify-between h-full">
        {/* routes */}
        <div className="flex flex-col gap-4 py-8 border-t">
          {sidebarType === "admin"
            ? adminSidebarRoutes.map((item) => (
                <NavLink
                  key={item.path}
                  className={({ isActive }) =>
                    `text-gray-100 hover:text-orange-500 p-2 flex gap-3 items-center text-lg rounded-xl ${
                      isActive && "text-orange-500 border-l-4 border-orange-500"
                    }`
                  }
                  to={item.path}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))
            : userSidebarRoutes.map((item) => (
                <NavLink
                  key={item.path}
                  className={({ isActive }) =>
                    `text-gray-100 hover:text-orange-500 p-2 flex gap-3 items-center text-lg rounded-xl ${
                      isActive && "text-orange-500 border-l-4 border-orange-500"
                    }`
                  }
                  to={item.path}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
        </div>
        {/* Profile & Logout */}
        <div className="flex flex-col gap-8 pt-8 border-t">
          {/* Profile */}
          <div className="flex gap-3 items-center">
            <h2 className="p-2 rounded-full bg-orange-500 border text-2xl font-semibold size-12 text-center">
              {profileText}
            </h2>
            <div className="">
              <p className="text-gray-100 font-medium" title={user?.name}>
                {user?.name?.slice(0, 15)}
                {(user?.name?.length ?? 0) > 15 && "..."}
              </p>
              <p className="text-gray-300 text-sm" title={user?.email}>
                {user?.email.slice(0, 20)}
                {(user?.email?.length ?? 0) > 20 && "..."}
              </p>
            </div>
          </div>
          {/* Logout */}
          <Button
            onClick={handleLogout}
            className="text-gray-100 bg-orange-500 hover:bg-orange-600 w-full"
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;

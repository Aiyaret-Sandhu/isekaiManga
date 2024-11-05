import { useHeader } from "@/context/useHeader";
import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";

type Props = {
  activePage: string; // The currently active page's name or identifier
  className?: string;
};

export default function Sidebar({ className = "" }: Props) {
  const { isSidebarOpen, setIsSidebarOpen } = useHeader();
  // const currentUrl = window.location.href;

  return (
    <div>
      <div
        className={`lg:sticky fixed overflow-y-auto ${isSidebarOpen ? "ml-0" : "ml-[-256px]"
          } w-[256px] h-screen bg-slate-100 flex flex-col shrink-0 items-center gap-2 p-4 top-0 left-0 z-50 transition-all ${className}`}
      >
        <div className="flex items-center justify-between w-full">
          <Link to={"/"} className="text-2xl font-bold">
            <Icon
              icon="raphael:book"
              className="text-primary text-5xl md:3xl inline"
            />
            AiManga
          </Link>
          <Icon
            icon="ph:x-bold"
            className="text-4xl rounded-full p-2 hover:cursor-pointer hover:bg-slate-200"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "w-full bg-primary text-white rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
                : "w-full rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
          }
        >
          <Icon icon="carbon:home" className="text-xl inline mr-1" />
          Home
        </NavLink>
        <NavLink
          to={"/follow"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "w-full bg-primary text-white rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
                : "w-full rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
          }
        >
          <Icon
            icon="material-symbols:bookmark-outline"
            className="text-xl inline mr-1"
          />
          Following
        </NavLink>
        <NavLink
          to={"/history"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "w-full bg-primary text-white rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
                : "w-full rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
          }
        >
          <Icon icon="ic:baseline-history" className="text-xl inline mr-1" />
          History
        </NavLink>
        <NavLink
          to={"/search"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "w-full bg-primary text-white rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
                : "w-full rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
          }
        >
          <Icon icon="octicon:book-16" className="text-xl inline mr-1" />
          Search
        </NavLink>
      </div>
    </div>
  );
}

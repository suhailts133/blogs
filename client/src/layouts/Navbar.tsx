import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { logOut } from "../app/authSlice";


const navLinkClass =
  "relative py-2 text-sm font-sans text-text-muted transition-colors hover:text-text-primary " +
  "[&.active]:text-text-primary [&.active]:after:absolute [&.active]:after:-bottom-px [&.active]:after:left-0 " +
  "[&.active]:after:right-0 [&.active]:after:h-[2px] [&.active]:after:rounded-full [&.active]:after:bg-accent";

export default function Navbar() {
  const [open, setOpen] = useState(false);


  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = !!accessToken
  const userName = "Suhail";

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/auth/login");
    setOpen(false);
    console.log("Logged out (static)");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-bg-raised/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <NavLink to="/" className="text-xl font-bold tracking-tight text-accent sm:text-2xl">
          Blogs
        </NavLink>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/my-blogs" className={navLinkClass}>
            My Blogs
          </NavLink>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">


          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-full border border-surface-border-strong px-4 py-1.5 text-sm font-medium text-text-primary transition-colors hover:border-accent sm:block"
              >
                Log out
              </button>
              <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-accent-tint text-sm font-semibold text-accent-tint-text sm:flex">
                {userName?.[0]?.toUpperCase() ?? <User size={15} />}
              </div>
            </>
          ) : (
            <NavLink
              to="/auth/login"
              className="hidden rounded-full border border-surface-border-strong px-4 py-1.5 text-sm font-medium text-text-primary transition-colors hover:border-accent sm:block"
            >
              Sign in
            </NavLink>
          )}

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-text-primary md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`overflow-hidden border-t border-surface-border bg-bg-raised backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col divide-y divide-surface-border px-4 sm:px-6">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="py-3.5 text-sm font-medium text-text-primary"
          >
            Home
          </NavLink>
          <NavLink
            to="/my-blogs"
            onClick={() => setOpen(false)}
            className="py-3.5 text-sm font-medium text-text-primary"
          >
            My Blogs
          </NavLink>
        </nav>

        <div className="px-4 pb-5 pt-2 sm:px-6">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-full border border-surface-border-strong py-2 text-sm font-medium text-text-primary"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/auth/login"
              onClick={() => setOpen(false)}
              className="block w-full rounded-full border border-surface-border-strong py-2 text-center text-sm font-medium text-text-primary"
            >
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}


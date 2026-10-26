import { useState } from "react";
import { Menu, X, PenLine, LogOut, LogIn } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { logOut } from "../app/authSlice";

const desktopLink = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-accent-tint text-accent-tint-text"
      : "text-text-muted hover:text-text-primary hover:bg-surface-hover"
  }`;

const mobileLink = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "bg-accent-tint text-accent-tint-text"
      : "text-text-primary hover:bg-surface-hover"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = !!accessToken;
  const userName = "Suhail";

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/auth/login");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-bg-raised/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <NavLink to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-text-on-accent transition-transform duration-200 group-hover:rotate-6">
            <PenLine size={17} />
          </span>
          <span className="font-Dynalight-Regular text-3xl leading-none text-accent">
            Blogs
          </span>
        </NavLink>

        {/* Desktop pill nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-surface-border bg-surface p-1 md:flex">
          <NavLink to="/" end className={desktopLink}>
            Home
          </NavLink>
          <NavLink to="/my-blogs" className={desktopLink}>
            My Blogs
          </NavLink>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="hidden items-center gap-2 rounded-full border border-surface-border bg-surface py-1 pl-1 pr-1 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-tint text-sm font-semibold text-accent-tint-text">
                {userName[0]?.toUpperCase()}
              </div>
              <span className="max-w-24 truncate text-sm font-medium text-text-primary">
                {userName}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                title="Log out"
                aria-label="Log out"
                className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-error-tint hover:text-error"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <NavLink
              to="/auth/login"
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-text-on-accent transition-colors duration-200 hover:bg-accent-hover sm:inline-flex"
            >
              <LogIn size={15} />
              Sign in
            </NavLink>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface text-text-primary transition-colors hover:bg-surface-hover md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-surface-border px-4 pb-5 pt-3 sm:px-6">
          <nav className="flex flex-col gap-1">
            <NavLink to="/" end onClick={() => setOpen(false)} className={mobileLink}>
              Home
            </NavLink>
            <NavLink to="/my-blogs" onClick={() => setOpen(false)} className={mobileLink}>
              My Blogs
            </NavLink>
          </nav>

          <div className="mt-4 border-t border-surface-border pt-4">
            {isLoggedIn ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-tint text-sm font-semibold text-accent-tint-text">
                    {userName[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-text-primary">{userName}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border px-3 py-2 text-xs font-medium text-error transition-colors duration-200 hover:border-error hover:bg-error-tint"
                >
                  <LogOut size={14} />
                  Log out
                </button>
              </div>
            ) : (
              <NavLink
                to="/auth/login"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-sm font-medium text-text-on-accent transition-colors hover:bg-accent-hover"
              >
                <LogIn size={15} />
                Sign in
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
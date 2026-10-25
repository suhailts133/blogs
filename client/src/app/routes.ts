import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import MyBlogs from "../pages/MyBlogs";
import Login from "../features/auth/components/Login";
import AuthLayout from "../layouts/AuthLayout";
import Signup from "../features/auth/components/Signup";
import Otp from "../features/auth/components/Otp";
import CreateBlogForm from "../features/blogs/components/CreateBlogForm";
import EditBlogForm from "../features/blogs/components/EditBlogForm";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "my-blogs", Component: MyBlogs },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "verify-otp", Component: Otp },
    ],
  },
  {
    path: "blog",
    Component: MainLayout,
    children: [
      { path: "new", Component: CreateBlogForm },
      { path: "edit/:id", Component: EditBlogForm },
    ],
  },
]);

export default router;

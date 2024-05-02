import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import BlogSharedLayout from "./components/BlogComponents/BlogSharedLayout/BlogSharedLayout";
import BlogAddForms from "./pages/Blog/BlogAddForms/BlogAddForms";
import HomePage from "./pages/HomePage/HomePage";
import BlogMainPage from "./pages/Blog/BlogMainPage/BlogMainPage";
import BlogSinglePage from "./pages/Blog/BlogSinglePage/BlogSinglePage";
import NotFound from "./pages/NotFound/NotFound";
import { getAllTripsLoader, getTripByIdLoader } from "./services/requests";
import AppBar from "./components/Shared/AppBar/AppBar";
import Root from "./components/Shared/Root/Root";
import Profile from "./pages/Blog/Profile/Profile";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader() {
    //   // Our root route always provides the user, if logged in
    //   return { user: fakeAuthProvider.username };
    // },
    //element: <AppBar isLoggedIn={false} />, //true for logged User
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      //----
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      {
        index: true,
        element: <HomePage />,
        // loader: getCategoriesLoder,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/blog-main",

            children: [
              {
                index: true,
                element: <BlogMainPage />,
                loader: getAllTripsLoader,
              },
              {
                path: "/blog-main/:travel_id",
                element: <BlogSinglePage />,
                loader: getTripByIdLoader,
              },
            ],
          },
          { path: "/add-form", element: <BlogAddForms /> },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
const Routes = () => {
  const { token } = useAuth();
  console.log("in Routes");
  //Route configurations go here

  return <RouterProvider router={router} />;
};

export default Routes;

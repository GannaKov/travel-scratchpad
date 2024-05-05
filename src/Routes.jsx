import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BlogSharedLayout from "./components/BlogComponents/BlogSharedLayout/BlogSharedLayout";
import BlogAddForms from "./pages/Blog/BlogAddForms/BlogAddForms";
import HomePage from "./pages/HomePage/HomePage";
import BlogMainPage from "./pages/Blog/BlogMainPage/BlogMainPage";
import BlogSinglePage from "./pages/Blog/BlogSinglePage/BlogSinglePage";
import NotFound from "./pages/NotFound/NotFound";
import {
  getAllOwnerTripsLoader,
  getAllTripsLoader,
  getCountriesOptions,
  getTripByIdLoader,
} from "./services/requests";
import AppBar from "./components/Shared/AppBar/AppBar";
import Root from "./components/Shared/Root/Root";
import Profile from "./pages/Blog/Profile/Profile";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import { useEffect, useState } from "react";
import useAuth from "./context/useAuthHook";

const Routes = () => {
  const { token } = useAuth();
  const [countriesOptions, setCountriesOptions] = useState();
  const [selectedCountryHome, setSelectedCountryHome] = useState(null);
  const [selectedCountryBlog, setSelectedCountryBlog] = useState(null);
  // const query = {};
  // if (selectedCountry) {
  //   query.country = selectedCountry;
  // }

  useEffect(() => {
    getCountriesOptions()
      .then((result) => {
        const countryNames = result.data.map((country) => country.name.common);
        setCountriesOptions(countryNames);
      })
      .catch((error) => console.log(error.status, error.message));
  }, [setCountriesOptions]);

  //Route configurations go here
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",

      element: <Root />,
      errorElement: <NotFound />,
      children: [
        //----
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Signup /> },
        {
          index: true,
          element: (
            <HomePage
              selectedCountry={selectedCountryHome}
              setSelectedCountry={setSelectedCountryHome}
              countriesOptions={countriesOptions}
            />
          ),
          loader: async () => {
            const query = {};
            if (selectedCountryHome) {
              query.country = selectedCountryHome;
            }
            return await getAllTripsLoader(query);
          },
          // loader: () => getAllTripsLoader(query),
        },
        {
          path: "/:travel_id",
          element: <BlogSinglePage />,
          loader: getTripByIdLoader,
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/blog-main",

              children: [
                {
                  index: true,
                  element: (
                    <BlogMainPage
                      selectedCountry={selectedCountryBlog}
                      setSelectedCountry={setSelectedCountryBlog}
                      countriesOptions={countriesOptions}
                    />
                  ),
                  //loader: () => getAllOwnerTripsLoader(token, query),
                  loader: async () => {
                    const query = {};
                    if (selectedCountryBlog) {
                      query.country = selectedCountryBlog;
                    }
                    return await getAllOwnerTripsLoader(token, query);
                  },
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

  return <RouterProvider router={router} />;
};

export default Routes;

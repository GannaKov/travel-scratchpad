import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

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
  getTripsPurposes,
  // refreshToken,
} from "./services/requests";

import Root from "./components/Shared/Root/Root";
import Profile from "./pages/Blog/Profile/Profile";
import ProtectedRoutes from "./utils/ProtectedRoutes";

import { useEffect, useState } from "react";
import useAuth from "./context/useAuthHook";
import ErrorProtectedBoundary from "./components/ErrorProtectedBoundary/ErrorProtectedBoundary";
import ChatPage from "./pages/ChatPage/ChatPage";

const Routes = () => {
  const { token } = useAuth();

  const [countriesOptions, setCountriesOptions] = useState();
  const [purposeOptions, setPurposeOptions] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedCountryHome, setSelectedCountryHome] = useState(null);
  const [selectedCountryBlog, setSelectedCountryBlog] = useState(null);

  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  useEffect(() => {
    getCountriesOptions()
      .then((result) => {
        const countryNames = result.data.map((country) => country.name.common);
        setCountriesOptions(countryNames);
      })
      .catch((error) => console.log(error.status, error.message));
    getTripsPurposes()
      .then((res) => {
        setPurposeOptions(res);
      })
      .catch((error) => console.log(error));
  }, [setCountriesOptions]);

  //Route configurations go here
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",

      element: (
        <Root
          openLogIn={openLogIn}
          setOpenLogIn={setOpenLogIn}
          openSignUp={openSignUp}
          setOpenSignUp={setOpenSignUp}
        />
      ),

      //errorElement: <RootBoundary />,
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: (
            <HomePage
              selectedCountry={selectedCountryHome}
              setSelectedCountry={setSelectedCountryHome}
              countriesOptions={countriesOptions}
              purposeOptions={purposeOptions}
              selectedPurpose={selectedPurpose}
              setSelectedPurpose={setSelectedPurpose}
              setOpenLogIn={setOpenLogIn}
            />
          ),

          loader: async () => {
            const query = {};
            if (selectedCountryHome) {
              query.country = selectedCountryHome;
              query.purpose = selectedPurpose;
            }
            if (selectedPurpose) {
              query.purpose = selectedPurpose;
            }
            return await getAllTripsLoader(query);
          },
        },
        {
          path: "/:travel_id",
          element: <BlogSinglePage />,
          loader: getTripByIdLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/chat-ai",
          element: <ChatPage />,
        },
        {
          element: <ProtectedRoutes />,
          errorElement: <ErrorProtectedBoundary />,
          // errorElement: <NotFound />,
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

                  loader: async () => {
                    if (!token) {
                      return <Navigate to="/" />;
                    }
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
            {
              path: "/add-form",
              element: <BlogAddForms countriesOptions={countriesOptions} />,
            },
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

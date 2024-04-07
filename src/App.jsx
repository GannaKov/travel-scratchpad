import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BlogSharedLayout from "./components/BlogComponents/BlogSharedLayout/BlogSharedLayout";
import BlogAddForms from "./pages/Blog/BlogAddForms/BlogAddForms";
import BlogHomePage from "./pages/Blog/BlogHomePage/BlogHomePage";
import BlogMainPage from "./pages/Blog/BlogMainPage/BlogMainPage";
import BlogSinglePage from "./pages/Blog/BlogSinglePage/BlogSinglePage";
import NotFound from "./pages/NotFound/NotFound";
import { getAllTripsLoader, getTripByIdLoader } from "./services/requests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogSharedLayout />,
    errorElement: <NotFound />,

    children: [
      {
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            Component: BlogHomePage,
            // loader: getCategoriesLoder,
          },
          {
            path: "/blog-main",

            // Component: UsersPage,

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
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

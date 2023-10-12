import React from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import Root from "./routes/Root";
import ErrorPage from "./pages/ErrorPage";
import Tasks from "./pages/Tasks";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster, toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import Calendar from "./pages/Calendar";
import Authentication from "./pages/Authentication";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast(`Something went wrong: ${error.message}`);
    },
  }),
});

const router = createBrowserRouter([
  {
    path: "Authentication",
    element: <Authentication />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "tasks",
            element: <Tasks />,
            children: [{ path: ":taskId" }, { path: "trash" }],
          },
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <IconContext.Provider
        value={{
          size: "1.3em",
          className: "react-icons",
          style: { display: "block" },
        }}
      >
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "var(--theme-black-200)",
              color: "var(--theme-white-100)",
              iconTheme: {
                primary: "var(--theme-primary)",
                secondary: "var(--theme-black-200)",
              },
            },
            error: {
              style: {
                borderBottom: "0.2rem solid var(--theme-red)",
              },
              iconTheme: {
                primary: "var(--theme-red)",
                secondary: "var(--theme-black-200)",
              },
            },
            success: {
              style: {
                borderBottom: "0.2rem solid var(--theme-primary)",
              },
              iconTheme: {
                primary: "var(--theme-primary)",
                secondary: "var(--theme-black-200)",
              },
            },
          }}
          position="bottom-left"
        />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </IconContext.Provider>
    </>
  );
}

export default App;

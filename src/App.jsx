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
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "tasks", element: <Tasks /> },
      { path: "calendar", element: <Calendar /> },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <IconContext.Provider value={{ size: "1.3em" }}>
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "var(--theme-black-200)",
              color: "var(--theme-white-100)",
            },
            error: {
              style: {
                backgroundColor: "var(--theme-red)",
                color: "var(--theme-black-100)",
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

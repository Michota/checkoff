import React from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import Root from "./routes/Root";
import ErrorPage from "./pages/ErrorPage";
import Checklist from "./pages/Checklist";
import { getTasksData } from "./services/tasksAPI";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster, toast } from "react-hot-toast";

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
    children: [{ path: "checklist", element: <Checklist /> }],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <Toaster position="bottom-left" />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;

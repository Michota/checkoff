import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <p>Hello World!</p>
      <Outlet />
    </div>
  );
}

export default Root;

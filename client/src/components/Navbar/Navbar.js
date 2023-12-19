import React from "react";
import { Outlet } from "react-router-dom";

function index() {
  return (
    <div>
      <h1 className={""}>헤드</h1>
      <Outlet />
    </div>
  );
}

export default index;

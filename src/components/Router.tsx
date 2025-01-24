import React from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "@/paths";

const Router: React.FC = () => {
  return (
    <Routes>
      {Paths.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<route.element/>}
        ></Route>
      ))}
    </Routes>
  );
};

export default Router;

import React from "react";
import { router } from "./app.routes";
import FaceExpression from "./features/expression/components/FaceExpression";
import { AuthProvider } from "./features/auth/auth.context";
import { RouterProvider } from "react-router-dom";
import "./features/auth/shared/style/global.scss";
import { SongContextProvider } from "./features/home/song.context";

const App = () => {
  return (
    <>
      <AuthProvider>
        <SongContextProvider>
          <RouterProvider router={router} />
        </SongContextProvider>
      </AuthProvider>
    </>
  );
};

export default App;

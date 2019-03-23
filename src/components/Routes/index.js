import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";
import Login from "../Login";
import Register from "../Register";
import CVManagement from "../CVManagement";
import UploadCVForm from "../CVManagement/UploadCVForm";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <PrivateRoute path="/cv" exact component={CVManagement} />
      <PrivateRoute path="/cv/upload" exact component={UploadCVForm} />
    </BrowserRouter>
  );
}

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";
import AdminRoute from "../common/AdminRoute";
import Login from "../Login";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";
import EditProfile from "../EditProfile/EditProfile";
import CVManagement from "../CVManagement";
import UploadCVForm from "../CVManagement/UploadCVForm";
import Landing from "../Landing";
import NoticePage from "../Notice/NoticePage";
import AddNoticePage from "../Notice/AddNoticePage";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgot" exact component={ForgotPassword} />
      <Route path="/reset/:token" exact component={ResetPassword} />
      <PrivateRoute path="/edit-profile" exact component={EditProfile} />
      <PrivateRoute path="/cv" exact component={CVManagement} />
      <PrivateRoute path="/cv/upload" exact component={UploadCVForm} />
      <Route path="/notice" exact component={NoticePage} />
      <AdminRoute path="/notice/add" exact component={AddNoticePage} />
    </BrowserRouter>
  );
}

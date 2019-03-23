import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  error as errorNotification,
  success as successNotification
} from "react-notification-system-redux";
import { setCurrentUser } from "./user.actions";
import { cvConstants } from "../_constants";

const notificationOpts = {
  title: "",
  message: "",
  position: "tc",
  autoDismiss: 5
};

export const uploadCV = (data, history) => dispatch => {
  dispatch({ type: cvConstants.UPLOAD_START });

  axios
    .post("/api/cv", data)
    .then(async res => {
      // show a success notification for 2s
      dispatch(
        successNotification({
          ...notificationOpts,
          title: "CV Uploaded Successfully!",
          autoDismiss: 2
        })
      );

      // fetch current user for updated info
      const response = await axios.get("/api/users/current_user");
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      const decoded = jwt_decode(token);
      console.log("decoded", decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // Redirect to /cv
      history.push("/cv");

      dispatch({ type: cvConstants.UPLOAD_SUCCESS });
    })
    .catch(err => {
      dispatch(
        errorNotification({
          ...notificationOpts,
          title: err.response.data.message
        })
      );
    });
};

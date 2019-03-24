import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  error as errorNotification,
  success as successNotification
} from "react-notification-system-redux";
import { setCurrentUser } from "./user.actions";
import { cvConstants, SERVER_URL } from "../_constants";

const notificationOpts = {
  title: "",
  message: "",
  position: "tc",
  autoDismiss: 5
};

export const uploadCV = (data, history) => dispatch => {
  dispatch({ type: cvConstants.UPLOAD_START });

  axios
    .post(`${SERVER_URL}/api/cv`, data)
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
      const response = await axios.post("/api/users/current_user");
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

export const fetchCV = () => async dispatch => {
  dispatch({ type: cvConstants.FETCH_CV_START });
  try {
    const res = await axios.get(`${SERVER_URL}/api/cv`);
    const cvUrl = res.data;
    // open a new tab with direct cvUrl
    window.open(cvUrl, "_blank");

    dispatch({ type: cvConstants.FETCH_CV_SUCCESS });
  } catch (err) {
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: err.response.data.message
      })
    );

    // make fetchingCV false
    dispatch({ type: cvConstants.FETCH_CV_SUCCESS });
  }
};

export const fetchCVByRegNo = (batchYear, regNo) => async dispatch => {
  dispatch({ type: cvConstants.FETCH_CV_START });
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/cv/batchYear/${batchYear}/regNo/${regNo}`
    );
    const cvUrl = res.data;
    // open a new tab with direct cvUrl
    window.open(cvUrl, "_blank");

    dispatch({ type: cvConstants.FETCH_CV_SUCCESS });
  } catch (err) {
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: err.response.data.message
      })
    );

    // make fetchingCV false
    dispatch({ type: cvConstants.FETCH_CV_SUCCESS });
  }
};

export const fetchAllCV = (batchYear) => async dispatch => {
  dispatch({ type: cvConstants.FETCH_CV_START });
  try {
    const res = await axios.get(
      `${SERVER_URL}/api/cv/all/batchYear/${batchYear}`
    );
    const cvUrl = res.data;
    // open a new tab with direct cvUrl
    window.open(cvUrl, "_blank");

    dispatch({ type: cvConstants.FETCH_CV_SUCCESS });
  } catch (err) {
    console.log("err", err.response);
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: err.response.data.message
      })
    );

    // make fetchingCV false
    dispatch({ type: cvConstants.FETCH_CV_SUCCESS });
  }
};

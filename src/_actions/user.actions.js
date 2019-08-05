import axios from "axios";
import jwt_decode from "jwt-decode";
import { userConstants } from "../_constants";
import {
  error as errorNotification,
  success as successNotification
} from "react-notification-system-redux";
import setAuthToken from "../utils/setAuthToken";
import { SERVER_URL } from "../_constants";

const notificationOpts = {
  title: "",
  message: "",
  position: "tc",
  autoDismiss: 5
};

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: userConstants.REQUEST });

  axios
    .post(`${SERVER_URL}/api/users/login`, userData)
    .then(res => {
      dispatch(
        successNotification({
          ...notificationOpts,
          title: "Login Successfull!",
          autoDismiss: 1
        })
      );

      // Save to localStorage
      const { token } = res.data;
      // Set toke to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));

      setTimeout(() => history.push("/"), 1000);
    })
    .catch(err => {
      const error = err.response.data;
      // Send validation errors to the reducer
      if (error.type === "validation") {
        return dispatch({
          type: userConstants.ERORRS,
          payload: error.errors
        });
      }
      // Send alert for miscellaneous errors
      dispatch(
        errorNotification({
          ...notificationOpts,
          title: error.message
        })
      );
      dispatch({ type: userConstants.CLEAR_ERRORS });
    });
};

export const registerUser = (userData, history) => dispatch => {
  dispatch({ type: userConstants.REQUEST });

  axios
    .post(`${SERVER_URL}/api/users/register`, userData)
    .then(res => {
      dispatch(
        successNotification({
          ...notificationOpts,
          title: "Registration Successfull!",
          message: res.data.message,
          autoDismiss: 0,
          action: {
            label: "Resend Confirmation Email",
            callback: () => resendConfirmation(userData.email, dispatch)
          }
        })
      );

      dispatch({ type: userConstants.CLEAR_ERRORS });

      setTimeout(() => history.push("/login"), 2000);
    })
    .catch(err => {
      const error = err.response.data;
      // Send validation errors to the reducer
      if (error.type === "validation") {
        return dispatch({
          type: userConstants.ERORRS,
          payload: error.errors
        });
      }
      // Send alert for miscellaneous errors
      dispatch(
        errorNotification({
          ...notificationOpts,
          title: error.message
        })
      );
      dispatch({ type: userConstants.CLEAR_ERRORS });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: userConstants.SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  dispatch({ type: userConstants.LOGOUT });
};

const resendConfirmation = async (userEmail, dispatch) => {
  try {
    const res = await axios.post(`${SERVER_URL}/api/users/resendToken`, {
      email: userEmail
    });
    dispatch(
      successNotification({
        ...notificationOpts,
        title: res.data.message,
        autoDismiss: 0
      })
    );
  } catch (error) {
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: error.response.data.message
      })
    );
  }
};

export const editProfile = userData => async dispatch => {
  dispatch({ type: userConstants.REQUEST });

  try {
    const res = await axios.post(
      `${SERVER_URL}/api/users/edit-profile`,
      userData
    );

    dispatch(
      successNotification({
        ...notificationOpts,
        title: res.data.message
      })
    );

    // fetch current user for updated info
    const response = await axios.post(`${SERVER_URL}/api/users/current_user`);
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    const error = err.response.data;
    // Send validation errors to the reducer
    if (error.type === "validation") {
      return dispatch({
        type: userConstants.ERORRS,
        payload: error.errors
      });
    }
    // Send alert for miscellaneous errors
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: error.message
      })
    );
    dispatch({ type: userConstants.CLEAR_ERRORS });
  }
};

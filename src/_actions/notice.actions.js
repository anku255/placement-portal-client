import axios from "axios";
import {
  error as errorNotification,
  success as successNotification
} from "react-notification-system-redux";
import { noticeConstants, SERVER_URL } from "../_constants";

const notificationOpts = {
  title: "",
  message: "",
  position: "tc",
  autoDismiss: 5
};

export const fetchNotices = (page = 1) => async dispatch => {
  dispatch({ type: noticeConstants.FETCH_NOTICE_START });
  try {
    const res = await axios.get(`${SERVER_URL}/api/notice?page=${page}`);

    dispatch({
      type: noticeConstants.FETCH_NOTICE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: err.response.data.message
      })
    );

    dispatch({ type: noticeConstants.FETCH_NOTICE_ERROR });
  }
};

export const addNotice = (data, history) => async dispatch => {
  dispatch({ type: noticeConstants.ADD_NOTICE_START });
  try {
    const res = await axios.post(`${SERVER_URL}/api/notice`, data);

    dispatch({ type: noticeConstants.ADD_NOTICE_SUCCESS, payload: res.data });
    dispatch(
      successNotification({
        ...notificationOpts,
        title: "Notice added successfully!"
      })
    );
    history.push("/notice");
  } catch (err) {
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: err.response.data.message
      })
    );

    dispatch({ type: noticeConstants.ADD_NOTICE_ERROR });
  }
};

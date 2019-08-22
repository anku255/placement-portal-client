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
export const deleteNotice = noticeId => async dispatch => {
  try {
    await axios.delete(`${SERVER_URL}/api/notice/${noticeId}`);

    dispatch(
      successNotification({
        ...notificationOpts,
        title: "Notice deleted successfully!"
      })
    );

    dispatch(fetchNotices());
  } catch (err) {
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: err.response.data.message
      })
    );
  }
};
export const editNotice = (noticeId, data, history) => async dispatch => {
  try {
    await axios.put(`${SERVER_URL}/api/notice/${noticeId}`, data);

    dispatch(
      successNotification({
        ...notificationOpts,
        title: "Notice edited successfully!"
      })
    );

    history.push("/notice");
    dispatch(fetchNotices());
  } catch (err) {
    dispatch(
      errorNotification({
        ...notificationOpts,
        title: err.response.data.message
      })
    );
  }
};

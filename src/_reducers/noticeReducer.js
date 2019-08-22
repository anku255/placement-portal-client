import { noticeConstants } from "../_constants";

const initialState = {
  loading: false,
  addingNotice: false,
  notices: [],
  totalPages: 0
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case noticeConstants.ADD_NOTICE_START:
      return {
        ...state,
        addingNotice: true
      };
    case noticeConstants.ADD_NOTICE_SUCCESS:
      return {
        ...state,
        addingNotice: false
      };
    case noticeConstants.ADD_NOTICE_ERROR:
      return {
        ...state,
        addingNotice: false
      };
    case noticeConstants.FETCH_NOTICE_START:
      return {
        ...state,
        loading: true
      };
    case noticeConstants.FETCH_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        notices: action.payload.notices,
        totalPages: action.payload.pages
      };
    case noticeConstants.FETCH_NOTICE_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

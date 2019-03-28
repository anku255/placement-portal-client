import { cvConstants } from "../_constants";

const initialState = {
  uploading: false,
  fetchingCV: false,
  usersWithCV: [],
  fetchingUsers: false
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case cvConstants.UPLOAD_START:
      return {
        ...state,
        uploading: true
      };
    case cvConstants.UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false
      };
    case cvConstants.FETCH_CV_START:
      return {
        ...state,
        fetchingCV: true
      };
    case cvConstants.FETCH_CV_SUCCESS:
      return {
        ...state,
        fetchingCV: false
      };
    case cvConstants.FETCH_USERS_CV_START:
      return {
        ...state,
        fetchingUsers: true
      };
    case cvConstants.FETCH_USERS_CV_SUCCESS:
      return {
        ...state,
        fetchingUsers: false,
        usersWithCV: action.payload || []
      };
    default:
      return state;
  }
}

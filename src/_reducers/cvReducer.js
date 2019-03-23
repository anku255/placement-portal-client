import { cvConstants } from "../_constants";

const initialState = {
  uploading: false
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
    default:
      return state;
  }
}

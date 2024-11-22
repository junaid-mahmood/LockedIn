import {
  ADD_GROUP,
  ADD_INPUT_BOX,
  DELETE_INPUT_BOX,
  SHOW_FLASH_CARDS,
  PROCESS_PDF,
  PDF_PROCESSING_ERROR,
} from "../actionTypes";

const initialState = {
  inputData: [],
  groupData: [],
  showNum: 0,
  pdfProcessing: false,
  pdfError: null,
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INPUT_BOX:
      return {
        ...state,
        inputData: [...state.inputData, action.payloade],
      };

    case DELETE_INPUT_BOX:
      const newInputData = state.inputData.filter(
        (elem, index) => index !== action.payloade
      );
      return {
        ...state,
        inputData: newInputData,
      };

    case ADD_GROUP:
      return {
        ...state,
        groupData: [...state.groupData, action.payloade],
        inputData: [],
      };

    case SHOW_FLASH_CARDS:
      return {
        ...state,
        showNum: action.payloade,
      };

    case PROCESS_PDF:
      return {
        ...state,
        pdfProcessing: true,
        pdfError: null,
      };

    case PDF_PROCESSING_ERROR:
      return {
        ...state,
        pdfProcessing: false,
        pdfError: action.payload,
      };

    default:
      return state;
  }
};

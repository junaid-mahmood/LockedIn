import {
  ADD_GROUP,
  ADD_INPUT_BOX,
  DELETE_INPUT_BOX,
  SHOW_FLASH_CARDS,
} from "../actionTypes";

export const addInputBox = (data) => ({
  type: ADD_INPUT_BOX,
  payloade: data,
});

export const deleteInputBox = (data) => ({
  type: DELETE_INPUT_BOX,
  payloade: data,
});

export const addGroup = (data) => ({
  type: ADD_GROUP,
  payloade: data,
});

export const showFalshCard = (data) => ({
  type: SHOW_FLASH_CARDS,
  payloade: data,
});

import { api } from "../../config/api";

import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEMS_BY_RESTAORANT_ID_FAILURE,
  GET_MENU_ITEMS_BY_RESTAORANT_ID_REQUEST,
  GET_MENU_ITEMS_BY_RESTAORANT_ID_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVALIABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVALIABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVALIABILITY_SUCCESS,
} from "./ActionType";

export const createMenuItem = ({ menu, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.post("api/admin/food", menu, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created menu", data);
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const getMenuItemsByRestaurantId=(reqData)=>{
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAORANT_ID_REQUEST });
    try {
      const { data } = await api.get(
        `api/food/restaurant/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("get Menu Items By Restaurant Id", data);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAORANT_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAORANT_ID_FAILURE,
        payload: error,
      });
    }
  };
}

export const getMenuItemsByRestaurantIdUser = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAORANT_ID_REQUEST });
    try {
      const { data } = await api.get(
        `api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("get Menu Items By Restaurant Id", data);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAORANT_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAORANT_ID_FAILURE,
        payload: error,
      });
    }
  };
};

export const searchMenuItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/food/search?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("searchMenuItem", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const updateMenuItemsAvaliability = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVALIABILITY_REQUEST });
    try {
      const { data } = await api.put(
        `api/admin/food/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("updateMenuItemsAvaliability", data);
      dispatch({ type: UPDATE_MENU_ITEMS_AVALIABILITY_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: UPDATE_MENU_ITEMS_AVALIABILITY_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteMenuItem = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`api/admin/food/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("deleteMenuItem", data);
      dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: DELETE_MENU_ITEM_FAILURE,
        payload: error,
      });
    }
  };
};

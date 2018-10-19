export const GET_MENUITEMS = 'GET_MENUITEMS';
export const GET_MENUITEMS_SUCCESS = 'GET_MENUITEMS_SUCCESS';
export const GET_MENUITEMS_FAIL = 'GET_MENUITEMS_FAIL';
export const SELECT_MENUITEM = 'SELECT_MENUITEM';

const initialState = {
  menuItems: [],
  selectedMenuItem: null
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENUITEMS:
      return {
        ...state,
        menuSceneLoading: true
      };

    case GET_MENUITEMS_SUCCESS:
      return {
        ...state,
        menuSceneLoading: false,
        menuItems: action.payload.data
      };

    case GET_MENUITEMS_FAIL:
      return {
        ...state,
        menuSceneLoading: false,
        menuSceneError: 'Error while fetching menu items'
      };

    case SELECT_MENUITEM:
      return {
        ...state,
        selectedMenuItem: action.payload
      }

    default:
      return state;
  }
};

export const getMenuItems = (restaurantId) => {
  return {
    type: GET_MENUITEMS,
    payload: {
      request: {
        url: `restaurants/${restaurantId}/menus`
      }
    }
  };
}

export const selectedMenuItem = (menuItem) => {
  return {
    type: SELECT_MENUITEM,
    payload: menuItem
  };
}
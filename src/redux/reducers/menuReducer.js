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

  // TODO: Remove this once the API is ready
  let stubMenuItem = menuItem;

  if (menuItem.hasOwnProperty('id')) {
    switch (menuItem.id) {
      case 3: // Taco Mexica
        stubMenuItem = {
          "name": "tacoMexica",
          "selected": false,
          "loading": 'NONE',
          "icon_img": require("../../res/tacoMexica/tacoMexica.jpg"),
          "obj": require("../../res/tacoMexica/tacoMexica.vrx"),
          "materials": null,
          "animation": { name: "01", delay: 0, loop: true, run: true },
          "scale": [.01, .01, .01],
          "position": [0, 5 * .05, 0],
          "type": "VRX",
          "physics": undefined,
          "ref_pointer": undefined,
          // "shadow_width": 10.5,
          // "shadow_height": 10.5,
          // "spotlight_position_y": 19,
          // "lighting_mode": "IBL",
          "resources": [
            require('../../res/tacoMexica/DiffuseMap_0.jpg'),
            require('../../res/tacoMexica/NormalMap_0.jpg')
          ],
        };
        break;
      case 4: // Nacho
        stubMenuItem = {
          "name": "nachos",
          "selected": false,
          "loading": 'NONE',
          "icon_img": require("../../res/nachos/nachos.jpg"),
          "obj": require("../../res/nachos/nachos.vrx"),
          "materials": null,
          "animation": { name: "01", delay: 0, loop: true, run: true },
          "scale": [.01, .01, .01],
          "position": [0, 5 * .05, 0],
          "type": "VRX",
          "physics": undefined,
          "ref_pointer": undefined,
          // "shadow_width": 10.5,
          // "shadow_height": 10.5,
          // "spotlight_position_y": 19,
          // "lighting_mode": "IBL",
          "resources": [
            require('../../res/nachos/DiffuseMap_0.jpg'),
            require('../../res/nachos/NormalMap_0.jpg')
          ],
        };
        break;
      case 56: // Signature Crepe
        stubMenuItem = {
          "name": "signatureCrepe",
          "selected": false,
          "loading": 'NONE',
          "icon_img": require("../../res/signatureCrepe/signatureCrepe.jpg"),
          "obj": require("../../res/signatureCrepe/signatureCrepe.vrx"),
          "materials": null,
          "animation": { name: "01", delay: 0, loop: true, run: true },
          "scale": [.01, .01, .01],
          "position": [0, 5 * .05, 0],
          "type": "VRX",
          "physics": undefined,
          "ref_pointer": undefined,
          // "shadow_width": 10.5,
          // "shadow_height": 10.5,
          // "spotlight_position_y": 19,
          // "lighting_mode": "IBL",
          "resources": [
            require('../../res/signatureCrepe/DiffuseMap_0.jpg'),
            require('../../res/signatureCrepe/NormalMap_0.jpg')
          ],
        };
        break;
      case 81: // Green Tea Rolled Ice Cream
        stubMenuItem = {
          "name": "greenTeaRolledIceCream",
          "selected": false,
          "loading": 'NONE',
          "icon_img": require("../../res/greenTeaRolledIceCream/greenTeaRolledIceCream.jpg"),
          "obj": require("../../res/greenTeaRolledIceCream/greenTeaRolledIceCream.vrx"),
          "materials": null,
          "animation": { name: "01", delay: 0, loop: true, run: true },
          "scale": [.01, .01, .01],
          "position": [-20, -100, 0],
          "type": "VRX",
          "physics": undefined,
          "ref_pointer": undefined,
          // "shadow_width": 10.5,
          // "shadow_height": 10.5,
          // "spotlight_position_y": 19,
          // "lighting_mode": "IBL",
          "resources": [
            require('../../res/greenTeaRolledIceCream/DiffuseMap_0.jpg'),
            require('../../res/greenTeaRolledIceCream/NormalMap_0.jpg')
          ],
        };
        break;
      default:
        stubMenuItem = menuItem;
        break;
    }
  }
  
  return {
    type: SELECT_MENUITEM,
    payload: stubMenuItem
  };
}


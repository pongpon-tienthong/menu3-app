export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const GET_RESTAURANTS_SUCCESS = 'GET_RESTAURANTS_SUCCESS';
export const GET_RESTAURANTS_FAIL = 'GET_RESTAURANTS_FAIL';
export const SELECT_RESTAURANT = 'SELECT_RESTAURANT';

const initialState = {
  restaurants: [],
  selectedRestaurant: null
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurantSceneLoading: true
      };

    case GET_RESTAURANTS_SUCCESS:
      return {
        ...state,
        restaurantSceneLoading: false,
        restaurants: action.payload.data
      };

    case GET_RESTAURANTS_FAIL:
      return {
        ...state,
        restaurantSceneLoading: false,
        restaurantSceneError: 'Error while fetching restaurants'
      };

    case SELECT_RESTAURANT:
      return {
        ...state,
        selectedRestaurant: action.payload
      };

    default:
      return state;
  }
}

export const getRestaurants = () => {
  return {
    type: GET_RESTAURANTS,
    payload: {
      request: {
        url: 'restaurants'
      }
    }
  };
}

export const selectRestaurant = (restaurant) => {
  return {
    type: SELECT_RESTAURANT,
    payload: restaurant
  };
}
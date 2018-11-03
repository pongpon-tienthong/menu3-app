/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import *  as UIConstants from '../UIConstants';

export const AR_TRACKING_INITIALIZED = 'AR_TRACKING_INITIALIZED';

const initialState = {
  // currentScreen: UIConstants.SHOW_MAIN_SCREEN,
  listMode: UIConstants.LIST_MODE_MODEL,
  // listTitle: UIConstants.LIST_TITLE_MODELS,
  currentItemSelectionIndex: -1,
  // currentItemClickState: '',
  // currentEffectSelectionIndex: 0,
  arTrackingInitialized: false,
}

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'DISPLAY_UI_SCREEN':
    //   return {
    //     ...state,
    //     currentScreen: action.ui,
    //   };
    case 'SWITCH_LIST_MODE':
      return {
        ...state,
        listMode: action.listMode,
        // listTitle: action.listTitle,
      };
    case 'CHANGE_ITEM_CLICK_STATE':
      return {
        ...state,
        currentItemSelectionIndex: action.index,
        // currentItemClickState: action.clickState,
        // currentSelectedItemType: action.itemType,
      };
    // case 'TOGGLE_EFFECT_SELECTED':
    //   return {
    //     ...state,
    //     currentEffectSelectionIndex: action.index,
    //   };
    // case 'REMOVE_ALL':
    //   return {
    //     ...state,
    //     currentEffectSelectionIndex: 0,
    //   }
    case AR_TRACKING_INITIALIZED:
      return {
        ...state,
        arTrackingInitialized: action.trackingNormal,
      }
    default:
      return state;
  }
}

// action to show / hide AR Initialization UI to guide user to move device around
export const ARTrackingInitialized = (trackingNormal) => {
  return {
    type: AR_TRACKING_INITIALIZED,
    trackingNormal: trackingNormal,
  };
}
import {DELETE_TAB, SET_ASSET, SET_FILES, SET_LOADING_ASSET, SET_LOADING_FILES, SET_TAB_ACTIVE} from "../action_types";
import _ from 'lodash';

let defaultStates = {
    files: null,
    loading_files: false,
    loading_asset: false,
    asset_tabs: [],
    tab_active: null,
    saving: false
};

const app = (state = defaultStates, action ) => {
    switch (action.type){
        case SET_FILES:
            return {...state, files: action.files};
        case SET_LOADING_FILES:
            return {...state, loading_files: action.status};
        case SET_LOADING_ASSET:
            return {...state, loading_asset: action.status};
        case SET_ASSET:

            let assetTabs = _.cloneDeep(state.asset_tabs);

            let foundAsset = false;
            for (let i = 0; i < assetTabs.length; i++){
                if (assetTabs[i].key == action.key){
                    assetTabs[i].value = action.value;
                    assetTabs[i].hasChange = action.hasChange;
                    foundAsset = true;
                    break;
                }
            }

            if (!foundAsset) {
                assetTabs.push({
                    key: action.key,
                    value: action.value,
                    hasChange: false
                });
            }
            let assetActive = state.tab_active;
            if (assetActive !== action.key)
                assetActive = action.key;
            return {...state, asset_tabs: assetTabs, tab_active: assetActive};
        case SET_TAB_ACTIVE:
            return {...state, tab_active: action.tab};
        case DELETE_TAB:
            let tabsClone = _.cloneDeep(state.asset_tabs);
            let assetIndex = -1;
            let assetActive1 = state.tab_active;
            for (let i = 0; i < tabsClone.length; i++){
                if (tabsClone[i].key == action.key){
                   assetIndex = i;
                   if (assetActive1 == action.key)
                       if (i > 0)
                           assetActive1 = tabsClone[i - 1].key;
                       else if (tabsClone.length > 1){
                           assetActive1 = tabsClone[1].key;
                       }
                       else{
                           assetActive1 = null;
                       }
                    break;
                }
            }
            if (assetIndex !== -1)
                tabsClone.splice(assetIndex, 1);
            return {...state, asset_tabs: tabsClone, tab_active: assetActive1};
        default:
            return {...state};
    }
}

export default app;

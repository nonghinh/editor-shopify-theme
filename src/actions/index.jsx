import axios from "axios";
import {BASE_URL} from "../config";
import {
    DELETE_TAB,
    SET_ASSET,
    SET_FILES,
    SET_LOADING_ASSET,
    SET_LOADING_FILES,
    SET_SAVING,
    SET_TAB_ACTIVE
} from "../action_types";
import {toast} from "react-toastify";

export const getFiles = () => {
    return (dispatch) => {
        dispatch(setLoadingFiles(true));
        return axios.get(`${BASE_URL}/api/theme`)
            .then(res => {
                dispatch(setLoadingFiles(false));
                if (res.data.success){
                    dispatch(setFiles(res.data.files));
                }
            })
            .catch(err => {
                dispatch(setLoadingFiles(false));
            })
    }
}
export const setFiles = (files) => {
    return {
        type: SET_FILES,
        files
    }
}

export const setLoadingFiles = (status) => {
    return {
        type: SET_LOADING_FILES,
        status
    }
}

export const getAsset = (key) => {
    return (dispatch) => {
        dispatch(setLoadingAsset(true));

        return axios.get(`${BASE_URL}/api/asset?key=${key}`)
            .then(res => {
                dispatch(setLoadingAsset(false));

                if (res.data.success){
                    dispatch(setAsset(key, res.data.value));
                }
            })
            .catch(err => {
                dispatch(setLoadingAsset(false));
            })
    }
}

export const setAsset = (key, value, hasChange) => {
    hasChange = hasChange || false;
    return {
        type: SET_ASSET,
        value,
        key,
        hasChange
    }
}
export const setLoadingAsset = (status) => {
    return {
        type: SET_LOADING_ASSET,
        status
    }
}

export const setTabActive = (tab) => {
    return {
        type: SET_TAB_ACTIVE,
        tab
    }
}
export const deleteTab = (key) => {
    return {
        type: DELETE_TAB,
        key
    }
}

export const saveCode = (data) => {
    return (dispatch) => {
        dispatch(setSaving(true));
        return axios.post(`${BASE_URL}/api/save`, data)
            .then(res => {
                dispatch(setSaving(false));
                if (res.data.success){
                    toast('Code saved');
                    dispatch(setAsset(data.key, data.code, false));
                }
                else{
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                toast.error('Has error while saving code');
                dispatch(setSaving(false));
            })
    }
}

export const setSaving = (status) => {
    return {
        type: SET_SAVING,
        status
    }
}

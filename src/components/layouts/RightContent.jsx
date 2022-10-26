import TopBarEditor from "./TopBarEditor";
import CodeEditor from "../CodeEditor";
import TabCode from "./TabCode";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {getAsset, setTabActive} from "../../actions";
export default function RightContent(){
    const {tab_active, asset_tabs, files, loading_files, loading_asset} = useSelector(state => ({
        tab_active: state.app.tab_active,
        asset_tabs: state.app.asset_tabs,
        files: state.app.files,
        loading_files: state.app.loading_files,
        loading_asset: state.app.loading_asset,
    }));

    const dispatch = useDispatch();
    const {search} = useLocation();
    console.log(search)
    const url = useMemo(() => new URLSearchParams(search), [search]);
    const assetKey = url.get('asset');

    useEffect(function (){
        if (assetKey && !tab_active){
            dispatch(setTabActive(assetKey));
        }
    }, []);

    useEffect(function (){
        if (loading_asset) return;
        if (assetKey){
            let hasAsset = false;
            for (let i = 0; i < asset_tabs.length; i++){
                if (asset_tabs[i].key == asset_tabs){
                    hasAsset = true;
                }
            }
            if (!hasAsset){
                dispatch(getAsset(assetKey));
            }
        }
    }, [assetKey, loading_files]);

    return <div className="right-content">
        <TabCode />
        <TopBarEditor />
        <div className="tab-contents">
            {!files ? <div>...</div> :
                asset_tabs.map((item, index) => <div className={`tab-content-item ${tab_active == item.key ? 'active' : ''}`} key={index}>
                        <CodeEditor assetKey={item.key} value={item.value} />
                    </div>)
            }

        </div>
    </div>
}
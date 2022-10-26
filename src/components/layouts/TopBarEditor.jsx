import {useDispatch, useSelector} from "react-redux";
import {saveCode} from "../../actions";

export default function TopBarEditor(){
    const {tab_active, asset_tabs, saving} = useSelector(state => ({
        tab_active: state.app.tab_active,
        asset_tabs: state.app.asset_tabs,
        saving: state.app.saving,
    }));

    const dispatch = useDispatch();

    const handleSaveCode = () => {
        if (saving || !tab_active) return;
        let key = tab_active;
        let code = null;
        for (let i = 0; i < asset_tabs.length; i++){
            if (asset_tabs[i].key == tab_active){
                code = asset_tabs[i].value;
                break;
            }
        }

        if (key && code !== null){
            dispatch(saveCode({key, code}));
        }
    }

    return <div className="topbar-editor">
        <div className="right-action">
            <button type="button" className="btn btn-success" onClick={handleSaveCode} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
    </div>
}
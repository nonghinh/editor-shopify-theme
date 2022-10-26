import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteTab, setTabActive} from "../../actions";
import {IconX} from "../../icons";
import {PATH_PREFIX} from "../../config";

export default function TabCode() {
    const {tab_active, asset_tabs, loading_asset} = useSelector(state => ({
        tab_active: state.app.tab_active,
        asset_tabs: state.app.asset_tabs,
        loading_asset: state.app.loading_asset
    }));
    const dispatch = useDispatch();
    const handleClickTab = (key) => {
        if (loading_asset) return false;
        dispatch(setTabActive(key));
    }
    const handleDeleteTab = (key) =>{
        dispatch(deleteTab(key));
    }

    return <div className="tab-code">
        <div className="tab-list">
            {asset_tabs.map((item, index) => <div className={`tab-item ${item.key == tab_active ? 'active' : ''}`} key={index}>
                <Link to={`${PATH_PREFIX}/?asset=${item.key}`}
                      onClick={() => handleClickTab(item.key)}>{getNameByKey(item.key)}</Link>
                <button class={'button-delete-tab'} onClick={()=>handleDeleteTab(item.key)}><i className="icon-svg"><IconX /></i></button>
            </div>)}
        </div>
    </div>

    function getNameByKey(key) {
        let nameArr = key.split('/');
        if (nameArr.length > 1)
            nameArr.splice(0, 1);
        return nameArr.join('/');
    }

}
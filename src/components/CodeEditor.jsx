import CodeMirror from "@uiw/react-codemirror";
import {darcula} from "@uiw/codemirror-theme-darcula";
import {html} from "@codemirror/lang-html";
import {useDispatch, useSelector} from "react-redux";
import {setAsset} from "../actions";

export default function CodeEditor({assetKey, value}){
    value = value || '';
    const {saving} = useSelector(state => ({
        saving: state.app.saving
    }))
    const dispatch = useDispatch();
    const handleChange = (codeVal) => {
        dispatch(setAsset(assetKey, codeVal, true));
    }
    return <div className="code-editor">
        <CodeMirror theme={darcula} value={value} height={'100%'} editable={!saving} extensions={[html()]} onChange={handleChange} />
    </div>
}
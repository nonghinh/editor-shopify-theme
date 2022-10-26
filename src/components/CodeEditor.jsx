import CodeMirror from "@uiw/react-codemirror";
import {darcula} from "@uiw/codemirror-theme-darcula";
import {html} from "@codemirror/lang-html";
import {css} from "@codemirror/lang-css";
import {javascript} from "@codemirror/lang-javascript";
import {json} from "@codemirror/lang-json";
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
    const fileExtension = getFileExtension(assetKey);
    let ext = null;
    switch (fileExtension){
        case 'css':
            ext = css();
            break;
        case 'js':
            ext = javascript();
            break;
        case 'json':
            ext = json();
            break;
        case 'liquid':
        case 'html':
            ext = html();
            break;
        default:
            ext = null;
    }
    return <div className="code-editor">
        <CodeMirror theme={darcula} value={value} height={'100%'} editable={!saving} extensions={ext ? [ext] : []} onChange={handleChange} />
    </div>

    function getFileExtension(file){
        let arr = file.split('.');
        return arr[arr.length - 1];
    }
}
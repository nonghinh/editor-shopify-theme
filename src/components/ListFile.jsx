import {IconCodeSlash, IconFolderFill} from "../icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getFiles} from "../actions";
import {Link} from "react-router-dom";

export default function ListFile(){
    const {files, loading_files, tab_active} = useSelector(state => ({
        files: state.app.files,
        loading_files: state.app.loading_files,
        tab_active: state.app.tab_active
    }));
    const dispatch = useDispatch();

    useEffect(function (){
       if (files === null  && !loading_files)
           dispatch(getFiles());
    }, []);

    const [collapseFolders, setCollapseFolders] = useState({});

    const handleCollapseFolder = (key) => {
        let value = false;
        if (typeof collapseFolders[key] === 'undefined' || collapseFolders[key] === false){
            value = true;
        }
        setCollapseFolders(data => ({...data, [key]: value}));
    }

    if (!files || loading_files)
        return <div>Loading...</div>
    if (!files.length)
        return <div>No file</div>

    return <ul className="list-files">
        {files ? files.map((item, index ) => <li className={`folder-item ${collapseFolders[item.name] ? 'folder-collapsed' : ''}`} key={index}>
            <a href="#" className="folder-name" onClick={()=>handleCollapseFolder(item.name)}>
                <i className="icon-svg"><IconFolderFill /></i> {item.name}
            </a>
            <ul className="sub-files">
                {item.files.map((fileItem, i) => <li className={`file-item ${tab_active == item.name.toLowerCase()+'/'+fileItem ? 'active' : ''}`} key={i}>
                    <Link to={`/?asset=${item.name.toLowerCase()}/${fileItem}`} className="file-name">
                        <i className="icon-svg"><IconCodeSlash /></i> {fileItem}
                    </Link>
                </li>)}
            </ul>
        </li> ) : ('')}
    </ul>
}
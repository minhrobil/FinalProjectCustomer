import React from 'react';
import './style.css';
import { Icon, Checkbox } from 'antd';

class LargeFolder extends React.Component {

    render() {
        return (
            <div className="large-item">
                <div className="large-item-header">
                    <Checkbox style={{ float: "left", padding: "0px 2px" }}></Checkbox>
                    <Icon type="close" className="icon-close-file" />
                </div>
                <div className="large-item-body" align="center">
                    <Icon type="folder" theme="filled" style={{ fontSize: "4em", color: "#3372A7" }} />
                </div>
                <div className="large-item-footer" align="center">
                    <p>Footer</p>
                </div>
            </div>
        )
    }
}

export default LargeFolder;
import React from 'react';
import './style.css';
import { Icon, Checkbox } from 'antd';

class LargeDoc extends React.Component {

    render() {
        return (
            <div className="large-item">
                <div className="large-item-header">
                    <Checkbox style={{ float: "left", padding: "0px 2px" }}></Checkbox>
                    <Icon type="close" className="icon-close-file" />
                </div>
                <div className="large-item-body" align="center">
                    <Icon type="file-word" theme="filled" className="icon-body" />
                </div>
                <div className="large-item-footer" align="center">
                    <p>Footer</p>
                </div>
            </div>
        )
    }
}

export default LargeDoc;
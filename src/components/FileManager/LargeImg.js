import React from 'react';
import './style.css';
import { Icon, Checkbox } from 'antd';

class LargeImg extends React.Component {

    render() {
        return (
            <div className="large-item">
                <div className="large-item-header">
                    <Checkbox style={{ float: "left", padding: "0px 2px" }}></Checkbox>
                    <Icon type="close" className="icon-close-file" />
                </div>
                <div className="large-item-body" align="center">
                    <img
                        src="https://farm4.staticflickr.com/3364/3409068082_6a1a259908_z.jpg"
                        alt="img-thumbnail"
                        style={{ maxHeight: "70px", width: "100%" }}
                    ></img>
                </div>
                <div className="large-item-footer" align="center">
                    <p>Footer</p>
                </div>
            </div>
        )
    }
}

export default LargeImg;
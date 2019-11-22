import React from 'react';
import './style.css';
import { Icon, Checkbox } from 'antd';

class LargeVideo extends React.Component {

    render() {
        return (
            <div className="large-item">
                <div className="large-item-header">
                    <Checkbox style={{ float: "left", padding: "0px 2px" }}></Checkbox>
                    <Icon type="close" className="icon-close-file" />
                </div>
                <div className="large-item-body" align="center">
                    <img
                        src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/74693217_1627034250770746_4235880778073899008_n.jpg?_nc_cat=103&_nc_oc=AQlmhuoIviFFat53IDXx5Bmt4kkv0RnZjFmAElWIHXp_I-6-gGZ9Y0CMrrQXxpnD0qc&_nc_ht=scontent.fhan2-1.fna&oh=1030041c448fd266cd64ecd51e16341f&oe=5E4CBC48"
                        alt="img-thumbnail"
                        style={{ maxHeight: "70px", width: "100%", objectFit: "cover", verticalAlign: "middle" }}
                    ></img>
                </div>
                <div className="large-item-footer" align="center">
                    <p>Footer</p>
                </div>
            </div>
        )
    }
}

export default LargeVideo;
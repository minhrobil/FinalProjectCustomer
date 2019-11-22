import React from 'react';
import { Row } from 'antd';
import LargeVideo from './LargeVideo';

class ListLargeVideo extends React.Component {

    render() {
        return (
            <Row type="flex" justify="start" align="middle">
               <LargeVideo/>
               <LargeVideo/>
               <LargeVideo/>
               <LargeVideo/>
               <LargeVideo/>
               <LargeVideo/>
               <LargeVideo/>
               <LargeVideo/>
            </Row>
        )
    }
}

export default ListLargeVideo;
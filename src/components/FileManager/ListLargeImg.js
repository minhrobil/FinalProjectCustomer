import React from 'react';
import { Row } from 'antd';
import LargeImg from './LargeImg';

class ListLargeImg extends React.Component {

    render() {
        return (
            <Row type="flex" justify="start" align="middle" >
               <LargeImg/>
               <LargeImg/>
               <LargeImg/>
               <LargeImg/>
               <LargeImg/>
               <LargeImg/>
               <LargeImg/>
               <LargeImg/>

            </Row>
        )
    }
}

export default ListLargeImg;
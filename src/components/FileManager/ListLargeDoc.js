import React from 'react';
import { Row } from 'antd';
import LargeDoc from './LargeDoc';

class ListLargeDoc extends React.Component {

    render() {
        return (
            <Row type="flex" justify="start" align="middle" >
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
                <LargeDoc />
            </Row>
        )
    }
}

export default ListLargeDoc;
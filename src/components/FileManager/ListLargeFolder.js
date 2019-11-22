import React from 'react';
import { Row } from 'antd';
import LargFolder from './LargFolder';

class ListLargeFolder extends React.Component {

    render() {
        return (
            <Row type="flex" justify="start" align="middle">
               <LargFolder/>
               <LargFolder/>
               <LargFolder/>
               <LargFolder/>
               <LargFolder/>
               <LargFolder/>
               <LargFolder/>

            </Row>
        )
    }
}

export default ListLargeFolder;
import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row, Col } from 'antd';

class BaseCheckBoxList extends React.Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        value: PropTypes.array,
        name: PropTypes.string,
        onChange: PropTypes.func,
        otherAtt: PropTypes.object
    }

    static defaultProps = {
        data: [],
        onChange: () => { },
        name: "name",
        value: [],
        vertical: false,
        otherAtt: {}
    }

    onChange = (checkedValues) => {
        this.props.onChange(this.props.name, checkedValues);
    }

    render() {
        const { otherAtt, data, vertical, value, name } = this.props;
        var options = data.map(item => { return { label: item.title, value: item.id } });
        if (data.length) {
            return (
                <React.Fragment>
                    {vertical ?
                        <Checkbox.Group style={{ width: '100%' }} name={name} onChange={this.onChange} {...otherAtt} value={value}>
                            <Row>
                                {options.map((item, index) => {
                                    return <Col span={24} key={index}>
                                        <Checkbox value={item.value}>{item.label}</Checkbox>
                                    </Col>
                                })}
                            </Row>
                        </Checkbox.Group>
                        :
                        <Checkbox.Group name={name} options={options} value={value} onChange={this.onChange} {...otherAtt} />
                    }
                </React.Fragment>
            )
        }
        else return <p style={{ color: "red" }}><strong>{this.props.textNoData ? this.props.textNoData : "Input Checkbox has no data"}</strong></p>
    }
}

export default BaseCheckBoxList;


/**
 * <BaseCheckBoxList data=[{}] name="" value=[] onChange > </BaseCheckBoxList>
 * props:
 *  data: REQUIRED mang data de hien thi ra list cac checkbox [{title: "label", id: "value"}]
 *  value: REQUIRED ["value1", "value2"] mang gia tri ban dau
 *  onChange: onChange(name, value) REQUIRED name: ten truong co checkbox, value: mang gia tri
 *  name: ten truong co checkbox
 */
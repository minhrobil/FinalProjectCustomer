import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
const { Option } = Select;

export default class BaseSelect extends Component {
    static propTypes = {
        defaultText: PropTypes.string,
        options: PropTypes.array.isRequired,
        attr: PropTypes.object,
        onChange: PropTypes.func
    };

    static defaultProps = {
        optionValue: "id",
        optionLabel: "title",
    };

    render() {
        var {
            defaultText,
            selected,
            options,
            attr,
            optionValue, // name of value field
            optionLabel, // name of label field
            onChange,
            ...rest
        } = this.props;
        
        let value = selected ? selected : "";

        let temp = options.find(option => option[optionValue] == selected);
        if(!temp) value = "";

        if(!defaultText) {
            value = options[0][optionValue];
        }

        return (
            <Select
                defaultValue={value}
                {...rest}
                onChange={(value) => onChange(value)}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    defaultText ? (
                        <Option value="">{defaultText}</Option>
                    ) : null
                }
                {
                    options.map((option, index) => {
                        return (
                            <Option key={index} value={option[optionValue]}>{option[optionLabel]}</Option>
                        )
                    })
                }
            </Select>
        )
    }
}
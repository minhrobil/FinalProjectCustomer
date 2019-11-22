import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";
class DateTimePickerApp extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    render() {
        const { mode, hideDateTimePicker, handleDateTimePicker, isVisible, date, minimumDate,maximumDate } = this.props
        return (
            <DateTimePicker
                date={date} 
                isVisible={isVisible}
                onConfirm={(time) => handleDateTimePicker(time)} 
                onCancel={() => hideDateTimePicker()}
                mode={mode}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
            // datePickerModeAndroid={'spinner'}
            />
        )
    }
}

DateTimePickerApp.propTypes = {
    mode: PropTypes.string.isRequired,
    handleDateTimePicker: PropTypes.func.isRequired,
    hideDateTimePicker: PropTypes.func.isRequired,
    isVisible: PropTypes.bool,
    date: PropTypes.any
}
export default DateTimePickerApp

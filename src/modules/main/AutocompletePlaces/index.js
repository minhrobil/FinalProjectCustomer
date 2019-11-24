import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { language } from '../../language/translate';
import { TEXT_PLACEHOLDER_COLOR, ratioHeight } from '../../../components/customize/config/constant';
import PropTypes from 'prop-types';
import * as styles from './style';

import TextInput from '../TextInput';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { autocompleteAddressAction } from '../../../redux-saga/autocompleteAddress';
import { connect } from 'react-redux';

class AutocompletePlaces extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	create_splaces(text) {
		this.props.autocompleteAddressAction(text);
		this(text).then((res) => {
			console.log(res);

			if (res.status == 'OK') {
				this.props.action_change_places(res.predictions);
			} else {
				console.log('google place error');
				this.props.action_change_places([]);
			}
		});
	}
	componentDidUpdate(PrevProps) {
		if (PrevProps.autocompleteAddressReducer != this.props.autocompleteAddressReducer) {
		}
	}
	render() {
		const { placeholder, text, maxLength } = this.props;
		return (
			<TextInput
				autoFocus={true}
				autoCorrect={false}
				underlineColorAndroid={'transparent'}
				selectTextOnFocus={true}
				placeholder={placeholder}
				text={text}
				style={styles.view_root}
				action={(text) => {
					this.create_splaces(text);
				}}
				maxLength={maxLength}
				placeholderTextColor={styles.text_placeholder}
			>
				<Icon name="search" size={25 * ratioHeight} color={TEXT_PLACEHOLDER_COLOR} />
			</TextInput>
		);
	}
}
AutocompletePlaces.propTypes = {
	placeholder: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	style: PropTypes.any,
	action: PropTypes.func,
	keyboardType: PropTypes.string,
	maxLength: PropTypes.number.isRequired
};
function mapStateToProps(state) {
	return {
		autocompleteAddressReducer: state.autocompleteAddressReducer
	};
}

export default connect(mapStateToProps, { autocompleteAddressAction })(AutocompletePlaces);

import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, TextInput } from 'react-native';
import {
	TEXT_PLACEHOLDER_COLOR,
	BACKGROUND_COLOR_TEXT_INPUT,
	BORDER_COLOR,
	COLOR_PRIMARY,
	COLOR_BORDER_FOCUS
} from '../../../components/customize/config/constant';
import * as styles from './style';
class TextInputApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_focus: false
		};
	}

	render() {
		const {
			editable,
			selectTextOnFocus,
			placeholder,
			text,
			style,
			action,
			keyboardType,
			maxLength,
			autoFocus,
			multiline,
			isBlur,
			onEndEditing,
			returnKeyType
		} = this.props;
		return (
			<View
				style={
					style === undefined ? (
						[
							styles.view_root,
							{ borderWidth: 1, borderColor: this.state.is_focus ? COLOR_BORDER_FOCUS : BORDER_COLOR }
						]
					) : (
						[
							styles.view_root,
							{ borderWidth: 1, borderColor: this.state.is_focus ? COLOR_BORDER_FOCUS : BORDER_COLOR },
							style
						]
					)
				}
			>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					{this.props.children}
				</View>
				<TextInput
					onFocus={() => {
						this.setState({ is_focus: true });
					}}
					onEndEditing={() => {
						if (onEndEditing != undefined) {
							onEndEditing();
						}
						this.setState({ is_focus: false });
					}}
					autoCorrect={false}
					selectTextOnFocus={selectTextOnFocus ? selectTextOnFocus : true}
					autoFocus={autoFocus}
					maxLength={maxLength}
					keyboardType={keyboardType !== undefined ? keyboardType : 'default'}
					value={text}
					placeholderTextColor={TEXT_PLACEHOLDER_COLOR}
					placeholder={placeholder}
					style={[ styles.view_text, style ? (style.height ? { height: style.height } : {}) : {} ]}
					underlineColorAndroid="transparent"
					onChangeText={(text) => {
						action(text);
					}}
					blurOnSubmit={isBlur}
					multiline={multiline}
					ref={(ref) => (this.iptext = ref)}
					returnKeyType={returnKeyType != undefined ? returnKeyType : 'done'}
					editable={editable != undefined ? editable : true}
				/>
			</View>
		);
	}
}
TextInputApp.propTypes = {
	placeholder: PropTypes.string,
	text: PropTypes.string.isRequired,
	style: PropTypes.any,
	action: PropTypes.func.isRequired,
	keyboardType: PropTypes.string,
	maxLength: PropTypes.number,
	autoFocus: PropTypes.bool,
	multiline: PropTypes.bool,
	isBlur: PropTypes.bool
};
TextInputApp.defaultProps = {
	placeholder: '',
	text: '',
	action: () => {}
};

export default TextInputApp;

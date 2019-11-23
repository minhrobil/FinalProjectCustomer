import {
	width,
	height,
	HEIGHT_FORM,
	TEXT_SIZE_NORMAL,
	TEXT_COLOR,
	BACKGROUND_COLOR_ITEM,
	ratioHeight,
	ACTIVE_TINT_COLOR,
	NOT_ACTIVE_TINT_COLOR,
	COLOR_PRIMARY,
	BACKGROUND_COLOR_HIGHT_LIGHT
} from './config/constant';
import { StyleSheet } from 'react-native';
import { Config } from '../../Utilities/Config';
import { Styles } from '../../Utilities/Styles';
export const styles = StyleSheet.create({
	text_input: {
		width: '110%',
		height: Config.HEIGHT_TEXT_INPUT,
		// padding: 15,
		backgroundColor: 'white',
		// borderRadius: 3,
		// elevation: 3,
		// shadowColor: 'gray',
		// shadowOffset: { width: 1, height: 3 },
		// shadowOpacity: 0.1,
		color: '#656565',
		fontFamily: 'Poppins-Regular',
		fontSize: Styles.fontSize
	},
	text_content: {
		fontSize: Styles.fontSize,
		color: '#3f3f3f'
	},
	title: {
		fontSize: Styles.fontSize,
		fontWeight: Config.os == 2 ? 'bold' : '500',
		color: '#3f3f3f'
	},
	modal: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		position: 'absolute',
		margin: 0
	},
	view_root: {
		backgroundColor: 'transparent',
		// height: height - 20,
		// width: width,
		justifyContent: 'center',
		alignItems: 'center'
	},
	view_top_transparent: {
		flex: 2
	},
	view_bottom_transparent: {
		flex: 3
	},
	text_title: {
		textAlign: 'center',
		color: TEXT_COLOR,
		fontSize: TEXT_SIZE_NORMAL + 3,
		fontWeight: 'bold'
	},
	view_display: {
		height: height,
		width: width,
		backgroundColor: Styles.backgroundColorHome
	},
	view_display_webview: {
		height: width,
		width: 0.9 * width,
		backgroundColor: 'white',
		borderRadius: 5
	},
	view_content: {
		flex: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},

	modal_caption: {
		textAlign: 'center',
		color: TEXT_COLOR,
		fontSize: TEXT_SIZE_NORMAL + 2,
		marginBottom: 5
	},

	text_cancel: {
		color: TEXT_COLOR,
		fontSize: TEXT_SIZE_NORMAL
	},
	text_accept: {
		color: 'white',
		fontSize: TEXT_SIZE_NORMAL
	},
	view_cancel: {
		height: HEIGHT_FORM,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: BACKGROUND_COLOR_HIGHT_LIGHT,
		marginLeft: 10,
		borderRadius: 3
	},
	view_accept: {
		height: HEIGHT_FORM,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR_PRIMARY,
		marginRight: 10,
		borderRadius: 3
	},
	view_accepted: {
		height: HEIGHT_FORM,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR_PRIMARY,
		marginHorizontal: 15,
		borderRadius: 3
	},
	view_button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15 * ratioHeight
	}
});

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
} from '../../config/constant';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
	modal: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		position: 'absolute'
	},
	view_root: {
		backgroundColor: 'transparent',
		height: height,
		width: width,
		justifyContent: 'center'
	},
	view_top_transparent: {
		flex: 2
	},
	view_bottom_transparent: {
		flex: 3
	},
	view_display: {
		height: 0.5 * width * ratioHeight,
		width: 0.9 * width,
		backgroundColor: 'white',
		marginBottom: 50 * ratioHeight,
		borderRadius: 5
	},
	view_content: {
		flex: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text_content: {
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

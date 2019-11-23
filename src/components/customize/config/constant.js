import { Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';

const { height, width, fontScale, scale } = Dimensions.get('window');
export const ratio = height / width;

const HEIGHT_MAX = 1000;
let ratioHeight = height / HEIGHT_MAX > 1 ? 1 : height / HEIGHT_MAX;
if (ratioHeight < 0.8 && ratioHeight > 0.7) {
	ratioHeight = 0.9;
}
if (ratioHeight < 0.9 && ratioHeight > 0.8) {
	ratioHeight = 0.98;
}
if (ratioHeight <= 0.7) {
	ratioHeight = 0.85;
}
ratioHeight = 1;
export const URL_SUPPORT_HOST = 'https://thoxaydung.xyz/tuyendung.html';
export const URL_SUPPORT_WORKER = 'https://thoxaydung.xyz/timviec.html';
export const URL_APP_ANDROID = 'https://play.google.com/store/apps/details?id=com.joombooking.rn.thoxaydung';
export const URL_APP_IOS = 'https://itunes.apple.com/us/app/thoxaydung/id1444417453?ls=1&mt=8';
export const URL_WEB_JOB = 'https://thoxaydung.xyz/job';
const COLOR_PRIMARY = '#F05B36';
export const COLOR_PRIMARY_OPACITY = '#fe8668';
export const COLOR_POINT = '#F8B21C';
export const COLOR_PRIMARY_LIGHT = '#f05b36d9';
export const COLOR_SECOND = '#227eb9';
export const COLOR_FIFTH = '#04CA25';
export const COLOR_THIRD = '#FAFAFA';
export const COLOR_PARAGRAPH = '#4A4A4A';
export const COLOR_GRAY = '#9B9B9B';
export const COLOR_GRAY_GRBA = 'rgba(82, 86, 72, 0.6)';

export const COLOR_BORDER_FOCUS = '#F78E74';
const PADDING_BODY = 5 * ratioHeight;
const BACKGROUND_COLOR = 'transparent';
const HEIGHT_HEADER = 70 * ratioHeight;
const HEIGHT_TABBAR = 70 * ratioHeight;
const BACKGROUND_COLOR_ITEM = 'white';
const BACKGROUND_IMAGE = '';
export const COLOR_FACEBOOK = 'rgb(0, 132, 255)';
export const COLOR_MEDAL = 'green';
export const ICON_COLOR_ACTIVE = '#D0D0D0';

const HEIGHT_BUTTON_SUBMIT = 30 * ratioHeight;
const WIDTH_BUTTON_SUBMIT_HALF = width * 0.28;
const WIDTH_BUTTON_SUBMIT_FULL = width * 0.6;
const BACKGROUND_BUTTON_SUBMIT = '#2885CC';
const COLOR_BUTTON_SUBMIT = 'blue';
const WIDTH_FORM = width * 0.9;
const HEIGHT_FORM = 45 * ratioHeight;
const BORDER_WIDTH_FORM = 1;
export const PADDING_NORMAL = 10;

const TEXT_SIZE_NORMAL = parseInt(15) * ratioHeight > 15 ? 15 : parseInt(15) * ratioHeight;
const TEXT_PLACEHOLDER_COLOR = '#ADA9A9';
const TEXT_COLOR = '#444';
const ACTIVE_TINT_COLOR = COLOR_PRIMARY;
const NOT_ACTIVE_TINT_COLOR = '#444';
const BACKGROUND_COLOR_TEXT_INPUT = 'white';
const BACKGROUND_COLOR_HIGHT_LIGHT = '#F1F1F1';
const ICON_NAME_CREATE_JOB = 'plus-circle';
const ICON_NAME_HOME = 'search';
const ICON_NAME_INVITE = 'gift';
const ICON_NAME_HISTORY = 'history';
const ICON_NAME_MESSAGE = 'comment-alt';
const ICON_NAME_ACCOUNT = 'user-circle';
const ICON_NAME_MARKER = 'map-marker-alt';
export const ICON_NAME_NOT_ACTIVE = 'square';
export const ICON_NAME_ACTIVE = 'check-square';
export const ICON_DATE = 'calendar';
const ICON_COLOR_PIN = COLOR_PRIMARY;
const ICON_ARROW = 'angle-left';
const BORDER_COLOR = '#CFCFCF';
export const SIZE_ICON_BADGE = 18;
export const BODER_ICON_BADGE = 3;

const text_style = (size, color, fontWeight = 'normal') => {
	return {
		fontSize: size,
		color: color,
		fontWeight: fontWeight
	};
};
export const empty_flatlist = {
	marginTop: 100 * ratioHeight,
	width: '100%',
	padding: 30,
	alignItems: 'center'
};
const TEXT_NORMAL_STYLE = {
	fontSize: TEXT_SIZE_NORMAL,
	color: TEXT_COLOR
};
const CONTAINER = {
	flex: 1,
	backgroundColor: COLOR_PRIMARY
};

export const PADDING_HORIZONTAL = 15;
export const button_submit = {
	// marginBottom: 10 * ratioHeight,
	height: HEIGHT_FORM,
	width: width - 2 * PADDING_HORIZONTAL,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: COLOR_PRIMARY,
	borderRadius: 5,
	alignSelf: 'center'
	// position: 'absolute',
	// bottom: 0,
	// left: PADDING_HORIZONTAL
};
export const text_button_submit = {
	color: 'white',
	fontSize: TEXT_SIZE_NORMAL + 2
};
const BODY = {
	flex: 1,
	// marginTop: PADDING_BODY,
	paddingHorizontal: PADDING_HORIZONTAL,
	width: '100%',
	backgroundColor: 'white',
	paddingBottom: 10
	// paddingBottom: Platform.OS == 'android' ? (ratio > 2.05 ? (36 * ratioHeight) : (15 * ratioHeight)) : (ratio > 2 ? (36 * ratioHeight) : (15 * ratioHeight))
};
const PADDING_BOTTOM_IPX =
	Platform.OS == 'android'
		? ratio > 2.05 ? 36 * ratioHeight : 5 * ratioHeight
		: ratio > 2 ? 36 * ratioHeight : 5 * ratioHeight;

const BODY_2 = {
	flex: 1,
	// marginTop: PADDING_BODY,
	paddingHorizontal: PADDING_HORIZONTAL,
	width: '100%',
	backgroundColor: 'white'
};
export const view_button_submit = {
	marginTop: 10 * ratioHeight,
	// paddingHorizontal: PADDING_HORIZONTAL,
	height: HEIGHT_FORM,
	width: '100%',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center'
};
export const button_submit_active = {
	width: '100%',
	height: HEIGHT_FORM,
	backgroundColor: COLOR_PRIMARY,
	borderRadius: 3,
	justifyContent: 'center',
	alignItems: 'center'
};
export const text_button_submit_active = {
	fontSize: TEXT_SIZE_NORMAL * ratioHeight + 3,
	color: 'white'
};
export const button_submit_not_active = {
	width: '100%',
	height: HEIGHT_FORM,
	backgroundColor: TEXT_PLACEHOLDER_COLOR,
	borderRadius: 3,
	justifyContent: 'center',
	alignItems: 'center'
};
export const text_button_submit_not_active = {
	fontSize: TEXT_SIZE_NORMAL * ratioHeight + 3,
	color: 'white'
};
const BACKGROUND_IMAGE_STYLE = {
	width: '100%',
	height: '100%'
};
export class StatusBarStyle extends Component {
	render() {
		return <StatusBar barStyle="light-content" backgroundColor={COLOR_PRIMARY} />;
	}
}
export const button_chat = {
	flexDirection: 'row',
	height: HEIGHT_FORM,
	flex: 1,
	borderRadius: 3,
	backgroundColor: 'white',
	justifyContent: 'center',
	alignItems: 'center',
	borderWidth: 1,
	borderColor: COLOR_PRIMARY_OPACITY
};
export {
	PADDING_BOTTOM_IPX,
	BODY_2,
	PADDING_BODY,
	ICON_COLOR_PIN,
	ICON_NAME_CREATE_JOB,
	ICON_NAME_MARKER,
	ICON_ARROW,
	ICON_NAME_HOME,
	ICON_NAME_INVITE,
	ICON_NAME_HISTORY,
	ICON_NAME_MESSAGE,
	ICON_NAME_ACCOUNT,
	BACKGROUND_COLOR_HIGHT_LIGHT,
	BACKGROUND_COLOR_TEXT_INPUT,
	TEXT_NORMAL_STYLE,
	text_style,
	NOT_ACTIVE_TINT_COLOR,
	ACTIVE_TINT_COLOR,
	COLOR_PRIMARY,
	BACKGROUND_COLOR,
	CONTAINER,
	HEIGHT_HEADER,
	HEIGHT_TABBAR,
	BACKGROUND_COLOR_ITEM,
	BODY,
	BACKGROUND_IMAGE,
	BACKGROUND_IMAGE_STYLE,
	BACKGROUND_BUTTON_SUBMIT,
	HEIGHT_BUTTON_SUBMIT,
	WIDTH_BUTTON_SUBMIT_HALF,
	WIDTH_BUTTON_SUBMIT_FULL,
	COLOR_BUTTON_SUBMIT,
	width,
	height,
	ratioHeight,
	WIDTH_FORM,
	HEIGHT_FORM,
	BORDER_WIDTH_FORM,
	TEXT_SIZE_NORMAL,
	TEXT_COLOR,
	TEXT_PLACEHOLDER_COLOR,
	BORDER_COLOR
};
export const numberConvert = (string) => {
	return string.charAt(0) === '0' ? string.slice(1) : string;
};
const gstyles = StyleSheet.create({
	icon_active_check: {}
});

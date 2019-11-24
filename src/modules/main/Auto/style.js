import {
	ratioHeight,
	TEXT_NORMAL_STYLE,
	ACTIVE_TINT_COLOR,
	NOT_ACTIVE_TINT_COLOR,
	HEIGHT_FORM,
	TEXT_SIZE_NORMAL,
	TEXT_PLACEHOLDER_COLOR,
	text_style,
	TEXT_COLOR
} from '../../../components/customize/config/constant';
export const ICON_NAME_NOT_ACTIVE = 'circle';
export const ICON_NAME_ACTIVE = 'dot-circle';
export const ICON_COLOR_ACTIVE = ACTIVE_TINT_COLOR;
export const ICON_COLOR_NOT_ACTIVE = NOT_ACTIVE_TINT_COLOR;
export const ICON_SIZE = 20 * ratioHeight;
export const view_button_skill = {
	flexDirection: 'row',
	height: HEIGHT_FORM,
	alignItems: 'center'
};
export const text_skill = {
	marginLeft: 20
};
export const input_address = {
	width: '100%',
	height: HEIGHT_FORM
};
export const view_place = {
	// height: HEIGHT_FORM,
	paddingVertical: 15 * ratioHeight
};
export const main_text = {
	fontSize: TEXT_SIZE_NORMAL,
	color: TEXT_COLOR,
	marginBottom: 3 * ratioHeight
};
export const description_text = text_style(TEXT_SIZE_NORMAL - 1, TEXT_PLACEHOLDER_COLOR);

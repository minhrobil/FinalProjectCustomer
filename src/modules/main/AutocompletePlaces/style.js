import {
	BACKGROUND_COLOR_TEXT_INPUT,
	ratioHeight,
	TEXT_COLOR,
	TEXT_PLACEHOLDER_COLOR,
	WIDTH_FORM,
	HEIGHT_FORM,
	BORDER_WIDTH_FORM,
	BACKGROUND_COLOR_ITEM,
	TEXT_SIZE_NORMAL,
	BORDER_COLOR
} from '../../../components/customize/config/constant';
const ICON_COLOR = 'gray';
const ICON_SIZE = 20;
const view_root = {
	height: HEIGHT_FORM,
	width: '100%',
	backgroundColor: BACKGROUND_COLOR_TEXT_INPUT,
	flexDirection: 'row',
	paddingLeft: 10,
	// marginRight: 15,
	borderRadius: 3,
	color: TEXT_COLOR,
	fontSize: TEXT_SIZE_NORMAL,
	borderColor: BORDER_COLOR,
	borderWidth: 1
};
const view_text = {
	flex: 5,
	justifyContent: 'center',
	marginLeft: 10,
	fontSize: TEXT_SIZE_NORMAL
};
const text_placeholder = TEXT_PLACEHOLDER_COLOR;

const text = {
	color: TEXT_COLOR,
	fontSize: TEXT_SIZE_NORMAL + 2
};
export const view_place = {
	height: HEIGHT_FORM
};
export { view_root, view_text, text_placeholder, ICON_COLOR, ICON_SIZE, text };

import {
	BACKGROUND_COLOR_TEXT_INPUT,
	ratioHeight,
	TEXT_COLOR,
	TEXT_PLACEHOLDER_COLOR,
	WIDTH_FORM,
	HEIGHT_FORM,
	BORDER_WIDTH_FORM,
	BACKGROUND_COLOR_ITEM,
	TEXT_SIZE_NORMAL
} from '../../../components/customize/config/constant';
const ICON_COLOR = 'gray';
const ICON_SIZE = 20;
const view_root = {
	height: HEIGHT_FORM,
	width: '100%',
	backgroundColor: BACKGROUND_COLOR_TEXT_INPUT,
	alignSelf: 'center',
	borderRadius: 3,
	flexDirection: 'row'
};
const view_text = {
	height: HEIGHT_FORM,
	width: '100%',
	flex: 1,
	justifyContent: 'center',
	paddingLeft: 10,
	fontSize: TEXT_SIZE_NORMAL,
	textAlignVertical: 'top'
};
const text_placeholder = {
	color: TEXT_PLACEHOLDER_COLOR,
	fontSize: TEXT_SIZE_NORMAL
};
const text = {
	color: TEXT_COLOR,
	fontSize: TEXT_SIZE_NORMAL + 2
};
export { view_root, view_text, text_placeholder, ICON_COLOR, ICON_SIZE, text };

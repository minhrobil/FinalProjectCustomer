import { Dimensions } from "react-native";
import * as Constant from "./constant";
const { height, width } = Dimensions.get('window')
const ICON_SIZE_HEADER = 25 * Constant.ratioHeight
const ICON_COLOR_HEADER = '#fff'
const HEIGHT_HEADER = Constant.HEIGHT_HEADER
const BACKGROUND_HEADER = Constant.COLOR_PRIMARY
const TITLE_COLOR = 'white'
export const BACKGROUND_HEADER_TRANSPARENT = 'white'
export const TITLE_COLOR_TRANSPARENT = Constant.TEXT_COLOR
const TITLE_SIZE = 18 * Constant.ratioHeight
const ICON_NAME_BAR = 'bars'
const ICON_NAME_NOTIFY = 'bell'
const ICON_NAME_BACK = 'arrow-left'

export {
    ICON_SIZE_HEADER,
    ICON_COLOR_HEADER,
    HEIGHT_HEADER,
    BACKGROUND_HEADER,
    TITLE_COLOR,
    TITLE_SIZE,
    ICON_NAME_BAR,
    ICON_NAME_NOTIFY,
    ICON_NAME_BACK
}
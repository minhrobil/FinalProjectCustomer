import { Dimensions } from "react-native";
import * as Constant from "./constant";
const { height, width } = Dimensions.get('window')
const ICON_SIZE = 20
const ACTIVE_TINT_COLOR = 'red'
const IN_ACTIVE_TINT_COLOR = 'gray'
const WIDTH_DRAWER = 0.6 * width
const BACKGROUND_MENU = Constant.BACKGROUND_COLOR
const LABEL_COLOR = 'black'
const LABEL_SIZE = 14
const ICON_NAME_PROFILE = 'user'
const ICON_NAME_LANGUAGE = 'language'
const ICON_NAME_LOGOUT = 'power-off'
const ICON_NAME_PAYMENT = 'credit-card'
const ICON_NAME_HISTORY = 'history'
const ICON_NAME_SUPPORT = 'life-ring'

const ICON_COLOR = Constant.COLOR_PRIMARY
export {
    ICON_NAME_SUPPORT,
    ICON_SIZE,
    ACTIVE_TINT_COLOR,
    IN_ACTIVE_TINT_COLOR,
    BACKGROUND_MENU,
    WIDTH_DRAWER,
    LABEL_COLOR,
    LABEL_SIZE,
    ICON_NAME_PROFILE,
    ICON_NAME_LANGUAGE,
    ICON_COLOR,
    ICON_NAME_LOGOUT,
    ICON_NAME_PAYMENT,
    ICON_NAME_HISTORY,

}
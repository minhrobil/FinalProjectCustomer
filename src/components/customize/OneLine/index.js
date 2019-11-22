import React, { Component } from "react";
import { View } from "react-native";
const BORDER_COLOR = "#F3F3F3"
class OneLineColumn extends Component {
    render() {
        const {height,width,margin,color} = this.props
        return (
            <View style={{marginHorizontal:margin?margin:0, width: width?width:1, height: height!=undefined?height:"100%", backgroundColor:color?color: "transparent", alignSelf: 'flex-end' }}>
            </View>
        )
    }
}

class OneLine extends Component {

    render() {
        const {height,color,style} = this.props
        return (
            <View style={[{ width: '100%', height:height?height:1, backgroundColor:color?color: BORDER_COLOR, alignSelf: 'flex-end' },style?style:{}]}>
            </View>
        )
    }
}
class OneLineMedium extends Component {

    render() {
        const {height,color} = this.props
        return (
            <View style={{ width: '100%', height:height?height: 10, backgroundColor:color?color: "transparent", alignSelf: 'flex-end' }}>
            </View>
        )
    }
}

export {
    OneLineColumn,
    OneLineMedium
}
export default OneLine
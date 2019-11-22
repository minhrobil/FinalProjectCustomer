import React from "react";
import MView from "../../../components/customize/MView";
import {Styles as Style} from "../../../Utilities/Styles";
import {Animated, StyleSheet, View} from "react-native";
import MButton from "../../../components/customize/MButton";
import {TextHelvetica, TextInputHSPC} from "../../../components/customize/MText";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "react-native-modal-datetime-picker";
import Utilities from "../../../Utilities/Utilities";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

export default class FilterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            isFromDate: true,
            startDate: this.props.navigation.state.params ? this.props.navigation.state.params.startDate : "",
            endDate: this.props.navigation.state.params ? this.props.navigation.state.params.endDate : "",
            isFocusSearch: !!(this.props.navigation.state.params && this.props.navigation.state.params.focusSearch),
            search: this.props.navigation.state.params ? this.props.navigation.state.params.search : "",
            callback: this.props.navigation.state.params ? this.props.navigation.state.params.callback : undefined,
            type: this.props.navigation.state.params ? this.props.navigation.state.params.type : undefined,
            category: this.props.navigation.state.params && this.props.navigation.state.params.category
                ? this.props.navigation.state.params.category : {
                    id: 0,
                    name: "Tất cả Hợp đồng đang vay"
                }
        }
    }

    searchChange(text) {
        this.setState({search: text})
    }

    searchSubmit() {
        if (this.state.callback) {
            this.state.callback(this.state.search, this.state.startDate, this.state.endDate
                , this.state.category.id ? this.state.category : undefined);
            this.props.navigation.pop();
        }
    }

    _cancel() {
        if (this.state.callback) {
            this.state.callback("", "", "", "");
            this.props.navigation.pop();
        }
    }

    _selectCategory() {
        this.props.navigation.navigate("selectItemFilter", {
            type: this.state.type, callback: (item) => {
                this.setState({category: item})
            }
        })
    }

    _removeText() {
        this.setState({search: ""})
    }


    render() {
        return (
            <MView style={{backgroundColor: Style.backgroundColorHome}}
                   statusbarColor={"white"}>
                <View style={styles.toolbar}>
                    <MButton
                        onPress={() => this.props.navigation.pop()}
                        style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialIcons name="arrow-back" size={24}/>
                    </MButton>
                    <View
                        style={styles.boxSearch}>
                        <TextInputHSPC
                            returnKeyType='search'
                            autoFocus={this.state.isFocusSearch}
                            placeholderTextColor={"#cacaca"}
                            placeholder={"Tìm kiếm"}
                            onChangeText={(text) => this.searchChange(text)}
                            onSubmitEditing={() => this.searchSubmit()}
                            value={this.state.search}
                            style={styles.textSearch}/>
                        {
                            this.state.search ?
                                <MButton
                                    onPress={() => this._removeText()}
                                    style={styles.btnRemoveText}>
                                    <Ionicons name='ios-close-circle' size={Style.secondaryColor} size={24}/>
                                </MButton>
                                : <View/>
                        }

                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', marginTop: 30, paddingRight: 15, paddingLeft: 15}}>
                        <MButton
                            onPress={() => this.setState({isDateTimePickerVisible: true, isFromDate: true})}
                            style={styles.btnDate}>
                            <TextHelvetica style={styles.textDate}>
                                {this.state.startDate ? this.state.startDate : "Từ ngày"}
                            </TextHelvetica>
                            <Ionicons name="ios-calendar" size={22} color={Style.secondaryColor}/>
                        </MButton>
                        <View style={{width: 5}}/>
                        <MButton
                            onPress={() => this.setState({isDateTimePickerVisible: true, isFromDate: false})}
                            style={styles.btnDate}>
                            <TextHelvetica style={styles.textDate}>
                                {this.state.endDate ? this.state.endDate : "Đến ngày"}
                            </TextHelvetica>
                            <Ionicons name="ios-calendar" size={22} color={Style.secondaryColor}/>
                        </MButton>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 30, paddingRight: 15, paddingLeft: 15}}>
                        <MButton
                            onPress={() => this._selectCategory()}
                            style={styles.btnSelectType}>
                            <Feather name='type' color={Style.secondaryColor} size={22}/>
                            <TextHelvetica style={{color: Style.textColorGray, fontSize: 15, marginLeft: 10, flex: 1}}>
                                {this.state.category.name}
                            </TextHelvetica>
                            <Feather name="chevron-down" color={Style.secondaryColor} size={22}/>
                        </MButton>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <MButton
                        onPress={() => this._cancel()}
                        style={styles.btnAction}>
                        <TextHelvetica style={{fontSize: 16, color: Style.secondaryColor}}>
                            Bỏ lọc
                        </TextHelvetica>
                    </MButton>
                    <MButton
                        onPress={() => this.searchSubmit()}
                        style={styles.btnAction}>
                        <TextHelvetica style={{fontSize: 16, color: Style.primaryColor}}>
                            Tìm kiếm
                        </TextHelvetica>
                    </MButton>
                </View>

                <View style={{position: 'absolute'}}>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={() => {
                            this.setState({isDateTimePickerVisible: false})
                        }}
                        onCancel={() => {
                            this.setState({isDateTimePickerVisible: false})
                        }}
                        onHideAfterConfirm={date => {
                            let simpleDate = Utilities.instance().convertToSimpleTime(date);
                            if (this.state.isFromDate) {
                                this.setState({startDate: simpleDate});
                            } else {
                                this.setState({endDate: simpleDate});
                            }
                        }}
                    />
                </View>

            </MView>
        )
    }


}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 55
    },
    boxSearch: {
        height: 45, flex: 1, backgroundColor: 'white', justifyContent: 'center', marginRight: 15
    },
    textSearch: {
        color: Style.textColorGray, fontSize: 15, marginLeft: 10, marginRight: 10, borderRadius: 5
    },
    btnDate: {
        flexDirection: 'row', flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dedede'
    },
    textDate: {
        color: Style.textColorGray, fontSize: 15, flex: 1, textAlign: 'center'
    },
    bottom: {
        backgroundColor: 'white', height: 50, flexDirection: 'row', marginBottom: 10
    },
    btnAction: {
        flex: 1, justifyContent: 'center', height: '100%', alignItems: 'center'
    },
    btnSelectType: {
        flexDirection: 'row', flex: 1, backgroundColor: 'white', borderRadius: 5,
        paddingLeft: 10, paddingRight: 10,
        borderWidth: 1,
        borderColor: '#dedede', alignItems: 'center', height: 45
    },
    btnRemoveText: {
        width: 50, height: 50, position: "absolute", right: 0, justifyContent: 'center', alignItems: 'center'
    }
});

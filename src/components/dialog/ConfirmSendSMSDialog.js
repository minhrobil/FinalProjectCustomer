import React from 'react';
import {View, Image, Animated, Easing, TouchableOpacity} from 'react-native';
import {TextHelvetica, TextHSPC, TextInputHSPC} from "../customize/MText";
import MButton from "../customize/MButton";
import {Config} from "../../Utilities/Config";
import {Styles as Style} from "../../Utilities/Styles";
import Modal from "react-native-modalbox";
import {Dialog} from "react-native-simple-dialogs";


export default class ConfirmSendSMSDialog extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            content: "",
            phoneNumber: ""
        };
    }

    show(content, phoneNumber, callback) {
        this.callback = callback;
        this.setState({content: content, phoneNumber: phoneNumber, dialogVisible: true});
    }

    hiddenAlert() {
        this.setState({dialogVisible: false});
        if (this.callback) {
            this.callback(this.state.phoneNumber, this.state.content)
        }
    }


    render() {
        return (
            <View style={{
                position: 'absolute'
            }}>

                <Dialog
                    animationType={"fade"}
                    visible={this.state.dialogVisible}
                    dialogStyle={{height: Config.heightDevice / 2,borderRadius:10,backgroundColor:"white"}}
                    contentStyle={{flex:1}}
                    onTouchOutside={() => this.setState({dialogVisible: false})}>
                    <View
                        style={{
                            flex: 1,
                            margin:-20
                        }}>
                        <View style={{
                            backgroundColor: '#F3F3F3', paddingBottom:
                                24, borderTopEndRadius: 10, borderTopStartRadius: 10, paddingTop: 10,
                            flex:1
                        }}>
                            <TextHelvetica style={{
                                textAlign: 'center', fontSize: 16
                                , paddingHorizontal: 16, color: Style.primaryColor, fontWeight: 'bold'
                            }}>
                                Soạn tin nhắn gửi cho khách
                            </TextHelvetica>
                            <View style={{height: 10}}/>
                            <TextInputHSPC
                                placeholder={"Số điện thoại"}
                                placeholderTextColor={"#a3a3a3"}
                                multiline={false}
                                returnKeyType={"done"}
                                onChangeText={(text) => this.setState({phoneNumber: text})}
                                style={{
                                    marginLeft: 10
                                    , marginRight: 10,
                                    borderRadius: 3,
                                    marginTop: 15,
                                    borderWidth: 1,
                                    borderColor: '#c0c0c0',
                                    color: Style.textColor,
                                    paddingLeft: 7,
                                    paddingRight: 7,
                                    paddingTop: 5,
                                    paddingBottom: 5
                                }}
                                keyboardType={"phone-pad"}
                                value={this.state.phoneNumber}
                            />
                            <TextInputHSPC
                                placeholder={"Nội dung tin nhắn"}
                                placeholderTextColor={"#a3a3a3"}
                                multiline={true}
                                onChangeText={(text) => this.setState({content: text})}
                                style={{
                                    marginLeft: 10
                                    , marginRight: 10,
                                    borderRadius: 3,
                                    marginTop: 15,
                                    borderWidth: 1,
                                    borderColor: '#c0c0c0',
                                    color: Style.textColor,
                                    paddingLeft: 7,
                                    paddingRight: 7,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    textAlign: "left"
                                }}
                                returnKeyType={"done"}
                                numberOfLines={4}
                                value={this.state.content}
                            />
                        </View>
                        <View style={{
                            backgroundColor: 'white',
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            overflow: 'hidden'
                        }}>
                            <View style={{height: 50, flexDirection: 'row'}}>
                                <MButton
                                    onPress={() => {
                                        this.setState({dialogVisible: false});
                                    }}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'white'
                                    }}>
                                    <TextHSPC style={{
                                        fontSize: 16,
                                        color: '#979797',
                                        fontWeight: 'bold'
                                    }}>Huỷ</TextHSPC>
                                </MButton>
                                <View style={{width: 1, height: 50, backgroundColor: '#F3F3F3'}}/>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.hiddenAlert();
                                    }}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'white'
                                    }}>
                                    <TextHSPC style={{
                                        fontSize: 16,
                                        color: Style.primaryColor,
                                        fontWeight: 'bold'
                                    }}>Gửi</TextHSPC>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Dialog>

            </View>
        )
    }
}

import React from 'react';
import {View, Image, Animated, Easing} from 'react-native';
import {Config} from "../../Utilities/Config";
import MButton from "./MButton";
import {TextHSPC} from "./MText";
import {Styles as Style} from "../../Utilities/Styles";
import Ionicons from "react-native-vector-icons/Ionicons";


export default class MAlert extends React.PureComponent{

    state = {
        isShowAlert: false,
        alert: '',
        cancel: this.props.cancel,
        accept: this.props.accept,
        feedback: this.props.feedback,
    };

    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(1);
    }

    showAlert(alert, accept, cancel, feedback){
        try{
            this.setState({
                isShowAlert: true,
                alert: alert,
                cancel: cancel,
                accept: accept,
                feedback: feedback,
            });
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 200,
                easing: Easing.poly(2)
            }).start();
        }catch (e) {

        }
    }

    hiddenAlert(){
        try{
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 200,
                easing: Easing.poly(2)
            }).start();
            setTimeout(()=>{
                this.setState({isShowAlert: false});
            }, 200)
        }catch (e) {

        }
    }


    render(){
        const positionY = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Config.heightDevice]
        });
        if(!this.state.isShowAlert)
            return null;
        else
            return(
            <View style={{position: 'absolute',
                elevation: 3
                , backgroundColor: '#00000080', width: Config.widthDevice, height: Config.heightDevice, justifyContent: 'center',zIndex:2}}>
                <Animated.View style={{marginHorizontal: 33,zIndex:2, transform: [{translateY: positionY}]}}>
                    <View>
                        <View style={{height: 38}}/>
                        <View style={{backgroundColor: '#F3F3F3', paddingTop: 55, borderTopLeftRadius: 4, borderTopRightRadius: 4}}>

                        </View>
                        <View style={{ backgroundColor: '#F3F3F3',position: 'absolute', left: (Config.widthDevice-100-33*2)/2, width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
                            {/*<Image style={{width: 48, height: 48, resizeMode: 'contain'}} source={require('../../assets/images/img_log.png')}/>*/}
                            <Ionicons name="logo-freebsd-devil" size={48} color={"#15ba9b"}/>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#F3F3F3', paddingBottom: 24}}>
                        <TextHSPC style={{textAlign: 'center', fontSize: 16, paddingHorizontal: 16, color: '#535353'}}>{this.state.alert}</TextHSPC>
                    </View>
                    <View style={{backgroundColor: 'white', borderBottomRightRadius: 4, borderBottomLeftRadius: 4, overflow: 'hidden'}}>
                        <View style={{height: 50,flexDirection:'row'}}>
                            {
                                this.state.cancel?
                                    <MButton
                                        onPress={()=>{
                                            this.hiddenAlert();
                                            this.state.cancel();
                                        }}
                                        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                                        <TextHSPC style={{fontSize: 16, color: '#979797', fontWeight: 'bold'}}>Cancel</TextHSPC>
                                    </MButton>:null
                            }
                            {
                                this.state.cancel?
                                    <View style={{width: 1, height: 50, backgroundColor: '#F3F3F3'}}/>:null
                            }
                            {
                                this.state.feedback?
                                    <MButton
                                        onPress={()=>{
                                            this.hiddenAlert();
                                            this.state.feedback();
                                        }}
                                        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                                        <TextHSPC style={{fontSize: 16, color: '#979797', fontWeight: 'bold'}}>Report</TextHSPC>
                                    </MButton>:null
                            }
                            {
                                this.state.feedback?
                                    <View style={{width: 1, height: 50, backgroundColor: '#F3F3F3'}}/>:null
                            }

                            <MButton
                                onPress={()=>{
                                    this.hiddenAlert();
                                    this.state.accept();
                                }}
                                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                                <TextHSPC style={{fontSize: 16, color: Style.primaryColor, fontWeight: 'bold'}}>Ok</TextHSPC>
                            </MButton>
                        </View>
                    </View>
                </Animated.View>
            </View>
        )
    }
}

  
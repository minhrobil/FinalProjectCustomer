import React from 'react';
import {View,StyleSheet, Image, Animated, Easing,TouchableOpacity,FlatList,TouchableHighlight} from 'react-native';
import {Config} from "../../Utilities/Config";
import MButton from "./MButton";
import {TextHSPC, TextRoboto} from "./MText";
import {Styles as Style} from "../../Utilities/Styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import OneLine from './OneLine';

import { ifIphoneX } from 'react-native-iphone-x-helper'

const HEIGHT_ITEM = 40
const PADDING_TOP = 10
const PADDING_BOTTOM = ifIphoneX?30:10 

export default class MModal extends React.PureComponent{

    state = {
        isShowModal: false,
    };
    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(1);
        this.array_option = this.props.array_option?this.props.array_option:[]
        this.height_modal = this.props.array_option?(this.props.array_option.length*HEIGHT_ITEM+PADDING_BOTTOM+PADDING_TOP):(PADDING_BOTTOM+PADDING_TOP)
    }
    componentDidUpdate(){
        this.array_option = this.props.array_option?this.props.array_option:[]
        this.height_modal = this.props.array_option?(this.props.array_option.length*HEIGHT_ITEM+PADDING_BOTTOM+PADDING_TOP):(PADDING_BOTTOM+PADDING_TOP)
    }
    showModal(){
        try{
            this.setState({
                isShowModal: true,
            });
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 200,
                easing: Easing.poly(2)
            }).start();
        }catch (e) {

        }
    }
    onHide(){
        const {onHide} = this.props
        if(onHide){
            onHide()
        }
    }
    hiddenModal(){
        try{
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 200,
                easing: Easing.poly(2)
            }).start();
            setTimeout(()=>{
                this.setState({isShowModal: false},()=>this.onHide());
            }, 200)
        }catch (e) {

        }
    }
    _option(item,color){
        return(
            <View>
                <TouchableOpacity
                    style={styles.view_button_item}
                    onPress={()=>{
                        this.hiddenModal()
                        if(item.action){
                            item.action()
                        }
                    }}
                >
                    {
                        item.icon_source
                            ?
                            <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                                <View style={{width:100,justifyContent:'center',alignItems:'flex-end'}}>
                                    <Image
                                        source={item.icon_source}
                                        style={{height:22,width:44,resizeMode:'contain',tintColor:'#7F7F7F'}}
                                    >
                                    </Image>
                                </View>
                                <View style={{}}>
                                    <TextRoboto style={[Style.text_style_normal,{marginLeft:5,color,}]}>{item.title}</TextRoboto>
                                </View>
                            </View>
                            :  
                            <View style={{justifyContent:'center',flex:1}}>
                                <TextRoboto style={[Style.text_style_normal,{color,textAlign:'center'},this.props.textStyle?this.props.textStyle:{}]}>{item.title}</TextRoboto>
                            </View>
                    }
                    
                </TouchableOpacity> 
                <OneLine></OneLine>
            </View> 
            
        )
    }
    _option_chose(){
        return(
            <View style={styles.view_button_item_chose}>
                <TouchableOpacity
                    style={styles.view_button_item}
                >
                    <Image
                        source={item.icon_source}
                        style={{height:22,width:44,resizeMode:'contain',tintColor:Style.primaryColor}}
                    >
                    </Image>
                    <TextRoboto style={[Style.text_style_normal,{marginLeft:5,color:Style.primaryColor}]}>{item.title}</TextRoboto>
                </TouchableOpacity>
            </View>
            
        )
    }

    render(){
        const marginBottom = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -this.height_modal] 
        });
        if(!this.state.isShowModal)
            return null;
        else
            return(
            <View style={{
                position: 'absolute',
                elevation: 3,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                width: Config.widthDevice,
                height: Config.heightDevice,
                justifyContent: 'flex-end',
                alignItems:'center',
                zIndex:2,
                }}> 
                <TouchableOpacity 
                    style={{
                        width: Config.widthDevice,
                        height: Config.heightDevice
                    }}
                    onPress={()=>this.hiddenModal()}
                >
                </TouchableOpacity>
                <Animated.View style={{
                    zIndex:3,
                    width:"85%",
                    maxHeight:"70%",
                    backgroundColor:'white',
                    bottom:marginBottom,
                    borderTopLeftRadius:25,
                    borderTopRightRadius:25,
                    paddingTop:PADDING_TOP,
                    paddingBottom:this.props.paddingBottom?this.props.paddingBottom:PADDING_BOTTOM
                }}
                >
                    <FlatList
                        data={this.array_option}
                        keyExtractor={(item,index)=>index+'----'}
                        renderItem={({item,index})=>this._option(item,item.color?item.color:Style.textColor)}
                    >
                    </FlatList>                
                </Animated.View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    view_button_item:{
        width:'100%',
        height: HEIGHT_ITEM,
        borderRadius:4,
        alignItems:'center',
        flexDirection:'row',
    },
    view_button_item_chose:{
        width:'100%',
        height: HEIGHT_ITEM,
        borderRadius:4,
        alignItems:'center',
        flexDirection:'row'
    }
});
  
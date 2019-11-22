import React,{Component} from "react";
import {View, Platform, SafeAreaView} from "react-native";
import {MStatusBar} from "./MStatusBar";
import {Config} from "../../Utilities/Config";
import {Styles} from "../../Utilities/Styles";
import OfflineNotice from './OfflineNotice'
export default class MView extends Component {
    network_info(){
        if(Platform.OS=='ios'){
            return this.network_ios.network()
        }else{
            return this.network_android.network()
        }
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {
                    Config.os === 1
                        ?
                            <View style={{flex: 1}}>
                                <MStatusBar
                                    backgroundColor={this.props.statusbarColor ? this.props.statusbarColor : Styles.primaryColor}
                                    barStyle={this.props.statusbarColor === "white" ? "dark-content" : "light-content"}/>
                                <SafeAreaView style={{flex: 1}}>
                                    <OfflineNotice ref={ref=>this.network_ios=ref}/>

                                    <View style={[{flex: 1}, this.props.style]}>
                                        {this.props.children}
                                    </View>
                                </SafeAreaView>
                            </View>
                        :
                        <View style={{flex: 1}}>
                            <MStatusBar
                                backgroundColor={this.props.statusbarColor ? this.props.statusbarColor : Styles.primaryColor}
                                barStyle={this.props.statusbarColor === "white" ? "dark-content" : "light-content"}/>
                            <SafeAreaView style={{flex: 1}}>
                            <OfflineNotice ref={ref=>this.network_android=ref}/>
                                <View style={[{flex: 1}, this.props.style]}>
                                    {this.props.children}
                                </View>
                            </SafeAreaView>
                        </View>
                }


            </View>
        )
    }

}

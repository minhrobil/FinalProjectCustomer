import React from "react";
import {View} from "react-native";
import Spinner from "react-native-spinkit";
import {Styles as Style} from "../../Utilities/Styles";

export default class ViewLoading extends React.Component {
    render() {
        const isLoading = this.props.isLoading ? this.props.isLoading : false;
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {
                    isLoading?
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Spinner isVisible={true} size={100} type={'Circle'} color={Style.primaryColor}/>
                        </View>
                        :
                        this.props.children
                }
            </View>
        )
    }

}

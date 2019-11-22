import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, LayoutAnimation } from 'react-native';
import MView from '../../components/customize/MView';
import FastImage from 'react-native-fast-image';
import { Config } from '../../Utilities/Config';
import { TextPoppin } from '../../components/customize/MText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles as Style } from '../../Utilities/Styles';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation';
import MAlert from '../../components/customize/MAlert';
import { login } from '../../redux-saga/Action';
import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import MapScreen from './MapScreen';

import HeaderCommon from '../../components/customize/HeaderCommon';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import img_avatar_placeholder from '../../assets/images/img_avatar_placeholder.png';
import right_icon from '../../assets/images/right_icon.png';
import top_icon from '../../assets/images/top_icon.png';

class Delivery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1
		};
	}
	view_map = () => {
		return (
			<View style={{alignSelf: 'center', width: Config.widthDevice, height:Config.heightDevice/2}}>
				<MapScreen />
			</View>
		);
	};
	view_status = () => {
		return (
			<View style={{ 	justifyContent: 'center',
				marginHorizontal: -10 ,
				marginTop:-13
				}}>
				<MShadowView style={{alignSelf: 'center', width: Config.widthDevice +10}}>
					<View style={{flexDirection:'row',justifyContent:'space-between'}}>
						<View style={{flex:1,justifyContent:'center',alignItems:'center',padding:10}}>
							<TextPoppin style={styles.content_key}>Status</TextPoppin>
							<TextPoppin style={styles.content_value}>Confirmed</TextPoppin>
						</View>
						<View style={{flex:1,justifyContent:'center',alignItems:'center',padding:10}}>
							
						</View>
						<View style={{flex:1,justifyContent:'center',alignItems:'center',padding:10}}>
							<TextPoppin style={styles.content_key}>Deliver by</TextPoppin>
							<TextPoppin style={styles.content_value}>John Smith</TextPoppin>
						</View>
					</View>
				</MShadowView>
			</View>
		);
	};
	view_key_value = (key,value) => {
		return (
			<View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
				<TextPoppin style={styles.content_key}>
					{key}
				</TextPoppin>
				<TextPoppin style={styles.content_value}>{value} </TextPoppin>
			</View>
		)
	}
	view_info = () => {
		return (
			<View style={{ 	justifyContent: 'center',
			marginHorizontal: 15 ,
			marginTop:10
			}}>
				<MShadowView style={{alignSelf: 'center', width: Config.widthDevice - 40,borderRadius:0}}>
					<View style={{ flexDirection: 'row',justifyContent:'space-between',alignItems:'center' }}>
						<View style={{ width: 80, padding: 20 }}>
							<FastImage
								resizeMode="contain"
								style={{ width: 60, height: 60, borderRadius: 30 }}
								source={img_avatar_placeholder}
							/>

						</View>
						<View style={{flex:1, margin:15}}>
							<TextPoppin style={[styles.title,{textAlign:'left'}]}>Nguyen Quang Minh</TextPoppin>
						</View>

					</View>
						<View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
							{this.view_key_value('Delivery Pickup','20/11/1997')}
							{this.view_key_value('Delivery Pickup','20/11/1997')}
							{this.view_key_value('Delivery Pickup','20/11/1997')}
							{this.view_key_value('Delivery Pickup','20/11/1997')}

						</View>
				</MShadowView>
			</View>
		);
	};
	componentDidUpdate(PrevProps) {}
	render() {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon title="Delivery Detail" actionLeft={this.props.navigation.goBack} />
				<View style={{ alignItems: 'center', flex: 1, width: '100%', marginTop: -75, zIndex: 0 }}>
					<ScrollView horizontal={false}
						contentContainerStyle={{width:Config.widthDevice}}
					>
						{this.view_map()}
						{this.view_status()}
						{this.view_info()}
					</ScrollView>
				</View>
				<MAlert
					ref={(ref) => {
						this.alert = ref;
					}}
				/>
			</MView>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: Style.fontSize + 2,
		fontWeight: Config.os == 2 ? 'bold' : '600',
		textAlign: 'left',
		color: '#3f3f3f'
	},
	text_price: {
		backgroundColor: Style.primaryColor,
		padding: 5,
		paddingHorizontal: 20,
		fontSize: Style.fontSize,
		color: 'white',
		width: 100
	},
	content_key: {
		fontSize: Style.fontSize,
		// fontWeight: Config.os == 2 ? 'bold' : '600',
		textAlign: 'left',
		color: '#999999'
	},
	content_value: {
		fontSize: Style.fontSize,
		// fontWeight: Config.os == 2 ? 'bold' : '600',
		// textAlign: 'left',
		color: '#3f3f3f'
	}
});

function mapStateToProps(state) {
	return {
		loginRes: state.Login
	};
}

export default connect(mapStateToProps, { login })(Delivery);

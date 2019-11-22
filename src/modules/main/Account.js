import React from 'react';
import { View, TouchableOpacity,Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import MView from '../../components/customize/MView';
import FastImage from 'react-native-fast-image';
import { Config } from '../../Utilities/Config';
import { TextPoppin } from '../../components/customize/MText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles as Style } from '../../Utilities/Styles';
import MButton from '../../components/customize/MButton';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation'; 
import MAlert from '../../components/customize/MAlert';
import { login } from '../../redux-saga/Action';
import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import HeaderCommon from '../../components/customize/HeaderCommon';
import pencil from "../../assets/images/pencil.png"
class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			account: {
				phone_code: '84',
				phone_number: '989632045',
				first_name: 'Nguyen',
				last_name: 'Minh'
			}
			
		};
	}



	goLogin = () => {
		this.props.navigation.pop();
	};
	componentDidUpdate(PrevProps) {
	
	}
	
	view_input_phone_code() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<View
						style={{
							backgroundColor: 'white',
							justifyContent: 'center',
							alignItems: 'flex-end'
							// width: 30
						}}
					>
						<TextPoppin style={([ styles.title ], { color: '#656565', fontSize: 20 })}>+</TextPoppin>
					</View>
					<TextInput
						editable={false}
						placeholder="00"
						value={this.state.account.phone_code}
						maxLength={5}
						keyboardType="numeric"
						onChangeText={this.onChangePhoneCode}
						style={[ styles.text_input, { flex: 1 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_phone_number() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						editable={false}
						value={this.state.account.phone_number}
						maxLength={13}
						placeholder="input your phone number"
						keyboardType="numeric"
						onChangeText={this.onChangePhoneNumber}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_first_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						editable={false}
						value={this.state.account.first_name}
						maxLength={13}
						placeholder="input your first name"
						onChangeText={this.onChangeFirstName}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_last_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						editable={false}
						value={this.state.account.last_name}
						placeholder="input your last name"
						maxLength={13}
						onChangeText={this.onChangeLastName}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}
	goEdit = () => {
		this.props.navigation.navigate('AccountEdit',{account:this.state.account})
	}
	logout = () => {
		this.props.navigation.dispatch(
			StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({routeName: 'LoginScreen'})]
			})
		);	}
	render() {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon disableLeft title="Account" />
				<KeyboardAwareScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
						showsVerticalScrollIndicator={true}
					>
						<View style={{ flex: 1, padding: Config.PADDING_HORIZONTAL }}>
							<View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'flex-end'}}>
								<TextPoppin style={styles.title}>Phone number</TextPoppin>
								<TouchableOpacity
									onPress={this.goEdit}
								>

									<FastImage source={pencil}
										style={{width:40,height:40, marginBottom:8}}
										resizeMode="contain"
									></FastImage>
								</TouchableOpacity>
								
							</View>
							<View style={{ flexDirection: 'row',marginHorizontal: Config.os==2? -5 : -6 }}>
								<View style={{ flex: 1 }}>{this.view_input_phone_code()}</View>
								{/* <View style={{ width: Config.os==2 ? 4 : 12 }} /> */}
								<View style={{ flex: 3 }}>{this.view_input_phone_number()}</View>
							</View>
							<TextPoppin style={styles.title}>First Name</TextPoppin>
							<View style={{flexDirection: 'row',marginHorizontal: Config.os==2? -5 : -6 }}>
								<View style={{ flex: 1 }}>{this.view_input_first_name()}</View>
							</View>
							<TextPoppin style={styles.title}>Last Name</TextPoppin>
							<View style={{ flexDirection: 'row',marginHorizontal: Config.os==2? -5 : -6 }}>
							<View style={{ flex: 1 }}>{this.view_input_last_name()}</View>
							</View>
							
							<TextPoppin
								onPress={this.logout}
								style={[ styles.title, { color: 'red', textAlign: 'center', margin: 50, opacity:0.5 } ]}
							>
								Logout
							</TextPoppin>
						</View>
					</ScrollView>
				</KeyboardAwareScrollView>
				<MAlert
					ref={(ref) => {
						this.alert = ref;
					}}
				/>
			</MView>
		);
	}
}

function mapStateToProps(state) {
	return {
		loginRes: state.Login
	};
}

export default connect(mapStateToProps, { login })(Account);

const styles = StyleSheet.create({
	mview_submit: { borderRadius: 40 },
	view_search: {
		borderRadius: 4,
	},
	button_submit: {
		width: '100%',
		height: '100%'
	},
	title: {
		fontSize: Style.fontSize,
		fontWeight: Config.os==2 ? 'bold' : '500',
		color: '#3f3f3f',
		marginTop:30,
		marginBottom:Config.os ==2 ? 5 : 1
	},
	text_input: {
		width: '100%',
		height: Config.HEIGHT_TEXT_INPUT,
		// padding: 15,
		backgroundColor: 'white',
		// borderRadius: 3,
		// elevation: 3,
		// shadowColor: 'gray',
		// shadowOffset: { width: 1, height: 3 },
		// shadowOpacity: 0.1,
		color: '#656565',
		fontFamily: 'Poppins-Regular',
		fontSize: Style.fontSize
	},
	imgBackground: {
		width: Config.widthDevice,
		height: Config.widthDevice * 1.36
	},
	logo: {
		width: Config.widthDevice * 0.6,
		height: Config.widthDevice * 0.4
	},
	containLogo: {
		alignItems: 'center',
		marginTop: 0
	},
	// boxInput: {
	// 	height: 50,
	// 	borderRadius: 5,
	// 	borderWidth: 1,
	// 	borderColor: '#D6D6D6',
	// 	width: Config.widthDevice - Config.widthDevice * 0.225,
	// 	flexDirection: 'row',
	// 	alignItems: 'center',
	// 	paddingLeft: 14,
	// 	paddingRight: 14
	// },
	input: {
		flex: 1,
		marginLeft: 10,
		fontSize: 16,
		color: Style.textColor
	},
	btnLogin: {
		// marginTop: 30,
		// padding: 10,
		// elevation: 3,
		// shadowColor: '#969696',
		// shadowOffset: { width: 1, height: 3 },
		// shadowOpacity: 0.7,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnViewGradient: {
		borderRadius: 5,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnSignUp: {
		borderRadius: 5,
		width: Config.widthDevice - Config.widthDevice * 0.225,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

import React from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import MView from '../../components/customize/MView';
import Image from 'react-native-fast-image';
import { Config } from '../../Utilities/Config';
import { TextPoppin } from '../../components/customize/MText';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles as Style } from '../../Utilities/Styles';
import MButton from '../../components/customize/MButton';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation';
import MAlert from '../../components/customize/MAlert';
import { login } from '../../redux-saga/Action';
import { autocompleteAddressAction } from '../../redux-saga/autocompleteAddress';

import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage';
import Utilities from '../../Utilities/Utilities';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import HeaderCommon from '../../components/customize/HeaderCommon';
import pencil from '../../assets/images/pencil.png';
import ModalProductDetail from '../../components/customize/ModalProductDetail';
import ModalCart from '../../components/customize/\bModalCart';
import { height, width } from '../../components/customize/config/constant';
import OneLine from '../../components/customize/OneLine';
const ic_times = require('../../assets/icons/ic_times.png');
const ic_search = require('../../assets/icons/ic_search.png');
const mon_an = require('../../assets/images/mon_an.jpeg');

class AutocompleteAddress extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			focus: false,
			phone_code: this.props.navigation.state.params ? this.props.navigation.state.params.phone_code : '',
			address: this.props.navigation.state.params ? this.props.navigation.state.params.address : '',
			action: this.props.navigation.state.params ? this.props.navigation.state.params.action : () => {}
		};
	}
	componentDidMount() {
		this.props.autocompleteAddressAction(this.state.address);
	}
	getPlace = (id) => () => {
		fetch(
			'https://maps.googleapis.com/maps/api/place/details/json?&key=AIzaSyAX2PANITOz9OwOu1oaj3QGZGQelGywIyA&placeid=' +
				id,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		)
			.then((response) => response.json())
			.then((responseJson) => {
				this.state.action({
					address: responseJson.result.formatted_address,
					lat: responseJson.result.geometry.location.lat,
					lng: responseJson.result.geometry.location.lng
				});
				this.props.navigation.goBack();
			})
			.catch((error) => {
				console.error(error);
			});
	};
	componentDidUpdate(PrevProps) {
		if (this.props.address != PrevProps.address) {
			this.setState({ address: this.props.address });
		}
	}

	_view_search() {
		return (
			<MShadowView style={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}>
				<View style={styles.view_search_}>
					<Image source={ic_search} style={{ height: 18, width: 40 }} resizeMode="contain" />
					<View style={{ flex: 1 }}>
						<TextInput
							autoFocus
							placeholder={'Tìm kiếm địa chỉ'}
							style={[
								{
									borderColor: this.state.focus ? Style.primaryColor : '#F6F6F6',
									fontFamily: 'Poppins'
								}
							]}
							onChangeText={(text) => {
								this.setState({ address: text }, () => this.props.autocompleteAddressAction(text));
							}}
							underlineColorAndroid="transparent"
							value={this.state.address}
							ref={(ref) => (this.iptext = ref)}
							onFocus={() => {
								this.setState({ focus: true });
							}}
							onEndEditing={() => {
								this.setState({ focus: false });
							}}
							returnKeyLabel="Tìm"
							returnKeyType={'search'}
							maxLength={100}
							// onSubmitEditing={() => {
							// 	this.onRefresh();
							// }}
						/>
					</View>
					{this.state.address != '' ? (
						<TouchableOpacity
							onPress={() => {
								this.setState({ address: '' }, () => {
									this.props.autocompleteAddressAction('');
								});
							}}
						>
							<Image source={ic_times} style={{ height: 18, width: 40 }} resizeMode="contain" />
						</TouchableOpacity>
					) : null}
				</View>
			</MShadowView>
		);
	}
	view_item = (item, index) => {
		return (
			<MShadowView style={{}} key={index + ' -'}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						paddingHorizontal: Config.PADDING_HORIZONTAL,
						paddingVertical: Config.PADDING_VERTICAL
					}}
					onPress={this.getPlace(item.item.place_id)}
				>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingHorizontal: 15
						}}
					>
						<Icon name="map-marker-alt" light size={25} color={'#C7C7CD'} />
					</View>
					<View style={{ flex: 1 }}>
						<TextPoppin style={[ styles.title, { flex: 1 } ]}>
							{item.item.structured_formatting.main_text.length > 30 ? (
								item.item.structured_formatting.main_text.slice(0, 30) + '...'
							) : (
								item.item.structured_formatting.main_text
							)}
						</TextPoppin>
						{item.item.description.length > 45 ? (
							<TextPoppin style={styles.text_content}>{item.item.description.slice(0, 45)}...</TextPoppin>
						) : (
							<TextPoppin style={styles.text_content}>{item.item.description}</TextPoppin>
						)}
					</View>
				</TouchableOpacity>
			</MShadowView>
		);
	};
	render = () => {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon
					title="Địa chỉ"
					actionLeft={() => {
						this.props.autocompleteAddressAction('');
						this.props.navigation.goBack();
					}}
				/>
				<KeyboardAwareScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{ flex: 1 }}
					keyboardShouldPersistTaps="handled"
				>
					{this._view_search()}
					<FlatList
						keyExtractor={(item, index) => index}
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
						extraData={this.props.autocompleteAddressReducer.data}
						data={this.props.autocompleteAddressReducer.data}
						renderItem={(item, index) => {
							return this.view_item(item, index);
						}}
					/>
					<MAlert
						ref={(ref) => {
							this.alert = ref;
						}}
					/>
				</KeyboardAwareScrollView>
			</MView>
		);
	};
}

function mapStateToProps(state) {
	return {
		autocompleteAddressReducer: state.autocompleteAddressReducer
	};
}

export default connect(mapStateToProps, { autocompleteAddressAction })(AutocompleteAddress);

const styles = StyleSheet.create({
	view_search_: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		width: '100%',
		// backgroundColor: '#F9F9F9',
		borderRadius: 4,
		justifyContent: 'space-between'
	},
	mview_submit: { borderRadius: 40 },
	view_search: {
		borderRadius: 4
	},
	button_submit: {
		width: '100%',
		height: '100%'
	},
	text_content: {
		fontSize: Style.fontSize,
		color: '#3f3f3f',
		marginBottom: Config.os == 2 ? 5 : 1,
		flex: 1
	},
	title: {
		fontSize: Style.fontSize,
		color: '#3f3f3f',
		fontWeight: Config.os == 2 ? 'bold' : '500'
	},
	text_price: {
		fontSize: Style.fontSize,
		color: 'black',
		fontWeight: Config.os == 2 ? 'bold' : '500',
		textAlign: 'right'
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
});

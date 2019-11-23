import React from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import MView from '../../components/customize/MView';
import Image from 'react-native-fast-image';
import { Config } from '../../Utilities/Config';
import { TextPoppin } from '../../components/customize/MText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles as Style } from '../../Utilities/Styles';
import MButton from '../../components/customize/MButton';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation';
import MAlert from '../../components/customize/MAlert';
import { login } from '../../redux-saga/Action';
import { listProductAction } from '../../redux-saga/listProduct';

import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import HeaderCommon from '../../components/customize/HeaderCommon';
import pencil from '../../assets/images/pencil.png';
import { FlatList } from 'react-native-gesture-handler';
const ic_times = require('../../assets/icons/ic_times.png');
const ic_search = require('../../assets/icons/ic_search.png');
class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			focus: false,
			filter: {
				status: {
					type: '=',
					value: '1'
				},
				search: '',
				paging: {
					perpage: 10,
					page: 1
				}
			}
		};
	}
	componentDidMount() {
		this.onRefresh();
	}
	goLogin = () => {
		this.props.navigation.pop();
	};
	componentDidUpdate(PrevProps) {}

	onRefresh = () => {
		this.props.listProductAction(this.state.filter);
	};
	_view_search() {
		return (
			<MShadowView style={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}>
				<View style={styles.view_search_}>
					<Image source={ic_search} style={{ height: 18, width: 40 }} resizeMode="contain" />
					<View style={{ flex: 1 }}>
						<TextInput
							placeholder={'Tìm sản phẩm'}
							style={[ { borderColor: this.state.focus ? Style.primaryColor : '#F6F6F6' } ]}
							onChangeText={(text) => {
								this.setState({ filter: { ...this.state.filter, search: text } });
							}}
							underlineColorAndroid="transparent"
							value={this.state.filter.search}
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
							onSubmitEditing={() => {
								this.onRefresh();
							}}
						/>
					</View>
					{this.state.filter.search != '' ? (
						<TouchableOpacity
							onPress={() => {
								this.setState({ filter: { ...this.state.filter, search: '' } }, () => {
									this.onRefresh();
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
	render = () => {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon title="Sản phẩm đang bán" disableLeft actionLeft={this.props.navigation.goBack} />
				{this._view_search()}
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<FlatList data={this.props.listProductReducer.data} />
				</KeyboardAwareScrollView>
				<MAlert
					ref={(ref) => {
						this.alert = ref;
					}}
				/>
			</MView>
		);
	};
}

function mapStateToProps(state) {
	return {
		userInfoReducer: state.userInfoReducer,
		listProductReducer: state.listProductReducer
	};
}

export default connect(mapStateToProps, { listProductAction })(Product);

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
	title: {
		fontSize: Style.fontSize,
		fontWeight: Config.os == 2 ? 'bold' : '500',
		color: '#3f3f3f',
		marginTop: 30,
		marginBottom: Config.os == 2 ? 5 : 1
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

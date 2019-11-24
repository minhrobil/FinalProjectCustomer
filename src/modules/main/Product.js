import React from 'react';
import { View, TouchableOpacity, RefreshControl, TextInput, StyleSheet, FlatList } from 'react-native';
import MView, { MView2 } from '../../components/customize/MView';
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
import Utilities from '../../Utilities/Utilities';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import HeaderCommon from '../../components/customize/HeaderCommon';
import pencil from '../../assets/images/pencil.png';
import ModalProductDetail from '../../components/customize/ModalProductDetail';
import ModalCart from '../../components/customize/\bModalCart';
import { height, width } from '../../components/customize/config/constant';
const ic_times = require('../../assets/icons/ic_times.png');
const ic_search = require('../../assets/icons/ic_search.png');
const mon_an = require('../../assets/images/mon_an.jpeg');

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			focus: false,
			filter: {
				sort: {
					type: 'desc',
					attr: ''
				},
				created_at: {
					type: 'compare',
					value: {
						from: '',
						to: ''
					}
				},
				title: {
					type: 'like',
					value: ''
				},
				alias: {
					type: '=',
					value: []
				},
				search: '',
				paging: {
					perpage: 10,
					page: 1
				}
			},
			isHideModalProductDetail: true,
			isVisibleModalProductDetail: false,
			isHideModalCart: true,
			isVisibleModalCart: false,
			product: null
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
	next_page = () => {
		this.setState(
			{
				filter: {
					...this.state.filter,
					paging: {
						...this.state.filter.paging,
						page: this.state.filter.paging.page + 1
					}
				}
			},
			() => {
				this.onRefresh();
			}
		);
	};
	_view_search() {
		return (
			<MShadowView style={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}>
				<View style={styles.view_search_}>
					<Image source={ic_search} style={{ height: 18, width: 40 }} resizeMode="contain" />
					<View style={{ flex: 1 }}>
						<TextInput
							placeholder={'Tìm kiếm sản phẩm'}
							style={[
								{
									borderColor: this.state.focus ? Style.primaryColor : '#F6F6F6',
									fontFamily: 'Poppins'
								}
							]}
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
	openProductDetail = (product) => () => {
		var product_ = {};
		var isExist = false;
		if (this.props.cartLocalReducer.data) {
			for (let i = 0; i < this.props.cartLocalReducer.data.length; i++) {
				if (product.id == this.props.cartLocalReducer.data[i].product.id) {
					product_ = this.props.cartLocalReducer.data[i];
					isExist = true;
				} else {
					continue;
				}
			}
		}
		if (!isExist) {
			product_ = {
				product,
				quantity: 1,
				note: ''
			};
		}
		this.setState({ isVisibleModalProductDetail: true, product: product_ });
	};
	goCart = () => {
		this.props.navigation.navigate('Cart');
	};
	view_item = (item, index) => {
		var quantity = 0;
		try {
			quantity = this.quantity_product_in_cart(this.props.cartLocalReducer.data, item);
		} catch (error) {
			console.log(error);
		}

		return (
			<MShadowView style={{}}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						paddingHorizontal: Config.PADDING_HORIZONTAL,
						paddingVertical: Config.PADDING_VERTICAL
					}}
					onPress={this.openProductDetail(item)}
				>
					<View style={{ flex: 1 }}>
						<Image
							source={item.images && item.images[0] ? { uri: item.images[0] } : mon_an}
							style={{ height: 80, width: 100 }}
							resizeMode="contain"
						/>
					</View>
					<View style={{ flex: 1, paddingHorizontal: 10 }}>
						<TextPoppin style={styles.title}>{item.name}</TextPoppin>
					</View>
					<View style={{ flex: 1 }}>
						<TextPoppin style={styles.text_price}>
							{Utilities.instance().add_dot_number(item.price)} đ
						</TextPoppin>
						{quantity > 0 && (
							<TextPoppin style={[ styles.text_price, { color: Style.primaryColor } ]}>
								x{this.quantity_product_in_cart(this.props.cartLocalReducer.data, item)}
							</TextPoppin>
						)}
					</View>
				</TouchableOpacity>
			</MShadowView>
		);
	};
	count_total_price_cart = (cart) => {
		var total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
		return total;
	};
	count_total_quantity_cart = (cart) => {
		var total = cart.reduce((sum, item) => sum + item.quantity, 0);
		return total;
	};
	quantity_product_in_cart = (cart, product) => {
		var quantity = 0;
		if (this.props.cartLocalReducer.data) {
			for (let i = 0; i < this.props.cartLocalReducer.data.length; i++) {
				if (product.id == this.props.cartLocalReducer.data[i].product.id) {
					quantity = this.props.cartLocalReducer.data[i].quantity;
				} else {
					continue;
				}
			}
		}
		return quantity;
	};
	render = () => {
		return (
			<MView2 statusbarColor={'white'}>
				<HeaderCommon
					title="Sản phẩm đang bán"
					disableLeft
					actionRight={
						!this.props.userInfoReducer.data ? (
							() => this.props.navigation.navigate('LoginScreen', { isOrder: true })
						) : null
					}
				/>
				{this._view_search()}

				<View style={{ flex: 1, height: height, width: width }}>
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={this.props.listProductReducer.isLoading}
								onRefresh={this.onRefresh}
							/>
						}
						initialNumToRender={10}
						maxToRenderPerBatch={10}
						windowSize={10}
						legacyImplementation={false}
						updateCellsBatchingPeriod={50}
						data={this.props.listProductReducer.data.list}
						extraData={this.props.listProductReducer.data.list}
						keyExtractor={(item, index) => index + ''}
						ListEmptyComponent={
							<TextPoppin style={[ styles.text_content, { marginTop: 100, textAlign: 'center' } ]}>
								Không có dữ liệu
							</TextPoppin>
						}
						// onScrollBeginDrag={() => {
						// 	this.setState({ scroll: true });
						// }}
						// onEndReachedThreshold={0.2}
						// onEndReached={({ distanceFromEnd }) => {
						// 	if (this.props.listProductReducer.canLoadMore) {
						// 		this.next_page();
						// 	}
						// }}
						renderItem={({ item, index }) => {
							return this.view_item(item, index);
						}}
					/>
					{this.props.cartLocalReducer.data ? (
						<TouchableOpacity
							onPress={this.goCart}
							style={{
								position: 'absolute',
								bottom: 10,
								left: 10,
								right: 10,
								marginTop: 20,
								justifyContent: 'center',
								alignItems: 'center',
								height: 50,
								borderRadius: 5,
								backgroundColor: Style.primaryColor,
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingHorizontal: 15
							}}
						>
							<TextPoppin style={[ styles.title, { color: 'white' } ]}>Xem giỏ hàng</TextPoppin>
							<TextPoppin style={[ styles.title, { color: 'white' } ]}>
								{this.count_total_quantity_cart(this.props.cartLocalReducer.data)}
							</TextPoppin>
							<TextPoppin style={[ styles.title, { color: 'white' } ]}>
								{Utilities.instance().add_dot_number(
									this.count_total_price_cart(this.props.cartLocalReducer.data)
								)}{' '}
								đ
							</TextPoppin>
						</TouchableOpacity>
					) : null}
				</View>
				<ModalProductDetail
					action_on_hide={() => this.setState({ isHideModalProductDetail: true })}
					action_on_show={() => this.setState({ isHideModalProductDetail: false })}
					action_cancel={() => this.setState({ isVisibleModalProductDetail: false })}
					isModalVisible={this.state.isVisibleModalProductDetail}
					data={this.state.product}
				/>

				<MAlert
					ref={(ref) => {
						this.alert = ref;
					}}
				/>
			</MView2>
		);
	};
}

function mapStateToProps(state) {
	return {
		userInfoReducer: state.userInfoReducer,
		listProductReducer: state.listProductReducer,
		cartLocalReducer: state.cartLocalReducer
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
	text_content: {
		fontSize: Style.fontSize,
		fontWeight: Config.os == 2 ? 'bold' : '500',
		color: '#3f3f3f',
		marginTop: 30,
		marginBottom: Config.os == 2 ? 5 : 1
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

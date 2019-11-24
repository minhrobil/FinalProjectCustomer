import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { styles } from '../styleModal';
import Modal from 'react-native-modal';
import Image from 'react-native-fast-image';
import { width } from '../config/constant';
import SafeAreaView from 'react-native-safe-area-view';
import { TextPoppin } from '../MText';
import Utilities from '../../../Utilities/Utilities';
import { OneLineMedium } from '../OneLine';
import { Styles } from '../../../Utilities/Styles';
import MShadowView from '../MShadowView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import { Config } from '../../../Utilities/Config';
import { setCartLocalAction, deleteCartLocalAction } from '../../../redux-saga/cartLocal';

const ic_times = require('../../../assets/icons/ic_times.png');
const mon_an = require('../../../assets/images/mon_an.jpeg');
import { connect } from 'react-redux';

class ModalProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			select: '',
			product: this.props.data ? this.props.data.product : null,
			note: this.props.data ? this.props.data.note : '',
			quantity: this.props.data ? this.props.data.quantity : 1
		};
	}
	componentDidUpdate(PrevProps) {
		if (this.props.data !== PrevProps.data) {
			if (this.props.data) {
				this.setState({
					product: this.props.data.product,
					note: this.props.data ? this.props.data.note : '',
					quantity: this.props.data ? this.props.data.quantity : 1
				});
			}
		}
	}
	updateCart = () => {
		if (this.props.cartLocalReducer.data && this.props.cartLocalReducer.data.length > 0) {
			var cart = [ ...this.props.cartLocalReducer.data ];
			var isExist = false;
			for (let i = 0; i < cart.length; i++) {
				if (cart[i].product.id == this.state.product.id) {
					if (this.state.quantity == 0) {
						cart = cart.filter((item, index) => item.product.id != cart[i].product.id);
						isExist = true;
					} else {
						cart[i].note = this.state.note;
						cart[i].quantity = this.state.quantity;
						isExist = true;
					}
				} else {
					continue;
				}
			}
			if (!isExist && !(this.props.quantity == 0)) {
				data = {
					product: this.state.product,
					note: this.state.note,
					quantity: this.state.quantity
				};
				cart.push(data);
			}
			if (cart.length == 0) {
				this.props.deleteCartLocalAction();
			} else {
				this.props.setCartLocalAction(cart);
			}
		} else {
			if (!(this.props.quantity == 0)) {
				var cart = [];
				var data = {
					product: this.state.product,
					note: this.state.note,
					quantity: this.state.quantity
				};
				cart.push(data);
				if (cart.length == 0) {
					this.props.deleteCartLocalAction();
				} else {
					this.props.setCartLocalAction(cart);
				}
			}
		}
		this.props.action_cancel();
	};
	onChangeNote = (text) => {
		this.setState({
			note: text
		});
	};
	spend_quantity = () => {
		if (this.state.quantity > 0) {
			this.setState({ quantity: this.state.quantity - 1 });
		}
	};
	add_quantity = () => {
		if (this.state.quantity <= 20) {
			this.setState({ quantity: this.state.quantity + 1 });
		} else {
			alert('Chỉ được đặt tối đa 20 món ăn. Hãy tạo một đơn hàng khác');
		}
	};
	render() {
		const { action_on_show, action_on_hide, isModalVisible, action_cancel } = this.props;
		return (
			<Modal
				propagateSwipe={true}
				onModalShow={() => {
					if (action_on_show != undefined) {
						action_on_show();
					}
				}}
				onModalHide={() => {
					if (action_on_hide != undefined) {
						action_on_hide();
					}
				}}
				onBackdropPress={() => {
					if (action_cancel != undefined) {
						action_cancel();
					}
				}}
				onSwipeComplete={() => {
					if (action_cancel != undefined) {
						action_cancel();
					}
				}}
				swipeDirection="down"
				animationInTiming={500}
				isVisible={isModalVisible}
				style={styles.modal}
				backdropColor="white"
				customBackdrop={<View style={{ flex: 1, backgroundColor: Styles.backgroundColorHome }} />}
			>
				<StatusBar barStyle={'light-content'} />
				{this.state.product && (
					<KeyboardAwareScrollView
						style={{ flex: 1 }}
						contentContainerStyle={{}}
						keyboardShouldPersistTaps="handled"
					>
						<ScrollView
							keyboardShouldPersistTaps="handled"
							style={{ flex: 1 }}
							contentContainerStyle={{ flex: 1 }}
						>
							<View style={styles.view_display}>
								<TouchableOpacity
									onPress={() => {
										if (action_cancel != undefined) {
											action_cancel();
										}
									}}
									style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
								>
									<Image source={ic_times} style={{ height: 60, width: 40 }} resizeMode="contain" />
								</TouchableOpacity>
								<Image
									source={
										this.state.product.images && this.state.product.images[0] ? (
											{ uri: this.state.product.images[0] }
										) : (
											mon_an
										)
									}
									style={{ height: width * 0.6, width: width }}
									resizeMode="stretch"
								/>
								<View style={{ flexDirection: 'row', padding: 15, backgroundColor: 'white' }}>
									<View style={{ flex: 1 }}>
										<TextPoppin style={[ styles.title, { fontSize: 22 } ]}>
											{this.state.product.name}
										</TextPoppin>
									</View>
									<View style={{ flex: 1 }}>
										<TextPoppin style={[ styles.title, { fontSize: 22, textAlign: 'right' } ]}>
											{Utilities.instance().add_dot_number(this.state.product.price)} đ
										</TextPoppin>
									</View>
								</View>
								<View
									style={{
										flexDirection: 'row',
										paddingLeft: 15,
										paddingBottom: 15,
										backgroundColor: 'white'
									}}
								>
									<TextPoppin style={[ styles.text_content, {} ]}>
										{this.state.product.description}
									</TextPoppin>
								</View>
								<OneLineMedium height={10} />
								<View
									style={{
										// flexDirection: 'row',
										padding: Config.os == 2 ? 12 : 7,
										backgroundColor: 'white'
									}}
								>
									<TextPoppin style={[ styles.title, { margin: Config.os == 2 ? 5 : 7 } ]}>
										Lưu ý đặc biệt
									</TextPoppin>
									<MShadowView style={styles.view_search}>
										<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
											<TextInput
												value={this.state.note}
												placeholder="VD: thêm thìa đũa"
												onChangeText={this.onChangeNote}
												style={[ styles.text_input, { flex: 3 } ]}
											/>
										</View>
									</MShadowView>
								</View>
								<View
									style={{
										flexDirection: 'row',
										padding: Config.os == 2 ? 12 : 7,
										backgroundColor: 'white'
									}}
								>
									{/* <View style={{ flex: 1 }}>
										<TextPoppin style={[ styles.title, { margin: Config.os == 2 ? 5 : 7 } ]}>
											Số lượng
										</TextPoppin>
									</View> */}
									<View
										style={{
											flex: 2,
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<TouchableOpacity
											style={{
												padding: 10,

												justifyContent: 'center',
												alignItems: 'center',
												borderWidth: 1,
												borderRadius: 5,
												borderColor: Styles.backgroundColorHome
											}}
											onPress={this.spend_quantity}
										>
											<Icon name="minus" size={20} color={Styles.primaryColor} />
										</TouchableOpacity>
										<TextPoppin style={[ styles.title, { width: 50, textAlign: 'center' } ]}>
											{this.state.quantity}
										</TextPoppin>
										<TouchableOpacity
											style={{
												padding: 10,
												justifyContent: 'center',
												alignItems: 'center',
												borderWidth: 1,
												borderRadius: 5,
												borderColor: Styles.backgroundColorHome
											}}
											onPress={this.add_quantity}
										>
											<Icon name="plus" size={20} color={Styles.primaryColor} />
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</ScrollView>
					</KeyboardAwareScrollView>
				)}
				<TouchableOpacity
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
						backgroundColor: Styles.primaryColor
					}}
					onPress={this.updateCart}
				>
					<TextPoppin style={[ styles.title, { color: 'white' } ]}>Cập nhật giỏ hàng</TextPoppin>
				</TouchableOpacity>
			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		cartLocalReducer: state.cartLocalReducer
	};
}

export default connect(mapStateToProps, { setCartLocalAction, deleteCartLocalAction })(ModalProductDetail);

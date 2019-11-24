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
import OneLine, { OneLineMedium } from '../OneLine';
import { Styles } from '../../../Utilities/Styles';
import MShadowView from '../MShadowView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import { Config } from '../../../Utilities/Config';
import HeaderCommon from '../HeaderCommon';
const ic_times = require('../../../assets/icons/ic_times.png');
const mon_an = require('../../../assets/images/mon_an.jpeg');

class ModalCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customer_name: '',
			customer_address: ''
		};
	}
	componentDidUpdate(PrevProps) {}
	onChangeCustomerName = (text) => {
		this.setState({
			customer_name: text
		});
	};
	view_input_customer_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.customer_name}
						placeholder="Nhập tên người nhận"
						onChangeText={this.onChangeCustomerName}
						style={[ styles.text_input, { flex: 3 } ]}
					/>
				</View>
			</MShadowView>
		);
	}

	view_input_customer_address() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<View style={[ styles.text_input, { flex: 3, justifyContent: 'center' } ]}>
						<TextPoppin style={[ styles.text_content, { color: '#C7C7CD' } ]}>
							Nhập địa chỉ nhận hàng
						</TextPoppin>
					</View>
				</View>
			</MShadowView>
		);
	}
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
							<HeaderCommon
								title="Giỏ hàng của bạn"
								actionLeft={() => {
									if (action_cancel != undefined) {
										action_cancel();
									}
								}}
							/>
							<View
								style={{
									flexDirection: 'row',
									padding: 10,
									backgroundColor: 'white',
									alignItems: 'center'
								}}
							>
								<View
									style={{
										width: 40,
										height: 40,
										justifyContent: 'center',
										alignItems: 'center',
										borderWidth: 1,
										borderRadius: 5,
										borderColor: Styles.backgroundColorHome
									}}
								>
									<TextPoppin style={[ styles.title, { color: Styles.primaryColor } ]}>1x</TextPoppin>
								</View>
								<View style={{ flex: 1, paddingHorizontal: 10 }}>
									<TextPoppin style={[ styles.title, {} ]}>Chân gà sả ớt</TextPoppin>
								</View>
								<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
									{Utilities.instance().add_dot_number(100000)}
								</TextPoppin>
							</View>
							<View
								style={{
									flexDirection: 'row',
									padding: 10,
									backgroundColor: 'white',
									alignItems: 'center'
								}}
							>
								<OneLine />
							</View>
							<View
								style={{
									flexDirection: 'row',
									padding: 10,
									backgroundColor: 'white',
									alignItems: 'center'
								}}
							>
								<View
									style={{
										width: 40,
										height: 40,
										justifyContent: 'center',
										alignItems: 'center',
										borderWidth: 1,
										borderRadius: 5,
										borderColor: Styles.backgroundColorHome
									}}
								>
									<TextPoppin style={[ styles.title, { color: Styles.primaryColor } ]}>1x</TextPoppin>
								</View>
								<View style={{ flex: 1, paddingHorizontal: 10 }}>
									<TextPoppin style={[ styles.title, {} ]}>Chân gà sả ớt</TextPoppin>
								</View>
								<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
									{Utilities.instance().add_dot_number(100000)}
								</TextPoppin>
							</View>
							<View
								style={{
									flexDirection: 'row',
									padding: 10,
									backgroundColor: 'white',
									alignItems: 'center'
								}}
							>
								<OneLine />
							</View>
							<View
								style={{
									flexDirection: 'row',
									padding: 10,
									backgroundColor: 'white',
									alignItems: 'center'
								}}
							>
								<View style={{ flex: 1, paddingHorizontal: 10 }}>
									<TextPoppin style={[ styles.title, {} ]}>Tổng giá trị đơn hàng</TextPoppin>
								</View>
								<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
									{Utilities.instance().add_dot_number(100000)}
								</TextPoppin>
							</View>
							<OneLineMedium />
							<View style={{ padding: Config.PADDING_HORIZONTAL, backgroundColor: 'white' }}>
								<TextPoppin style={[ styles.title, { marginTop: 10 } ]}>Tên người nhận *</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_customer_name()}</View>
								</View>
								<TouchableOpacity>
									<TextPoppin style={[ styles.title, { marginTop: 10 } ]}>
										Địa chỉ nhận hàng *
									</TextPoppin>

									<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
										<View style={{ flex: 3 }}>{this.view_input_customer_address()}</View>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</KeyboardAwareScrollView>
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						marginTop: 20,
						backgroundColor: 'white',
						padding: 10
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<View style={{ flex: 1, marginBottom: 10 }}>
							<TextPoppin style={[ styles.title, {} ]}>Tổng cộng</TextPoppin>
						</View>
						<TextPoppin style={[ styles.title, { fontSize: 17, textAlign: 'right' } ]}>
							{Utilities.instance().add_dot_number(100000)}
						</TextPoppin>
					</View>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							height: 50,
							borderRadius: 5,
							backgroundColor: Styles.primaryColor
						}}
					>
						<TextPoppin style={[ styles.title, { color: 'white' } ]}>Đặt đơn hàng</TextPoppin>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
}

export default ModalCart;

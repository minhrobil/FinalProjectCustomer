import React from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
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
import { createProductAction } from '../../redux-saga/createProduct';
import { setUserInfoAction } from '../../redux-saga/userInfo';

import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import HeaderCommon from '../../components/customize/HeaderCommon';
import pencil from '../../assets/images/pencil.png';
import Utilities from '../../Utilities/Utilities';
import { picker } from '../../components/customize/imagePicker';
class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			price: '',
			image: '',
			image_base64: []
		};
	}

	_submit = () => {
		const { name, description, price, image, image_base64 } = this.state;
		if (name && description && price && image) {
			this.alert.showAlert(
				`Bạn chắc chắn tạo sản phẩm này?`,
				() => {
					setTimeout(() => {
						var body = {
							name,
							description,
							price,
							images: image_base64,
							status: 1,
							quantity: 100
						};
						this.props.createProductAction(body);
					}, 500);
				},
				() => {}
			);
		} else {
			if (this.state.name == '') {
				this.alert.showAlert(`Tên sản phẩm không được để trống`, () => {});
			} else if (this.state.description == '') {
				this.alert.showAlert(`Miêu tả không được bỏ trống`, () => {});
			} else if (this.state.price == '') {
				this.alert.showAlert(`Giá tiền không được bỏ trống`, () => {});
			} else if (this.state.image == '') {
				this.alert.showAlert(`Ảnh không được thiếu`, () => {});
			}
		}
	};

	componentDidUpdate(PrevProps) {
		if (this.props.createProductReducer != PrevProps.createProductReducer) {
			if (this.props.createProductReducer.isSuccess) {
				if ('Tạo sản phẩm thành công' == this.props.createProductReducer.message) {
					this.alert.showAlert(this.props.createProductReducer.message, () => {
						this.reset();
						this.props.navigation.goBack();
					});
				}
			}
			if (this.props.createProductReducer.isError) {
				this.alert.showAlert(this.props.createProductReducer.message, () => {});
			}
		}
	}
	reset = () => {
		this.setState({
			name: '',
			description: '',
			price: '',
			image: '',
			image_base64: []
		});
	};
	onChangeName = (text) => {
		this.setState({
			name: text
		});
	};
	onChangeDescription = (text) => {
		this.setState({
			description: text
		});
	};
	onChangePrice = (text) => {
		this.setState({
			price: text
		});
	};

	view_input_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.name}
						placeholder="Nhập tên sản phẩm"
						onChangeText={this.onChangeName}
						style={[ styles.text_input, { flex: 3 } ]}
						returnKeyType="done"
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_description() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ padding: 10, flexDirection: 'row' }}>
					<TextInput
						multiline={true}
						textAlignVertical="top"
						value={this.state.description}
						placeholder="Nhập miêu tả"
						onChangeText={this.onChangeDescription}
						style={[ styles.text_input, { flex: 3, height: 100 } ]}
						returnKeyType="done"
					/>
				</View>
			</MShadowView>
		);
	}
	view_input_price() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						keyboardType="numeric"
						value={this.state.price}
						placeholder="Nhập giá tiền"
						onChangeText={this.onChangePrice}
						style={[ styles.text_input, { flex: 3 } ]}
						returnKeyType="done"
					/>
				</View>
			</MShadowView>
		);
	}
	view_submit = () => {
		return (
			<View style={{ marginTop: 60 }}>
				<MShadowView style={[ styles.view_search ]}>
					<TouchableOpacity
						onPress={this._submit}
						style={{
							width: '100%',
							alignSelf: 'center',
							borderRadius: 4,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: Style.primaryColor,
							height: Config.HEIGHT_TEXT_INPUT
						}}
					>
						<TextPoppin
							style={[ styles.title, { color: 'white', fontSize: 20, marginTop: 0, marginBottom: 0 } ]}
						>
							Tạo sản phẩm
						</TextPoppin>
					</TouchableOpacity>
				</MShadowView>
			</View>
		);
	};
	pick_image = () => {
		picker((image, image_base64) => {
			this.setState({ image, image_base64: [ image_base64 ] }, () => {});
		});
	};
	render = () => {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon title="Tạo sản phẩm" actionLeft={this.props.navigation.goBack} />
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
					>
						<View style={{ flex: 1, padding: Config.PADDING_HORIZONTAL }}>
							<TextPoppin style={[ styles.title, { color: 'red', opacity: 0.5 } ]} onPress={this.reset}>
								Xóa dữ liệu và tạo lại
							</TextPoppin>

							<TextPoppin style={styles.title}>Tên sản phẩm</TextPoppin>

							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_name()}</View>
							</View>
							<TextPoppin style={styles.title}>Miêu tả sản phẩm</TextPoppin>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 3 }}>{this.view_input_description()}</View>
							</View>
							<View>
								<TextPoppin style={styles.title}>
									Giá sản phẩm{' '}
									{this.state.price ? (
										' = ' + Utilities.instance().add_dot_number(this.state.price) + 'đ'
									) : (
										''
									)}{' '}
								</TextPoppin>
								<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
									<View style={{ flex: 3 }}>{this.view_input_price()}</View>
								</View>
							</View>
							<View style={{ width: '100%' }}>
								<TextPoppin style={styles.title}>Ảnh sản phẩm</TextPoppin>
								<View
									style={{
										flexDirection: 'row',
										marginHorizontal: Config.os == 2 ? -5 : -6,
										width: '100%',
										justifyContent: 'center',
										marginTop: 10
									}}
								>
									<TouchableOpacity
										style={{
											width: 200,
											height: 150,
											justifyContent: 'center',
											alignItems: 'center',
											borderRadius: 5,
											backgroundColor: 'white',
											alignSelf: 'center'
										}}
										onPress={this.pick_image}
									>
										{this.state.image ? (
											<FastImage
												source={this.state.image}
												style={{ height: 150, width: 200 }}
												resizeMode="contain"
											/>
										) : (
											<TextPoppin>Chọn ảnh</TextPoppin>
										)}
									</TouchableOpacity>
									{/* <View style={{ flex: 3 }}>{this.view_input_email()}</View> */}
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginHorizontal: Config.os == 2 ? -5 : -6 }}>
								<View style={{ flex: 1 }}>{this.view_submit()}</View>
							</View>
							{/* {this.view_submit()} */}
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
	};
}

function mapStateToProps(state) {
	return {
		createProductReducer: state.createProductReducer
	};
}

export default connect(mapStateToProps, { createProductAction })(Account);

const styles = StyleSheet.create({
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
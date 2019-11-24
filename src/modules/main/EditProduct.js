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
import { deleteProductAction } from '../../redux-saga/deleteProduct';

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
			product: this.props.navigation.state.params ? this.props.navigation.state.params.product : null,
			image_base64: [],
			image: this.props.navigation.state.params
				? { uri: this.props.navigation.state.params.product.images[0] }
				: ''
		};
	}

	_submit = () => {
		const { name, description, price } = this.state.product;
		if (name && description && price) {
			this.alert.showAlert(
				`Bạn chắc chắn sửa sản phẩm này?`,
				() => {
					setTimeout(() => {
						var body = {
							name,
							description,
							price,
							id: this.state.product.id
						};
						if (this.state.image_base64.length > 0) {
							body = { ...body, images: this.state.image_base64 };
						}
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
			}
		}
	};

	componentDidUpdate(PrevProps) {
		if (this.props.createProductReducer != PrevProps.createProductReducer) {
			if (this.props.createProductReducer.isSuccess) {
				this.alert.showAlert(this.props.createProductReducer.message, () => {
					this.props.navigation.goBack();
				});
				// this.reset();
			}
			if (this.props.createProductReducer.isError) {
				this.alert.showAlert(this.props.createProductReducer.message, () => {});
			}
		}
		if (this.props.deleteProductReducer != PrevProps.deleteProductReducer) {
			if (this.props.deleteProductReducer.isSuccess) {
				this.alert.showAlert(this.props.deleteProductReducer.message, () => {
					this.props.navigation.goBack();
				});
				// this.reset();
			}
			if (this.props.deleteProductReducer.isError) {
				this.alert.showAlert(this.props.deleteProductReducer.message, () => {});
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
			product: { ...this.state.product, name: text }
		});
	};
	onChangeDescription = (text) => {
		this.setState({
			product: { ...this.state.product, description: text }
		});
	};
	onChangePrice = (text) => {
		this.setState({
			product: { ...this.state.product, price: text }
		});
	};

	view_input_name() {
		return (
			<MShadowView style={styles.view_search}>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.product.name}
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
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<TextInput
						value={this.state.product.description}
						placeholder="Nhập miêu tả"
						onChangeText={this.onChangeDescription}
						style={[ styles.text_input, { flex: 3 } ]}
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
						value={this.state.product.price.toString()}
						placeholder="Nhập giá tiền"
						onChangeText={this.onChangePrice}
						style={[ styles.text_input, { flex: 3 } ]}
						returnKeyType="done"
					/>
				</View>
			</MShadowView>
		);
	}
	delete = () => {
		this.alert.showAlert(
			'Bạn có chắc chắn muốn xóa sản phẩm này?',
			() => {
				setTimeout(() => {
					this.props.deleteProductAction({ id: this.state.product.id });
				}, 1000);
			},
			() => {}
		);
	};
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
							Cập nhật sản phẩm
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
				<HeaderCommon title="Chỉnh sửa sản phẩm" actionLeft={this.props.navigation.goBack} />
				<KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<ScrollView
						keyboardShouldPersistTaps="handled"
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: Config.PADDING_HORIZONTAL }}
					>
						<View style={{ flex: 1, padding: Config.PADDING_HORIZONTAL }}>
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
									Giá sản phẩm
									{this.state.product.price ? (
										' = ' + Utilities.instance().add_dot_number(this.state.product.price) + 'đ'
									) : (
										''
									)}
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
							<TextPoppin
								style={[ styles.title, { color: 'red', opacity: 0.5, textAlign: 'center' } ]}
								onPress={this.delete}
							>
								Xóa sản phẩm này
							</TextPoppin>
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
		createProductReducer: state.createProductReducer,
		deleteProductReducer: state.deleteProductReducer
	};
}

export default connect(mapStateToProps, { createProductAction, deleteProductAction })(Account);

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

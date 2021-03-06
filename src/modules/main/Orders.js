import React from 'react';
import { View, TouchableOpacity, StyleSheet, RefreshControl, LayoutAnimation } from 'react-native';
import MView from '../../components/customize/MView';
import FastImage from 'react-native-fast-image';
import { Config } from '../../Utilities/Config';
import { TextPoppin } from '../../components/customize/MText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Styles as Style } from '../../Utilities/Styles';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions, StackActions } from 'react-navigation';
import MAlert from '../../components/customize/MAlert';
import { listOrderPendingAction } from '../../redux-saga/listOrderPending';
import { connect } from 'react-redux';
import MAsyncStorage from '../../Utilities/MAsyncStorage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MShadowView from '../../components/customize/MShadowView';
import HeaderCommon from '../../components/customize/HeaderCommon';
import { FlatList } from 'react-native-gesture-handler';
import img_avatar_placeholder from '../../assets/images/img_avatar_placeholder.png';
import right_icon from '../../assets/images/right_icon.png';
import top_icon from '../../assets/images/top_icon.png';
import Utilities from '../../Utilities/Utilities';
import { height, width } from '../../components/customize/config/constant';
const mon_an = require('../../assets/images/mon_an.jpeg');

class Item extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			extend: false
		};
	}

	componentDidUpdate(PrevProps) {}
	onExtend = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ extend: !this.state.extend });
	};
	view_price = () => {
		return <TextPoppin style={styles.text_price}>$ 200</TextPoppin>;
	};
	goDetail = () => {
		this.props.navigation.navigate('DeliveryDetail', { item: this.props.item });
	};
	render() {
		return (
			<TouchableOpacity
				style={{
					marginBottom: 10,
					justifyContent: 'center',
					padding: 0,
					marginHorizontal: -10
				}}
				onPress={this.goDetail}
			>
				<MShadowView style={{ alignSelf: 'center', width: Config.widthDevice + 10 }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ width: 80, padding: 20 }}>
							<FastImage
								resizeMode="contain"
								style={{ width: 60, height: 60, borderRadius: 30 }}
								source={img_avatar_placeholder}
							/>
						</View>
						<View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
							<TextPoppin style={styles.title}>Nguyen Quang Minh</TextPoppin>
							{this.state.extend && (
								<View>
									<TextPoppin style={styles.content_key}>
										Delivery Pickup -{' '}
										<TextPoppin style={styles.content_value}>20/11/1997 </TextPoppin>
									</TextPoppin>
									<TextPoppin style={styles.content_key}>
										Delivery Pickup -{' '}
										<TextPoppin style={styles.content_value}>20/11/1997 </TextPoppin>
									</TextPoppin>
									<TextPoppin style={styles.content_key}>
										Delivery Pickup -{' '}
										<TextPoppin style={styles.content_value}>20/11/1997 </TextPoppin>
									</TextPoppin>
									<View>{this.view_price()}</View>
								</View>
							)}
						</View>
						<TouchableOpacity
							onPress={this.onExtend}
							style={{ width: 40, justifyContent: 'center', alignItems: 'flex-start' }}
						>
							<FastImage
								resizeMode="contain"
								style={{ width: 20, height: 20 }}
								source={this.state.extend ? top_icon : right_icon}
							/>
						</TouchableOpacity>
					</View>
				</MShadowView>
			</TouchableOpacity>
		);
	}
}

class Deliveries extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
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
				},
				user_id: {
					type: '=',
					value: this.props.userInfoReducer.data.user.id
				}
			}
		};
	}
	onChangeTab = (tab) => () => {
		this.setState({
			tab
		});
	};
	componentDidMount() {
		this.onRefresh();
	}

	componentDidUpdate(PrevProps) {
		if (this.props.createOrderReducer != PrevProps.createOrderReducer) {
			this.onRefresh();
		}
	}

	onRefresh = () => {
		this.props.listOrderPendingAction(this.state.filter);
	};
	view_tabbar = () => {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, paddingHorizontal: 30 }}>
				<TouchableOpacity
					style={{
						paddingBottom: 5,
						flex: 1,
						borderBottomWidth: 3,
						borderColor: this.state.tab == 2 ? Style.primaryColor : 'transparent',
						justifyContent: 'center',
						alignItems: 'center'
					}}
					onPress={this.onChangeTab(2)}
				>
					<TextPoppin style={styles.title}>Hiện tại</TextPoppin>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingBottom: 5,
						flex: 1,
						borderBottomWidth: 3,
						borderColor: this.state.tab == 1 ? Style.primaryColor : 'transparent',
						justifyContent: 'center',
						alignItems: 'center'
					}}
					onPress={this.onChangeTab(1)}
				>
					<TextPoppin style={styles.title}>Lịch sử</TextPoppin>
				</TouchableOpacity>
			</View>
		);
	};
	openOrderDetail = (product) => () => {};
	view_status = (status_id) => {
		if (status_id == 1 || status_id == 2) {
			return (
				<TextPoppin
					style={[
						styles.content_value,
						{
							backgroundColor: '#D9C500',
							color: 'white',
							width: 100,
							textAlign: 'center',
							paddingVertical: 5,
							marginTop: 5,
							fontSize: 13,
							borderRadius: 5
						}
					]}
				>
					Đang xử lý
				</TextPoppin>
			);
		} else if (status_id == 3 || status_id == 4 || status_id == 5) {
			return (
				<TextPoppin
					style={[
						styles.content_value,
						{
							backgroundColor: Style.primaryColor,
							color: 'white',
							width: 100,
							textAlign: 'center',
							paddingVertical: 5,
							marginTop: 5,
							fontSize: 13,
							borderRadius: 5
						}
					]}
				>
					Đang giao
				</TextPoppin>
			);
		} else if (status_id == 6) {
			return (
				<TextPoppin
					style={[
						styles.content_value,
						{
							backgroundColor: Style.primaryColor,
							color: 'white',
							width: 100,
							textAlign: 'center',
							paddingVertical: 5,
							marginTop: 5,
							fontSize: 13,
							borderRadius: 5
						}
					]}
				>
					Đã nhận hàng
				</TextPoppin>
			);
		} else {
			return (
				<TextPoppin
					style={[
						styles.content_value,
						{
							backgroundColor: '#DB4A1C',
							color: 'white',
							width: 100,
							textAlign: 'center',
							paddingVertical: 5,
							marginTop: 5,
							fontSize: 13,
							borderRadius: 5
						}
					]}
				>
					Đã hủy
				</TextPoppin>
			);
		}
	};
	view_item = (item, index) => {
		console.log(
			item.products[0].images && item.products[0].images[0] ? { uri: item.products[0].images[0] } : mon_an
		);

		return (
			<MShadowView style={{}}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						paddingHorizontal: Config.PADDING_HORIZONTAL,
						paddingVertical: Config.PADDING_VERTICAL
					}}
					onPress={this.openOrderDetail(item)}
				>
					<View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
						<FastImage
							source={
								item.products[0].product.images && item.products[0].product.images[0] ? (
									{ uri: item.products[0].product.images[0] }
								) : (
									mon_an
								)
							}
							style={{ height: 68, width: 68, borderRadius: 80 }}
							resizeMode="stretch"
						/>
						{this.view_status(item.status_id)}
					</View>
					<View
						style={{
							flex: 1
						}}
					>
						<View
							style={{
								flex: 1,
								paddingLeft: 10,
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}
						>
							<TextPoppin style={styles.title}>
								{this.count_total_quantity_cart(item.products)} món
							</TextPoppin>
							<Icon name="circle" size={5} />
							<TextPoppin style={styles.title}>
								{Utilities.instance().add_dot_number(item.total_price)} đ
							</TextPoppin>
						</View>
						<View
							style={{
								flex: 1,
								paddingLeft: 10,
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}
						>
							<TextPoppin style={styles.content_value}>{item.customer_address}</TextPoppin>
						</View>
						<View
							style={{
								flex: 1,
								paddingLeft: 10
							}}
						>
							<TextPoppin style={[ styles.content_value, { textAlign: 'right', fontStyle: 'italic' } ]}>
								{Utilities.instance().dateDDMMYYYY(item.created_at)}
							</TextPoppin>
						</View>
					</View>

					{/* <TextPoppin style={styles.title}>{item.customer_address}</TextPoppin> */}
				</TouchableOpacity>
			</MShadowView>
		);
	};
	count_total_quantity_cart = (cart) => {
		var total = cart.reduce((sum, item) => sum + item.quantity, 0);
		return total;
	};
	render() {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon disableLeft title="Đơn hàng của bạn" />
				<View style={{ alignItems: 'center', flex: 1, width: '100%' }}>
					<View style={{ flex: 1, height: height, width: width }}>
						<FlatList
							refreshControl={
								<RefreshControl
									refreshing={this.props.listOrderPendingReducer.isLoading}
									onRefresh={this.onRefresh}
								/>
							}
							initialNumToRender={10}
							maxToRenderPerBatch={10}
							windowSize={10}
							legacyImplementation={false}
							updateCellsBatchingPeriod={50}
							data={this.props.listOrderPendingReducer.data.list}
							extraData={this.props.listOrderPendingReducer.data.list}
							keyExtractor={(item, index) => index + ''}
							ListEmptyComponent={
								<TextPoppin style={[ styles.text_content, { marginTop: 101, textAlign: 'center' } ]}>
									Không có dữ liệu
								</TextPoppin>
							}
							// onScrollBeginDrag={() => {
							// 	this.setState({ scroll: true });
							// }}
							// onEndReachedThreshold={0.2}
							// onEndReached={({ distanceFromEnd }) => {
							// 	if (this.props.listOrderPendingReducer.canLoadMore) {
							// 		this.next_page();
							// 	}
							// }}
							renderItem={({ item, index }) => {
								return this.view_item(item, index);
							}}
						/>
					</View>
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
		textAlign: 'center',
		width: 100
	},
	content_key: {
		fontSize: Style.fontSize,
		// fontWeight: Config.os == 2 ? 'bold' : '600',
		textAlign: 'left',
		color: '#999999'
	},
	content_value: {
		fontSize: Style.fontSize - 2,
		// fontWeight: Config.os == 2 ? 'bold' : '600',
		// textAlign: 'left',
		color: '#3f3f3f'
	}
});

function mapStateToProps(state) {
	return {
		createOrderReducer: state.createOrderReducer,
		userInfoReducer: state.userInfoReducer,
		listOrderPendingReducer: state.listOrderPendingReducer
	};
}

export default connect(mapStateToProps, { listOrderPendingAction })(Deliveries);

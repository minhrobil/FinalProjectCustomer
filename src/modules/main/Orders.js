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
import HeaderCommon from '../../components/customize/HeaderCommon';
import { FlatList } from 'react-native-gesture-handler';
import img_avatar_placeholder from '../../assets/images/img_avatar_placeholder.png';
import right_icon from '../../assets/images/right_icon.png';
import top_icon from '../../assets/images/top_icon.png';

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
			tab: 1
		};
	}
	onChangeTab = (tab) => () => {
		this.setState({
			tab
		});
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
	componentDidUpdate(PrevProps) {}
	render() {
		return (
			<MView statusbarColor={'white'}>
				<HeaderCommon disableLeft title="Đơn hàng của bạn" />
				<View style={{ alignItems: 'center', flex: 1, width: '100%' }}>
					{this.view_tabbar()}
					<FlatList
						ListFooterComponent={<View style={{ height: 20 }} />}
						horizontal={false}
						contentContainerStyle={{ width: Config.widthDevice }}
						showsVerticalScrollIndicator={true}
						data={[ 1, 2, 3, 4, 5 ]}
						renderItem={({ item, index }) => {
							return <Item key={item} item={item} navigation={this.props.navigation} />;
						}}
					/>
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

export default connect(mapStateToProps, { login })(Deliveries);

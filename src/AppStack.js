import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import React from 'react';
import { Easing, Animated, StyleSheet } from 'react-native';
import SplashScreen from './modules/initial/splash/SplashScreen';
import LoginScreen from './modules/initial/login/LoginScreen';
import MapScreen from './modules/main/MapScreen';
import Deliveries from './modules/main/Deliveries';
import DeliveryDetail from './modules/main/DeliveryDetail';
import Account from './modules/main/Account';
import AccountEdit from './modules/main/AccountEdit';
import ChangePass from './modules/main/ChangePass';
import Product from './modules/main/Product';
import Cart from './modules/main/Cart';
import AutocompleteAddress from './modules/main/AutocompleteAddress';

import SMSValidation from './modules/initial/login/SMSValidation';
import SigninScreen from './modules/initial/login/SigninScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { TextHelvetica } from './components/customize/MText';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Config } from './Utilities/Config';
import { Styles } from './Utilities/Styles';

const TabMain = createBottomTabNavigator(
	{
		order: { screen: Deliveries },
		map: { screen: MapScreen },
		account: { screen: Account }
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				if (routeName === 'order') {
					return (
						<FastImage
							resizeMode={FastImage.resizeMode.contain}
							style={styles.icon}
							tintColor={focused ? Styles.primaryColor : '#7f7f7f'}
							source={require('./assets/images/vehicle.png')}
						/>
					);
				} else if (routeName === 'map') {
					return (
						<FastImage
							resizeMode={FastImage.resizeMode.contain}
							style={styles.icon}
							tintColor={focused ? Styles.primaryColor : null}
							source={require('./assets/images/map.png')}
						/>
					);
				} else if (routeName === 'account') {
					return (
						<FastImage
							resizeMode={FastImage.resizeMode.contain}
							style={styles.icon}
							tintColor={focused ? Styles.primaryColor : '#7f7f7f'}
							source={require('./assets/images/user.png')}
						/>
					);
				}
				return <Ionicons name={'home'} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: '#EE5723',
			inactiveTintColor: 'gray',
			showLabel: false
		}
	}
);
const routeStack = createStackNavigator(
	{
		main: {
			screen: TabMain
		},
		splash: {
			screen: SplashScreen
		},
		LoginScreen: {
			screen: LoginScreen
		},
		SMSValidation: {
			screen: SMSValidation
		},
		SigninScreen: {
			screen: SigninScreen
		},
		DeliveryDetail: {
			screen: DeliveryDetail
		},
		AccountEdit: {
			screen: AccountEdit
		},
		ChangePass: {
			screen: ChangePass
		},
		Product: {
			screen: Product
		},
		Cart: {
			screen: Cart
		},
		AutocompleteAddress: {
			screen: AutocompleteAddress
		}
	},
	{
		initialRouteName: 'splash',
		headerMode: 'none',
		mode: 'card',
		defaultNavigationOptions: {
			gesturesEnabled: true,
			gestureResponseDistance: 200
		},
		transitionConfig: () => ({
			transitionSpec: {
				duration: 300,
				easing: Easing.out(Easing.poly(4)),
				timing: Animated.timing
			},
			screenInterpolator: (sceneProps) => {
				const { layout, position, scene } = sceneProps;
				const { index } = scene;

				const width = layout.initWidth;
				const translateX = position.interpolate({
					inputRange: [ index - 1, index, index + 1 ],
					outputRange: [ width, 0, 0 ]
				});

				const opacity = position.interpolate({
					inputRange: [ index - 1, index - 0.99, index ],
					outputRange: [ 0, 1, 1 ]
				});

				return { opacity, transform: [ { translateX } ] };
			}
		})
	}
);

export const AppStack = createAppContainer(routeStack);

const styles = StyleSheet.create({
	icon: {
		height: 24,
		width: 24
	},
	textNav: {
		fontSize: 12,
		textAlign: 'center',
		marginLeft: Config.isLandscape ? 20 : 0
	}
});

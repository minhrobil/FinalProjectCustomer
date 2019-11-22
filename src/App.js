/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppStack } from './AppStack';
import codePush from 'react-native-code-push';
import store from './redux-saga/Store';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppStack />
			</Provider>
		);
	}
}

App = codePush({
	checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
	updateDialog: false,
	installMode: codePush.InstallMode.IMMEDIATE
})(App);
export default App;

//iOS// appcenter codepush release-react -a truongminhphucsky95/Mecash-IOS -d Production
//iOS// appcenter codepush release-react -a g-group/tima -d Staging
//Android// appcenter codepush release-react -a truongminhphucsky95/Mecash-Android -d Production
//Android// appcenter codepush release-react -a truongminhphucsky95/Mecash-Android -d Staging

//Android// appcenter codepush deployment list -a g-group/tima-1
// ┌───────── ───┬──────────────────────────────────────────────────────────────────┐
// │ Name       │ Deployment Key                                                   │
// ├────────────┼──────────────────────────────────────────────────────────────────┤
// │ Production │ KMO5vWQvAtOuIS53XOaHgaQJmHPV20d7fb24-e27f-4ed2-88e0-157ff447f8bd │
// ├────────────┼──────────────────────────────────────────────────────────────────┤
// │ Staging    │ CgHHy1uKvKOTYAt1Ur3PRHPq3SO520d7fb24-e27f-4ed2-88e0-157ff447f8bd │
// └────────────┴──────────────────────────────────────────────────────────────────┘

//iOS/// appcenter codepush deployment list -a g-group/tima-1
// ┌────────────┬──────────────────────────────────────────────────────────────────┐
// │ Name       │ Deployment Key                                                   │
// ├────────────┼──────────────────────────────────────────────────────────────────┤
// │ Production │ b3sqbZpzOh1ODjds5a0WtiCE26ko20d7fb24-e27f-4ed2-88e0-157ff447f8bd │
// ├────────────┼──────────────────────────────────────────────────────────────────┤
// │ Staging    │ EV1Ji43thXOEOnd5461ElaBLKR-120d7fb24-e27f-4ed2-88e0-157ff447f8bd │
// └────────────┴──────────────────────────────────────────────────────────────────┘

//app tima sku apple:SanTima Apple ID: 1291754151

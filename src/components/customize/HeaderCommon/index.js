import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Config } from '../../../Utilities/Config';
import { Styles } from '../../../Utilities/Styles';

const back_icon = require('../../../assets/images/back_icon.png');
const BORDER_COLOR = '#F3F3F3';
import { TextRoboto, TextPoppin } from '../../../components/customize/MText';
import OneLine from '../OneLine';
import MShadowView from '../MShadowView';
class HeaderCommon extends Component {
	render() {
		const { disableLeft, actionLeft, title } = this.props;
		return (
			<View
				style={{
					width: Config.os == 2 ? '103%' : '104%',
					height: Config.os == 2 ? 80 : 80,
					alignSelf: 'center',
					zIndex: 1
				}}
			>
				<View style={{ flex: 1, backgroundColor: 'white', marginBottom:Config.os==2 ? -32 : -20,  zIndex: 2 }} />
				<MShadowView style={styles.mview_submit}>
					<View style={[ styles.view_header ]}>
						{!disableLeft ? (
							<TouchableOpacity
								style={[ styles.view_left ]}
								onPress={() => {
									if (actionLeft) {
										actionLeft();
									}
								}}
							>
								<Image source={back_icon} style={{ height: 20, resizeMode: 'contain' }} />
							</TouchableOpacity>
						) : (
							<View style={styles.view_right} />
						)}
						<View style={styles.view_center}>
							{title ? (
								<TextPoppin style={[ styles.text_style_normal, { textAlign: 'center', fontSize: 20 } ]}>
									{title}
								</TextPoppin>
							) : null}
						</View>
						<View style={styles.view_right} />
					</View>
				</MShadowView>
			</View>
		);
	}
}

export default HeaderCommon;

const styles = StyleSheet.create({
	mview_submit: {
		borderRadius: Config.os == 2 ? 40 : 0,
		borderBottomRightRadius: 40,
		borderBottomLeftRadius: 40,
		marginTop: -5
	},

	text_style_normal: {
		fontSize: Config.textSizeNormal + 1,
		color: '#535353',
		fontWeight: 'bold'
	},
	view_left: {
		alignItems: 'center',
		flex: 1
	},
	view_center: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 3
	},
	view_header: {
		height: 70,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	view_right: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: 1
	}
});

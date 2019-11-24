import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import BaseContainer from '../../../../components/BaseContainer';
import { connect } from 'react-redux';
import * as constant from '../../../../config/constant';
import * as HeaderConfig from '../../../../config/headerConfig';
import { language } from '../../../../language/translate';
import symbol from '../../../../config/languageConfig';
import ViewHightLight from '../../../../components/ViewHightLight';
import AutocompletePlaces from '../../../../components/AutocompletePlaces';
import OneLine from '../../../../components/OneLine';
import { getPlaceId, getNamePlace } from '../../../../api';
import * as styles from './style';
import { format_city } from '../../../../utilities/FormatCity';
import HeaderCommon from '../../../components/customize/HeaderCommon';

class AutocompleteAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			area: '',
			address: this.props.navigation.getParam('address', ''),
			places: [],
			isLoading: false,
			lat: this.props.permissionLocation ? this.props.userData.account.location.coordinates[1] : 0,
			lng: this.props.permissionLocation ? this.props.userData.account.location.coordinates[0] : 0
		};
	}

	render() {
		action = this.props.navigation.getParam('action', () => {});
		return (
			<BaseContainer>
				<HeaderCommon title="Nhập địa chỉ " actionLeft={this.props.navigation.goBack} />
				<View style={constant.BODY}>
					<View style={{ flex: 1, paddingTop: 10 }}>
						<AutocompletePlaces
							text={this.state.address}
							placeholder={language('create_job.place_holder_input_address')}
							maxLength={50}
							action_change_text={(text) => this.setState({ isLoading: true, address: text })}
							action_change_places={(places) => this.setState({ places: places, isLoading: false })}
						/>

						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							{this.state.isLoading ? (
								<ActivityIndicator size="large" />
							) : (
								<View style={{ marginTop: 10 * constant.ratioHeight }}>
									<FlatList
										keyExtractor={(item, index) => index}
										keyboardShouldPersistTaps="handled"
										showsVerticalScrollIndicator={false}
										extraData={this.state.places}
										data={this.state.places}
										renderItem={(item, index) => {
											return (
												<View>
													<TouchableOpacity
														onPress={() => {
															getPlaceId(item.item.place_id).then((res) => {
																console.log(res);
																this.setState(
																	{
																		area:
																			item.item.terms[item.item.terms.length - 1]
																				.value,
																		address: item.item.description,
																		places: [],
																		location: res.result.geometry.location
																	},
																	() => {
																		action(
																			this.state.address,
																			format_city(this.state.area),
																			this.state.location
																		),
																			this.props.navigation.goBack();
																	}
																);
															});
														}}
														style={[ styles.view_place, { flexDirection: 'row' } ]}
													>
														<View
															style={{
																justifyContent: 'center',
																alignItems: 'center',
																paddingHorizontal: 15 * constant.ratioHeight
															}}
														>
															<Icon
																name="map-marker-alt"
																light
																size={25 * constant.ratioHeight}
																color={constant.TEXT_PLACEHOLDER_COLOR}
															/>
														</View>
														<View>
															<TextPoppin style={styles.main_text}>
																{item.item.structured_formatting.main_text.length >
																30 ? (
																	item.item.structured_formatting.main_text.slice(
																		0,
																		30
																	) + '...'
																) : (
																	item.item.structured_formatting.main_text
																)}
															</TextPoppin>
															{item.item.description.length > 45 ? (
																<TextPoppin style={styles.description_text}>
																	{item.item.description.slice(0, 45)}...
																</TextPoppin>
															) : (
																<TextPoppin style={styles.description_text}>
																	{item.item.description}
																</TextPoppin>
															)}
														</View>
													</TouchableOpacity>
													<OneLine />
												</View>
											);
										}}
									/>
								</View>
							)}
						</TouchableWithoutFeedback>
					</View>
				</View>
			</BaseContainer>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userData: state.userData,
		permissionLocation: state.permissionLocation
	};
};
export default connect(mapStateToProps)(AutocompleteAddress);

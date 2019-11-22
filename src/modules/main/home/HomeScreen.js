import React from "react";
import {View, StyleSheet, ScrollView, FlatList,RefreshControl} from "react-native";
import MView from "../../../components/customize/MView";
import {Config} from "../../../Utilities/Config";
import {PieChart} from "react-native-svg-charts";
import {TextHelvetica} from "../../../components/customize/MText";
import {Styles as Style} from "../../../Utilities/Styles";
import FastImage from "react-native-fast-image";
import {connect} from "react-redux";
import {getCommonData, getRecentReport, login} from "../../../redux-saga/Action";
import MAsyncStorage from "../../../Utilities/MAsyncStorage";
import Utilities from "../../../Utilities/Utilities";


class HomeScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: {},
            pieBorrowing: [
                {
                    key: 1,
                    value: 30,
                    svg: {fill: '#716ACA'},
                },
                {
                    key: 2,
                    value: 30,
                    svg: {fill: '#F4516C'}
                },
                {
                    key: 3,
                    value: 40,
                    svg: {fill: '#34BFA3'}
                },
            ],
            pieInterest: [
                {
                    key: 1,
                    value: 30,
                    svg: {fill: '#716ACA'},
                },
                {
                    key: 2,
                    value: 30,
                    svg: {fill: '#F4516C'}
                },
                {
                    key: 3,
                    value: 40,
                    svg: {fill: '#34BFA3'}
                },
            ],
            commonData: {},
            recentData:[],
            isLoading:false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.state) !== JSON.stringify(nextState);
    }


    componentWillReceiveProps({getCommonDataRes, getRecentReportRes}) {
        if (getCommonDataRes.data) {
            let pieBorrowing = this.state.pieBorrowing;
            let pieInterest = this.state.pieInterest;
            pieBorrowing[0].value = getCommonDataRes.data.PawnInvestmentPercent;
            pieBorrowing[1].value = getCommonDataRes.data.LoanInvestmentPercent;
            pieBorrowing[2].value = getCommonDataRes.data.InstallmentInvestmentPercent;

            pieInterest[0].value = getCommonDataRes.data.PawnEarnedPercent;
            pieInterest[1].value = getCommonDataRes.data.LoanEarnedPercent;
            pieInterest[2].value = getCommonDataRes.data.InstallmentEarnedPercent;
            this.setState({pieBorrowing: pieBorrowing, pieInterest: pieInterest, commonData: getCommonDataRes.data});
        }
        this.setState({isLoading: getCommonDataRes.isLoading});
        if (getRecentReportRes.data) {
            this.setState({recentData:getRecentReportRes.data});
        }

    }


    async componentWillMount() {
       this._onRefresh();
        const user = await MAsyncStorage.getUserInfo();
        this.setState({user: user});
    }

    _onRefresh(){
        this.props.getCommonData();
        this.props.getRecentReport();
    }

    render() {
        return (
            <MView
                style={{backgroundColor: Style.backgroundColorHome}}
                statusbarColor={"white"}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this._onRefresh()}
                        />
                    }
                    style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", marginTop: 15, alignItems: 'center'}}>
                            <TextHelvetica style={styles.textHome}>
                                Trang chủ
                            </TextHelvetica>
                            <FastImage
                                style={{width: 100, height: 50, marginRight: 10}}
                                resizeMode={FastImage.resizeMode.contain}
                                source={require('../../../assets/images/logo_login.png')}/>
                        </View>
                        <View style={{height: 20}}/>
                        <View style={styles.boxFirst}>
                            <View style={{flexDirection: 'row'}}>
                                <TextHelvetica style={{color: Style.textColorGray, fontSize: 16}}>
                                    Số dư
                                </TextHelvetica>
                                <TextHelvetica style={{
                                    color: Style.textColorGray,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    flex: 1,
                                    textAlign: 'right'
                                }}>
                                    {this.state.user.TotalMoney} VNĐ
                                </TextHelvetica>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <TextHelvetica style={{color: Style.textColorGray, fontSize: 16}}>
                                    Ngày hiệu lực
                                </TextHelvetica>
                                <TextHelvetica style={{
                                    color: Style.textColorGray,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    flex: 1,
                                    textAlign: 'right'
                                }}>
                                    {Utilities.instance().convertToSimpleTime(this.state.user.ExpiredDate)}
                                </TextHelvetica>
                            </View>
                        </View>
                        <View style={{height: 20}}/>
                        <View style={[styles.boxSecond, {backgroundColor: '#716ACA'}]}>
                            <FastImage
                                style={{width: 24, height: 24}}
                                source={require("../../../assets/icons/icon_lent.png")}/>
                            <View style={{flex: 1, marginLeft: 15}}>
                                <TextHelvetica style={{color: Style.backgroundColorHome, fontSize: 14}}>
                                    TỔNG QUỸ TIỀN MẶT
                                </TextHelvetica>
                                <TextHelvetica
                                    style={{color: "white", fontSize: 20, fontWeight: 'bold'}}>
                                    {Utilities.instance().formatMoney(this.state.commonData.MoneyEndDate)} VNĐ
                                </TextHelvetica>
                            </View>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={[styles.boxSecond, {backgroundColor: '#F4516C'}]}>
                            <FastImage
                                style={{width: 24, height: 24}}
                                source={require("../../../assets/icons/ic_contract.png")}/>
                            <View style={{flex: 1, marginLeft: 15}}>
                                <TextHelvetica style={{color: Style.backgroundColorHome, fontSize: 14}}>
                                    HỢP ĐỒNG ĐANG VAY
                                </TextHelvetica>
                                <TextHelvetica
                                    style={{color: "white", fontSize: 20, fontWeight: 'bold'}}>
                                    {this.state.commonData.TotalContractOpen}
                                </TextHelvetica>
                            </View>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={[styles.boxSecond, {backgroundColor: '#36A3F7'}]}>
                            <FastImage
                                style={{width: 24, height: 24}}
                                source={require("../../../assets/icons/icon_lent.png")}/>
                            <View style={{flex: 1, marginLeft: 15}}>
                                <TextHelvetica style={{color: Style.backgroundColorHome, fontSize: 14}}>
                                    TIỀN ĐANG CHO VAY
                                </TextHelvetica>
                                <TextHelvetica
                                    style={{color: "white", fontSize: 20, fontWeight: 'bold'}}>
                                    {Utilities.instance().formatMoney(this.state.commonData.TotalMoneyInvestment)} VNĐ
                                </TextHelvetica>
                            </View>
                        </View>
                        <View style={{height: 10}}/>
                        <View style={[styles.boxSecond, {backgroundColor: '#34BFA3'}]}>
                            <FastImage
                                style={{width: 24, height: 24}}
                                source={require("../../../assets/icons/ic_percent.png")}/>
                            <View style={{flex: 1, marginLeft: 15}}>
                                <TextHelvetica style={{color: Style.backgroundColorHome, fontSize: 14}}>
                                    TIỀN LÃI THU TRONG THÁNG
                                </TextHelvetica>
                                <TextHelvetica
                                    style={{color: "white", fontSize: 20, fontWeight: 'bold'}}>
                                    {Utilities.instance().formatMoney(this.state.commonData.TotalInterestEarn)} VNĐ
                                </TextHelvetica>
                            </View>
                        </View>
                        <View style={{height: 20}}/>
                        <View style={styles.boxFirst}>
                            <View style={{flexDirection: 'row'}}>
                                <TextHelvetica style={styles.textAnalytic25}/>
                                <TextHelvetica style={styles.textAnalytic50}>
                                    Số hợp đồng đang vay
                                </TextHelvetica>
                                <TextHelvetica style={styles.textAnalytic25}>
                                    Tổng số
                                </TextHelvetica>
                            </View>
                            <View style={{height: 10}}/>
                            <View style={[styles.boxAnalytic, {backgroundColor: Style.backgroundColorHome}]}>
                                <TextHelvetica style={[styles.textAnalytic25, {fontWeight: "bold"}]}>
                                    Cầm đồ
                                </TextHelvetica>
                                <TextHelvetica style={[styles.textAnalytic50, {fontWeight: "bold"}]}>
                                    {this.state.commonData.PawnOpen}
                                </TextHelvetica>
                                <TextHelvetica style={[styles.textAnalytic25, {fontWeight: "bold"}]}>
                                    {this.state.commonData.PawnTotalContract}
                                </TextHelvetica>
                            </View>
                            <View style={[styles.boxAnalytic]}>
                                <TextHelvetica style={[styles.textAnalytic25, {fontWeight: "bold"}]}>
                                    Vay lãi
                                </TextHelvetica>
                                <TextHelvetica style={[styles.textAnalytic50, {fontWeight: "bold"}]}>
                                    {this.state.commonData.LoanOpen}
                                </TextHelvetica>
                                <TextHelvetica style={[styles.textAnalytic25, {fontWeight: "bold"}]}>
                                    {this.state.commonData.LoanTotalContract}
                                </TextHelvetica>
                            </View>
                            <View style={[styles.boxAnalytic, {backgroundColor: Style.backgroundColorHome}]}>
                                <TextHelvetica style={[styles.textAnalytic25, {fontWeight: "bold"}]}>
                                    Bát họ
                                </TextHelvetica>
                                <TextHelvetica style={[styles.textAnalytic50, {fontWeight: "bold"}]}>
                                    {this.state.commonData.InstallmentOpen}
                                </TextHelvetica>
                                <TextHelvetica style={[styles.textAnalytic25, {fontWeight: "bold"}]}>
                                    {this.state.commonData.InstallmentTotalContract}
                                </TextHelvetica>
                            </View>
                            <View style={{height: 25}}/>
                            <TextHelvetica style={{color: Style.textColor, fontSize: 16, fontWeight: 'bold'}}>
                                ■ Đang cho vay
                            </TextHelvetica>
                            <View style={{flexDirection: 'row'}}>
                                <PieChart
                                    style={{height: 170, width: 170, marginLeft: -25}}
                                    outerRadius={'70%'}
                                    innerRadius={10}
                                    data={this.state.pieBorrowing}
                                />
                                <View style={{flex: 1, marginLeft: -17, justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={[styles.boxPercent, {backgroundColor: "#716ACA"}]}>
                                            <TextHelvetica style={{color: 'white', fontSize: 12}}>
                                                {this.state.commonData.PawnInvestmentPercent}%
                                            </TextHelvetica>
                                        </View>
                                        <View style={{flex: 1, marginLeft: 10}}>
                                            <TextHelvetica style={{fontSize: 16, color: Style.textColor}}>
                                                Cầm đồ
                                            </TextHelvetica>
                                            <TextHelvetica style={{fontSize: 14, color: Style.textColor}}>
                                                {Utilities.instance().formatMoney(this.state.commonData.PawnMoneyInvestment)} VNĐ
                                            </TextHelvetica>
                                        </View>

                                    </View>
                                    <View style={{height: 3}}/>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={[styles.boxPercent, {backgroundColor: "#F4516C"}]}>
                                            <TextHelvetica style={{color: 'white', fontSize: 12}}>
                                                {this.state.commonData.LoanInvestmentPercent}%
                                            </TextHelvetica>
                                        </View>
                                        <View style={{flex: 1, marginLeft: 10}}>
                                            <TextHelvetica style={{fontSize: 16, color: Style.textColor}}>
                                                Vay lãi
                                            </TextHelvetica>
                                            <TextHelvetica style={{fontSize: 14, color: Style.textColor}}>
                                                {Utilities.instance().formatMoney(this.state.commonData.LoanMoneyInvestment)} VNĐ
                                            </TextHelvetica>
                                        </View>

                                    </View>
                                    <View style={{height: 3}}/>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={[styles.boxPercent, {backgroundColor: "#34BFA3"}]}>
                                            <TextHelvetica style={{color: 'white', fontSize: 12}}>
                                                {this.state.commonData.InstallmentInvestmentPercent}%
                                            </TextHelvetica>
                                        </View>
                                        <View style={{flex: 1, marginLeft: 10}}>
                                            <TextHelvetica style={{fontSize: 16, color: Style.textColor}}>
                                                Bát họ
                                            </TextHelvetica>
                                            <TextHelvetica style={{fontSize: 14, color: Style.textColor}}>
                                                {Utilities.instance().formatMoney(this.state.commonData.InstallmentMoneyInvestment)} VNĐ
                                            </TextHelvetica>
                                        </View>

                                    </View>
                                </View>
                            </View>
                            <View style={{height: 10}}/>
                            <View style={{height: 2, backgroundColor: '#F0F0F0'}}/>
                            <View style={{height: 25}}/>
                            <TextHelvetica style={{color: Style.textColor, fontSize: 16, fontWeight: 'bold'}}>
                                ■ Lợi nhuận
                            </TextHelvetica>
                            <View style={{flexDirection: 'row'}}>
                                <PieChart
                                    style={{height: 170, width: 170, marginLeft: -25}}
                                    outerRadius={'70%'}
                                    innerRadius={10}
                                    data={this.state.pieInterest}
                                />
                                <View style={{flex: 1, marginLeft: -17, justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={[styles.boxPercent, {backgroundColor: "#716ACA"}]}>
                                            <TextHelvetica style={{color: 'white', fontSize: 12}}>
                                                {this.state.commonData.PawnEarnedPercent}%
                                            </TextHelvetica>
                                        </View>
                                        <View style={{flex: 1, marginLeft: 10}}>
                                            <TextHelvetica style={{fontSize: 16, color: Style.textColor}}>
                                                Cầm đồ
                                            </TextHelvetica>
                                            <TextHelvetica style={{fontSize: 14, color: Style.textColor}}>
                                                {Utilities.instance().formatMoney(this.state.commonData.PawnInterestEarned)} VNĐ
                                            </TextHelvetica>
                                        </View>

                                    </View>
                                    <View style={{height: 3}}/>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={[styles.boxPercent, {backgroundColor: "#F4516C"}]}>
                                            <TextHelvetica style={{color: 'white', fontSize: 12}}>
                                                {this.state.commonData.LoanEarnedPercent}%
                                            </TextHelvetica>
                                        </View>
                                        <View style={{flex: 1, marginLeft: 10}}>
                                            <TextHelvetica style={{fontSize: 16, color: Style.textColor}}>
                                                Vay lãi
                                            </TextHelvetica>
                                            <TextHelvetica style={{fontSize: 14, color: Style.textColor}}>
                                                {Utilities.instance().formatMoney(this.state.commonData.LoanInterestEarned)} VNĐ
                                            </TextHelvetica>
                                        </View>

                                    </View>
                                    <View style={{height: 3}}/>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={[styles.boxPercent, {backgroundColor: "#34BFA3"}]}>
                                            <TextHelvetica style={{color: 'white', fontSize: 12}}>
                                                {this.state.commonData.InstallmentEarnedPercent}%
                                            </TextHelvetica>
                                        </View>
                                        <View style={{flex: 1, marginLeft: 10}}>
                                            <TextHelvetica style={{fontSize: 16, color: Style.textColor}}>
                                                Bát họ
                                            </TextHelvetica>
                                            <TextHelvetica style={{fontSize: 14, color: Style.textColor}}>
                                                {Utilities.instance().formatMoney(this.state.commonData.InstallmentInterestEarned)} VNĐ
                                            </TextHelvetica>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{height: 25}}/>
                        <TextHelvetica style={{color: Style.secondaryColor, fontSize: 16, fontWeight: 'bold', marginLeft: 20}}>
                            Giao dịch trong ngày
                        </TextHelvetica>
                        <View style={{height: 10}}/>
                        <FlatList
                            style={{flex: 1}}
                            data={this.state.recentData}
                            renderItem={({item, index}) => this._item(item, index)}
                            keyExtractor={(item, index) => item.id + "-" + index}
                        />

                        <View style={{height: 20, marginTop: 10}}/>
                    </View>
                </ScrollView>
            </MView>
        )
    }

    _item(item, index) {
        return (
            <View key={index} style={styles.item}>
                <View style={{width: 2, backgroundColor: "#34BFA3", marginTop: 15, marginBottom: 15}}/>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    marginBottom: 15,
                    marginRight: 15
                }}>
                    <View style={{ marginLeft: 20,alignItems:'center'}}>
                        <TextHelvetica style={{color: Style.secondaryColor, fontSize: 16}}>
                            {item.StrTime}
                        </TextHelvetica>
                        <TextHelvetica style={{color: Style.secondaryColor, fontSize: 12}}>
                            {item.StrDate}
                        </TextHelvetica>
                    </View>

                    <View style={{flex: 1, marginLeft: 15}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{
                                backgroundColor: '#34BFA3',
                                borderRadius: 3,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TextHelvetica style={{color: "white", fontSize: 11, marginLeft: 7, marginRight: 7}}>
                                    {item.ActionName}
                                </TextHelvetica>
                            </View>
                            <TextHelvetica style={{color: "#999999", fontSize: 14, marginLeft: 20}}>
                                Bởi {item.Username}
                            </TextHelvetica>
                        </View>
                        <TextHelvetica style={{fontSize: 16, color: Style.textColor, marginTop: 7}}>
                            {item.CustomerName}
                        </TextHelvetica>

                        <TextHelvetica style={{fontSize: 16, color: Style.textColor, marginTop: 7}}>
                            {item.TypeName} <TextHelvetica style={{fontWeight: 'bold'}}>
                            {Utilities.instance().formatMoney(item.TotalMoney)} VNĐ
                        </TextHelvetica>
                        </TextHelvetica>
                    </View>

                </View>
            </View>
        )
    }

}

function mapStateToProps(state) {
    return {
        getRecentReportRes: state.GetRecentReport,
        getCommonDataRes: state.GetCommonData
    }
}

export default connect(mapStateToProps, {getRecentReport, getCommonData})(HomeScreen);


const styles = StyleSheet.create({
    boxPercent: {
        width: 36, height: 26, justifyContent: 'center', alignItems: 'center', borderRadius: 5
    },
    textHome: {
        fontSize: 24, color: Style.textColorGray, marginTop: 20, marginLeft: 15, flex: 1
    },
    boxFirst: {
        marginLeft: 17, marginRight: 17,
        elevation: 3,
        shadowColor: '#969696',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.4,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15
    },
    boxSecond: {
        marginLeft: 17, marginRight: 17,
        elevation: 3,
        shadowColor: '#969696',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.4,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textAnalytic50: {
        flex: 0.5, textAlign: 'center', color: Style.textColor
    },
    textAnalytic25: {
        flex: 0.25, textAlign: 'center', color: Style.textColor
    },
    boxAnalytic: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    item: {
        marginLeft: 17, marginRight: 17,
        elevation: 2,
        shadowColor: '#969696',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.4,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 3,
        flexDirection: 'row',
        marginBottom: 10
    }
});

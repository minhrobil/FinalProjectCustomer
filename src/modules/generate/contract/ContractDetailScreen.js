import React from "react";
import {Animated, Image, Platform, StyleSheet, View, Text, ScrollView} from 'react-native';
import MView from "../../../components/customize/MView";
import {Styles as Style} from "../../../Utilities/Styles";
import {TextHelvetica} from "../../../components/customize/MText";
import MButton from "../../../components/customize/MButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Utilities from "../../../Utilities/Utilities";
import HTML from "react-native-render-html/src/HTML";
import {connect} from "react-redux";
import { getContractDetailAction} from '../../../redux-saga/contractDetail'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const NAVBAR_HEIGHT = 64;

class ContractDetailScreen extends React.Component {
    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;
    constructor(props) { 
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        this.state = {
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                    }),
                    offsetAnim,
                ),
                0,
                NAVBAR_HEIGHT,
            ),
            item: this.props.navigation.state.params ? this.props.navigation.state.params.item : undefined,
            type: this.props.navigation.state.params ? this.props.navigation.state.params.type : undefined,
            onRefreshContracts: this.props.navigation.state.params
				? this.props.navigation.state.params.onRefreshContracts
				: undefined,
        }
    }
    componentDidMount() {
        this.props.getContractDetailAction(this.state.item.ID)
        this.state.scrollAnim.addListener(({value}) => {
            const diff = value - this._scrollValue;
            this._scrollValue = value;
            this._clampedScrollValue = Math.min(
                Math.max(this._clampedScrollValue + diff, 0),
                NAVBAR_HEIGHT,
            );
        });
        this.state.offsetAnim.addListener(({value}) => {
            this._offsetValue = value;
        });
    }
    componentWillUnmount() {
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
    }

    _onScrollEndDrag = () => {
        this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
    };

    _onMomentumScrollBegin = () => {
        clearTimeout(this._scrollEndTimer);
    };

    _onMomentumScrollEnd = () => {
        const toValue = this._scrollValue > NAVBAR_HEIGHT &&
        this._clampedScrollValue > (NAVBAR_HEIGHT) / 2
            ? this._offsetValue + NAVBAR_HEIGHT
            : this._offsetValue - NAVBAR_HEIGHT;

        Animated.timing(this.state.offsetAnim, {
            toValue,
            duration: 350,
            useNativeDriver: true,
        }).start();
    };
    goMenu = () => {
        this.props.navigation.navigate("menu", {type: this.state.type,item:this.state.item, onRefreshContracts: this.state.onRefreshContracts})
    }
    render() {
        const {clampedScroll} = this.state;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT],
            outputRange: [0, -(NAVBAR_HEIGHT)],
            extrapolate: 'clamp',
        });
        const navbarOpacity = clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT],
            outputRange: [1, 0], 
            extrapolate: 'clamp',
        });


        return (
            <MView
                style={{backgroundColor: Style.backgroundColorHome}}
                statusbarColor={"white"}>
                {
                    this.state.item ?
                        <AnimatedScrollView
                            style={{flex: 1, paddingTop: NAVBAR_HEIGHT}}
                            scrollEventThrottle={1}
                            onMomentumScrollBegin={this._onMomentumScrollBegin}
                            onMomentumScrollEnd={this._onMomentumScrollEnd}
                            onScrollEndDrag={this._onScrollEndDrag}
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {y: this.state.scrollAnim}}}],
                                {useNativeDriver: true},
                            )}
                        >
                            <View style={{flex: 1}}>
                                <View style={{height: 10}}/>
                                <View style={styles.item}>
                                    <TextHelvetica style={styles.title}>
                                        Thông tin cá nhân
                                    </TextHelvetica>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>  
                                            Khách hàng
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                            {this.props.getContractDetailReducer.data.CustomerName}
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Địa chỉ
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                            {this.props.getContractDetailReducer.data.Address}
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Số điện thoại
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                           {this.props.getContractDetailReducer.data.CustomerPhone}
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            CMND
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                           {this.props.getContractDetailReducer.data.NumberCard}
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Nơi cấp
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                           {this.props.getContractDetailReducer.data.Place}
                                        </TextHelvetica>
                                    </View>
                                </View>
                                <View style={{height: 20}}/>
                                <View style={styles.item}>
                                    <TextHelvetica style={styles.title}>
                                        Thông tin {Utilities.instance().getStringFromType(this.state.type)}
                                    </TextHelvetica>
                                    <View style={styles.itemBoxStatus}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Trạng thái
                                        </TextHelvetica>
                                        <View style={{
                                            flex: 1,
                                            paddingBottom: 6,
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            paddingTop: 6
                                        }}>
                                            <View
                                                style={[styles.status, {backgroundColor: Utilities.instance().getStatusColor(this.state.item.Status)}]}>
                                                <TextHelvetica style={{color: "white"}}>
                                                    {Utilities.instance().getBorrowStatusName(this.state.item.Status)}
                                                </TextHelvetica>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            {Utilities.instance().getStringTotalMoneyFromType(this.state.type)}
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeftBold}>
                                            {Utilities.instance().formatMoney(this.state.item.TotalMoney)} Đ
                                        </TextHelvetica>
                                    </View>
                                    {
                                        this.state.type === 4 ?
                                            <View>
                                                <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                                <View style={styles.itemBox}>
                                                    <TextHelvetica style={styles.itemBoxTextRight}>
                                                        Tài sản
                                                    </TextHelvetica>
                                                    <TextHelvetica style={styles.itemBoxTextLeft}>
                                                       {this.props.getContractDetailReducer.data.ItemName}
                                                    </TextHelvetica>
                                                </View>
                                            </View>
                                            :
                                            <View/>
                                    }
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Từ ngày
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                            {Utilities.instance().convertToSimpleTime(this.props.getContractDetailReducer.data.FromDate)}
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Đến ngày
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                            {Utilities.instance().convertToSimpleTime(this.props.getContractDetailReducer.data.ToDate)}
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Ngày trả lãi gần nhất	
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                            {Utilities.instance().convertToSimpleTime(this.props.getContractDetailReducer.data.LastDateOfPay)}
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Lãi suất
                                        </TextHelvetica>
                                        <View style={{flex: 1}}/>
                                        <HTML baseFontStyle={{
                                            color: Style.textColor,
                                            fontSize: 15,
                                            flex: 1,
                                            textAlign: 'right'
                                        }} html={this.props.getContractDetailReducer.data.StrRate}/>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Tiền lãi đã đóng
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeftBold}>
                                            {Utilities.instance().formatMoney(this.props.getContractDetailReducer.data.PaymentMoney)} Đ {" "} 
                                            <TextHelvetica style={styles.itemBoxTextLeft}>
                                             {this.props.getContractDetailReducer.data.BorrowedDay}
                                            </TextHelvetica>
                                        </TextHelvetica>
                                    </View>
                                    {/* <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Tiền còn phải đóng
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeftBold}>
                                            {Utilities.instance().formatMoney(this.props.getContractDetailReducer.data.TotalMoneyCurrent)} Đ
                                        </TextHelvetica>
                                    </View> */}
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Lãi đến hôm nay
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeftBold}>
                                            {Utilities.instance().formatMoney(this.props.getContractDetailReducer.data.InterestToDay)} Đ {" "} 
                                            <TextHelvetica style={styles.itemBoxTextLeft}>
                                             {this.props.getContractDetailReducer.data.FinishDay}
                                            </TextHelvetica>
                                        </TextHelvetica>
                                    </View>
                                  
                                    {/* <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Số tiền giao khách
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeftBold}>
                                            {Utilities.instance().formatMoney(this.props.getContractDetailReducer.data.TotalMoneyReceived)} Đ
                                        </TextHelvetica>
                                    </View> */}
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Nợ cũ HĐ
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeftBold}>
                                            {Utilities.instance().formatMoney(this.props.getContractDetailReducer.data.DebitMoney)} Đ
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>

                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Nợ cũ KH
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeftBold}>
                                            {Utilities.instance().formatMoney(this.props.getContractDetailReducer.data.CustomerDebitMoney)} Đ
                                        </TextHelvetica>
                                    </View>
                                    
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Số ngày vay
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                           {this.props.getContractDetailReducer.data.BorrowedDay}
                                        </TextHelvetica>
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#EDEDED'}}/>
                                    <View style={styles.itemBox}>
                                        <TextHelvetica style={styles.itemBoxTextRight}>
                                            Ngày đóng lãi
                                        </TextHelvetica>
                                        <TextHelvetica style={styles.itemBoxTextLeft}>
                                           {this.props.getContractDetailReducer.data.StrNextDate}
                                        </TextHelvetica>
                                    </View>

                                </View>
                                <View style={{height: NAVBAR_HEIGHT + 20}}/>
                            </View>
                        </AnimatedScrollView>
                        :
                        <View/>
                }

                <Animated.View style={[styles.navbar, {transform: [{translateY: navbarTranslate}]}]}>
                    <Animated.View style={[styles.toolbar, {opacity: navbarOpacity}]}>
                        <MButton
                            onPress={this.props.navigation.pop}
                            style={{width: 80, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialIcons name="arrow-back" size={30}/>
                        </MButton>
                        <TextHelvetica style={{fontSize: 18, color: Style.textColorGray}}>
                            {/* {Utilities.instance().getStringFromType(this.state.type)}  */}
                            Bản chi tiết hợp đồng CĐ-{this.props.getContractDetailReducer.data.CodeID}
                        </TextHelvetica>
                        <MButton
                            onPress={this.props.getContractDetailReducer.isSuccess? this.goMenu : ()=>{}}
                            style={{width: 80, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialIcons name="menu" size={30}/>
                        </MButton>
                    </Animated.View>
                </Animated.View>
            </MView>
        )
    }

}
function mapStateToProps(state) {
    return {
        getContractDetailReducer: state.getContractDetailReducer
    } 
}

export default connect(mapStateToProps, {  
    getContractDetailAction
})(ContractDetailScreen);
const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        backgroundColor: Style.backgroundColorHome
    },
    contentContainer: {
        paddingTop: NAVBAR_HEIGHT,
    },
    toolbar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    item: {
        marginLeft: 10, marginRight: 10,
        elevation: 3,
        shadowColor: '#969696',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.4,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 10,
        flex: 1
    },
    itemBox: {
        flexDirection: 'row'
        , paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10
    },
    itemBoxHeader: {
        flexDirection: 'row'
        , paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10
        , backgroundColor: Style.backgroundColorHome,
        height: 100
    },
    itemBoxTextRight: {
        color: Style.textColor,
        fontSize: 15,
    },
    itemBoxTextLeft: {
        color: Style.textColor,
        fontSize: 15,
        flex: 1,
        textAlign: 'right',
        fontWeight:'normal'

    },
    itemBoxTextLeftBold: {
        color: Style.textColor,
        fontSize: 15,
        flex: 1,
        textAlign: 'right',
        fontWeight:'bold'
    },
    title: {
        margin: 10, fontWeight: "bold", fontSize: 18, color: Style.textColor
    },
    status: {
        backgroundColor: 'gray',
        width: 120,
        height: 30,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemBoxStatus: {
        flexDirection: 'row'
        , paddingLeft: 12, paddingRight: 12,
        alignItems: 'center'
    },
});

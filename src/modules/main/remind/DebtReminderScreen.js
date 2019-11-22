import React from "react";
import {
    Animated,
    Image,
    Platform,
    StyleSheet,
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator, NativeModules
} from 'react-native';
import MView from "../../../components/customize/MView";
import {Styles as Style} from "../../../Utilities/Styles";
import {TextHelvetica} from "../../../components/customize/MText";
import SwitchSelector from "react-native-switch-selector";
import {connect} from "react-redux";
import {getCommonData, getDebtReminder, getRecentReport} from "../../../redux-saga/Action";
import ViewLoading from "../../../components/customize/ViewLoading";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Utilities from "../../../Utilities/Utilities";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MButton from "../../../components/customize/MButton";
import ConfirmSendSMSDialog from "../../../components/dialog/ConfirmSendSMSDialog";
import SendSMS from 'react-native-sms'
import Communications from "react-native-communications";
import Foundation from "react-native-vector-icons/Foundation";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const NAVBAR_HEIGHT = 64;

class DebtReminderScreen extends React.Component {


    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;
    page = 1;


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
            data: [{
                title: "dadada",
            }, {
                title: "dadada",
            }, {
                title: "dadada",
            }, {
                title: "dadada",
            }, {
                title: "dadada",
            }, {
                title: "dadada",
            }, {
                title: "dadada",
            }, {
                title: "dadada",
            }, {
                title: "dadada",
            }, {
                title: "dadada",
            },


            ],
            isRefresh: false,
            filter: 0,
            isCanLoadMore: true
        };
    }


    componentWillMount() {
        this.props.getDebtReminder(this.state.filter, this.page);
    }


    componentWillReceiveProps({getDebtReminderRes}) {
        let data = this.state.data;
        if (getDebtReminderRes.isRefresh) {
            data = [];
        }
        if (getDebtReminderRes.data) {
            data = [...data, ...getDebtReminderRes.data];
        }
        this.setState({
            isRefresh: getDebtReminderRes.isRefresh,
            data: data,
            isCanLoadMore: getDebtReminderRes.isCanLoadMore
        });
    }

    componentDidMount() {
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

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.state) !== JSON.stringify(nextState);
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

    _onRefresh() {
        this.page = 1;
        this.props.getDebtReminder(this.state.filter, this.page);
    }


    _switch(value) {
        this.setState({filter: value});
        this.page = 1;
        this.props.getDebtReminder(value, this.page);
    }

    _showConfirmDialog(item) {
        this.confirmDialog.show(item.SMSNote, item.CustomerPhone, (phoneNumber, content) => {
            Communications.textWithoutEncoding(phoneNumber, content);
            // SendSMS.send({
            //     body: content,
            //     recipients: [phoneNumber],
            //     successTypes: ['sent', 'queued'],
            //     allowAndroidSendWithoutReadPermission: true
            // }, (completed, cancelled, error) => {
            //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
            //
            // });

        });
    }

    _loadMore() {
        if (this.state.isCanLoadMore) {
            this.page++;
            this.props.getDebtReminder(this.state.filter, this.page);
        }
    }

    _item = (item, index) => {
        return (
            <MButton
                onPress={() => this.props.navigation.navigate("contractDetail", {item: item, type: item.TypeProduct})}
                key={index} style={styles.item}>
                <View style={styles.itemBoxHeader}>
                    <TextHelvetica style={{color: Style.textColor, fontSize: 16}}>
                        {item.CustomerName}
                    </TextHelvetica>
                    <TextHelvetica style={{flex: 1, textAlign: 'right', color: "#EE5723", fontWeight: "bold"}}>
                        {item.TypeName}
                    </TextHelvetica>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.boxIcon}>
                        <Octicons name='location' size={17} color={Style.secondaryColor}/>
                    </View>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Địa chỉ
                    </TextHelvetica>
                    <TextHelvetica style={styles.itemBoxTextLeft}>
                        {item.CustomerAddress}
                    </TextHelvetica>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.boxIcon}>
                        <Feather name='percent' size={17} color={Style.secondaryColor}/>
                    </View>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Tiền lãi
                    </TextHelvetica>
                    <TextHelvetica style={styles.itemBoxTextLeft}>
                        {Utilities.instance().formatMoney(item.PaymentNotify)} Đ
                    </TextHelvetica>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.boxIcon}>
                        <FontAwesome5 name='coins' size={17} color={Style.secondaryColor}/>
                    </View>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Tiền nợ
                    </TextHelvetica>
                    <TextHelvetica style={styles.itemBoxTextLeft}>
                        {Utilities.instance().formatMoney(item.DebitMoney)} Đ
                    </TextHelvetica>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.boxIcon}>
                        <Foundation name='dollar' size={17} color={"#999999"}/>
                    </View>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Tiền gốc
                    </TextHelvetica>
                    <TextHelvetica style={styles.itemBoxTextLeft}>
                        {Utilities.instance().formatMoney(item.TotalMoney)} Đ
                    </TextHelvetica>
                </View>

                <View style={styles.itemBox}>
                    <View style={styles.boxIcon}>
                        <MaterialCommunityIcons name='star-three-points-outline' size={17} color={"#999999"}/>
                    </View>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Tổng tiền phải đóng
                    </TextHelvetica>
                    <TextHelvetica style={[styles.itemBoxTextLeft,{fontWeight:"bold"}]}>
                        {Utilities.instance().formatMoney(item.TotalMoney + item.DebitMoney + item.PaymentNotify)} Đ
                    </TextHelvetica>
                </View>

                <View style={styles.itemBox}>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Lý do:
                    </TextHelvetica>
                    <TextHelvetica style={styles.itemBoxTextLeft}>
                        {item.Note}
                    </TextHelvetica>
                </View>
                <View style={styles.itemBoxStatus}>
                    <View style={[styles.status, {backgroundColor: Utilities.instance().getStatusColor(item.Status)}]}>
                        <TextHelvetica style={{color: "white"}}>
                            {Utilities.instance().getBorrowStatusName(item.Status)}
                        </TextHelvetica>
                    </View>
                    <View style={{flex: 1}}/>
                    <MButton
                        onPress={() => this._showConfirmDialog(item)}
                        style={styles.btnSend}>
                        <MaterialCommunityIcons size={20} name="message-outline" color={999999}/>
                        <TextHelvetica style={{color: Style.textColor, marginLeft: 5}}>
                            Gửi tin nhắn
                        </TextHelvetica>
                    </MButton>
                </View>
            </MButton>
        );
    };


    _footer() {
        return (
            <View>
                {
                    this.state.isCanLoadMore ?
                        <ActivityIndicator size="large" color={Style.primaryColor}/>
                        :
                        <View/>
                }
                <View style={{height: 20}}/>
            </View>
        )
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
                <ViewLoading
                    isLoading={this.state.isRefresh}
                    style={{flex: 1}}>
                    <AnimatedFlatList
                        style={{flex: 1}}
                        data={this.state.data}
                        renderItem={({item, index}) => this._item(item, index)}
                        scrollEventThrottle={1}
                        onMomentumScrollBegin={this._onMomentumScrollBegin}
                        onMomentumScrollEnd={this._onMomentumScrollEnd}
                        onScrollEndDrag={this._onScrollEndDrag}
                        keyExtractor={(item, index) => "-" + index}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.state.scrollAnim}}}],
                            {useNativeDriver: true},
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefresh}
                                onRefresh={() => this._onRefresh()}
                            />
                        }
                        ListHeaderComponent={() => <View style={{height: NAVBAR_HEIGHT}}/>}
                        removeClippedSubviews={true}
                        onEndReached={() => this._loadMore()}
                        ListFooterComponent={() => this._footer()}
                    />
                </ViewLoading>
                <Animated.View style={[styles.navbar, {transform: [{translateY: navbarTranslate}]}]}>
                    <Animated.View style={[styles.toolbar, {opacity: navbarOpacity}]}>
                        <SwitchSelector
                            initial={0}
                            onPress={value => this._switch(value)}
                            textColor={Style.textColor} //'#7a44cf'
                            selectedColor={'white'}
                            buttonColor={'#FCBE19'}
                            borderColor={'#FCBE19'}
                            hasPadding
                            options={[
                                {label: "Tất cả", value: 0},
                                {label: "Cầm đồ", value: 4},
                                {label: "Vay lãi", value: 1},
                                {label: "Bát họ", value: 2}
                            ]}
                        />
                    </Animated.View>
                </Animated.View>
                <ConfirmSendSMSDialog ref={confirmDialog => this.confirmDialog = confirmDialog}/>
            </MView>
        )
    }

}

function mapStateToProps(state) {
    return {
        getDebtReminderRes: state.GetDebtReminder,
    }
}

export default connect(mapStateToProps, {getDebtReminder})(DebtReminderScreen);


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
        marginRight: 10, marginLeft: 10, flex: 1,
        justifyContent: 'center'
    },
    item: {
        marginLeft: 10, marginRight: 10,
        elevation: 2,
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
        , paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4,
        alignItems: 'center'
    },
    itemBoxHeader: {
        flexDirection: 'row'
        , paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10
        , backgroundColor: Style.backgroundColorHome
    },
    itemBoxTextRight: {
        color: Style.textColor,
        fontSize: 15,
        marginLeft: 7
    },
    itemBoxTextLeft: {
        color: Style.textColor,
        fontSize: 15,
        flex: 1,
        textAlign: 'right'
    },
    itemBoxStatus: {
        flexDirection: 'row'
        , paddingLeft: 12, paddingRight: 12,
        alignItems: 'center',
        paddingBottom: 10
    },
    status: {
        backgroundColor: 'gray', width: 120, height: 30, borderRadius: 3, justifyContent: 'center', alignItems: 'center'
    },
    btnSend: {
        flexDirection: 'row', padding: 10, elevation: 2,
        shadowColor: '#969696',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.4,
        backgroundColor: 'white',
        borderRadius: 3
    },
    boxIcon: {
        width: 20, height: 20, justifyContent: 'center', alignItems: 'center'
    }
});

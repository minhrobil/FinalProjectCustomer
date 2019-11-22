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
    ActivityIndicator
} from 'react-native';
import MView from "../../../components/customize/MView";
import {Styles as Style} from "../../../Utilities/Styles";
import {TextHelvetica} from "../../../components/customize/MText";
import MButton from "../../../components/customize/MButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import {getCommonData, getContracts, getRecentReport} from "../../../redux-saga/Action";
import {connect} from "react-redux";
import ViewLoading from "../../../components/customize/ViewLoading";
import Utilities from "../../../Utilities/Utilities";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const NAVBAR_HEIGHT = 64;

class UsuryScreen extends React.Component {


    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;
    page = 1;
    type=1;

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
            data: [],
            filter: {},
            countFilter: 0,
            isRefresh: false,
            isCanLoadMore: true
        };
    }

    componentWillMount() {
        this._onRefresh();
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

    componentWillReceiveProps({getContractsRes}) {
        if (getContractsRes.type===this.type){
            let data = this.state.data;
            if (getContractsRes.data) {
                if (this.page === 1) {
                    data = [];
                }
                data = [...data, ...getContractsRes.data];
            }
            this.setState({data: data, isRefresh: getContractsRes.isRefresh, isCanLoadMore: getContractsRes.isCanLoadMore})
        }
    }
    _onRefresh() {
        this.page = 1;
        this.getContracts();
    }

    getContracts() {
        this.props.getContracts(this.type, this.page, this.state.filter.search
            , this.state.filter.startData, this.state.filter.endDate
            , this.state.filter.category ? this.state.filter.category.id : 0);
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

    _loadMore() {
        if (this.state.isCanLoadMore){
            this.page++;
            this.getContracts();
        }
    }

    _item = (item, index) => {
        return (
            <MButton
                onPress={() => this.props.navigation.navigate("contractDetail", {item: item,type:this.type})}
                key={index} style={styles.item}>
                <View style={styles.itemBoxHeader}>
                    <TextHelvetica style={{color: Style.textColor, fontSize: 16}}>
                        {item.CustomerName}
                    </TextHelvetica>
                    <TextHelvetica style={{flex: 1, textAlign: 'right', color: "#EE5723", fontWeight: "bold"}}>
                        {Utilities.instance().formatMoney(item.TotalMoney)} Đ
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
                        {item.Address}
                    </TextHelvetica>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.boxIcon}>
                        <FontAwesome5 name='percent' size={17} color={Style.secondaryColor}/>
                    </View>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Lãi đến hôm nay
                    </TextHelvetica>
                    <TextHelvetica style={styles.itemBoxTextLeft}>
                        {Utilities.instance().formatMoney(item.TotalInterest)} Đ
                    </TextHelvetica>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.boxIcon}>
                        <Ionicons name='ios-calendar' size={17} color={Style.secondaryColor}/>
                    </View>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Ngày cầm
                    </TextHelvetica>
                    <TextHelvetica style={styles.itemBoxTextLeft}>
                        {Utilities.instance().convertToSimpleTime(item.FromDate)}
                    </TextHelvetica>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.boxIcon}>
                        <Ionicons name='ios-calendar' size={17} color={Style.secondaryColor}/>
                    </View>
                    <TextHelvetica style={styles.itemBoxTextRight}>
                        Ngày đóng lãi
                    </TextHelvetica>
                    <TextHelvetica style={styles.itemBoxTextLeft}>
                        {item.StrNextDate}
                    </TextHelvetica>
                </View>
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
                            style={[styles.status, {backgroundColor: Utilities.instance().getStatusColor(item.Status)}]}>
                            <TextHelvetica style={{color: "white"}}>
                                {Utilities.instance().getBorrowStatusName(item.Status)}
                            </TextHelvetica>
                        </View>
                    </View>
                </View>
            </MButton>
        );
    };

    goFilter(focusSearch) {
        this.props.navigation.navigate("filter", {
            focusSearch: focusSearch
            ,
            search: this.state.filter.search,
            startDate: this.state.filter.startDate,
            endDate: this.state.filter.endDate,
            category: this.state.filter.category,
            type: 4,
            callback: async (search, startDate, endDate, category) => {
                let filter = {
                    search: search, startDate: startDate, endDate: endDate, category: category
                };
                let countFilter = 0;
                if (search) {
                    countFilter++;
                }
                if (startDate) {
                    countFilter++;
                }
                if (category) {
                    countFilter++;
                }
                await this.setState({filter: filter, countFilter: countFilter});
                this._onRefresh();
            }
        })
    }

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
                        onEndReached={() => this._loadMore()}
                        removeClippedSubviews={false}
                        ListHeaderComponent={() => <View style={{height: NAVBAR_HEIGHT}}/>}
                        ListFooterComponent={() => this._footer()}
                    />
                </ViewLoading>
                <Animated.View style={[styles.navbar, {transform: [{translateY: navbarTranslate}]}]}>
                    <Animated.View style={[styles.title, {opacity: navbarOpacity}]}>
                        <MButton
                            onPress={() => this.goFilter(true)}
                            style={styles.boxSearch}>
                            <TextHelvetica style={styles.textSearch}>
                                {this.state.filter.search ? this.state.filter.search : "Tìm kiếm"}
                            </TextHelvetica>
                        </MButton>
                        <MButton
                            onPress={() => this.goFilter(false)}
                            style={{alignItems: 'center', marginRight: 15}}>
                            <AntDesign name="filter" size={24} color={Style.textColorGray}/>
                            <TextHelvetica>
                                Bộ lọc
                            </TextHelvetica>
                            {
                                this.state.countFilter ?
                                    <View style={styles.badgeFilter}>
                                        <TextHelvetica style={{color: 'white', fontSize: 11}}>
                                            {this.state.countFilter}
                                        </TextHelvetica>
                                    </View>
                                    :
                                    <View/>
                            }

                        </MButton>
                    </Animated.View>
                </Animated.View>
            </MView>
        )
    }

}

function mapStateToProps(state) {
    return {
        getContractsRes: state.GetContracts
    }
}

export default connect(mapStateToProps, {getContracts})(UsuryScreen);


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
    title: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
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
        , paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6
    },
    itemBoxStatus: {
        flexDirection: 'row'
        , paddingLeft: 12, paddingRight: 12,
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
    boxSearch: {
        height: 45, flex: 1, backgroundColor: 'white', justifyContent: 'center', marginLeft: 15, marginRight: 15
    },
    textSearch: {
        color: Style.textColorGray, fontSize: 15, marginLeft: 10, marginRight: 10, borderRadius: 5
    },
    badgeFilter: {
        position: 'absolute', width: 16
        , height: 16, borderRadius: 8, backgroundColor: Style.primaryColor, top: 0, right: 0
        , justifyContent: 'center', alignItems: 'center'
    },
    status: {
        backgroundColor: 'gray',
        width: 120,
        height: 30,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxIcon: {
        width: 20, height: 20, justifyContent: 'center', alignItems: 'center'
    }
});

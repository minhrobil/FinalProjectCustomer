import React, {Component} from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    View, FlatList, Image,
    Modal, ScrollView, SafeAreaView, TextInput,
} from 'react-native';
import {Styles as Style, Styles} from "../../../Utilities/Styles";
import Utilities from "../../../Utilities/Utilities";
import Ionicons from "react-native-vector-icons/Ionicons";
import MView from "../../../components/customize/MView";
import MButton from "../../../components/customize/MButton";
import {TextHelvetica} from "../../../components/customize/MText";
import {Config} from "../../../Utilities/Config";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class SelectItemFilterScreen extends Component {

    type = this.props.navigation.state.params.type;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            placeHolder: '',
            originData: []
        }
    }

    componentWillMount() {
        if (this.type === 2) {
            let data = [
                {
                    id: 0,
                    name: "Tất cả hợp đồng đang vay"
                },
                {
                    id: 1,
                    name: "Hợp đồng đúng hẹn"
                },
                {
                    id: 3,
                    name: "Hợp đồng chậm họ"
                },
                {
                    id: 2,
                    name: "Hợp đồng quá hạn"
                },
                {
                    id: 7,
                    name: "Hợp đồng nợ xấu"
                },
                {
                    id: 5,
                    name: "Hợp đồng đã kết thúc"
                },
                {
                    id: 6,
                    name: "Hợp đồng đã Xóa"
                }, {
                    id: 8,
                    name: "Ngày mai đóng họ"
                },
            ];
            this.setState({
                data: data,
                originData: data,
                placeHolder: 'Tìm kiếm trạng thái'
            });
        } else if (this.type === 1) {
            let data = [
                {
                    id: 0,
                    name: "Tất cả hợp đồng đang vay"
                },
                {
                    id: 1,
                    name: "Hợp đồng đúng hẹn"
                },
                {
                    id: 3,
                    name: "Chậm Lãi"
                },
                {
                    id: 2,
                    name: "Trễ Hạn"
                },
                {
                    id: 7,
                    name: "Chờ Thanh Lý"
                },
                {
                    id: 4,
                    name: "Đã Thanh Lý"
                },
                {
                    id: 5,
                    name: "Đã chuộc"
                },
                {
                    id: 6,
                    name: "Đã Xóa"
                },
            ];
            this.setState({
                data: data,
                originData: data,
                placeHolder: 'Tìm kiếm trạng thái'
            });
        } else if (this.type === 4) {
            let data = [
                {
                    id: 0,
                    name: "Tất cả hợp đồng đang vay"
                },
                {
                    id: 1,
                    name: "Hợp đồng đúng hẹn"
                },
                {
                    id: 3,
                    name: "Chậm Lãi"
                },
                {
                    id: 2,
                    name: "Trễ Hạn"
                },
                {
                    id: 7,
                    name: "Chờ Thanh Lý"
                },
                {
                    id: 4,
                    name: "Đã Thanh Lý"
                },
                {
                    id: 5,
                    name: "Đã chuộc"
                },
                {
                    id: 6,
                    name: "Đã Xóa"
                },
            ];
            this.setState({
                data: data,
                originData: data,
                placeHolder: 'Tìm kiếm trạng thái'
            });
        }
    }


    render() {
        return (
            <MView
                style={{backgroundColor: Style.backgroundColorHome}}
                statusbarColor={"white"}>
                <View style={{height: 55}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', paddingRight: 20, flex: 1
                    }}>
                        <MButton
                            onPress={() => this.props.navigation.pop()}
                            style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialIcons name="arrow-back" size={24}/>
                        </MButton>

                        <TextInput
                            fontSize={15}
                            selectionColor={Style.primaryColor}
                            placeholder={this.state.placeHolder}
                            autoCapitalize='words'
                            multiline={false}
                            onChangeText={(val) => this._search(val)}
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            returnKeyType={'done'}
                            maxLength={50}
                            style={{
                                height: 50,
                                backgroundColor: 'white',
                                padding: 5,
                                borderRadius: 5,
                                flex: 1
                            }}
                        />
                    </View>
                    <View
                        style={{width: Config.widthDevice, height: 0.3, backgroundColor: Style.textColor}}/>
                </View>
                <FlatList
                    renderItem={({item}) => this._item(item)}
                    data={this.state.data}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => item.id + '-' + index}
                />
            </MView>

        );
    }

    _search(text) {
        const data = this.state.originData;
        if (text && text.trim().length > 0 && data) {
            let filters = [];
            data.map((item) => {
                if (item.name) {
                    if (Utilities.instance().removeVietNamese(item.name.trim()).includes(Utilities.instance().removeVietNamese(text.trim()))) {
                        filters.push(item);
                    }
                }
            });
            this.setState({data: filters});
        } else {
            this.setState({data: data});
        }
    }

    _item(item) {
        return (
            <MButton
                onPress={() => {
                    if (this.props.navigation.state.params.callback) {
                        this.props.navigation.state.params.callback(item);
                        this.props.navigation.pop();
                    }
                }}
            >
                <View style={{
                    marginTop: 15, justifyContent: 'center',
                    marginBottom: 1,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#e6e6e6',
                    paddingBottom: 10
                }}>
                    <TextHelvetica style={{fontSize: 18, color: Styles.textColor, marginLeft: 20}}>{item.name}</TextHelvetica>
                </View>
            </MButton>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    columnRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    }
});



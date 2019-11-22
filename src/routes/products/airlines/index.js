import PropTypes from "prop-types";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getAllAirlines,
  updateAirline,
  createAirline,
  batchDelete,
  changeStatus
} from "../../../actions/AirlineActions";
import { publish, unpublish } from "../../../actions/CommonActions";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
// import FormCreateAirline from "./FormCreateAirline";
import {
  Checkbox,
  Table,
  Icon,
  Button,
  Input,
  Pagination,
  Tag,
  Divider
} from "antd";
import "antd/dist/antd.css";
import SweetAlert from "react-bootstrap-sweetalert";
import TableActionBar from "../../../components/TableActionBar";
import StatusButton from "../../../components/StatusButton";
import AddAirline from "./AddAirline";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAirlines: [],
      filter: {
        search: "",
        paging: {
          perpage: 10,
          page: 1
        }
      },
      edit: false,
      isSubmiting: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      open: false,
      getAirine: null
    };
  }

  componentDidMount() {
    this.props.getAllAirlines(this.props.listAirlines).then(res => {});
    console.log("life circle: ", this);
  }

  onCancel() {
    this.setState({
      ...this.state,
      open: false
    });
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  openEditAirlineModal = () => {
    this.setState({
      ...this.state,
      isEditAirline: true
    });
  };

  closeEditAirlineModal = () => {
    this.setState({
      ...this.state,
      isEditAirline: false
    });
  };

  openCreateAirlineModal = () => {
    this.setState({
      ...this.state,
      isCreateAirline: true,
      getAirine: null
    });
  };

  closeCreateAirlineModal = () => {
    this.setState({
      ...this.state,
      isCreateAirline: false
    });
  };

  onChangeSearch(event) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          search: event.target.value
        }
      },
      () => this.props.getAllAirlines(this.state.filter)
    );
  }

  onRefresh() {
    this.props.getAllAirlines(this.state.filter, "airline");
    this.setState({
      selectedRowKeys: []
    });
  }

  onDelete() {
    this.props.delete({ id: this.state.selectedRowKeys }).then(() => {
      this.setState({
        selectedRowKeys: []
      });
    });
  }

  onCreateAirline = () => {
    this.setState({
      open: true,
      getAirine: null
    });
  };

  onEditAirline = airline => {
    this.setState({
      open: true,
      getAirine: airline,
      edit: true
    });
  };

  onAirlineClose = () => {
    this.setState({
      open: false,
      getAirine: null,
      edit: false,
      isSubmiting: false
    });
  };

  filter = (value, name, type) => {
    if (type === "search") {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                search: value
            }
        }, () => this.props.getAllAirlines(this.state.filter))
    }
    else
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                [name]: {
                    type: "=",
                    value: value
                }
            }
        }, () => this.props.getAllAirlines(this.state.filter))
    }

  onSaveAirline = async (data, id) => {
    await this.setState({
      ...this.state,
      isSubmiting: true
    });
    if (this.state.edit) {
      var dataSubmit = { ...data, id: id };
      await this.props
        .updateAirline(dataSubmit)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            open: false,
            getAirine: null,
            edit: false
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isSubmiting: false
          });
        });
    } else {
      await this.props
        .createAirline(data)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            open: false,
            getAirine: null,
            airline: null,
            edit: false
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isSubmiting: false
          });
        });
    }
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const { Search } = Input;

    const {listAirlines} = this.props;

    const columns = [
      {
        title: <IntlMessages id="global.status" />,
        dataIndex: "status"
      },
      {
        title: <IntlMessages id="airline.title" />,
        dataIndex: "title",
      },
      {
        title: <IntlMessages id="airline.short_title" />,
        dataIndex: "short_title"
      },
      {
        title: <IntlMessages id="airline.signed" />,
        dataIndex: "signed"
      },
      {
        title: <IntlMessages id="airline.code" />,
        dataIndex: "code"
      },
      {
        title: <IntlMessages id="airline.logo" />,
        dataIndex: "logo"
      },
      {
        title: <IntlMessages id="airline.image" />,
        dataIndex: "image"
      }
    ];

    var data = this.props.listAirlines.map(item => {
      return {
        ...item,
        title: (
          <Button type="link" onClick={() => this.onEditAirline(item)}>
            {item.title}
          </Button>
        ),
        logo: (
          <div className="image_logo">
            <img src={item.logo} alt={`${item.title}_logo`} />
          </div>
        ),
        status: (
          <React.Fragment>
            {
              <StatusButton
                data_id={item.id}
                status={item.status}
                table="airline"
              />
            }
          </React.Fragment>
        ),
        signed: (
          <div>
            {item.signed === 1 ? (
              <Tag color="green">
                <IntlMessages id="airline.signed.yes" />
              </Tag>
            ) : (
              <Tag color="red">
                <IntlMessages id="airline.signed.no" />
              </Tag>
            )}
          </div>
        ),
        image: (
          <div className="image_logo">
            <img src={item.image} alt={`${item.title}_logo`} />
          </div>
        )
      };
    });

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    console.log(selectedRowKeys);
    // console.log('status: ',this.props.listAirlines);

    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.airlines" />}
            match={this.props.match}
          />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
              <RctCollapsibleCard heading="List Airlines">
                <div className="mb-20">
                  <div>
                    <div className="">
                      <div>
                        <TableActionBar
                          onAdd={() => this.onCreateAirline()}
                          onDelete={() => this.onDelete()}
                          onRefresh={() => this.onRefresh()}
                          isDisabled={!hasSelected}
                          rows={this.state.selectedRowKeys}
                          table="airline"
                          onFilter={this.filter}
                          data={[
                            // {
                            //     name: "id",
                            //     data: listAirlines,
                            //     placeholder: "Select airline..."
                            // },
                            {
                              name: "signed",
                              data: [{ id: 1, title: <IntlMessages id="airline.signed.yes" /> }, 
                                     { id: 0, title: <IntlMessages id="airline.signed.no" /> }],
                              placeholder: "Select signature..."
                            },
                            {
                                name: "status",
                                data: [{ id: 0, title: <IntlMessages id="global.unpublic" /> }, 
                                        { id: 1, title: <IntlMessages id="global.public" /> }],
                                placeholder: "Select status..."
                            }
                        ]}
                        justify="end"
                        >
                          {hasSelected ? (
                            <p
                              className="ml-10"
                              style={{ display: "inline-block" }}
                            >
                              Selected {selectedRowKeys.length}{" "}
                              {selectedRowKeys.length === 1 ? "item" : "items"}{" "}
                            </p>
                          ) : (
                            ""
                          )}
                        </TableActionBar>
                      </div>
                      {/* <div>
                        <Search
                          placeholder="Type your search..."
                          onSearch={value => console.log(value)}
                          style={{ width: 200 }}
                          // value={this.state.filter.search}
                          onChange={event => this.onChangeSearch(event)}
                        />
                      </div> */}
                    </div>
                  </div>
                  <Table
                    tableLayout="auto"
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    scroll={{ y: 500 }}
                    rowKey="id"
                    pagination={{
                      // defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "30"]
                    }}
                  />
                </div>
              </RctCollapsibleCard>
            </div>
          </div>
        </div>

        <AddAirline
          open={this.state.open}
          onSaveAirline={this.onSaveAirline}
          edit={this.state.edit}
          loading={this.state.isSubmiting}
          airline={this.state.getAirine}
          onAirlineClose={this.onAirlineClose}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  // console.log('map state: ', state);
  return {
    listAirlines: state.airline.listAirlines,
    paging: state.airline.paging
  };
}

function mapDispatchToProps(dispatch) {
  // console.log('dispatch: ', dispatch);
  return {
    getAllAirlines: listAirlines => dispatch(getAllAirlines(listAirlines)),
    updateAirline: id => dispatch(updateAirline(id)),
    createAirline: data => dispatch(createAirline(data)),
    changeStatus: data => dispatch(changeStatus(data)),
    publish: data => dispatch(publish(data)),
    unpublish: data => dispatch(unpublish(data)),
    delete: data => dispatch(batchDelete(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

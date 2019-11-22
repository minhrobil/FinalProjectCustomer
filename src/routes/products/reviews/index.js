import PropTypes from "prop-types";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getAllReview,
  updateReview,
  createReview,
  batchDelete,
  changeStatus
} from "../../../actions/ReviewAction";
import { getAllTour } from '../../../actions/TourActions';
import { getAllACCOUNT } from '../../../actions/AccountAction';
import { publish, unpublish } from "../../../actions/CommonActions";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
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
import AddReview from "./AddReview";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listReview: [],
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
      getReview: null
    };
  }

  componentDidMount() {
    this.props.getAllReview(this.props.listReview, 'review').then(res => {});
    this.props.getAllACCOUNT(this.props.listRegistered, 'registered').then(res => {});
    this.props.getAllTour(this.props.listTour, 'tour').then(res => {});
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

  openEditReviewModal = () => {
    this.setState({
      ...this.state,
      isEditReview: true
    });
  };

  closeEditReviewModal = () => {
    this.setState({
      ...this.state,
      isEditReview: false
    });
  };

  openCreateReviewModal = () => {
    this.setState({
      ...this.state,
      isCreateReview: true,
      getAirine: null
    });
  };

  closeCreateReviewModal = () => {
    this.setState({
      ...this.state,
      isCreateReview: false
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
      () => this.props.getAllReview(this.state.filter)
    );
  }

  onRefresh() {
    this.props.getAllReview(this.state.filter, "review");
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

  onCreateReview = () => {
    this.setState({
      open: true,
      getReview: null
    });
  };

  onEditReview = review => {
    this.setState({
      open: true,
      getReview: review,
      edit: true
    });
  };

  onReviewClose = () => {
    this.setState({
      open: false,
      getReview: null,
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
        }, () => this.props.getAllReview(this.state.filter))
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
        }, () => this.props.getAllReview(this.state.filter))
    }

  onSaveReview = async (data, id) => {
    await this.setState({
      ...this.state,
      isSubmiting: true
    });
    if (this.state.edit) {
      var dataSubmit = { ...data, id: id };
      await this.props
        .updateReview(dataSubmit)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            open: false,
            getReview: null,
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
        .createReview(data)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            open: false,
            getReview: null,
            review: null,
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
    console.log(this.props);
    
    const { selectedRowKeys } = this.state;

    const columns = [
      {
        title: <IntlMessages id="global.status" />,
        dataIndex: "status",
        key: 'stattus'
      },
      {
        title: <IntlMessages id="global.flag" />,
        dataIndex: "flag",
        key: 'flag'
      },
      {
        title: <IntlMessages id="global.title" />,
        dataIndex: "title",
        key: 'title'
      },
      {
        title: <IntlMessages id="review.tour_name" />,
        dataIndex: "tour_name",
        key: 'tour_name'
      },
      {
        title: <IntlMessages id="review.user_review" />,
        dataIndex: "user_review",
        key: 'user_review'
      },
      {
        title: <IntlMessages id="review.rank" />,
        dataIndex: "rank",
        key: 'rank'
      }
    ];

    // const countStart = 

    // var listTourName = this.props.listTour.map(item => {
    //   return ({
    //     id: item.id,
    //     title: item.title
    //   })
    // });

    // var listAccountName = this.props.listAccount.map(item => {
    //   return (
    //     item.id,
    //     item.firstname+''+item.lastname
    //   )
    // })

    var data = this.props.listReview.map(item => {
      return {
        ...item,
        title: (
          <Button type="link" onClick={() => this.onEditReview(item)}>
            {item.title}
          </Button>
        ),
        status: (
          <React.Fragment>
            {
              <StatusButton
                data_id={item.id}
                status={item.status}
                table="review"
              />
            }
          </React.Fragment>
        ),
        flag: (
          <div className="image_flag">
            <img src={item.image} alt={`${item.title}_logo`} />
          </div>
        ),
        rank: (
          
          <div>
              <Icon type="star" theme="twoTone" style={{fontSize: '18px'}} twoToneColor="#e8eb2f" />
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
    // console.log('status: ',this.props.listReview);

    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.reviews" />}
            match={this.props.match}
          />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
              <RctCollapsibleCard heading="List Review">
                <div className="mb-20">
                  <div>
                    <div className="">
                      <div>
                        <TableActionBar
                          onAdd={() => this.onCreateReview()}
                          onDelete={() => this.onDelete()}
                          onRefresh={() => this.onRefresh()}
                          isDisabled={!hasSelected}
                          rows={this.state.selectedRowKeys}
                          table="review"
                          onFilter={this.filter}
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
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "30"]
                    }}
                  />
                </div>
              </RctCollapsibleCard>
            </div>
          </div>
        </div>

        <AddReview
          open={this.state.open}
          onSaveReview={this.onSaveReview}
          edit={this.state.edit}
          loading={this.state.isSubmiting}
          review={this.state.getReview}
          onReviewClose={this.onReviewClose}
          // tourName={listTourName}
          // accountName={listAccountName}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  // console.log('map state: ', state);
  return {
    listReview: state.review.listReview,
    paging: state.review.paging
  };
}

function mapDispatchToProps(dispatch) {
  // console.log('dispatch: ', dispatch);
  return {
    getAllReview: filter => dispatch(getAllReview(filter)),
    getAllTour: filter => dispatch(getAllTour(filter)),
    getAllACCOUNT: filter => dispatch(getAllACCOUNT(filter)),
    updateReview: id => dispatch(updateReview(id)),
    createReview: data => dispatch(createReview(data)),
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

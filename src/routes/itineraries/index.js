import React, { Component } from "react";
import {
  getItineraries,
  batchDelete,
  createACategory,
  updateCategory
} from "../../actions/ItineraryAction";
import {
  changeStatus,
  publish,
  unpublish
} from "../../actions/CommonActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


import {
  Checkbox,
  Table,
  Icon,
  Button,
  Input,
  Pagination,
  Tag,
  Divider,
  Tree
} from "antd";
import TableActionBar from "../../components/TableActionBar";
import StatusButton from "../../components/StatusButton";
import AddCategory from "./AddCategory";

class Itineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategory: [],
      filter: {
        sort: {
          type: "asc",
          attr: ""
        },
        created_at: {
          type: "compare",
          value: {
            from: "",
            to: ""
          }
        },
        title: {
          type: "like",
          value: ""
        },
        alias: {
          type: "=",
          value: []
        },
        search: "",
        paging: {
          perpage: 10,
          page: 1
        }
      },
      isCreateCategory: false,
      isEditCategory: false,
      selectedRowKeys: [],
      addCategoryState: false,
      isSubmiting: false,
      current_category: null,
      edit: false
    };
  }
  componentDidMount() {
    this.setState({
      filter: {
        ...this.state.filter,
        tour_id: {
          type: "=",
          value: this.props.match.params.id
        }
      }
    }, () => this.props.getItineraries(this.state.filter))
    
  }
  
  handleChangePage(page, pageSize) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          paging: {
            ...this.state.filter.paging,
            page: page,
            perpage: pageSize
          }
        }
      },
      () => {
        this.props.getItineraries(this.state.filter);
      }
    );
  }

  closeCreateCustomerModal() {
    this.setState({
      ...this.state,
      isCreateCategory: false
    });
  }
  openCreateCategoryModal() {
    this.setState({
      ...this.state,
      isCreateCategory: true
    });
  }
  closeEditCustomerModal() {
    this.setState({
      ...this.state,
      isEditCategory: false
    });
  }
  openEditCategoryModal() {
    this.setState({
      ...this.state,
      isEditCategory: true
    });
  }
  onChangeSearch(event) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          search: event.target.value
        }
      },
      () => this.props.getItineraries(this.state.filter)
    );
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

  onRefresh() {
    this.props.getItineraries(this.state.filter, "category");
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

  onChange = pagination => {};

  onAddCategory = () => {
    // console.log('current: ',this.state.current_category);

    this.setState({
      addCategoryState: true
    });
  };
  onEditCategory(category) {
    this.setState({
      addCategoryState: true,
      current_category: category,
      edit: true
    });
  }
  onCategoryClose = () => {
    this.setState({
      addCategoryState: false,
      current_category: null,
      isSubmiting: false,
      edit: false
    });
  };

  onSaveCategory = async (data, id) => {
    await this.setState({
      ...this.state,
      isSubmiting: true
    });
    if (this.state.edit) {
      var dataSubmit = { ...data, id: id };
      await this.props
        .updateCategory(dataSubmit)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            addCategoryState: false,
            current_category: null,
            edit: false
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isSubmiting: false
          });
        });
    } else
      await this.props
        .createCategory(data)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            addCategoryState: false,
            current_category: null,
            edit: false
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isSubmiting: false
          });
        });
  };

  render() {
    console.log("props: ", this.props);
    console.log("render cur: ", this.state.current_category);

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    const { Search } = Input;

    const { TreeNode } = Tree;

    const columns = [
      {
        title: <IntlMessages id="global.status" />,
        dataIndex: "status"

      },
      {
        title: <IntlMessages id="category.title" />,
        dataIndex: "title",
        align:"left"
      },
      {
        title: <IntlMessages id="global.meals" />,
        dataIndex: "meal"
      },
      {
        title: <IntlMessages id="global.destination" />,
        dataIndex: "dest_title"
      },
  
      {
        title: "ID",
        dataIndex: "id"
      }
    ];

    var data = this.props.listCategory.map(item => {
      return {
        ...item,
        title: (
          <div style={{ textAlign: "left" }}>
            <Button type="link" onClick={() => this.onEditCategory(item)}>
              {item.title}
            </Button>
          </div>
        ),
        status: (
          <StatusButton
            data_id={item.id}
            status={item.status}
            table="category"
          />
        )
      };
    });

    const mytable = {
      width:"auto",
    };

    return (

     

      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.category" />}
            match={this.props.match}
          />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
              <RctCollapsibleCard heading="List Category">
                <div className="mb-20">
                  
                    <TableActionBar
                      onAdd={() => this.onAddCategory()}
                      onDelete={() => this.onDelete()}
                      onRefresh={() => this.onRefresh()}
                      isDisabled={!hasSelected}
                      rows={this.state.selectedRowKeys}
                      isShowPublishButtons={true}
                      table="category"
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
                    {/* <div>
                      <Search
                        value={this.state.filter.search}
                        onChange={event => this.onChangeSearch(event)}
                        placeholder="Type your search..."
                        style={{ width: 200 }}
                      />
                    </div> */}
                  
                  <Table
                    tableLayout="auto"
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
              
                    rowKey="id"
                    pagination={{
                      defaultPageSize: 5,
                      showSizeChanger: true,
                      pageSizeOptions: ["5", "10", "20", "30"],
                      onChange: (page, pageSize) => {
                        this.handleChangePage(page, pageSize);
                      },
                      total: this.props.paging.count
                    }}
                  />
                </div>
                <AddCategory
                  open={this.state.addCategoryState}
                  onSaveCategory={this.onSaveCategory}
                  loading={this.state.isSubmiting}
                  edit={this.state.edit}
                  category={this.state.current_category}
                  onCategoryClose={this.onCategoryClose}
                />
              </RctCollapsibleCard>
            </div>
          </div>
        </div>

        {/* <Modal isOpen={this.state.isCreateCategory} size="lg">
          <ModalHeader toggle={() => this.closeCreateCustomerModal()}>
            Category Infomation
          </ModalHeader>
          <ModalBody>
            <FormCreatCategory
              close={() => this.closeCreateCustomerModal()}
            ></FormCreatCategory>
          </ModalBody>
        </Modal> */}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    listCategory: state.itinerary.items,
    paging: state.itinerary.paging
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getItineraries: filter => dispatch(getItineraries(filter)),
    changeStatus: data => dispatch(changeStatus(data)),
    publish: data => dispatch(publish(data)),
    unpublish: data => dispatch(unpublish(data)),
    delete: data => dispatch(batchDelete(data)),
    createCategory: category => dispatch(createACategory(category)),
    updateCategory: category => dispatch(updateCategory(category))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Itineraries)
);

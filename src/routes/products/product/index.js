import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listProduct,deleteProduct } from '../../../actions/ProductAction';
import IntlMessages from 'Util/IntlMessages';
import FormSaveProduct from './FormSaveProduct';
import { Button, Modal, Row, Col, Input,Table, Divider, Pagination,Icon, Popconfirm } from 'antd';


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        search: '',
        paging: {
          perpage: 10,
          page: 1
        }
      },
      issaveProduct:false,
      itemEdit:null 
    };
    // this.onChangeSearch = this.onChangeSearch.bind(this)
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
        width: '20%',
        render: text => <strong>{text}</strong>,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        sorter:true
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: '10%',
        key: 'status',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '20%',
        key: 'description',
      },
      {
        title: 'Sku',
        dataIndex: 'sku',
        width: '10%',
        key: 'sku',
      },
      {
        title: 'Cid',
        dataIndex: 'cid',
        width: '10%',
        key: 'cid',
      },
      {
        title: 'Action',
        width: '20%',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <Popconfirm title="Are you sure want to delete this product?"  okText="Yes" cancelText="No"
                onConfirm={()=>{this.props.deleteProduct({id:text.id})}}
              >
                <Button >
                  <Icon type="delete" />
                </Button>
              </Popconfirm>
              <Divider type="vertical" />
              <Button onClick={()=>{
                this.setState({itemEdit:text},()=>this.setState({issaveProduct:true}))
              }}>
                <Icon type="edit" />
              </Button>
            </span>
          )}
      },
    ];
  }
  componentDidUpdate(PrevProps){
    if(this.props.deleteProductRes.isSuccess){
      this.props.listProduct(this.state.filter)
    }
    if(PrevProps.saveProductRes!=this.props.saveProductRes){
      if(this.props.saveProductRes.isSuccess){
        this.props.listProduct(this.state.filter)

      }
    }
  }
  componentDidMount() {
    this.props.listProduct(this.state.filter);
  }
  handleChangePage(event, newPage) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          paging: {
            ...this.state.filter.paging,
            page: newPage + 1
          }
        }
      },
      () => {
        this.props.listProduct(this.state.filter);
      }
    );
  }
  handleChangeRowsPerPage(event) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          paging: {
            perpage: +event.target.value,
            page: 1
          }
        }
      },
      () => {
        this.props.listProduct(this.state.filter);
      }
    );
  }

  opensaveProductModal = () => {
    this.setState({
      ...this.state,
      issaveProduct: true
    });
  };

  closesaveProductModal = () => {
    this.setState({
      ...this.state,
      issaveProduct: false
    });
  };
  onChangeSearch = (event) => {
    console.log(event);
    console.log(this);

    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          search: event.target.value
        }
      },
      () => this.props.listProduct(this.state.filter)
    );
  }
 
  onChangePage(current, pageSize) {
    this.setState({
      filter: {
          paging: {
              perpage:pageSize,
              page: current
          }
      }
  }, 
    () => this.props.listProduct(this.state.filter)
  );
  }
  onShowSizeChange(current,size){
    this.setState({
      filter: {
          paging: {
              perpage:size,
              page: current
          }
      }
  }, 
    () => this.props.listProduct(this.state.filter)
  );
  }
  showProduct = listProducts => {
    var result = null;
    if (listProducts) {
      result = listProducts.map((item, index) => {
        return (
          <Products
            key={item.id}
            index={
              (this.state.filter.paging.page - 1) *
                this.state.filter.paging.perpage +
              index +
              1
            }
            item={item}
            // onDeleteProduct={this.onDeleteProduct}
          ></Products>
        );
      });
    }
    return result;
  };

  // showProduct = listProducts => {
  //   var result = null;
  //   if (listProducts) {
  //     result = listProducts.map((item, index) => {
  //       return (
  //         // <Products
  //         //   key={item.id}
  //         //   index={
  //         //     (this.state.filter.paging.page - 1) *
  //         //       this.state.filter.paging.perpage +
  //         //     index +
  //         //     1
  //         //   }
  //         //   item={item}
  //         //   // onDeleteProduct={this.onDeleteProduct}
  //         // ></Products>
  //       );
  //     });
  //   }
  //   return result;
  // };

  render() {
    return (
      <React.Fragment>
        <div className='formelements-wrapper'>
          <PageTitleBar
            title={<IntlMessages id='sidebar.products' />}
            match={this.props.match}
          />
          <Row>
            <Col>
              <RctCollapsibleCard heading={<IntlMessages id='sidebar.products'/>}>
                {/* <div className='mb-20'> */}
                <Button size="large" type="primary" icon="plus-circle" onClick={()=>{this.setState({issaveProduct:true,itemEdit:null})}}>
                  <IntlMessages id='list.product.button.create' />
                </Button>
                  <Row style={{marginTop:10,marginBottom:10}}>
                    <Col span={12}>
                      <Input placeholder="Search" allowClear onChange={this.onChangeSearch} />
                    </Col>
                  </Row>
                  {
                    this.props.listProductRes.isSuccess&&
                    <Table 
                      pagination={
                        { 
                          showSizeChanger:true,
                          onShowSizeChange:(current,size)=>this.onShowSizeChange(current,size),
                          onChange:(current,pageSize)=>this.onChangePage(current,pageSize),
                          defaultCurrent:1,
                          current:Number(this.props.listProductRes.data.paging.page) ,
                          total:Number(this.props.listProductRes.data.paging.count),
                          pageSize:Number(this.props.listProductRes.data.paging.perpage)
                        }
                      }
                      loading={this.props.listProductRes.isLoading}
                      rowKey='id' columns={this.columns} dataSource={this.props.listProductRes.data.list} />
                     
                  }
              </RctCollapsibleCard>
            </Col>
          </Row>
        </div>
        
        <Modal footer={null} style={{top:50}} zIndex={1} title={this.state.itemEdit?<IntlMessages id='list.product.button.update'/>:<IntlMessages id='list.product.button.create'/>} onCancel={this.closesaveProductModal} visible={this.state.issaveProduct} width="50%">
          {
            this.state.issaveProduct&&
            <FormSaveProduct
              itemEdit={this.state.itemEdit}
              close={() => this.closesaveProductModal()}
            ></FormSaveProduct>
          }
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    listProductRes: state.listProduct,
    deleteProductRes:state.deleteProduct,
    saveProductRes: state.saveProduct,
  };
}

export default connect(
  mapStateToProps,
  {listProduct,deleteProduct}
)(index);

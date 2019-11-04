import { Table } from 'antd';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { listAccountAction, saveAccountAction, deleteAccountAction } from '../../../redux/account';
import ImageInTable from '../../../components/ImageInTable';
import StatusButton2 from '../../../components/StatusButton2';
import TableActionBar2 from '../../../components/TableActionBar2';
import FormSaveRegistered from './FormSaveRegistered';
const columns = [
	{
		key: 'image',
		title: <IntlMessages id="global.image" />,
		dataIndex: 'image'
	},
	{
		key: 'status',
		title: <IntlMessages id="global.status" />,
		dataIndex: 'status'
	},
	{
		title: <IntlMessages id="global.firstname" />,
		dataIndex: 'firstname',
		key: 'firstname',
		sorter: true
	},
	{
		title: <IntlMessages id="global.lastname" />,
		dataIndex: 'lastname',
		key: 'lastname',
		sorter: true
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email'
	},
	{
		title: <IntlMessages id="global.mobile" />,
		dataIndex: 'mobile',
		key: 'mobile',
		sorter: true
	},
	{
		title: <IntlMessages id="global.city" />,
		dataIndex: 'city'
	},
	{
		title: <IntlMessages id="global.created" />,
		dataIndex: 'created_at',
		key: 'created_at'
	},
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	}
];
class ListRegistered extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: {
				sort: {
					type: 'asc',
					attr: ''
				},
				search: '',
				paging: {
					perpage: 10,
					page: 1
				}
			},
			addRegisteredState: false,
			selectedRowKeys: [],
			current_account: null,
			edit: false
		};
	}
	componentDidMount() {
		this.onRefresh();
	}
	componentDidUpdate(PrevProps) {
		if (PrevProps.deleteAccountReducer != this.props.deleteAccountReducer) {
			if (this.props.deleteAccountReducer.isSuccess) {
				this.onRefresh();
			}
		}
		if (PrevProps.saveAccountReducer != this.props.saveAccountReducer) {
			if (this.props.saveAccountReducer.isSuccess) {
				this.onRefresh();
			}
		}
	}
	onSelectChange = (selectedRowKeys) => {
		this.setState({ selectedRowKeys });
	};
	onAddAccount = () => {
		this.setState({ addRegisteredState: true });
	};
	onEditAccount = (account) => () => {
		this.setState({ addRegisteredState: true, current_account: account, edit: true });
	};
	onAccountClose = () => {
		this.setState({ addRegisteredState: false, current_account: null, edit: false });
	};

	onSaveAccount = (data) => {
		this.props.saveAccountAction(data);
	};
	onRefresh = () => {
		console.log('refresh');
		this.setState(
			{
				selectedRowKeys: [],
				addRegisteredState: false,
				current_account: null,
				edit: false
			},
			() => this.props.listAccountAction(this.state.filter, 'registered')
		);
	};
	getOrder = (order) => {
		if (order === 'ascend') return 'asc';
		if (order === 'descend') return 'desc';
		return '';
	};

	onChangeTable = (pagination, filters, sorter, extra = { currentDataSource: [] }) => {
		this.setState(
			{
				filter: {
					...this.state.filter,
					paging: {
						page: pagination.current,
						perpage: pagination.pageSize
					},
					sort: {
						type: this.getOrder(sorter.order),
						attr: sorter.columnKey
					}
				}
			},
			() => this.onRefresh()
		);
	};
	onDelete = () => {
		this.props.deleteAccountAction({ id: this.state.selectedRowKeys });
	};
	onUnpublish = () => {
		console.log('onUnpublish');
	};
	onPublish = () => {
		console.log('onPublish');
	};
	filter = (e, type = 'search') => {
		if (type === 'search') {
			this.setState(
				{
					filter: {
						...this.state.filter,
						search: e.target.value
					}
				},
				() => this.onRefresh()
			);
		} else
			this.setState(
				{
					filter: {
						...this.state.filter,
						[e.target.name]: {
							type: '=',
							value: e.target.value
						}
					}
				},
				() => this.onRefresh()
			);
	};
	render() {
		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange
		};
		const hasSelected = selectedRowKeys.length > 0;
		const { listAccountReducer } = this.props;
		const data = listAccountReducer.isSuccess
			? listAccountReducer.data.list.map((item) => {
					return {
						...item,
						status: <StatusButton2 data_id={item.id} status={item.status} table="customer" />,
						image: <ImageInTable height="50px" src={item.image} alt={`${item.name}_logo`} />,
						created_at: <span>{moment(item.created_at).format('DD/MM/YYYY')}</span>,
						email: (
							<p style={{ cursor: 'pointer', color: 'blue' }} onClick={this.onEditAccount(item)}>
								{item.email}
							</p>
						)
					};
				})
			: [];
		return (
			<React.Fragment>
				<div className="formelements-wrapper">
					<div className="row">
						<RctCollapsibleCard heading="List Registered" colClasses="col-12">
							<TableActionBar2
								onAdd={this.onAddAccount}
								onDelete={this.onDelete}
								onRefresh={this.onRefresh}
								onUnpublish={this.onUnpublish}
								onPublish={this.onPublish}
								isDisabled={!hasSelected}
								rows={this.state.selectedRowKeys}
								table="customer"
								isShowPublishButtons={true}
								showFilter={true}
								onFilter={this.filter}
							>
								{hasSelected ? (
									<p className="ml-10" style={{ display: 'inline-block' }}>
										Selected {selectedRowKeys.length}{' '}
										{selectedRowKeys.length === 1 ? 'item' : 'items'}{' '}
									</p>
								) : (
									''
								)}
							</TableActionBar2>
							{listAccountReducer.isSuccess && (
								<Table
									rowSelection={rowSelection}
									columns={columns}
									dataSource={data}
									tableLayout="auto"
									rowKey="id"
									pagination={{
										pageSizeOptions: [ '1', '5', '10', '20', '50' ],
										total: listAccountReducer.data.paging.count,
										showSizeChanger: true
									}}
									onChange={this.onChangeTable}
								/>
							)}
						</RctCollapsibleCard>
					</div>
				</div>
				{listAccountReducer.isSuccess && (
					<FormSaveRegistered
						open={this.state.addRegisteredState}
						onSaveAccount={this.onSaveAccount}
						onAccountClose={this.onAccountClose}
						loading={this.props.saveAccountReducer.isLoading}
						edit={this.state.edit}
						account={this.state.current_account}
					/>
				)}
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		listAccountReducer: state.listAccountReducer,
		saveAccountReducer: state.saveAccountReducer,
		deleteAccountReducer: state.deleteAccountReducer,
		changeStatusReducer: state.changeStatusReducer
	};
};
export default withRouter(
	connect(mapStateToProps, {
		listAccountAction,
		saveAccountAction,
		deleteAccountAction
	})(ListRegistered)
);

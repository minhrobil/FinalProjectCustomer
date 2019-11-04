import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import { Button, Divider, Modal, Icon, Tooltip, Input, Col, Row } from 'antd';
import { publish, unpublish } from '../../actions/CommonActions';
import TableFilter from '../TableFilter/TableFilter';
import PropTypes from 'prop-types';
import { changeStatusAction, publishAction, unpublishAction } from '../../redux/common';

const { Search } = Input;
const confirm = Modal.confirm;

class TableActionBar extends Component {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.object),
		textSearch: PropTypes.bool,
		onFilter: PropTypes.func,
		searchOpition: PropTypes.object,
		showFilter: PropTypes.bool,
		justify: PropTypes.oneOf([ 'start', 'end', 'center' ])
	};

	static defaultProps = {
		data: [],
		onFilter: () => {},
		textSearch: true,
		searchOpition: {},
		isShowPublishButtons: true,
		showFilter: true,
		justify: 'end'
	};

	state = {
		activeFilter: false
	};

	onOpenFilter = () => {
		this.setState({
			activeFilter: !this.state.activeFilter
		});
	};
	onPublish = () => {
		this.props
			.publishAction({
				rows: this.props.rows,
				table: this.props.table
			})
			.then(() => {
				this.props.onRefresh();
			});
	};
	onUnpublish = () => {
		this.props
			.unpublishAction({
				rows: this.props.rows,
				table: this.props.table
			})
			.then(() => {
				this.props.onRefresh();
			});
	};
	openAlert = () => {
		confirm({
			title: 'Do you want to delete these records?',
			okText: 'Yes',
			okType: 'danger',
			onOk: this.delete,
			onCancel() {}
		});
	};

	delete = () => {
		this.props.onDelete();
	};

	render() {
		const { showFilter, isShowPublishButtons, onFilter, searchOpition, textSearch, data, justify } = this.props;
		const style = {
			filterBody: {
				margin: '10px 0'
			}
		};
		return (
			<div style={style.filterBody}>
				<Row type="flex" align="middle">
					<Col sm={{ span: 18 }} xs={{ span: 24 }}>
						<Button type="primary" onClick={this.props.onAdd} icon="plus">
							<IntlMessages id="global.add_new" />
						</Button>
						{isShowPublishButtons ? (
							<React.Fragment>
								<Divider type="vertical" />
								<Button type="primary" onClick={this.onPublish} disabled={this.props.isDisabled}>
									<IntlMessages id="global.publish" />
								</Button>
								<Divider type="vertical" />
								<Button type="primary" onClick={this.onUnpublish} disabled={this.props.isDisabled}>
									<IntlMessages id="global.unpublish" />
								</Button>
							</React.Fragment>
						) : null}
						<Divider type="vertical" />
						<Button type="danger" onClick={this.openAlert} disabled={this.props.isDisabled}>
							<IntlMessages id="global.delete" />
						</Button>
						{this.props.children}
					</Col>
					<Col sm={{ span: 6 }} xs={{ span: 24 }} style={{ display: 'flex' }}>
						{textSearch ? (
							<Search
								name="search"
								placeholder="Search..."
								onChange={this.props.onFilter}
								style={{ width: '100%' }}
								{...searchOpition}
							/>
						) : null}
						{showFilter && data.length ? (
							<Tooltip title="Filter">
								<Icon
									type="filter"
									style={{
										float: 'right',
										marginLeft: '10px',
										fontSize: '15px',
										cursor: 'pointer',
										lineHeight: '32px',
										color: this.state.activeFilter ? 'blue' : '#595959'
									}}
									onClick={this.onOpenFilter}
								/>
							</Tooltip>
						) : null}
					</Col>
				</Row>
				<TableFilter onFilter={onFilter} open={this.state.activeFilter} data={data} justify={justify} />
			</div>
		);
	}
}
export default connect(null, { changeStatusAction, publishAction, unpublishAction })(TableActionBar);

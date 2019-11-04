import React from 'react';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { connect } from 'react-redux';
import { getAll } from '../../actions/FileManagerActions';
import IntlMessages from 'Util/IntlMessages';
import ListLargeDoc from '../../components/FileManager/ListLargeDoc';
import ListLargeFolder from '../../components/FileManager/ListLargeFolder';
import ListLargeImg from '../../components/FileManager/ListLargeImg';
import ListLargeVideo from '../../components/FileManager/ListLargeVideo';
import { Icon, Radio, Checkbox } from 'antd';

class FileManager extends React.Component {
	render() {
		return (
			<RctCollapsibleCard heading={<IntlMessages id="sidebar.file-manager" />} colClasses="col-12">
				<div style={{ float: 'right' }}>
					<Radio.Group defaultValue="thumbnail" buttonStyle="solid">
						<Radio.Button value="thumbnail">
							<b>
								<Icon type="appstore" /> Thumbnail View
							</b>
						</Radio.Button>
						<Radio.Button value="detail">
							<b>
								<Icon type="unordered-list" /> Detail View
							</b>
						</Radio.Button>
					</Radio.Group>
				</div>
				<div>
					<span style={{ color: '#595959', fontWeight: '500' }}>
						<i>
							<Icon type="folder-open" theme="filled" /> Root
						</i>
					</span>
					<br />
				</div>
				<div style={{ clear: 'both', marginBottom: '30px' }}>
					<span>Filter</span>
					<br />
					<Radio.Group defaultValue="all" size="small" buttonStyle="solid">
						<Radio.Button value="all">All</Radio.Button>
						<Radio.Button value="folder">Folder</Radio.Button>
						<Radio.Button value="doc">Doc</Radio.Button>
						<Radio.Button value="video">Video</Radio.Button>
						<Radio.Button value="image">Image</Radio.Button>
					</Radio.Group>
				</div>
				<div style={{ marginBottom: '10px' }}>
					<Checkbox
						style={{
							backgroundColor: '#F4F4F4',
							padding: '5px',
							borderRadius: '3px',
							border: '1px solid #F5F3'
						}}
					>
						<b>Check All Items</b>
					</Checkbox>
				</div>
				<div>
					<h2>Folder</h2>
					<ListLargeFolder />
					<br />
					<h2>Doc</h2>
					<ListLargeDoc />
					<br />
					<h2>Video</h2>
					<ListLargeVideo />
					<br />
					<h2>Image</h2>
					<ListLargeImg />
				</div>
			</RctCollapsibleCard>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fileManager: state.fileManager
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllFile: (filter) => dispatch(getAll(filter))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FileManager);

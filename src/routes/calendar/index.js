import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, Icon, List, Table, Timeline, Tabs } from 'antd';
const { TabPane } = Tabs;
import IntlMessages from 'Util/IntlMessages';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { withRouter } from 'react-router-dom';
// actions
import { getTourRates } from '../../actions/TourActions';

moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

const CustomEventComponent = ({ event }) => {
	let departures = event.tour_options.map((option) => {
		return option.destination_title;
	});

	let title = departures.join(', ');

	if (title.length > 80) {
		title = title.substr(0, 80) + '...';
	}

	return <div>{title}</div>;
};

class Calendar extends Component {
	state = {
		visible: false,
		focusedEvent: null,
		currentMonth: moment().month() + 1,
		currentYear: moment().year()
	};

	componentDidMount() {
		this.props.getTourRates({
			tour_id: this.props.match.params.id
		});
	}

	onClickEvent(event) {
		this.setState({
			visible: true,
			focusedEvent: event
		});
	}

	onCloseModal() {
		this.setState({
			visible: false,
			focusedEvent: null
		});
	}

	onChangeDate(date) {
		let nextMonth = moment(date).month() + 1;
		let nextYear = moment(date).year();

		if (nextMonth != this.state.currentMonth || nextYear != this.state.currentyear) {
			this.setState(
				{
					currentMonth: nextMonth,
					currentYear: nextYear
				},
				() => {
					this.props.getTourRates({
						tour_id: this.props.match.params.id,
						month: this.state.currentMonth,
						year: this.state.currentYear
					});
				}
			);
		}
	}

	render() {
		var { focusedEvent } = this.state;
		var { rates } = this.props;
		var events = rates.map((rate) => {
			return {
				// id: rate.id,
				// title: rate.date,
				start: new Date(rate.date),
				end: new Date(rate.date),
				...rate
			};
		});

		return (
			<div>
				<PageTitleBar title={<IntlMessages id="sidebar.calendar" />} match={this.props.match} />
				{rates.length ? <h2>Calendar for Tour: {rates[0].tour_options[0].tour_title}</h2> : null}
				<div className="mt-4">
					<BigCalendar
						popup
						events={events}
						// step={60}
						// view='month'
						// views={['month']}
						defaultDate={new Date()}
						// min={new Date(2015, 0, 1, 8, 0)} // 8.00 AM
						// max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
						// date={new Date(2018, 0, 1)}
						onView={() => {}}
						onNavigate={(value) => this.onChangeDate(value)}
						onSelectEvent={(event) => this.onClickEvent(event)}
						components={{
							event: CustomEventComponent
						}}
					/>
				</div>

				<Modal
					title={<IntlMessages id="calendar.modal_title" />}
					visible={this.state.visible}
					footer={[
						<Button key="submit" type="primary" onClick={() => this.onCloseModal()}>
							OK
						</Button>
					]}
					closable={false}
				>
					{focusedEvent ? (
						<Tabs defaultActiveKey="0">
							{focusedEvent.tour_options.map((option, index) => {
								return (
									<TabPane tab={option.destination_title} key={index.toString()}>
										<Timeline>
											<Timeline.Item>
												<b>
													<IntlMessages id="calendar.modal.tour_id" />:{' '}
												</b>
												{option.option_id}
											</Timeline.Item>
											<Timeline.Item>
												<b>
													<IntlMessages id="calendar.modal.tour_title" />:{' '}
												</b>
												{option.tour_title}
											</Timeline.Item>
											<Timeline.Item>
												<b>
													<IntlMessages id="calendar.modal.date" />:{' '}
												</b>
												{moment(option.date).format('DD/MM/YYYY')}
											</Timeline.Item>
											<Timeline.Item>
												<b>
													<IntlMessages id="calendar.modal.seat" />:{' '}
												</b>
												{option.seat}
											</Timeline.Item>
											<Timeline.Item>
												<b>
													<IntlMessages id="calendar.modal.booked_seat" />:{' '}
												</b>
												{option.seated}
											</Timeline.Item>
											<Timeline.Item>
												<b>
													<IntlMessages id="calendar.modal.price" />:{' '}
												</b>
												{option.price} $
											</Timeline.Item>
										</Timeline>
									</TabPane>
								);
							})}
						</Tabs>
					) : null}
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		rates: state.tour.listRates
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getTourRates: (filter) => dispatch(getTourRates(filter))
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Calendar));

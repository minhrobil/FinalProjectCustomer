import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
	AsyncDriverComponent,
	AsyncAdminComponent,
	AsyncRegisteredComponent,
	AsyncAgentComponent,
	AsyncGuideComponent,
	AsyncSupplierComponent
} from '../../components/AsyncComponent/AsyncComponent';

// async components

const Account = ({ match }) => (
	<div className="dashboard-wrapper">
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/registered`} />
			<Route path={`${match.url}/admin`} component={AsyncAdminComponent} />
			<Route path={`${match.url}/registered`} component={AsyncRegisteredComponent} />
			<Route path={`${match.url}/agent`} component={AsyncAgentComponent} />
			<Route path={`${match.url}/driver`} component={AsyncDriverComponent} />
			<Route path={`${match.url}/guide`} component={AsyncGuideComponent} />
			<Route path={`${match.url}/supplier`} component={AsyncSupplierComponent} />
		</Switch>
	</div>
);

export default Account;

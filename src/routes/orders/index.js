import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components

import { AsyncToursComponent, AsyncFlightComponent, AsyncHotelComponent, AsyncSightseeingComponent } from '../../components/AsyncComponent/AsyncComponent';

const Orders = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/tours`} />
         <Route path={`${match.url}/tours`} component={AsyncToursComponent} />
         <Route path={`${match.url}/flight`} component={AsyncFlightComponent} />
         <Route path={`${match.url}/hotel`} component={AsyncHotelComponent} />
         <Route path={`${match.url}/sightseeing`} component={AsyncSightseeingComponent} />
      </Switch>
   </div>
);

export default Orders;
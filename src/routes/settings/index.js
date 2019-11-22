import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AsyncIntegrationComponent, AsyncConfigComponent } from '../../components/AsyncComponent/AsyncComponent';

// async components


const Settings = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/integration`} />
         <Route path={`${match.url}/integration`} component={AsyncIntegrationComponent} />
         <Route path={`${match.url}/config`} component={AsyncConfigComponent} />
       
        
      </Switch>
   </div>
);

export default Settings;
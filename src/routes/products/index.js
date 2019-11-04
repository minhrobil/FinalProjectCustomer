import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {AsyncProductComponent, AsyncToursProductComponent, AsyncHotelsProductComponent,AsyncCategoryProductComponent, AsyncAirlinesProductComponent, AsyncReviewsProductComponent } from '../../components/AsyncComponent/AsyncComponent';

// async components


const Products = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/tours`} />
         <Route path={`${match.url}/products`} component={AsyncProductComponent} />
         <Route path={`${match.url}/tours`} component={AsyncToursProductComponent} />
         <Route path={`${match.url}/hotels`} component={AsyncHotelsProductComponent} />
         <Route path={`${match.url}/category`} component={AsyncCategoryProductComponent} />
         <Route path={`${match.url}/airlines`} component={AsyncAirlinesProductComponent} />
         <Route path={`${match.url}/reviews`} component={AsyncReviewsProductComponent} />
      </Switch>
   </div>
);

export default Products;
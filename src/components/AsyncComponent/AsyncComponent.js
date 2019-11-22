/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// login
// const AsyncLoginComponent = Loadable({
//    loader: () => import("Routes/auth/index"),
//    loading: () => <RctPageLoader />,
// });
const AsyncToursComponent = Loadable({
  loader: () => import('Routes/orders/tours/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncFlightComponent = Loadable({
  loader: () => import('Routes/orders/flight/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncHotelComponent = Loadable({
  loader: () => import('Routes/orders/hotel/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncSightseeingComponent = Loadable({
  loader: () => import('Routes/orders/sightseeing/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncUsersComponent = Loadable({
  loader: () => import('Routes/account/users/index.js'),
  loading: () => <RctPageLoader />
});

//customer
const AsyncCustomersComponent = Loadable({
  loader: () => import('Routes/account/customers/index.js'),
  loading: () => <RctPageLoader />
});

const AsyncToursProductComponent = Loadable({
  loader: () => import('Routes/products/tours/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncHotelsProductComponent = Loadable({
  loader: () => import('Routes/products/hotels/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAirlinesProductComponent = Loadable({
  loader: () => import('Routes/products/airlines/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncProductComponent = Loadable({
  loader: () => import('Routes/products/product/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCountryComponent = Loadable({
  loader: () => import('Routes/masters/country/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCurrencyComponent = Loadable({
  loader: () => import('Routes/masters/currency/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncDestinationComponent = Loadable({
  loader: () => import('Routes/masters/destination/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncEmail_TemplatesComponent = Loadable({
  loader: () => import('Routes/masters/email_templates/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncLanguageComponent = Loadable({
  loader: () => import('Routes/masters/language/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncIntegrationComponent = Loadable({
  loader: () => import('Routes/settings/integration/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncSale_ReportsComponent = Loadable({
  loader: () => import('Routes/reports/sale_reports/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCusmer_ReporttoComponent = Loadable({
  loader: () => import('Routes/reports/customer_report/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAssetsComponent = Loadable({
  loader: () => import('Routes/grouping/assets/index.js'),
  loading: () => <RctPageLoader />
});

const AsyncGroupsComponent = Loadable({
  loader: () => import('Routes/grouping/groups/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncCategoryProductComponent = Loadable({
  loader: () => import('Routes/products/category/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncReviewsProductComponent = Loadable({
  loader: () => import('Routes/products/reviews/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncContractComponent = Loadable({
  loader: () => import('Routes/masters/contract/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAdminComponent = Loadable({
  loader: () => import('Routes/account/admin/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncDriverComponent = Loadable({
  loader: () => import('Routes/account/driver/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncRegisteredComponent = Loadable({
  loader: () => import('Routes/account/registered/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncAgentComponent = Loadable({
  loader: () => import('Routes/account/agent/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncGuideComponent = Loadable({
  loader: () => import('Routes/account/guide/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncSupplierComponent = Loadable({
  loader: () => import('Routes/account/supplier/index.js'),
  loading: () => <RctPageLoader />
});
const AsyncConfigComponent = Loadable({
  loader: () => import('Routes/settings/config/index.js'),
  loading: () => <RctPageLoader />
});
export {
  // AsyncLoginComponent,
  // AsyncNewModulesComponent,
  // AsyncLoginComponent,
  AsyncDriverComponent,
  AsyncProductComponent,
  AsyncToursComponent,
  AsyncFlightComponent,
  AsyncHotelComponent,
  AsyncSightseeingComponent,
  AsyncUsersComponent,
  AsyncCustomersComponent,
  AsyncToursProductComponent,
  AsyncHotelsProductComponent,
  AsyncAirlinesProductComponent,
  AsyncReviewsProductComponent,
  AsyncCountryComponent,
  AsyncCurrencyComponent,
  AsyncDestinationComponent,
  AsyncEmail_TemplatesComponent,
  AsyncLanguageComponent,
  AsyncIntegrationComponent,
  AsyncSale_ReportsComponent,
  AsyncCusmer_ReporttoComponent,
  AsyncAssetsComponent,
  AsyncGroupsComponent,
  AsyncCategoryProductComponent,
  AsyncContractComponent,
  AsyncAdminComponent,
  AsyncRegisteredComponent,
  AsyncAgentComponent,
  AsyncGuideComponent,
  AsyncSupplierComponent,
  AsyncConfigComponent
};

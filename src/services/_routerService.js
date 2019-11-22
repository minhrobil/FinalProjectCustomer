import Dashboard from 'Routes/dashboard';
import Orders from '../routes/orders';
import Account from '../routes/account';
import Products from '../routes/products';
import Masters from '../routes/masters';
import Settings from '../routes/settings';
import Itineraries from '../routes/itineraries';
import Reports from '../routes/reports';
import Grouping from '../routes/grouping';
import GoPandaCalendar from '../routes/calendar';
import FileManager from '../routes/fileManager';
// import Login from 'Routes/auth';

export default [
	{
		path: 'dashboard',
		component: Dashboard
	},
	{
		path: 'orders',
		component: Orders
	},
	{
		path: 'account',
		component: Account
	},
	{
		path: 'products',
		component: Products
	},
	{
		path: 'masters',
		component: Masters
	},
	{
		path: 'settings',
		component: Settings
	},
	{
		path: 'reports',
		component: Reports
	},
	{
		path: 'grouping',
		component: Grouping
	},
	{
		path: 'calendar/:id',
		component: GoPandaCalendar
	},
	{
		path: 'itineraries/:id',
		component: Itineraries
	},
	{
		path: 'file-manager',
		component: FileManager
	}
];

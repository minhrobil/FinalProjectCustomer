/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import AirlineReducer from './AirlineReducer';
import AssetReducer from './AssetReducer';
import authUserReducer from './AuthUserReducer';
import CategoryReducer from './CategoryReducer';
import ItineraryReducer from './ItineraryReducer';
import ContractReducer from './ContractReducer';
import CountryReducer from './CountryReducer';
import customer from './CustomerReducer';
import DestinationReducer from './DestinationReducer';
import GroupReducer from './GroupReducer';
import settings from './settings';
import sidebarReducer from './SidebarReducer';
import TourReducer from './TourReducer';
import {uploadImage} from './UploadImageReducer';

import {listProduct,saveProduct,deleteProduct} from "./ProductReducer"
import ConfigReducer from './ConfigReducer';
import FileManager from './FileManagerReducer';
import ReviewReducer from './ReviewReducer';
import {listAccountReducer,saveAccountReducer,deleteAccountReducer} from "../redux/account"
import {changeStatusReducer,publishReducer,unpublishReducer} from "../redux/common"

const reducers = combineReducers({
  settings,
  sidebar: sidebarReducer,
  config: ConfigReducer,
  authUser: authUserReducer,
  customer: customer,
  itinerary: ItineraryReducer,
  group: GroupReducer,
  asset: AssetReducer,
  category: CategoryReducer,
  destination: DestinationReducer,
  country: CountryReducer,
  tour: TourReducer,
  contract: ContractReducer,
  airline: AirlineReducer,
  review: ReviewReducer,
  account: AccountReducer,
  listProduct,
  saveProduct,
  uploadImage,
  deleteProduct,
  fileManager: FileManager,
  listAccountReducer,saveAccountReducer,deleteAccountReducer,
  changeStatusReducer,publishReducer,unpublishReducer
});

export default reducers;

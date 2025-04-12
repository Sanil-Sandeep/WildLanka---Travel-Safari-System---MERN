import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductDashboard from './pages/ProductManagement/ProductDashboard';
import CreateProduct from './pages/ProductManagement/CreateProduct';
import ShowProducts from './pages/ProductManagement/ShowProducts';
import EditProducts from './pages/ProductManagement/EditProducts';
import DeleteProducts from './pages/ProductManagement/DeleteProducts';
import ProductsCardPage from './pages/ProductManagement/ProductsCardPage';
import ProductDetailsPage from './pages/ProductManagement/ProductDetailsPage';
import ElectricPage from './pages/ProductManagement/ElectricPage';
import CampingPage from './pages/ProductManagement/CampingPage';
import OthersPage from './pages/ProductManagement/OthersPage';

import EventDashboard from './pages/EventManagement/EventDashboard';
import CreateEvent from './pages/EventManagement/CreateEvent';
import ShowEvents from './pages/EventManagement/ShowEvents';
import EditEvent from './pages/EventManagement/EditEvent';
import DeleteEvent from './pages/EventManagement/DeleteEvent';
import EventsCardPage from './pages/EventManagement/EventsCardPage';
import EventDetailsPage from './pages/EventManagement/EventDetailsPage';
import CampingEventsPage from './pages/EventManagement/CampingEventsPage';
import CulturalEventsPage from './pages/EventManagement/CulturalEventsPage';
import PhotographyEventsPage from './pages/EventManagement/PhotographyEventsPage';

import PackageDashboard from './pages/PackageManagement/PackageDashboard';
import CreatePackage from './pages/PackageManagement/CreatePackage';
import ShowPackage from './pages/PackageManagement/ShowPackage';
import EditPackage from './pages/PackageManagement/EditPackage';
import DeletePackages from './pages/PackageManagement/DeletePackages';
import PackagesCardPage from './pages/PackageManagement/PackagesCardPage';
import PackageDetailsPage from './pages/PackageManagement/PackageDetailsPage';
import DeluxePackagePage from './pages/PackageManagement/DeluxePackagePage';
import PremiumPackagePage from './pages/PackageManagement/PremiumPackagePage';
import StandardPackagePage from './pages/PackageManagement/StandardPackagePage';

import Home from './components/Home';
import Login from './components/Login';

import CartPage from "./pages/PaymentManagement/Cart/CartPage";

import CreatePayments from './pages/PaymentManagement/Payment/CreatePayments';
import DeletePayment from './pages/PaymentManagement/Payment/DeletePayment';
import EditPayment from './pages/PaymentManagement/Payment/EditPayment';
import PaymentDashboard from './pages/PaymentManagement/Payment/PaymentDashbord';
import ShowPayment from './pages/PaymentManagement/Payment/ShowPayment';

import CreateExpenses from './pages/PaymentManagement/Payment/CreateExpenses';
import DeleteExpense from './pages/PaymentManagement/Payment/DeleteExpense';
import EditExpense from './pages/PaymentManagement/Payment/EditExpense';
import ShowExpense from './pages/PaymentManagement/Payment/ShowExpense';
import ExpenseDashboard from './pages/PaymentManagement/Payment/ExpenseDashbord';
import NetProfit from './pages/PaymentManagement/Payment/NetProfit';

import CreateDelivery from './pages/DeliveryManagement/CreateDeliverys';
import DeleteDelivery from './pages/DeliveryManagement/DeleteDelivery';
import DeliveryDashboard from './pages/DeliveryManagement/DeliveryDashboard';
import EditDelivery from './pages/DeliveryManagement/EditDelivery';
import ShowDelivery from './pages/DeliveryManagement/ShowDelivery';

import CreateFeedback from './pages/FeedbackManagement/CreateFeedback';
import FeedbackDashboard from './pages/FeedbackManagement/FeedbackDashbord';
import DeleteFeedback from './pages/FeedbackManagement/DeleteFeedback';
import EditFeedback from './pages/FeedbackManagement/EditFeedback';
import FullFeedback from './pages/FeedbackManagement/FullFeedback';
import ReplyFeedback from './pages/FeedbackManagement/ReplyFeedback';
import ShowFeedback from './pages/FeedbackManagement/ShowFeedback';

import ChatCustomer from './pages/ChatManagement/ChatCustomer';
import CreateCustomerMessage from './pages/ChatManagement/CreateCustomerMessage';
import EditCustomerMessage from './pages/ChatManagement/EditCustomerMessage';
import DeleteCustomerMessage from './pages/ChatManagement/DeleteCustomerMessage';
import CustomerReply from './pages/ChatManagement/CustomerReply';

import ChatManager from './pages/ChatManagement/ChatManager';
import CreateManagerMessage from './pages/ChatManagement/CreateManagerMessage';
import ManagerReply from './pages/ChatManagement/ManagerReply';
import DeleteManagerMessage from './pages/ChatManagement/DeleteManagerMessage';
import EditManagerMessage from './pages/ChatManagement/EditManagerMessage';

import ReturnTable from './pages/ReturnRefundManagement/ReturnDashboard';
import CreateReturns from './pages/ReturnRefundManagement/CreateReturns';
import DeleteReturn from './pages/ReturnRefundManagement/DeleteReturn';
import EditReturn from './pages/ReturnRefundManagement/EditReturn';
import ShowReturn from './pages/ReturnRefundManagement/ShowReturn';


const App = () => {
  return (
    <Routes>
      <Route path='/products' element={<ProductDashboard />} />
      <Route path='/products/create' element={<CreateProduct />} />
      <Route path='/products/details/:id' element={<ShowProducts />} />
      <Route path='/products/edit/:id' element={<EditProducts />} />
      <Route path='/products/delete/:id' element={<DeleteProducts />} />
      <Route path='/products/card' element={<ProductsCardPage />} />
      <Route path='/products/:id' element={<ProductDetailsPage />} />
      <Route path='/products/electric' element={<ElectricPage />} />
      <Route path='/products/camping' element={<CampingPage />} />
      <Route path='/products/others' element={<OthersPage />} />

      <Route path='/packages' element={<PackageDashboard />} />
      <Route path='/packages/create' element={<CreatePackage />} />
      <Route path='/packages/details/:id' element={<ShowPackage />} />
      <Route path='/packages/edit/:id' element={<EditPackage />} />
      <Route path='/packages/delete/:id' element={<DeletePackages />} />
      <Route path='/packages/card' element={<PackagesCardPage />} />
      <Route path='/packages/:id' element={<PackageDetailsPage />} />
      <Route path='/packages/standard' element={<StandardPackagePage />} />
      <Route path='/packages/deluxe' element={<DeluxePackagePage />} />
      <Route path='/packages/premium' element={<PremiumPackagePage />} />

      <Route path='/events' element={<EventDashboard />} />
      <Route path='/events/create' element={<CreateEvent />} />
      <Route path='/events/details/:id' element={<ShowEvents />} />
      <Route path='/events/edit/:id' element={<EditEvent />} />
      <Route path='/events/delete/:id' element={<DeleteEvent />} />
      <Route path='/events/card' element={<EventsCardPage />} />
      <Route path='/events/:id' element={<EventDetailsPage />} />
      <Route path='/events/campingevents' element={<CampingEventsPage />} />
      <Route path='/events/photographyevents' element={<PhotographyEventsPage />} />
      <Route path='/events/culturalevents' element={<CulturalEventsPage />} />

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path='/payments' element={<PaymentDashboard />} />
      <Route path='/payments/create' element={<CreatePayments/>} />
      <Route path='/payments/details/:id' element={<ShowPayment />} />
      <Route path='/payments/edit/:id' element={<EditPayment />} />
      <Route path='/payments/delete/:id' element={<DeletePayment />} />

      <Route path='/expenses/create' element={<CreateExpenses />} />
      <Route path='/expenses/delete/:id' element={<DeleteExpense />} />
      <Route path='/expenses/edit/:id' element={<EditExpense />} />
      <Route path='/expenses/details/:id' element={<ShowExpense />} />
      <Route path='/expenses' element={<ExpenseDashboard />} />
      <Route path='/profits' element={<NetProfit />} />

      <Route path='/deliverys' element={<DeliveryDashboard />} />
      <Route path='/deliverys/create' element={<CreateDelivery />} />
      <Route path='/deliverys/details/:id' element={<ShowDelivery />} />
      <Route path='/deliverys/edit/:id' element={<EditDelivery />} />
      <Route path='/deliverys/delete/:id' element={<DeleteDelivery />} />
      
      <Route path='/feedbacks' element={<FeedbackDashboard />} />
      <Route path='/feedbacks/create' element={<CreateFeedback/>} />
      <Route path='/feedbacks/delete/:id' element={<DeleteFeedback />} />
      <Route path='/feedbacks/edit/:id' element={<EditFeedback />} />
      <Route path='/feedbacks/full' element={<FullFeedback />} />
      <Route path='/feedbacks/reply/:id' element={<ReplyFeedback />} />
      <Route path='/feedbacks/details/:id' element={<ShowFeedback />} />

      <Route path='/cchats/create' element={<CreateCustomerMessage />} />
      <Route path='/cchats/delete/:id' element={<DeleteCustomerMessage />} />
      <Route path='/cchats/edit/:id' element={<EditCustomerMessage />} />
      <Route path='/cchats' element={<ChatCustomer />} />
      <Route path='/mchats/reply/:id' element={<CustomerReply />} />

      <Route path='/mchats' element={<ChatManager />} />
      <Route path='/mchats/create' element={<CreateManagerMessage />} />
      <Route path='/cchats/reply/:id' element={<ManagerReply />} />
      <Route path='/mchats/delete/:id' element={<DeleteManagerMessage />} />
      <Route path='/mchats/edit/:id' element={<EditManagerMessage />} />

      <Route path='/records' element={<ReturnTable/>} />
      <Route path='/records/create' element={<CreateReturns />} />
      <Route path='/records/details/:id' element={<ShowReturn />} />
      <Route path='/records/edit/:id' element={<EditReturn />} />
      <Route path='/records/delete/:id' element={<DeleteReturn />} />

    </Routes>
  );
};

export default App;

import { Route, Routes } from 'react-router-dom';

import Home from './HomePage/Home';
import LogInFormClient from './ClientPages/ClientForms/LogInFormClient';
import SignUpFormClient from './ClientPages/ClientForms/SignUpFormClient';
import LogInFormDriver from './DriverPages/DriverForms/LogInFormDriver';
import SignUpFormDriver from './DriverPages/DriverForms/SignUpFormDriver';

// Protected pages
import DriverHome from './DriverPages/DriverHome';
import ClientHome from './ClientPages/ClientHome';
import PaymentSide from './ClientPages/ClientComponents/PaymentSide';
import GetQuote from './ClientPages/ClientComponents/GetQuote';
import DriverHistory from './DriverPages/DriverHistory';
import ClientHistory from './ClientPages/History/ClientHistory';
import ClientScheduleRide from './ClientPages/History/ClientScheduleRide';
import Deals from './ClientPages/Deals';
import Support from './ClientPages/Support';
import Referrals from './ClientPages/Referrals';
import DriverSupport from './DriverPages/DriverSupport';
import Varification from './DriverPages/Varification';
import DriverReferrals from './DriverPages/DriverReferrals';
import DriverProfile from './DriverPages/DriverComponents/DriverProfile';
import ClientProfile from './ClientPages/ClientComponents/ClientProfile';
import AboutPage from './HomePage/About';
import BusinessMove from './HomePage/ServircesPages/BusinessMove';
import PackingServices from './HomePage/ServircesPages/PackingServices';
import LocalMove from './HomePage/ServircesPages/LocalMove';
import StripePayemnt from './ClientPages/ClientComponents/StripePayemnt';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ClientPages/ClientComponents/ForgotPassword';
import ForgotPasswordDriver from './DriverPages/DriverComponents/ForgotPasswordDriver';
import ChangePassword from './ClientPages/ClientComponents/ResetPassord';
import DriverResetPassword from './DriverPages/DriverComponents/DriverResetPassword';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/LogInFormClient' element={<LogInFormClient />} />
        <Route path='/SignUpFormClient' element={<SignUpFormClient />} />
        <Route path='/LogInFormDriver' element={<LogInFormDriver />} />
        <Route path='/SignUpFormDriver' element={<SignUpFormDriver />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/DriverForgotPassword' element={<ForgotPasswordDriver />} />

        <Route 
          path='/BusinessMove' 
          element={<PrivateRoute><BusinessMove /></PrivateRoute>} 
        />
        <Route 
          path='/PackingService' 
          element={<PrivateRoute><PackingServices /></PrivateRoute>} 
        />
        <Route 
          path='/LocalMove' 
          element={<LocalMove />} 
        />

        {/* Protected Routes */}
        <Route 
          path='/DriverHome' 
          element={<PrivateRoute><DriverHome /></PrivateRoute>} 
        />
        <Route 
          path='/ClientHome' 
          element={<PrivateRoute><ClientHome /></PrivateRoute>} 
        />
        <Route 
          path='/PaymentSide' 
          element={<PrivateRoute><PaymentSide /></PrivateRoute>} 
        />
        <Route 
          path='/GetQuote' 
          element={<PrivateRoute><GetQuote /></PrivateRoute>} 
        />
        <Route 
          path='/DriverHistory' 
          element={<PrivateRoute><DriverHistory /></PrivateRoute>} 
        />
        <Route 
          path='/ClientHistory' 
          element={<PrivateRoute><ClientHistory /></PrivateRoute>} 
        />
        <Route 
          path='/ClientScheduleRide' 
          element={<PrivateRoute><ClientScheduleRide /></PrivateRoute>} 
        />
        <Route 
          path='/Deals' 
          element={<PrivateRoute><Deals /></PrivateRoute>} 
        />
        <Route 
          path='/Support' 
          element={<PrivateRoute><Support /></PrivateRoute>} 
        />
        <Route 
          path='/Referrals' 
          element={<PrivateRoute><Referrals /></PrivateRoute>} 
        />
        <Route 
          path='/DriverSupport' 
          element={<PrivateRoute><DriverSupport /></PrivateRoute>} 
        />
        <Route 
          path='/Varification' 
          element={<PrivateRoute><Varification /></PrivateRoute>} 
        />
        <Route 
          path='/DriverReferrals' 
          element={<PrivateRoute><DriverReferrals /></PrivateRoute>} 
        />
        <Route 
          path='/DriverProfile' 
          element={<PrivateRoute><DriverProfile /></PrivateRoute>} 
        />
        <Route 
          path='/ClientProfile' 
          element={<PrivateRoute><ClientProfile /></PrivateRoute>} 
        />
        <Route 
          path='/About' 
          element={<PrivateRoute><AboutPage /></PrivateRoute>} 
        />
       
        <Route 
          path='/Paynow' 
          element={<PrivateRoute><StripePayemnt /></PrivateRoute>} 
        />

        <Route 
          path='/ResetPassword' 
          element={<PrivateRoute><ChangePassword/></PrivateRoute>} 
        />

        <Route 
          path='/DriverResetPassword' 
          element={<PrivateRoute><DriverResetPassword/></PrivateRoute>} 
        />
      </Routes>
    </>
  );
}

export default App;

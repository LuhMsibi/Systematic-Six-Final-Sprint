import { Route, Routes } from 'react-router-dom';
import Home from './HomePage/Home';
import LogInFormClient from './ClientPages/ClientForms/LogInFormClient';
import SignUpFormClient from './ClientPages/ClientForms/SignUpFormClient';
import LogInFormDriver from './DriverPages/DriverForms/LogInFormDriver';
import SignUpFormDriver from './DriverPages/DriverForms/SignUpFormDriver';
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

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/LogInFormClient' element={<LogInFormClient />} />
        <Route path='/SignUpFormClient' element={<SignUpFormClient />} />
        <Route path='/LogInFormDriver' element={<LogInFormDriver />} />
        <Route path='/SignUpFormDriver' element={<SignUpFormDriver />} />
        <Route path='/DriverHome' element={<DriverHome />} />
        <Route path='/ClientHome' element={<ClientHome />} />
        <Route path='/PaymentSide' element={<PaymentSide />} />
        <Route path='/GetQuote' element={<GetQuote />} />
        <Route path='/DriverHistory' element={<DriverHistory />} />
        <Route path='/ClientHistory' element={<ClientHistory />} />
        <Route path='/ClientScheduleRide' element={<ClientScheduleRide />} />
        <Route path='/Deals' element={<Deals />} />
        <Route path='/Support' element={<Support />} />
        <Route path='/Referrals' element={<Referrals />} />
        <Route path='/DriverSupport' element={<DriverSupport />} />
        <Route path='/Varification' element={<Varification />} />
        <Route path='/DriverReferrals' element={<DriverReferrals />} />
        <Route path='/DriverProfile' element={<DriverProfile />} />
        <Route path='/ClientProfile' element={<ClientProfile />} />
        <Route path='/About' element={<AboutPage />} />
        <Route path='BusinessMove' element={<BusinessMove/>} />
        
      </Routes>

    </>
  )
}

export default App

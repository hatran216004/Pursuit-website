import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import ContextProvider, { useAppContext } from './context/AppContext';
import Applayout from './layout/AppLayout';
import LoginLayout from './layout/LoginLayout';
import Home from './pages/Home';
import Cart from './features/cart';
import About from './pages/About';
import Error from './pages/Error';
import ProductDetail from './features/products/ProductDetail';
import Login from './features/Auth/Login';
import Signup from './features/Auth/Signup';
import Products from './pages/Products';
import Checkout from './pages/Checkout/Checkout';
import Thankyou from './pages/Thankyou';
import Payment from './features/payment';
import UserOrder from './pages/UserOrder';
import Profile from './pages/Profile';
import UserInfo from './features/User/UserInfo';
import Settings from './features/User/Settings';

function ProtectedRoutes() {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoutes() {
  const { isAuthenticated } = useAppContext();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

function App() {
  return (
    <GlobalStyles>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Applayout />}>
              <Route element={<Home />} index path="/" />
              <Route element={<Products />} path="products" />
              <Route element={<ProductDetail />} path="products/:productId" />
              <Route element={<About />} path="about" />

              <Route element={<ProtectedRoutes />}>
                <Route element={<Profile />} path="profile">
                  <Route element={<UserInfo />} index />
                  <Route element={<Settings />} path="settings" />
                </Route>
                <Route element={<Cart />} path="cart" />
                <Route element={<UserOrder />} path="myorders" />
                <Route element={<Checkout />} path="checkout" />
                <Route element={<Payment />} path="payment" />
                <Route element={<Thankyou />} path="thankyou" />
              </Route>
            </Route>

            <Route element={<RejectedRoutes />}>
              <Route element={<LoginLayout />}>
                <Route element={<Login />} path="login" />
                <Route element={<Signup />} path="signup" />
              </Route>
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 2000
            },
            error: {
              duration: 3000
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: '#fff',
              color: '#131717'
            }
          }}
        />
      </ContextProvider>
    </GlobalStyles>
  );
}

export default App;

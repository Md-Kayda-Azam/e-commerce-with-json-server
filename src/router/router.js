import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import CartPage from '../pages/CartPage';
import Checkout from '../pages/Checkout';
import ProductDetailPage from '../pages/ProductDetailPage';
import Protected from './Protected';
import PageNotFound from '../pages/404';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import UserOrderPage from '../pages/UserOrderPage';
import UserProfilePage from '../pages/UserProfilePage';
import LogoutPage from '../pages/LogoutPage';
import ForgotPassword from '../features/auth/components/ForgotPassword';
import AdminHome from '../pages/AdminHome';
import ProtectedAdmin from './ProtectedAdmin';
import AdminProductDetailPage from '../pages/AminProductDetailPage copy';
import AdminProductForm from '../pages/AdminProductForm';
import AdminOrdersPage from '../pages/AdminOrdersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage />,
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout />,
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage />,
      </Protected>
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />,
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductForm />,
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductForm />,
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />,
      </ProtectedAdmin>
    ),
  },
  {
    path: '/order-success/:id',
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: '/orders',
    element: (
      <Protected>
        <UserOrderPage />
      </Protected>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

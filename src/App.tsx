import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router";
import UserLayout from "./layout/user/UserLayout.tsx";
import UserHomePage from "./pages/OtherPage/UserHomePage.tsx";
import AdminLayout from "./layout/admin/AdminLayout.tsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.tsx";
import CategoriesListPage from "./admin/pages/Сategories/List";
import NotFound from "./pages/OtherPage/NotFound.tsx";
import React from "react";
import CategoriesCreatePage from "./admin/pages/Сategories/Create";
import CategoriesEditPage from "./admin/pages/Сategories/Edit";
import LoginPage from "./pages/Account/Login";
import RegistrationPage from "./pages/Account/Register";
import AdminProductListPage from "./admin/pages/Products/List/AdminProductListPage.tsx";
import AdminProductCreatePage from "./admin/pages/Products/Create/AdminProductCreatePage.tsx";
import ForgotPasswordPage from "./pages/Account/ForgotPassword";
import EmailSentSuccessPage from './pages/Account/EmailSentSuccess';
import ResetPassword from "./pages/Account/ResetPassword";
import AdminUsersListPage from "./admin/pages/Users/List/AdminUsersList.tsx";
import MenuCategoryPage from "./pages/Menu";
import UsersEditPage from "./admin/pages/Users/Edit";
import OrderFormPage from "./components/cart/OrderForm";
import CheckoutLayout from "./layout/user/CheckoutLayout.tsx";
import ProfilePage from "./pages/Account/Profile";
import OrdersPage from "./pages/Account/OrderHistory";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    {/*<Route index element={<UserLayout>}></Route>*/}

                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<UserHomePage />} />

                         <Route path="menu">
                             <Route path="/menu/:category" element={<MenuCategoryPage />} />
                         </Route>

                        <Route path="account">
                            <Route  path={"login"} element={<LoginPage/>} />
                            <Route  path={"register"} element={<RegistrationPage/>} />
                        </Route>

                        <Route  path={"forgot-password"} element={<ForgotPasswordPage/>} />
                        <Route  path={"email-sent-success"} element={<EmailSentSuccessPage/>} />
                        <Route  path={"reset-password"} element={<ResetPassword/>} />
                        <Route path={"profile"} element={<ProfilePage/>}></Route>
                        <Route path={"order-history"} element={<OrdersPage/>}></Route>
                    </Route>


                    <Route path="/checkout" element={<CheckoutLayout />}>
                        <Route index element={<OrderFormPage />} />
                    </Route>


                    <Route path={"admin"} element={<AdminLayout />}>
                        <Route path="home" element={<DashboardHome />}/>

                        <Route path="categories">
                            <Route index  element={<CategoriesListPage />} />
                            <Route  path={"create"} element={<CategoriesCreatePage/>} />
                            <Route  path={"edit/:id"} element={<CategoriesEditPage/>} />
                        </Route>

                        <Route path="products">
                            <Route index  element={<AdminProductListPage />} />
                            <Route path={"create"} element={<AdminProductCreatePage/>}/>
                        </Route>

                        <Route path="users">
                            <Route index  element={<AdminUsersListPage />} />
                            <Route path={"edit/:id"}  element={<UsersEditPage/>} />
                        </Route>



                    </Route>


                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
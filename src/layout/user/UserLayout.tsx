import {Link, Outlet, useNavigate} from "react-router";
import {LogOut, Pizza, Settings, User} from "lucide-react";
import {useAppDispatch, useAppSelector} from "../../store";
import {APP_ENV} from "../../env";
import {logout} from "../../store/authSlice.ts";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import {useCart} from "../../hooks/useCart.ts";
import CartDrawer from "../../components/cart/CartDrawer";
import {apiCart} from "../../services/apiCart.ts";

const UserLayout: React.FC = () => {
    const { user } = useAppSelector(state=>state.auth);

    const { cart } = useCart(user!=null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    function logoutUser() {
        const serverCart = [...cart];
        dispatch(logout());
        console.log('Server cart', serverCart);
        dispatch(apiCart.util.resetApiState()); // очищення кешу запитів кошика
        console.log('Server cart', serverCart);
        navigate('/');
    }

    function openProfile(){
        navigate("/profile");
    }


    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">

            <header className="w-full py-4 px-6 bg-white text-white shadow-lg flex justify-between items-center">
                <h1
                    className="text-2xl font-bold tracking-wide flex items-center gap-2 cursor-pointer text-red-700 hover:text-red-900 transition-colors"
                    onClick={() => navigate('/')}
                >
                    <Pizza className="w-6 h-6" />
                    Pizza 39
                </h1>

                <div className="hidden md:flex flex-row text-gray-700 gap-3 text-sm text-right leading-tight items-start">
                    <span>10:00 - 22:00</span>
                    <span>Точки видачі</span>
                    <span>Оплата та доставка</span>
                    <a href="tel:+380983939239" className="underline hover:text-red-700">
                        +38 098 39 39 239
                    </a>
                </div>


                <nav className="flex items-center gap-4">
                    <CartDrawer />

                    {user ? (
                         user.roles.includes("Admin") ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="flex items-center gap-2 focus:outline-none">
                                    <img
                                        src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                    />
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content
                                sideOffset={8}
                                className="z-50 mt-2 min-w-[140px] min-h-[160px] mr-3 bg-white rounded-md shadow-lg border border-gray-200 p-1"
                            >

                                <div className="text-gray-600 text-sm px-3 py-2 border-b border-gray-200">
                                    {user.email}
                                </div>
                                <DropdownMenu.Item
                                    onClick={openProfile}
                                    className="flex items-center text-black
                                    hover:bg-gray-200  py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                    <User className="stroke-black w-7 h-5" />
                                    Профіль
                                </DropdownMenu.Item>

                                <DropdownMenu.Item asChild>
                                    <Link
                                        to="/Admin/home"
                                        className="flex items-center text-black
                                    hover:bg-gray-200  py-2 rounded
                                    cursor-pointer text-sm transition-colors border-b">
                                        <Settings className="stroke-black w-7 h-5" />
                                        Адмін панель
                                    </Link>
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                    onClick={logoutUser}
                                    className="flex items-center  text-black
                                    hover:bg-gray-200  py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                    <LogOut className="stroke-black w-7 h-5" />
                                    Вийти
                                </DropdownMenu.Item>

                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                         ) : (
                             <DropdownMenu.Root>
                                 <DropdownMenu.Trigger asChild>
                                     <button className="flex items-center gap-2 focus:outline-none">
                                         <img
                                             src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                                             alt="Avatar"
                                             className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                         />
                                     </button>
                                 </DropdownMenu.Trigger>

                                 <DropdownMenu.Content
                                     sideOffset={8}
                                     className="z-50 mt-2 min-w-[140px] mr-3 bg-white rounded-md shadow-lg border border-gray-200 p-1"
                                 >
                                     <div className="text-gray-600 text-sm px-3 py-2 border-b border-gray-200">
                                         {user.email}
                                     </div>

                                     <DropdownMenu.Item
                                         onClick={openProfile}
                                         className="flex items-center text-black
                                    hover:bg-gray-200  py-2 rounded
                                    cursor-pointer text-sm transition-colors border-b">
                                         <User className="stroke-black w-7 h-5" />
                                         Профіль
                                     </DropdownMenu.Item>

                                     <DropdownMenu.Item
                                         onClick={logoutUser}
                                         className="flex items-center  text-black
                                    hover:bg-gray-200  py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                         <LogOut className="stroke-black w-7 h-5" />
                                         Вийти
                                     </DropdownMenu.Item>

                                 </DropdownMenu.Content>
                             </DropdownMenu.Root>
                         )
                    ) : (
                        <div className="flex items-center">
                            <Link
                                to="/account/login"
                                className="text-gray-700 hover:text-gray-500  font-semibold py-2 px-2 rounded-full transition-all duration-300"
                            >
                                Вхід
                            </Link>

                            <span className="text-gray-700">/</span>

                            <Link
                                to="/account/register"
                                className="text-gray-700 hover:text-gray-500 font-semibold py-2 px-2 rounded-full transition-all duration-300"
                            >
                                Реєстрація
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            <main className="flex-1 p-4 md:p-6">
                <Outlet />
            </main>


            <footer className="w-full py-6 px-6 bg-gray-300 text-white text-sm text-center">
                <div className="container mx-auto flex flex-wrap justify-between items-start text-left">
                    {/* Колонка 1: Лого та копірайт */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <div className="mb-3 text-red-700 hover:text-red-900 font-semibold text-lg">🍕 Pizza 39 — Смачна доставка у Тернополі</div>
                        <p className={"text-gray-800"}>© 2025 Pizza 39 | Усі права захищено</p>
                    </div>

                    {/* Колонка 2: Контакти */}
                    <div className="w-full text-gray-700 md:w-1/3 mb-6 md:mb-0 text-sm">
                        <p className="font-semibold mb-2 text-red-700">📞 Замовлення по телефону:</p>
                        <p className="font-medium">
                            +38 (098) 39 39 239
                        </p>
                        <p className="font-medium">
                            +38 (050) 39 39 239
                        </p>
                    </div>

                    {/* Колонка 3: Адреса та графік роботи */}
                    <div className="w-full text-gray-700 md:w-1/3 text-sm">
                        <p className="font-semibold mb-2 text-red-700">📍 Адреса:</p>
                        <p>вул. Коновальця, 39, м. Тернопіль</p>
                        <p className="font-semibold mb-2 mt-2 text-red-700">🕐 Працюємо щодня:</p>
                        <p>10:00 – 22:00</p>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default UserLayout;

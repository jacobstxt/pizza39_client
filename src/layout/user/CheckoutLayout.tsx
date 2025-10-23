import {Outlet, useNavigate} from "react-router";
import {Pizza} from "lucide-react";
import React from "react";


const CheckoutLayout: React.FC = () => {
    const navigate = useNavigate();


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

export default CheckoutLayout;

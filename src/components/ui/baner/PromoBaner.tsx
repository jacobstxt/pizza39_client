import { Link } from "react-router-dom";
import React from "react";

const PromoBanner: React.FC = () => {
    return (
        <>
           <div className="max-w-xl text-center md:text-left">
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                    Акції та спеціальні пропозиції!
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Отримайте знижку 10% на перше замовлення або безкоштовну доставку при замовленні від 300 грн.
                </p>
                <Link
                    to="/menu/promotions"
                    className=" inline-block bg-red-600 text-white font-bold px-8 py-4 rounded-full shadow-lg
            hover:bg-red-700 transition transform hover:-translate-y-1 hover:scale-105"
                >
                    Переглянути акції
                </Link>
            </div>
            <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80"
                alt="Спеціальна пропозиція"
                className="w-full max-w-xs rounded-lg shadow-lg object-cover"
            />
        </>
    );
};

export default PromoBanner;

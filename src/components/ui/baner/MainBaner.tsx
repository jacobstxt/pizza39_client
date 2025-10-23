import {Link} from "react-router-dom";
import React from "react";


const MainBanner: React.FC = () => {
    return(
        <>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

                {/* Ліва частина: текст */}
                <div className="max-w-xl text-center md:text-left">
                    <h1 className="text-5xl font-extrabold text-red-700 dark:text-white mb-6 leading-tight">
                        Спробуй найсмачнішу піцу<br /> у Тернополі
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                        Гаряча, соковита та з улюбленими інгредієнтами — замов просто зараз і отримай за 30 хвилин!
                    </p>
                    <Link
                        to="/menu/pizza"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full shadow-md transition transform hover:scale-105"
                    >
                        Замовити піцу
                    </Link>
                </div>

                {/* Права частина: картинка */}
                <div className="relative w-[500px] h-90 md:h-[450px] lg:h-[500px]">
                    <img
                        src="https://assets.dots.live/misteram-public/8cf90b7c-69d7-4151-b3d9-2e5c0bcb50ee-826x0.png"
                        alt="Pizza illustration"
                        className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                </div>

            </div>
        </>
        )
}


export default MainBanner;
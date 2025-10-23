import React from "react";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import 'swiper/css';

interface Category {
    id: string;
    slug: string;
    name: string;
    image: string;
}

interface CategoriesProps {
    categories: Category[];
}

const CategoriesGridOrSlider: React.FC<CategoriesProps> = ({ categories }) => {
    return (
        <>
            <div className="block md:hidden px-2">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={2}
                    grabCursor={true}
                    pagination={{ clickable: true }}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <Link
                                to={`/menu/${category.slug}`}
                                className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition block"
                            >
                                <img
                                    src={`${APP_ENV.IMAGES_1200_URL}${category.image}`}
                                    alt={category.name}
                                    loading="lazy"
                                    className="w-full h-48 object-cover rounded-xl transition-transform duration-500 ease-in-out hover:scale-110 hover:brightness-75"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition">
                  <span className="text-white text-lg font-semibold">
                    {category.name}
                  </span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Сітка для десктопів */}
            <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
                {categories.map((category) => (
                    <Link
                        to={`/menu/${category.slug}`}
                        key={category.id}
                        className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition block"
                    >
                        <img
                            src={`${APP_ENV.IMAGES_1200_URL}${category.image}`}
                            alt={category.name}
                            loading="lazy"
                            className="w-full h-64 object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition">
              <span className="text-white text-xl font-semibold">
                {category.name}
              </span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default CategoriesGridOrSlider;

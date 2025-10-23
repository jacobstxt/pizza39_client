import {useGetAllCategoriesQuery} from "../../services/apiCategory.ts";
import React from "react";
import CategoriesGridOrSlider from "../../components/ui/slider/CategoriesGridOrSlider.tsx";
import MainBanner from "../../components/ui/baner/MainBaner.tsx";
import PromoBaner from "../../components/ui/baner/PromoBaner.tsx";

const UserHomePage: React.FC = () => {
    const { data: categories} = useGetAllCategoriesQuery();

    return (
        <div className="bg-white dark:bg-gray-900">

            <section
                className="relative bg-white text-red-700 dark:bg-gray-800 py-28 px-8 rounded-xl
                 max-w-7xl mx-auto mb-16 shadow-lg overflow-hidden"
            >
                <MainBanner />
            </section>


            <section className="max-w-7xl mx-auto my-12 px-6 py-12 bg-white
            dark:bg-gray-800 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                <PromoBaner />
            </section>


            <section className="px-8 max-w-7xl mx-auto">
                {categories && <CategoriesGridOrSlider categories={categories} />}
            </section>

        </div>
    );
};

export default UserHomePage;

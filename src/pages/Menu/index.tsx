import {Row} from 'antd';
import React from "react";
import {useGetAllProductsQuery} from "../../services/apiProducts.ts";
import LoadingOverlay from "../../components/ui/loading/LoadingOverlay.tsx";
import ProductCard from "../../components/ui/card/productCard.tsx";
import {useParams} from "react-router";



const categoryMap: Record<string, string> = {
    pizza: 'Піца',
    napoyi: 'Напої',
    salaty: 'Салати',
    sushi: 'Суші',
    "piza-sety": 'Піца сети',
    pasty: 'Пасти',
    sneky: 'Снеки'
};


export const MenuCategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const {data: products, isLoading, isError} = useGetAllProductsQuery();


    if (isError) return <p>Помилка при завантаженні продуктів</p>;


    const categoryName = categoryMap[category?.toLowerCase() ?? ''] ?? '';

    const filteredProducts = products
        ? products.filter(product => product.category?.name === categoryName)
        : [];

    const uniqueProducts = filteredProducts.filter((product, index, self) =>
        index === self.findIndex((p) => p.slug === product.slug)
    );

    return (
        <>
            {isLoading && <LoadingOverlay/>}
            <div style={{padding: 24}}>
                <Row gutter={[16, 16]}>
                    {uniqueProducts.length > 0 ? (
                        uniqueProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Продукти не знайдені в категорії "{category}"</p>
                    )}
                </Row>
            </div>
        </>
    );
};


export default MenuCategoryPage
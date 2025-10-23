import { Package, Calendar, ShoppingCart } from "lucide-react";
import { APP_ENV } from "../../../env";
import {useGetUserOrdersQuery} from "../../../services/apiOrder.ts";

const OrdersPage = () => {
    const { data: orders = [], isLoading } = useGetUserOrdersQuery();

    if (isLoading) return <p>Завантаження...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package /> Мої замовлення
            </h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">У вас ще немає замовлень.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-xl shadow-md p-4 border"
                        >
                            {/* Заголовок замовлення */}
                            <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-lg">
                  Замовлення #{order.id}
                </span>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        order.status.includes("Скасовано")
                                            ? "bg-red-100 text-red-700"
                                            : order.status === "Завершено"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                  {order.status}
                </span>
                            </div>

                            {/* Дата та сума */}
                            <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                    {new Date(order.dateCreated).toLocaleDateString("uk-UA")}
                </span>
                                <span className="flex items-center gap-1">
                  <ShoppingCart size={16} />
                                    {order.totalPrice} грн
                </span>
                            </div>

                            {/* Список товарів */}
                            <div className="space-y-3">
                                {order.orderItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 border-b pb-2 last:border-b-0"
                                    >
                                        <img
                                            src={`${APP_ENV.IMAGES_400_URL}${item.productImage}`}
                                            alt={item.productName}
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-gray-500 text-sm">
                                                {item.count} × {item.priceBuy} грн
                                            </p>
                                        </div>
                                        <div className="font-semibold">
                                            {item.count * item.priceBuy} грн
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;

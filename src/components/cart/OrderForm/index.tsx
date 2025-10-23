import {Button, Form, message, Input, Select, type FormProps} from "antd";
import {useAppSelector} from "../../../store";
import React, {useState} from "react";
import {
    type ICreateOrderItem, useCreateOrderMutation,
    useGetCitiesQuery,
    useGetPaymentTypesQuery,
    useGetPostDepartmentsQuery
} from "../../../services/apiOrder.ts";
import { skipToken } from "@reduxjs/toolkit/query";
import {useGetCartQuery} from "../../../services/apiCart.ts";
import type {ICartItem} from "../../../store/localCartSlice.ts";
import {useNavigate} from "react-router";



const OrderFormPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    console.log(user);
    if (!user) {
        navigate("/account/login");
    }
    const { data: cart, refetch } = useGetCartQuery(undefined, { skip: !user });
    console.log(refetch);
    const [createOrder, {isLoading}] = useCreateOrderMutation();
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
    const [searchDepartmentText, setSearchDepartmentText] = useState<string>("");
    const [searchCityText, setSearchCityText] = useState<string>("");

    const { data: cities = [] } = useGetCitiesQuery(searchCityText);
    const { data: paymentTypes = [] } = useGetPaymentTypesQuery();

    const {
        data: postDepartments = [],
        isLoading: isDeptsLoading
    } = useGetPostDepartmentsQuery(
        selectedCityId ? { cityId: selectedCityId, name: searchDepartmentText } : skipToken
    );

    const onFinish: FormProps<ICreateOrderItem>['onFinish'] = async (values) => {
        try {
            await createOrder(values);
            console.log('END CREATE ORDER');
            message.success('Order created');
            refetch();
            navigate('/');

        } catch (err) {
            console.error('Create order failed:', err);
        }
    };

    console.log("CITIES",cities);
    console.log("PAYMENTS",paymentTypes);
    console.log("POSTDEPARTMENTS",postDepartments);


    const getTotalSum = (cart: ICartItem[]) =>
        cart.reduce((sum, item) => sum + Number(item.price) * item.quantity!, 0);

    const getTotalQuantity = (cart: ICartItem[]) =>
        cart.reduce((sum, item) => sum + item.quantity!, 0);

    console.log(user);
    return (
        <>
        <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                recipientName: user?.name || ''
            }}
        >
            <div className="max-w-6xl mx-auto">
                <h1 className={"font-bold text-3xl mb-4"}>Оформлення замовлення</h1>


            <div className={" my-8 flex gap-9 items-start"}>
                <div className="flex-1">

                    <section style={{ marginBottom: 24, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>

                        <h3 className={"font-bold text-xl mb-4"}>Контактна інформація</h3>
                    <Form.Item<ICreateOrderItem>
                        label="Ім’я отримувача"
                        name="recipientName"
                        rules={[{ required: true, message: 'Введіть ім’я' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Телефон"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Введіть номер телефону' }]}
                    >
                        <Input/>
                    </Form.Item>
                    </section>

                    <section style={{ marginBottom: 24, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>

                        <h3 className={"font-bold text-xl mb-4"}>Доставка</h3>
                    <Form.Item<ICreateOrderItem>
                        label="Місто"
                        rules={[{ required: true, message: "Оберіть місто" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Оберіть місто"
                            onChange={(value) => {
                                setSelectedCityId(value);
                                setSearchDepartmentText(""); // reset department search when city changes
                            }}
                            onSearch={(value) => setSearchCityText(value)}
                            filterOption={false} // disable built-in filter to rely on server-side search
                            allowClear
                        >
                            {cities.map((city) => (
                                <Select.Option key={city.id} value={city.id}>
                                    {city.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item<ICreateOrderItem>
                        label="Відділення"
                        name="postDepartmentId"
                        rules={[{ required: true, message: "Оберіть відділення" }]}
                    >
                        <Select
                            showSearch
                            disabled={!selectedCityId}
                            placeholder={
                                selectedCityId
                                    ? "Введіть текст для пошуку відділення"
                                    : "Оберіть місто спочатку"
                            }
                            onSearch={(value) => setSearchDepartmentText(value)}
                            notFoundContent={
                                selectedCityId ? "Немає результатів" : "Оберіть місто"
                            }
                            filterOption={false}
                            loading={isDeptsLoading}
                            allowClear
                        >
                            {postDepartments.map((dept) => (
                                <Select.Option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    </section>

                    <section style={{ marginBottom: 24, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
                        <h3 className={"font-bold text-xl mb-4"}>Оплата</h3>
                    <Form.Item<ICreateOrderItem>
                        label="Спосіб оплати"
                        name="paymentTypeId"
                        rules={[{ required: true, message: "Оберіть спосіб оплати" }]}
                    >
                        <Select placeholder="Оберіть спосіб оплати">
                            {paymentTypes.map((pt) => (
                                <Select.Option key={pt.id} value={pt.id}>
                                    {pt.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    </section>

                </div>

                <div className="sticky top-6">
                <div className="w-80 p-6 border border-gray-300 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Разом</h3>

                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm">
                            {getTotalQuantity(cart || [])} {
                                getTotalQuantity(cart || []) === 1 ? 'продукт'
                                    : getTotalQuantity(cart || []) === 2 || getTotalQuantity(cart || []) === 3 || getTotalQuantity(cart || []) === 4  ? 'продукти'
                                        : 'продуків'} на суму
                        </p>
                        <p className="text-base font-normal">{getTotalSum(cart || [])} ₴</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm">Доставка</p>
                        <p className="text-base font-normal">За тарифами <br></br> перевізника</p>
                    </div>



                    <hr className="mb-4 border-gray-300" />
                    <div className={"flex items-center justify-between mb-4"}>
                        <h1 className="text-sm ">До сплати</h1>
                        <p className="text-2xl font-bold">{getTotalSum(cart || [])} ₴</p>
                    </div>

                    <hr className="mb-4 border-gray-300" />

                    <Form.Item>
                        <Button type="default"
                                className="!bg-red-600 !text-white hover:!bg-red-700 font-bold mt-5 !h-[45px] !text-lg  w-full rounded-full shadow-md transition hover:scale-105"
                                htmlType="submit" loading={isLoading}>
                            Замовлення підтверджую
                        </Button>
                    </Form.Item>
                </div>
                </div>

            </div>
            </div>
        </Form>
        </>
    );
};

export default OrderFormPage;
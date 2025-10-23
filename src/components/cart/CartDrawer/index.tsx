import {Badge, Button, List, Space, Image, Typography, Divider, Modal} from "antd";
import {useAppSelector} from "../../../store";
import React, {useState} from "react";
import {type ICartItem} from "../../../store/localCartSlice.ts";
import {APP_ENV} from "../../../env";
import {useCart} from "../../../hooks/useCart.ts";
import {ShoppingCart} from "lucide-react";
import {useNavigate} from "react-router";

const {Text} = Typography;

const CartDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);
    const {user} = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const {cart, addToCart, removeFromCart} = useCart(user != null);


    const getTotalSum = (cart: ICartItem[]) =>
        cart.reduce((sum, item) => sum + Number(item.price) * item.quantity!, 0);


    return (
        <>
            <Badge count={cart?.reduce(function (acc:number, obj: ICartItem) {
                return acc + obj.quantity!;
            }, 0)} showZero>
                <ShoppingCart onClick={() => setOpen(true)}
                              className="cursor-pointer w-7 h-7 text-gray-700 hover:text-gray-800 transform transition-transform duration-200 hover:scale-110" />
            </Badge>

            <Modal
                title="Ваш кошик"
                onCancel={() => setOpen(false)}
                open={open}
                width={800}
                height={800}
                footer={null}
            >

                <List
                    dataSource={cart}
                    locale={{emptyText: "Кошик порожній"}}
                    renderItem={(item: ICartItem) => (
                        <List.Item
                            actions={[
                                <Button
                                    danger
                                    onClick={() => removeFromCart(item.productId!)}
                                >
                                    Видалити
                                </Button>
                            ]}
                        >
                            <Space align="start">
                                <Image
                                    src={`${APP_ENV.IMAGES_200_URL}${item.imageName}`}
                                    width={128}
                                    height={128}
                                    preview={false}
                                />
                                <div>
                                    <Text strong>
                                        {item.name}
                                    </Text>
                                    <br/>
                                    <Text type="secondary">{item.categoryName}</Text>
                                    <br/>
                                    <div style={{display: "flex", alignItems: "center", gap: 8, margin: "8px 0"}}>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                item.quantity! > 1 && addToCart({...item, quantity: -1})
                                            }
                                        >
                                            -
                                        </Button>
                                        <Text>{item.quantity}</Text>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                addToCart({...item, quantity: 1})
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Text>Ціна: {item.price} ₴</Text>
                                </div>
                            </Space>
                        </List.Item>
                    )}
                />

                <Divider/>

                <div
                    style={{
                        border: "1px solid #f0f0f0",
                        borderRadius: 8,
                        padding: 16,
                        backgroundColor: "#fafafa",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16
                    }}
                >
                    <div>
                        <Text strong style={{ fontSize: 18 }}>Сума до сплати:</Text>
                        <br />
                        <Text strong style={{ fontSize: 24, color: "#cf1322" }}>
                            {getTotalSum(cart)} ₴
                        </Text>
                    </div>

                    <Button className="!bg-red-600 justify-end !text-white hover:!bg-red-700 font-bold !mt-3 !px-8 !py-5 mb-3 rounded-full shadow-md transition hover:scale-105"
                            onClick={() =>{
                                setOpen(false)
                                navigate("/checkout",{ state: { cart } });
                            }}>
                                Оформити замовлення
                    </Button>
                </div>


            </Modal>
        </>
    );
};

export default CartDrawer;

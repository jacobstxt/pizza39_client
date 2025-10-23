import { Form, type FormProps, Input } from 'antd';
import {type IForgotPasswordRequest, useForgotPasswordMutation} from "../../../services/apiAccount.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import React from "react";
import {useNavigate} from "react-router";


const ForgotPasswordPage: React.FC = () => {
    const [forgot, { isLoading }] = useForgotPasswordMutation();
    const navigate = useNavigate();
    const onFinish: FormProps<IForgotPasswordRequest>["onFinish"] = async (values) => {
        try {
            // @ts-ignore
            await forgot(values).unwrap();
            navigate('/email-sent-success');

        } catch (err) {
            console.log("error", err);
            alert("Login failed");
        }
    };


    return (
        <div className="min-h-[550px] flex items-center justify-center ">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 dark:border-gray-800 animate-fade-in shadow-lg w-full max-w-md">
                {(isLoading)  && <LoadingOverlay />}

                <h2 className="text-2xl font-semibold mb-6 text-center">Відновлення паролю</h2>
                <Form<IForgotPasswordRequest>
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item<IForgotPasswordRequest>
                        name="email"
                        label="Вкажіть пошту для відновлення паролю"
                        rules={[{ required: true, message: "Enter your email" }]}
                    >
                        <Input type="email" placeholder="you@example.com" />
                    </Form.Item>


                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 transition
                        text-white font-semibold px-4 py-2 rounded w-full mt-4"
                    >
                        {isLoading ? 'Logging in...' : 'Відновити пароль'}
                    </button>

                </Form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

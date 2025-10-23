import {useNavigate} from "react-router";
import {Form, type FormProps, Input, message} from "antd";
import type {IAuthResponse, IRegister, ServerError} from "../../../services/types.ts";
import {useFormServerErrors} from "../../../utilities/useFormServerErrors.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import ImageUploadFormItem from "../../../components/ui/form/ImageUploadFormItem.tsx";
import {loginSuccess} from "../../../store/authSlice.ts";
import {useDispatch} from "react-redux";
import {useRegisterMutation} from "../../../services/apiAccount.ts";
import React from "react";

const RegistrationPage: React.FC = () => {

    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();

    const [form] = Form.useForm<IRegister>();
    const setServerErrors = useFormServerErrors(form);

    const dispatch = useDispatch();

    const onFinish: FormProps<IRegister>['onFinish'] = async (values) => {
        try {
            const result = await register(values).unwrap() as IAuthResponse;
            dispatch(loginSuccess(result.token));
            navigate('/');
        } catch (error) {
            const serverError = error as ServerError;

            if (serverError?.status === 400 && serverError?.data?.errors) {
                setServerErrors(serverError.data.errors);
            } else {
                message.error("Сталася помилка при створенні акаунта");
            }
        }
    };

    return (
        <div className="min-h-[650px] flex items-center justify-center px-4">
            <div className="max-w-4xl bg-white dark:bg-gray-900  rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 animate-fade-in">
                {isLoading && <LoadingOverlay />}

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <h2 className="text-2xl font-semibold mb-6 text-center">Реєстрація</h2>
                    <div className="flex flex-col">
                            <Form.Item
                                label="Email"
                                name="Email"
                                rules={[{ required: true, message: 'Вкажіть email' }]}
                            >
                                <Input className="rounded-lg ..." />
                            </Form.Item>

                            <div className="flex gap-4">
                                <Form.Item name="FirstName" label="Ім'я" className="w-1/2" rules={[{ required: true, message: 'Вкажіть імʼя' }]}>
                                    <Input className="rounded-lg ..." />
                                </Form.Item>

                                <Form.Item name="LastName" label="Прізвище" className="w-1/2" rules={[{ required: true, message: 'Вкажіть прізвище' }]}>
                                    <Input className="rounded-lg ..." />
                                </Form.Item>
                            </div>

                            <div className="flex gap-4">
                                <Form.Item name="Password" label="Пароль" className="w-1/2" rules={[{ required: true, message: 'Вкажіть пароль' }]}>
                                    <Input.Password className="rounded-lg ..." />
                                </Form.Item>

                                <Form.Item name="ConfirmPassword" label="Підтвердження паролю" className="w-1/2" rules={[{ required: true, message: 'Підтвердіть пароль' }]}>
                                    <Input.Password className="rounded-lg ..." />
                                </Form.Item>
                            </div>

                            <div>
                                 <ImageUploadFormItem name="ImageFile" label="Фото" />
                            </div>


                            <button
                                type="submit"
                                className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded w-full mt-4 transition"
                            >
                                {isLoading ? 'Завантаження...' : 'Зареєструватися'}
                            </button>
                    </div>

                </Form>
            </div>
        </div>
    );
}

export default RegistrationPage;
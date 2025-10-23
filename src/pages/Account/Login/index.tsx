import {Link, useNavigate } from 'react-router-dom';
import { Form, type FormProps, Input } from 'antd';
import {type ILoginRequest, useLoginByGoogleMutation, useLoginMutation} from "../../../services/apiAccount.ts";
import React from "react";
import { useGoogleLogin } from '@react-oauth/google';
import LoadingOverlay from '../../../components/ui/loading/LoadingOverlay.tsx';


const LoginPage: React.FC = () => {
    const [login, {isLoading: isLoginLoading }] = useLoginMutation();
    const [loginByGoogle, { isLoading: isGoogleLoading }] = useLoginByGoogleMutation();


    //const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish: FormProps<ILoginRequest>["onFinish"] = async (values) => {
        try {
            await login(values).unwrap();
            navigate('/');
            // const { token } = response;
            // dispatch(loginSuccess(token));
            //
            // const user = getUserFromToken(token);
            // console.log("user", user);
            // if (!user || !user.roles.includes("Admin")) {
            //     navigate('/');
            // }
            // else {
            //     navigate('/admin/home');
            // }
        } catch (err) {
            console.log("error", err);
            alert("Login failed");
        }
    };

    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) =>
        {
            try {
                await loginByGoogle(tokenResponse.access_token).unwrap();
                // dispatch(loginSuccess(result.token));
                navigate('/');
            } catch (error) {

                console.log("User server error auth", error);
                // const serverError = error as ServerError;
                //
                // if (serverError?.status === 400 && serverError?.data?.errors) {
                //     // setServerErrors(serverError.data.errors);
                // } else {
                //     message.error("Сталася помилка при вході");
                // }
            }
        },
    });




    return (
            <div className="min-h-[650px] flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800 animate-fade-in">
                {(isLoginLoading || isGoogleLoading)  && <LoadingOverlay />}

                <h2 className="text-2xl font-semibold mb-6 text-center">Вхід</h2>
                <Form<ILoginRequest>
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item<ILoginRequest>
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Enter your email" }]}
                    >
                        <Input type="email" placeholder="you@example.com" />
                    </Form.Item>

                    <Form.Item<ILoginRequest>
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Enter your password" }]}
                    >
                        <Input.Password placeholder="••••••••" />
                    </Form.Item>

                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                    >
                        {isLoginLoading ? 'Logging in...' : 'Увійти'}
                    </button>


                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            loginUseGoogle();
                        }}
                        className="flex items-center justify-center gap-2 bg-white
                         text-gray-700 border border-gray-300 hover:shadow-md
                         transition px-4 py-2 rounded w-full mt-4 font-medium"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Увійти через Google
                    </button>


                    <Link to="/forgot-password" className="block mt-3">Забули пароль?</Link>
                </Form>
            </div>
        </div>


    );
};

export default LoginPage;

import React from "react";
import {Button, Form, Input, Select} from "antd";
import type {IUserUpdateModel} from "../../../../services/types.ts";
import {useNavigate, useParams} from "react-router";
import Swal from 'sweetalert2';
import LoadingOverlay from "../../../../components/ui/loading/LoadingOverlay.tsx";
import ImageUploadFormItem from "../../../../components/ui/form/ImageUploadFormItem.tsx";
import {Helmet} from "react-helmet-async";
import {useGetUserByIdQuery, useUpdateUserMutation} from "../../../../services/apiUser.ts";


const UsersEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm<IUserUpdateModel>();
    const { data: user,isLoading: isLoadingUser, isError: isErrorUser } = useGetUserByIdQuery(Number(id));
    const [updateUser,{ isLoading: isLoadingEdit }] = useUpdateUserMutation();



    // @ts-ignore
    const onFinish: FormProps<IUserUpdateModel>['onFinish'] = async (values) => {
        try {
            console.log('Submit Form:', values);
            const fullName = `${values.firstName} ${values.lastName}`.trim();
            await updateUser({ ...values, fullName });
            await Swal.fire({
                icon: 'success',
                title: 'Успіх',
                text: 'Користувача успішно оновлено!',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/admin/users');
        } catch (e) {
            await Swal.fire({
                icon: 'error',
                title: 'Помилка',
                text: 'Не вдалося оновити користувача. Перевірте введені дані.',
            });
            console.error("Помилка оновлення користувача", e);
        }
    }


    const transformedUser = React.useMemo(() => {
        if (!user) return undefined;

        const parts = user.fullName.trim().split(' ');
        const firstName = parts[0] || '';
        const lastName = parts.slice(1).join(' ') || '';

        return {
            ...user,
            firstName,
            lastName,
        };
    }, [user]);


    if (isLoadingUser) return <p>Завантаження користувача...</p>;
    if (isErrorUser || !user) return <p>Категорія не знайдена.</p>;

    return(
        <>
            <Helmet>
                <title>Редагування категорії | Адмін панель</title>
            </Helmet>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                <div className="max-w-full overflow-x-auto">
                    {(isLoadingEdit) && <LoadingOverlay />}
                    <h1 className="text-2xl font-bold mb-6 text-center">Редагування користувача</h1>

                    <Form form={form}
                          labelCol={{span: 7}}
                          wrapperCol={{span: 10}}
                          onFinish={onFinish}
                          layout="horizontal"
                          initialValues={transformedUser}
                    >

                        {/* Ховаємо id у формі, бо потрібен для API, але не відображаємо */}
                        <Form.Item name="id" noStyle>
                            <Input type="hidden" />
                        </Form.Item>

                        <Form.Item<IUserUpdateModel>
                            label="Назва"
                            name="firstName"
                            rules={[{ required: true, message: "Вкажіть ім'я користувача" }]}>
                            <Input placeholder="Вкажіть ім'я користувача" />
                        </Form.Item>

                        <Form.Item<IUserUpdateModel>
                            label="Прізвище"
                            name="lastName"
                            rules={[{ required: true, message: "Вкажіть прізвище користувача" }]}>
                            <Input placeholder="Вкажіть прізвище користувача" />
                        </Form.Item>

                        <Form.Item<IUserUpdateModel>
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Вкажіть email'}]}>
                            <Input placeholder="Введіть email"/>
                        </Form.Item>

                        <ImageUploadFormItem name="image" label="Нове фото" />

                        <Form.Item<IUserUpdateModel>
                            label="Ролі"
                            name="roles"
                            rules={[{ required: true, message: "Оберіть ролі" }]}
                        >
                            <Select mode="multiple" placeholder="Оберіть ролі">
                                <Select.Option value="Admin">Admin</Select.Option>
                                <Select.Option value="User">User</Select.Option>
                            </Select>
                        </Form.Item>


                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Оновити
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </>
    );
}

export default UsersEditPage;
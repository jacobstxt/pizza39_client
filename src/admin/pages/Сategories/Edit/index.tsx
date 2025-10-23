import React from "react";
import {Button, Form, Input} from "antd";
import type {ICategoryEdit} from "../../../../services/types.ts";
import {useGetCategoryByIdQuery, useUpdateCategoryMutation} from "../../../../services/apiCategory.ts";
import {useNavigate, useParams} from "react-router";
import Swal from 'sweetalert2';
import LoadingOverlay from "../../../../components/ui/loading/LoadingOverlay.tsx";
import ImageUploadFormItem from "../../../../components/ui/form/ImageUploadFormItem.tsx";
import {Helmet} from "react-helmet-async";


const CategoriesEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm<ICategoryEdit>();
    const { data: category,isLoading: isLoadingCategory, isError: isErrorCategory } = useGetCategoryByIdQuery(Number(id));
    const [updateCategory,{ isLoading: isLoadingEdit }] = useUpdateCategoryMutation();



    // @ts-ignore
    const onFinish: FormProps<ICategoryEdit>['onFinish'] = async (values) => {
        try {
            console.log('Submit Form:', values);
            await updateCategory(values).unwrap();
            await Swal.fire({
                icon: 'success',
                title: 'Успіх',
                text: 'Категорію успішно оновлено!',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/admin/categories');
        } catch (e) {
            await Swal.fire({
                icon: 'error',
                title: 'Помилка',
                text: 'Не вдалося оновити категорію. Перевірте введені дані.',
            });
            console.error("Помилка оновлення категорії", e);
        }
    }

    if (isLoadingCategory) return <p>Завантаження категорії...</p>;
    if (isErrorCategory || !category) return <p>Категорія не знайдена.</p>;

    return(
        <>
            <Helmet>
                <title>Редагування категорії | Адмін панель</title>
            </Helmet>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                <div className="max-w-full overflow-x-auto">
                    {(isLoadingEdit) && <LoadingOverlay />}
                    <h1 className="text-2xl font-bold mb-6 text-center">Редагування категорії</h1>

                    <Form form={form}
                        labelCol={{span: 7}}
                          wrapperCol={{span: 10}}
                          onFinish={onFinish}
                          layout="horizontal"
                          initialValues={category}
                    >

                        {/* Ховаємо id у формі, бо потрібен для API, але не відображаємо */}
                        <Form.Item name="id" noStyle>
                            <Input type="hidden" />
                        </Form.Item>

                        <Form.Item<ICategoryEdit>
                            label="Назва"
                            name="name"
                            rules={[{ required: true, message: "Вкажіть назву категорії" }]}>
                            <Input placeholder="Введіть назву категорії" />
                        </Form.Item>

                        <Form.Item<ICategoryEdit>
                            label="Слаг"
                            name="slug"
                            rules={[{required: true, message: 'Вкажіть слаг категорії'}]}>
                            <Input placeholder="Введіть слаг категорії"/>
                        </Form.Item>

                        <ImageUploadFormItem name="ImageFile" label="Нове фото" />

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

export default CategoriesEditPage;
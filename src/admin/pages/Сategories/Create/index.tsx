import {Button, Form, type FormProps, Input} from "antd";
import type {ICategoryCreate} from "../../../../services/types.ts";
import { useCreateCategoryMutation } from "../../../../services/apiCategory.ts";
import Swal from 'sweetalert2';
import React from "react";
import LoadingOverlay from "../../../../components/ui/loading/LoadingOverlay.tsx";
import {useNavigate} from "react-router";
import ImageUploadFormItem from "../../../../components/ui/form/ImageUploadFormItem.tsx";
import {Helmet} from "react-helmet-async";

const CategoriesCreatePage: React.FC = () => {
    const [createCategory, {isLoading}] = useCreateCategoryMutation();
    const navigate = useNavigate();

    const onFinish: FormProps<ICategoryCreate>['onFinish'] =  async  (values) => {
        try {
            console.log('Submit Form:', values);
            await createCategory(values).unwrap();
            await Swal.fire({
                icon: 'success',
                title: 'Успіх',
                text: 'Категорію успішно створено!',
                timer: 2000,
                showConfirmButton: false,
            })
            navigate('/admin/categories');
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Помилка',
                text: 'Не вдалося створити категорію. Перевірте введені дані.',
            })
        }
    }



    return (
      <>
          <Helmet>
              <title>Створення категорії | Адмін панель</title>
          </Helmet>
        <div
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="max-w-full overflow-x-auto">
                {isLoading && <LoadingOverlay></LoadingOverlay>}
                <h1 className="text-2xl font-bold mb-6 text-center">Додати категорію</h1>
                <Form labelCol={{span: 7}}
                wrapperCol={{span: 10}}
                onFinish={onFinish}
                layout="horizontal">

                    <Form.Item<ICategoryCreate>
                        label="Назва"
                        name="name"
                        rules={[{ required: true, message: "Вкажіть назву категорії" }]}>
                        <Input placeholder="Введіть назву категорії" />
                    </Form.Item>

                <Form.Item<ICategoryCreate>
                    label="Слаг"
                    name="slug"
                    rules={[{required: true, message: 'Вкажіть слаг категорії'}]}>
                    <Input placeholder="Введіть слаг категорії"/>
                </Form.Item>

                    <ImageUploadFormItem name="ImageFile" label="Фоточка" />

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Додати
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
      </>
    );
}

export default CategoriesCreatePage;
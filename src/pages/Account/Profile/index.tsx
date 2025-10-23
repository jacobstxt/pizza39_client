import {Pencil, ShoppingBag} from "lucide-react";
import {useAppSelector} from "../../../store";
import {APP_ENV} from "../../../env";
import {useNavigate} from "react-router";

const ProfilePage = () => {
    const { user } = useAppSelector((state) => state.auth);
    const  navigate = useNavigate();

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
            {/* Аватар */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={`${APP_ENV.IMAGES_400_URL}${user?.image}`}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full border-2 border-white shadow-sm"
                />
                <h1 className="text-2xl font-bold mt-3">{user?.name}</h1>
                <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>

            {/* Інформація */}
            <div className="space-y-4">
                <div>
                    <strong className="text-gray-700">Ім'я:</strong> {user?.name}
                </div>
                <div>
                    <strong className="text-gray-700">Email:</strong> {user?.email}
                </div>
            </div>


            <button
                className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
                <Pencil size={18} />
                Редагувати профіль
            </button>

            <button
                onClick={() => navigate("/order-history")}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >

                <ShoppingBag size={18} />
                Мої замовлення
            </button>
        </div>
    );
};

export default ProfilePage;

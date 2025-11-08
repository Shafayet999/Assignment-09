import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayout from "../Layouts/MainLayout";
import Services from "../Pages/Services";
import MyProfile from "../Pages/MyProfile";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ServiceDetails from "../Pages/ServiceDetails";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "../Pages/ForgetPass";
import Loading from "../Components/Loading";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout></MainLayout>,
            children: [
                {
                    path: "",
                    element: <Home></Home>,
                    loader: () => fetch("/ApiData.json"),
                    hydrateFallbackElement : <Loading> </Loading>
                },
                {
                    path: "/Services",
                    element: <Services></Services>
                },
                {
                    path: "/services/:serviceId",
                    element: (
                        <PrivateRoute>
                            <ServiceDetails />
                        </PrivateRoute>
                    ),
                    loader: () => fetch("/ApiData.json"),hydrateFallbackElement : <Loading> </Loading>
                },
                {
                    path: "/MyProfile",
                    element: <PrivateRoute>
                        <MyProfile />
                    </PrivateRoute>
                },
                
            ]
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            children: [
                {
                    path: '/auth/login', element: <Login></Login>
                },
                {
                    path: '/auth/register', element: <Register></Register>
                },
                {
                    path: '/auth/forget-password',
                    element: <ForgetPassword />
                }

            ]
        },
        {
            path: '/*',
            element: <h1 className="text-center text-5xl font-bold mt-49">Error 404, optional Page</h1>
        },

    ]
);
export default router;
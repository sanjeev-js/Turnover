import { Navigate, useRoutes } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Interest from "../components/Interest";

export const LoggedInRouter = () =>
    useRoutes([
        {
            path: "/",
            children: [
                { path: "*", element: <Navigate to="user-interest" replace /> },
                { path: "user-interest", element: <Interest /> },
            ]
        },
    ])

export const LoggedOutRouter = () =>
    useRoutes([
        {
            path: "/",
            children: [
                { path: "login", element: <Login /> },
                { path: 'signup', element: <Signup /> },
                { path: '/', element: <Navigate to="/login" /> },
            ]
        },
    ]);

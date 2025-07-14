import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

export default function PrivateRoute() {
    const token = useSelector((state: RootState) => state.auth.token);
    return token ? <Outlet /> : <Navigate to="/login" />
}
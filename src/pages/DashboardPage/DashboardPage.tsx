import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import axios from "axios";
import { useEffect } from "react";

export default function DashboardPage() {

    const token = useSelector((state: RootState) => state.auth.token);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('http://localhost:3000/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(res.data);
        };
        fetchUser();
    }, [token]);

    return (
        <>
            <p>DashboardPage works</p>
        </>
    );
}
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout as logoutAction, selectCurrentUser, selectIsAuthenticated } from "../../slices/authSlice";
import type { User } from "../../interfaces/User";

export default function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser: any = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const menuData = [
        { label: "Home", path: "/", visible: true },
        { label: "Dashboard", path: "/dashboard", visible: isAuthenticated },
        { label: "Settings", path: "/settings", visible: isAuthenticated },
    ];

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/');
    };
    
    return (
        <header className="flex items-center justify-between p-3 bg-blue-700 w-full text-white mt-0 sticky top-0">
            <span className="nav-title" style={{ fontWeight: 800, fontSize: "1.4rem" }}>AccessManager</span>
            <div className="flex justify-center p-2 mx-2">
                <nav>
                    {menuData.filter(l => l.visible).map((e, i) => {
                        return (
                            <Link key={i} to={e.path} 
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-400 hover:text-white">
                                {e.label}
                            </Link>
                        )}
                    )}
                </nav>
            </div>
            {currentUser ? (
                <div className="flex ml-auto mr-0 items-center gap-4 text-white">
                    <span className="user-name">Logged as: <strong>{currentUser.name}</strong></span>
                    <button className="cursor-pointer px-4 py-2 button rounded bg-gray-200 hover:bg-gray-300 text-blue-800 font-bold" onClick={() => handleLogout()}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className="float-right ml-auto">
                    <button onClick={() => navigate('/login')} className={'cursor-pointer px-4 py-2 button rounded bg-gray-200 hover:bg-gray-300 text-blue-800 font-bold'}>Login</button>
                </div>
            )}
        </header>
    );
};
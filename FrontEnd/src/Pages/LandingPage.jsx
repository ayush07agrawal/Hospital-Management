import { Outlet } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className={`h-screen transition-all duration-500 ${0 ? 'bg-gradient-to-b from-green-950 to-black' : 'bg-gradient-to-b from-amber-100 to-white'}`}>
            <Outlet />
        </div>
    );
}
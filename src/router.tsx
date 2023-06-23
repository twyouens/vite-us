import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import AboutPage from "./pages/about.page";

const AppRouter = () => {
    return(
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about-us">About Us</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;
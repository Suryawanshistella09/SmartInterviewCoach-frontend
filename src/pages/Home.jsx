import { useNavigate } from "react-router-dom";
import "./Home.css";
import heroImage from "../assets/smart-interview-coach-hero-image.png";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">

            {/* TOP PURPLE LINE */}
            <div className="top-line"></div>

            {/* NAVBAR */}
            <header className="home-navbar">

                <div className="home-logo">
                    <div className="logo-box">SC</div>

                    <span>Smart Interview Coach</span>
                </div>

                <div className="home-nav-buttons">

                    <button
                        className="login-link"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="get-started-nav"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>

                </div>

            </header>


            {/* HERO SECTION */}
            <section className="hero-section">

                {/* LEFT CONTENT */}
                <div className="hero-content">

                    <h1>
                        Prepare Smarter.
                        <br />

                        <span>Practice Better.</span>
                        <br />

                        Perform with Confidence.
                    </h1>


                    <p>
                        Your personal interview preparation and
                        performance analysis platform.
                    </p>


                    <div className="hero-buttons">

                        <button
                            className="hero-get-started"
                            onClick={() => navigate("/register")}
                        >
                            Get Started
                            <span className="arrow">→</span>
                        </button>


                        <button
                            className="hero-login"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                    </div>

                </div>


                {/* RIGHT IMAGE */}
                <div className="hero-visual">

                    <img
                        src={heroImage}
                        alt="Smart Interview Coach"
                    />

                </div>

            </section>


            {/* FOOTER */}
            <footer className="home-footer">

                <div className="footer-brand">

                    <div className="footer-logo">
                        SC
                    </div>

                    <span>
                        Smart Interview Coach
                    </span>

                </div>


                <div className="footer-center">

                    <strong>
                        Prepare. Practice. Improve.
                    </strong>

                    <span>
                        Smart Interview Coach
                    </span>

                </div>


                <div className="footer-copy">

                    © 2026 Smart Interview Coach.
                    <br />

                    All rights reserved.

                </div>

            </footer>

        </div>
    );
}

export default Home;
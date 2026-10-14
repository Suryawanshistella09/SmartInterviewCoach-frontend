import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function useProgressSummary() {
    const navigate = useNavigate();
    const requestInProgress = useRef(false);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const refresh = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setSummary(null);
            setError("Progress statistics are unavailable. Please sign in again.");
            setLoading(false);
            navigate("/login");
            return;
        }

        if (requestInProgress.current) {
            return;
        }

        requestInProgress.current = true;
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/api/progress/summary/me");
            setSummary(response.data);
        } catch (requestError) {
            console.error("Error loading progress summary:", requestError);
            setSummary(null);

            if (requestError.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setError("Progress statistics could not be loaded.");
            }
        } finally {
            requestInProgress.current = false;
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        const refreshWhenVisible = () => {
            void refresh();
        };

        void refresh();
        window.addEventListener("focus", refreshWhenVisible);
        window.addEventListener("pageshow", refreshWhenVisible);

        return () => {
            window.removeEventListener("focus", refreshWhenVisible);
            window.removeEventListener("pageshow", refreshWhenVisible);
        };
    }, [refresh]);

    return { summary, loading, error };
}

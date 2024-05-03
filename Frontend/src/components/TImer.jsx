import React, { useState, useEffect } from "react";

function Timer() {
    const [remainingTime, setRemainingTime] = useState(getRemainingTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function getRemainingTime() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0); // set to midnight

        return midnight - now;
    }

    function formatTime(time) {
        const hours = Math.floor(
            (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    return (
        <div>
            <p>Time remaining: {formatTime(remainingTime)}</p>
        </div>
    );
}

export default Timer;

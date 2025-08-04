import { CountAnimationContext } from "./countAnimationContext";
import { useState } from "react";


const CountAnimationProvider = ({ children }) => {
    const [counts, setCounts] = useState({});

    const animateCount = (key, value, duration = 2000) => {
        let start = 0;
        const stepTime = 10;
        const increment = value / (duration / stepTime);

        setCounts((prev) => ({ ...prev, [key]: 0 }));

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                start = value;
                clearInterval(timer);
            }
            setCounts((prev) => ({
                ...prev,
                [key]: Math.floor(start),
            }));
        }, stepTime);
    };

    return (
        <CountAnimationContext.Provider value={{ counts, animateCount }}>
            {children}
        </CountAnimationContext.Provider>
    )
}

export default CountAnimationProvider;
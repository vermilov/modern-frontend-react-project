import React, { useState, useEffect } from "react";

function useOffline() {
    const [isOffline, setIsOffline] = useState(false);

    function onOffline() {
        setIsOffline(true);
    }

    function onOnline() {
        setIsOffline(false);
    }

    useEffect(() => {
        window.addEventListener("offline", onOffline);
        window.addEventListener("online", onOnline);

        return () => {
            window.removeEventListener("offline", onOffline);
            window.removeEventListener("online", onOnline);
        };
    }, []);

    return isOffline;
}

export default function DeviceStatus() {
    const isOffline = useOffline();

    if (isOffline) {
        return <p>Sorry, you are offline...</p>;
    }

    return <p>You are online!</p>;
}

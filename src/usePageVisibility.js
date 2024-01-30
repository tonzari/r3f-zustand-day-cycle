import { useEffect } from 'react';

export function usePageVisibility(onVisible, onHidden) {
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                onHidden();
            } else {
                onVisible();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [onVisible, onHidden]);
}

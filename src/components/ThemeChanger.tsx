import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';

export const ThemeChanger = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div>
            <button
                onClick={() => {
                    setTheme('light');
                    toast.success(`The current theme is light`);
                }}
            >
                Light Mode
            </button>
            <button
                onClick={() => {
                    setTheme('dark');
                    toast.success(`The current theme is dark`);
                }}
            >
                Dark Mode
            </button>
        </div>
    );
};

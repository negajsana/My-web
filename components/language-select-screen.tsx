// Assuming the language detection and redirect logic has some structure, let's make the required changes here.

// Import necessary libraries
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LanguageSelectScreen = () => {
    const router = useRouter();
    const { pathname, query } = router;

    useEffect(() => {
        // Detect the language only on the root path
        if (pathname === '/') {
            // Logic for language detection
            const userLang = navigator.language || navigator.userLanguage;
            const langPrefix = userLang.split('-')[0]; // Get the language code

            // Check if there is an existing language in the URL
            const existingLang = query.lang;
            if (!existingLang) {
                // If no existing language, redirect to root with detected language
                router.push(`/${langPrefix}`);
            }
        }
        // If the URL has a language prefix, we respect it and do not redirect.
    }, [pathname]);

    return (
        <div>
            {/* Language selection components go here */}
            <h1>Select Language</h1>
        </div>
    );
};

export default LanguageSelectScreen;

export const theme = {
    extend: {
        animation: {
            'fade-in': 'fadeIn 1s ease-in-out',
            'fade-in-up': 'fadeInUp 1s ease-in-out',
            'fade-in-down': 'fadeInDown 1s ease-in-out',
        },
        keyframes: {
            fadeIn: {
                from: { opacity: 0 },
                to: { opacity: 1 },
            },
            fadeInUp: {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
            },
            fadeInDown: {
                from: { opacity: 0, transform: 'translateY(-20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
            },
        },
    },
};

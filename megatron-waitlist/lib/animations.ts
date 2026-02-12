// Reusable animation configurations for Framer Motion
export const animations = {
    // Fade in from bottom
    fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] as const },
    },

    // Scale and fade
    scaleIn: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] as const },
    },

    // Stagger children
    stagger: {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    },

    // Liquid morph
    liquidMorph: {
        animate: {
            scale: [1, 1.05, 1],
            borderRadius: ["60% 40% 30% 70%", "30% 60% 70% 40%", "60% 40% 30% 70%"],
        },
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },

    // Glow pulse
    glowPulse: {
        animate: {
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.02, 1],
        },
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },

    // Spring bounce
    springBounce: {
        type: "spring",
        stiffness: 300,
        damping: 20,
    },
};

// Easing functions
export const easings = {
    smooth: [0.4, 0.0, 0.2, 1] as const,
    snappy: [0.4, 0.0, 0.6, 1] as const,
    bouncy: [0.68, -0.55, 0.265, 1.55] as const,
};

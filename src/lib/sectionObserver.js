export const createSectionObserver = (sections, onObserve, threshold = 0.5) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && onObserve) {
                    onObserve(entry.target);
                }
            });
        },
        { threshold }
    );

    sections.forEach((section) => {
        if (section) {
            observer.observe(section);
        }
    });

    return observer;
};

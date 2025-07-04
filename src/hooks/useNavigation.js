import { useRouter } from 'next/navigation';

export const useNavigation = () => {
    const router = useRouter();

    const navigateTo = (path) => {
        router.push(path);
    };

    const navigateToHome = () => {
        router.push('/');
    };

    const navigateToAbout = () => {
        // Scroll to about section if on home page, otherwise navigate to home with hash
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
            setTimeout(() => {
                const element = document.getElementById('about');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            router.push('/#about');
        }
    };

    const navigateToPrograms = () => {
        // Scroll to programs section if on home page, otherwise navigate to home with hash
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
            setTimeout(() => {
                const element = document.getElementById('programs');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            router.push('/#programs');
        }
    };

    const navigateToContact = () => {
        // Scroll to contact section if on home page, otherwise navigate to home with hash
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
            setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            router.push('/#contact');
        }
    };

    const navigateToGallery = () => {
        // Scroll to gallery section if on home page, otherwise navigate to home with hash
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
            setTimeout(() => {
                const element = document.getElementById('gallery');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            router.push('/#gallery');
        }
    };

    const navigateToDonate = () => {
        router.push('/donate');
    };

    const navigateToRegister = () => {
        router.push('/register');
    };

    const navigateToMemberRegister = () => {
        router.push('/member/register');
    };

    const handleSmoothScroll = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return {
        navigateTo,
        navigateToHome,
        navigateToAbout,
        navigateToPrograms,
        navigateToContact,
        navigateToGallery,
        navigateToDonate,
        navigateToRegister,
        navigateToMemberRegister,
        handleSmoothScroll
    };
};

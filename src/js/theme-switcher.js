document.addEventListener('DOMContentLoaded', () => {
    const themeDots = document.querySelectorAll('.theme-dot');
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    const hamburgerIcon = document.querySelector('.hamburger');
    
    function updateTheme(theme) {
        document.body.classList.toggle('cyber-theme', theme === 'cyber');
        
        if (hamburgerIcon) {
            hamburgerIcon.classList.add('switching');
            
            // Проверяем, находимся ли мы на главной странице
            const isMainPage = window.location.pathname.endsWith('index.html') || 
                             window.location.pathname.endsWith('/');
            
            // Используем разные пути в зависимости от страницы
            const imagePath = isMainPage ? 'src/images/' : '../images/';
            
            setTimeout(() => {
                hamburgerIcon.src = theme === 'cyber' 
                    ? `${imagePath}skufface.ico` 
                    : `${imagePath}logo.ico`;
            }, 250);
            
            setTimeout(() => {
                hamburgerIcon.classList.remove('switching');
            }, 500);
        }
    }

    updateTheme(savedTheme);
    
    themeDots.forEach(dot => {
        if (dot.dataset.theme === savedTheme) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
            const theme = dot.dataset.theme;
            
            themeDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            updateTheme(theme);
            localStorage.setItem('selectedTheme', theme);
        });
    });
});
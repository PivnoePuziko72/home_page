document.addEventListener('DOMContentLoaded', () => {
    const themeDots = document.querySelectorAll('.theme-dot');
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    const hamburgerIcon = document.querySelector('.hamburger');
    
    function updateTheme(theme) {
        document.body.classList.toggle('cyber-theme', theme === 'cyber');
        
        if (hamburgerIcon) {
            hamburgerIcon.classList.add('switching');
            
            // Меняем иконку на середине анимации
            setTimeout(() => {
                hamburgerIcon.src = theme === 'cyber' ? 'images/skufface.ico' : 'images/logo.ico';
            }, 250);
            
            // Удаляем класс анимации после её завершения
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
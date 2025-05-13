document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown');
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    // Función para activar items
    function activateLink(link) {
        // Resetear todos
        navLinks.forEach(l => l.classList.remove('active'));
        dropdowns.forEach(d => d.classList.remove('active', 'has-active-child'));
        
        // Activar elemento clickeado
        link.classList.add('active');
        
        // Activar padres si es subitem
        let parentMenu = link.closest('.submenu');
        while (parentMenu) {
            const parentItem = parentMenu.parentElement;
            parentItem.classList.add('has-active-child', 'active');
            
            // Activar también el enlace del padre
            const parentLink = parentItem.querySelector('> .nav-link');
            if (parentLink) parentLink.classList.add('active');
            
            parentMenu = parentItem.closest('.submenu');
        }
    }

    // Event listeners para los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            activateLink(this);
            
            // Cerrar menú en móvil después de hacer clic
            if (window.innerWidth <= 768) {
                menu.classList.remove('active');
                
                // Si es un dropdown, alternar submenú
                const dropdown = this.closest('.dropdown');
                if (dropdown) {
                    const submenu = dropdown.querySelector('.submenu');
                    if (submenu) {
                        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                    }
                }
            }
        });
    });

    // Activar según URL al cargar
    const currentLink = document.querySelector(`.nav-link[href="${window.location.hash}"]`) || 
                      document.querySelector('.nav-link[href="#inicio"]');
    if (currentLink) activateLink(currentLink);

    // Manejar hover para menús desplegables (solo en desktop)
    if (window.innerWidth > 768) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
                const submenu = this.querySelector('.submenu');
                if (submenu) submenu.style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
                const submenu = this.querySelector('.submenu');
                if (submenu) submenu.style.display = 'none';
            });
        });
    }
    
    // Manejar clic en hamburguesa
    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic fuera en móviles
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
                menu.classList.remove('active');
            }
        }
    });
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Restaurar menú en desktop
            menu.style.display = 'flex';
            menu.classList.remove('active');
            
            // Ocultar todos los submenús
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.style.display = 'none';
            });
        } else {
            // Ocultar menú en móvil si no está activo
            if (!menu.classList.contains('active')) {
                menu.style.display = 'none';
            }
        }
    });
});
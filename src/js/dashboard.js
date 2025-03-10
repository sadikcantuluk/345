/**
 * Dashboard JavaScript işlevselliği
 */

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initUserMenu();
    initResponsive();
});

/**
 * Sidebar işlevselliği
 */
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const body = document.body;
    
    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth >= 768) {
            // Desktop davranışı
            body.classList.toggle('sidebar-collapsed');
        } else {
            // Mobil davranışı
            body.classList.toggle('sidebar-active');
            
            // Overlay oluştur ve yönet
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
                
                overlay.addEventListener('click', () => {
                    body.classList.remove('sidebar-active');
                    overlay.style.display = 'none';
                });
            }
            overlay.style.display = body.classList.contains('sidebar-active') ? 'block' : 'none';
        }
    });
}

/**
 * Kullanıcı menüsü işlevselliği
 */
function initUserMenu() {
    const userMenu = document.getElementById('user-menu');
    const userMenuButton = userMenu.querySelector('button');
    
    // Dropdown menüyü oluştur
    const dropdown = document.createElement('div');
    dropdown.className = 'user-menu-dropdown mt-2 py-2';
    dropdown.innerHTML = `
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <i class="fas fa-user mr-2"></i> Profil
        </a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <i class="fas fa-cog mr-2"></i> Ayarlar
        </a>
        <hr class="my-2 border-gray-200">
        <a href="login.html" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
            <i class="fas fa-sign-out-alt mr-2"></i> Çıkış Yap
        </a>
    `;
    userMenu.appendChild(dropdown);
    
    // Tıklama olayını yönet
    userMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    // Dışarı tıklandığında menüyü kapat
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });
}

/**
 * Responsive davranış
 */
function initResponsive() {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    function handleResize(e) {
        const body = document.body;
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (e.matches) {
            // Desktop görünümüne geç
            body.classList.remove('sidebar-active');
            if (overlay) {
                overlay.style.display = 'none';
            }
        } else {
            // Mobil görünümüne geç
            body.classList.remove('sidebar-collapsed');
        }
    }
    
    mediaQuery.addListener(handleResize);
    handleResize(mediaQuery);
} 
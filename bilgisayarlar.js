document.addEventListener('DOMContentLoaded', function() {
    const authLink = document.querySelector('.form a[href="javascript:void(0)"]');
    const authModal = document.getElementById('authModal');
    const closeBtn = document.querySelector('.close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Modal açma
    authLink.addEventListener('click', () => {
        authModal.style.display = 'block';
    });

    // Modal kapatma
    closeBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    // Tab değiştirme
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Form gönderme
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Giriş işlemleri burada yapılacak
        console.log('Giriş yapılıyor...');
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Kayıt işlemleri burada yapılacak
        console.log('Kayıt yapılıyor...');
    });
}); 
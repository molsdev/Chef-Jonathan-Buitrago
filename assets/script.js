document.addEventListener('DOMContentLoaded', function() {

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('button[onclick="toggleMobileMenu()"]');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu on link click
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    for (const link of mobileMenuLinks) {
        link.addEventListener('click', function() {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Reservation form functionality
    const reservationType = document.getElementById('reservation-type');
    const courseSelection = document.getElementById('course-selection');
    const advisorySelection = document.getElementById('advisory-selection');
    const eventSelection = document.getElementById('event-selection');

    if (reservationType) {
        reservationType.addEventListener('change', function() {
            if (this.value === 'curso') {
                courseSelection.style.display = 'block';
                advisorySelection.style.display = 'none';
                eventSelection.style.display = 'none';
            } else if (this.value === 'asesoria') {
                courseSelection.style.display = 'none';
                advisorySelection.style.display = 'block';
                eventSelection.style.display = 'none';
            } else if (this.value === 'evento') {
                courseSelection.style.display = 'none';
                advisorySelection.style.display = 'none';
                eventSelection.style.display = 'block';
            } else {
                courseSelection.style.display = 'none';
                advisorySelection.style.display = 'none';
                eventSelection.style.display = 'none';
            }
        });
    }

    const idTypeSelect = document.getElementById('reservation-idtype');
    const otherIdTypeContainer = document.getElementById('other-idtype-container');

    if (idTypeSelect) {
        idTypeSelect.addEventListener('change', function() {
            if (this.value === 'otro') {
                otherIdTypeContainer.style.display = 'block';
                document.getElementById('other-idtype').setAttribute('required', 'required');
            } else {
                otherIdTypeContainer.style.display = 'none';
                document.getElementById('other-idtype').removeAttribute('required');
            }
        });
    }
    
    const reservationForm = document.getElementById('reservation-form');
    if(reservationForm){
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const type = document.getElementById('reservation-type').value;
            const date = document.getElementById('reservation-date').value;
            const message = document.getElementById('reservation-message').value;
            const messageDisplay = document.getElementById('reservation-message-display');

            if (!type || !date) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }

            // Simulación de envío de reserva
            console.log('Reserva enviada:', { type, date, message });
            messageDisplay.classList.remove('hidden');
            setTimeout(() => {
                messageDisplay.classList.add('hidden');
                event.target.reset();
                if(courseSelection) courseSelection.style.display = 'none';
                if(advisorySelection) advisorySelection.style.display = 'none';
            }, 3000);
        });
    }


    // Scroll reveal animation
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // Formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Verificar credenciales de administrador
            if ((email === 'juandachacon56@gmail.com' || email === 'edwinalexandermolinasanabria@gmail.com') && password === '1234') {
                // admin pages live under views/admin/
                window.location.href = 'views/admin/admin.html';
            } else {
                // Simulación de login normal -> user pages under views/user/
                window.location.href = 'views/user/miembros.html';
            }
        });
    }

    // Formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulación de registro
            window.location.href = 'views/registro.html';
        });
    }

    // Formularios de administración
    const adminForms = [
        'create-user-form', 'modify-user-form', 'inactivate-user-form',
        'register-inscription-form', 'modify-inscription-form', 'cancel-inscription-form',
        'create-service-form', 'modify-service-form', 'inactivate-service-form',
        'register-completion-form', 'generate-certificate-form', 'generate-invoice-form'
    ];

    adminForms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Operación realizada exitosamente (simulada).');
                form.reset();
            });
        }
    });

    // Funcionalidad de FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('svg');
            
            // Toggle visibility of answer
            answer.classList.toggle('hidden');
            
            // Rotate icon
            icon.classList.toggle('rotate-180');
        });
    });

    // Funcionalidad de filtrado de cursos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courses = document.querySelectorAll('.product-card[data-category]');
    
    if (filterButtons.length > 0 && courses.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase activa de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase activa al botón clickeado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                courses.forEach(course => {
                    if (filter === 'all' || course.getAttribute('data-category') === filter) {
                        course.style.display = 'block';
                    } else {
                        course.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Efecto de scroll solo para el header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

});

// Función para toggle del menú móvil
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Función para toggle de FAQ
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('svg');
    const isHidden = answer.classList.contains('hidden');

    // Close all other answers
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allIcons = document.querySelectorAll('.faq-question svg');

    allAnswers.forEach(ans => {
        if (ans !== answer) {
            ans.classList.add('hidden');
        }
    });

    allIcons.forEach(ic => {
        if (ic !== icon) {
            ic.classList.remove('rotate-180');
        }
    });

    // Toggle the clicked answer
    if (isHidden) {
        answer.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        answer.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// --- Dynamic table renderers for clients, sales and users ---
(function(){
    const STORAGE_KEY = 'chef_localDB_v1';

    function loadLocalDB(){
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            if(!raw) return { users: [], clients: [], sales: [], visits: [], services: [], inscriptions: [] };
            return JSON.parse(raw);
        }catch(e){
            console.error('Error parseando localDB:', e);
            return { users: [], clients: [], sales: [], visits: [], services: [], inscriptions: [] };
        }
    }

    function formatDate(iso){
        if(!iso) return '';
        try{ const d = new Date(iso); return d.toLocaleString(); }catch(e){ return iso; }
    }

    function renderUsers(){
        const tbody = document.getElementById('users-tbody');
        if(!tbody) return;
        const db = loadLocalDB();
        tbody.innerHTML = '';
        db.users.slice().reverse().forEach(u => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-gray-800';
            tr.innerHTML = `
                <td class="py-3 text-gray-400 text-sm">${u.id || ''}</td>
                <td class="py-3 text-white text-sm">${escapeHtml(u.name || '')}</td>
                <td class="py-3 text-gray-400 text-sm">${escapeHtml(u.email || '')}</td>
                <td class="py-3 text-gray-400 text-sm">${formatDate(u.createdAt)}</td>
                <td class="py-3"><span class="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs">Activo</span></td>
                <td class="py-3">
                    <div class="flex space-x-1">
                        <button data-id="${u.id}" class="btn-edit-user px-2 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 text-xs">Editar</button>
                        <button data-id="${u.id}" class="btn-delete-user px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs">Eliminar</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderClients(){
        const tbody = document.getElementById('clients-tbody');
        if(!tbody) return;
        const db = loadLocalDB();
        tbody.innerHTML = '';
        db.clients.slice().reverse().forEach(c => {
            const tr = document.createElement('tr');
            tr.className = 'border-t border-gray-700';
            const interestsArr = Array.isArray(c.interests) ? c.interests : (c.interests ? String(c.interests).split(',') : []);
            const chips = interestsArr.map(i => `<span class="px-2 py-1 bg-purple-900 text-purple-300 rounded-full text-xs">${escapeHtml(i)}</span>`).join(' ');
            tr.innerHTML = `
                <td class="p-4 text-gray-300">${c.id || ''}</td>
                <td class="p-4 text-white">${escapeHtml(c.name || '')}</td>
                <td class="p-4 text-gray-300">${escapeHtml(c.email || '')}</td>
                <td class="p-4 text-gray-300">${escapeHtml(c.phone || '')}</td>
                <td class="p-4 text-gray-300">${escapeHtml(c.city || '')}</td>
                <td class="p-4"><div class="flex flex-wrap gap-2">${chips}</div></td>
                <td class="p-4"><div class="flex space-x-2"><button data-id="${c.id}" class="btn-view-client text-amber-500 hover:text-amber-400">Ver</button><button data-id="${c.id}" class="btn-edit-client text-purple-500 hover:text-purple-400">Editar</button><button data-id="${c.id}" class="btn-delete-client text-red-500 hover:text-red-400">Eliminar</button></div></td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderSales(){
        const tbody = document.getElementById('sales-tbody');
        if(!tbody) return;
        const db = loadLocalDB();
        tbody.innerHTML = '';
        db.sales.slice().reverse().forEach(s => {
            const tr = document.createElement('tr');
            tr.className = 'border-t border-gray-700';
            tr.innerHTML = `
                <td class="p-4 text-gray-300">${s.id || ''}</td>
                <td class="p-4 text-gray-300">${formatDate(s.createdAt)}</td>
                <td class="p-4 text-white">${escapeHtml(s.client || '')}</td>
                <td class="p-4 text-gray-300">${escapeHtml(s.service || '')}</td>
                <td class="p-4 text-green-500">${s.amount ? ('$' + Number(s.amount).toLocaleString('es-CO')) : ''}</td>
                <td class="p-4"><span class="px-2 py-1 bg-green-900 text-green-300 rounded-full text-sm">Completada</span></td>
                <td class="p-4"><div class="flex space-x-2"><button data-id="${s.id}" class="btn-view-sale text-amber-500 hover:text-amber-400">Ver</button><button data-id="${s.id}" class="btn-edit-sale text-purple-500 hover:text-purple-400">Editar</button><button data-id="${s.id}" class="btn-delete-sale text-red-500 hover:text-red-400">Eliminar</button></div></td>
            `;
            tbody.appendChild(tr);
        });
    }

    function escapeHtml(str){
        if(!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Polling localStorage for changes and re-render tables when needed
    let lastSnapshot = '';
    function pollAndRender(){
        const raw = localStorage.getItem(STORAGE_KEY) || '';
        if(raw !== lastSnapshot){
            lastSnapshot = raw;
            try{ renderUsers(); }catch(e){}
            try{ renderClients(); }catch(e){}
            try{ renderSales(); }catch(e){}
        }
    }

    // Start polling every 1s
    setInterval(pollAndRender, 1000);
    // Initial render
    pollAndRender();

})();

// --- Immediate save helpers and form handlers (attach safely) ---
(function(){
    const STORAGE_KEY = 'chef_localDB_v1';

    function loadLocalDB(){
        try{ const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : { users: [], clients: [], sales: [], visits: [], services: [], inscriptions: [] }; }catch(e){ return { users: [], clients: [], sales: [], visits: [], services: [], inscriptions: [] }; }
    }

    function saveLocalDB(db){
        try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); }catch(e){ console.error('Error saving localDB', e); }
    }

    function ensureCollections(db){
        db.users = Array.isArray(db.users) ? db.users : [];
        db.clients = Array.isArray(db.clients) ? db.clients : [];
        db.sales = Array.isArray(db.sales) ? db.sales : [];
        db.visits = Array.isArray(db.visits) ? db.visits : [];
        db.services = Array.isArray(db.services) ? db.services : [];
        db.inscriptions = Array.isArray(db.inscriptions) ? db.inscriptions : [];
    }

    function formatCurrency(value){
        if(value === undefined || value === null || value === '') return '';
        const num = Number(value);
        if(isNaN(num)) return escapeHtml(String(value));
        return '$' + num.toLocaleString('es-CO');
    }

    function attachFormHandlers(){
        // Create user
        const userForm = document.getElementById('create-user-form');
        if(userForm && !userForm._bound){
            userForm.addEventListener('submit', function(e){
                e.preventDefault();
                const name = document.getElementById('user-name') ? document.getElementById('user-name').value.trim() : '';
                const email = document.getElementById('user-email') ? document.getElementById('user-email').value.trim() : '';
                const password = document.getElementById('user-password') ? document.getElementById('user-password').value : '';
                const db = loadLocalDB(); ensureCollections(db);
                const obj = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
                db.users = db.users || [];
                db.users.push(obj);
                saveLocalDB(db);
                console.log('Formulario (create-user-form) guardado en colección: users', obj);
                try{ if(typeof renderUsers === 'function') renderUsers(); }catch(e){}
                userForm.reset();
            });
            userForm._bound = true;
        }

        // New client
        const clientForm = document.getElementById('new-client-form');
        if(clientForm && !clientForm._bound){
            clientForm.addEventListener('submit', function(e){
                e.preventDefault();
                const name = document.getElementById('client-name') ? document.getElementById('client-name').value.trim() : '';
                const email = document.getElementById('client-email') ? document.getElementById('client-email').value.trim() : '';
                const phone = document.getElementById('client-phone') ? document.getElementById('client-phone').value.trim() : '';
                const city = document.getElementById('client-city') ? document.getElementById('client-city').value.trim() : '';
                const notes = document.getElementById('client-notes') ? document.getElementById('client-notes').value.trim() : '';
                // interests checkboxes
                const interestEls = document.querySelectorAll('input[name="interests"]');
                const interests = [];
                interestEls.forEach(i => { if(i.checked) interests.push(i.value); });

                const db = loadLocalDB(); ensureCollections(db);
                const obj = { id: Date.now(), name, email, phone, city, interests, notes, createdAt: new Date().toISOString() };
                db.clients = db.clients || [];
                db.clients.push(obj);
                saveLocalDB(db);
                console.log('Formulario (new-client-form) guardado en colección: clients', obj);
                try{ if(typeof renderClients === 'function') renderClients(); }catch(e){}
                clientForm.reset();
            });
            clientForm._bound = true;
        }

        // New sale
        const saleForm = document.getElementById('new-sale-form');
        if(saleForm && !saleForm._bound){
            saleForm.addEventListener('submit', function(e){
                e.preventDefault();
                const client = document.getElementById('sale-client') ? document.getElementById('sale-client').value.trim() : '';
                const service = document.getElementById('sale-service') ? document.getElementById('sale-service').value : '';
                const amount = document.getElementById('sale-amount') ? document.getElementById('sale-amount').value : '';
                const paymentMethod = document.getElementById('sale-payment') ? document.getElementById('sale-payment').value : '';
                const notes = document.getElementById('sale-notes') ? document.getElementById('sale-notes').value.trim() : '';

                const db = loadLocalDB(); ensureCollections(db);
                const obj = { id: Date.now(), client, service, amount, paymentMethod, notes, createdAt: new Date().toISOString() };
                db.sales = db.sales || [];
                db.sales.push(obj);
                saveLocalDB(db);
                console.log('Formulario (new-sale-form) guardado en colección: sales', obj);
                try{ if(typeof renderSales === 'function') renderSales(); }catch(e){}
                saleForm.reset();
            });
            saleForm._bound = true;
        }
    }

    // --- Validation helpers ---
    function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||'')); }
    function isPhone(v){ return /^[0-9+\s-]{7,20}$/.test(String(v||'')); }
    function isNumeric(v){ return !isNaN(Number(v)) && v !== ''; }

    // --- Edit/Delete event delegation ---
    document.addEventListener('click', function(e){
        const t = e.target;

        // Users
        if(t.matches('.btn-edit-user')){
            const id = t.getAttribute('data-id');
            const db = loadLocalDB(); if(!db) return;
            const idx = (db.users||[]).findIndex(x => String(x.id) === String(id));
            if(idx === -1) return alert('Usuario no encontrado');
            const user = db.users[idx];
            const name = prompt('Nombre:', user.name || '');
            if(name === null) return;
            const email = prompt('Email:', user.email || '');
            if(email === null) return;
            if(!name.trim()){ return alert('El nombre es requerido'); }
            if(!isEmail(email)){ return alert('Email no válido'); }
            user.name = name.trim(); user.email = email.trim(); user.updatedAt = new Date().toISOString();
            db.users[idx] = user; saveLocalDB(db); try{ renderUsers(); }catch(e){}
            return;
        }
        if(t.matches('.btn-delete-user')){
            const id = t.getAttribute('data-id');
            if(!confirm('Eliminar usuario?')) return;
            const db = loadLocalDB(); db.users = (db.users||[]).filter(x => String(x.id) !== String(id)); saveLocalDB(db); try{ renderUsers(); }catch(e){}
            return;
        }

        // Clients
        if(t.matches('.btn-edit-client')){
            const id = t.getAttribute('data-id'); const db = loadLocalDB(); const idx = (db.clients||[]).findIndex(x => String(x.id) === String(id)); if(idx===-1) return alert('Cliente no encontrado');
            const client = db.clients[idx];
            const name = prompt('Nombre:', client.name||''); if(name===null) return; if(!name.trim()) return alert('Nombre requerido');
            const email = prompt('Email:', client.email||''); if(email===null) return; if(email && !isEmail(email)) return alert('Email no válido');
            const phone = prompt('Teléfono:', client.phone||''); if(phone===null) return; if(phone && !isPhone(phone)) return alert('Teléfono no válido');
            client.name = name.trim(); client.email = email.trim(); client.phone = phone.trim(); client.updatedAt = new Date().toISOString(); db.clients[idx]=client; saveLocalDB(db); try{ renderClients(); }catch(e){}
            return;
        }
        if(t.matches('.btn-delete-client')){
            const id = t.getAttribute('data-id'); if(!confirm('Eliminar cliente?')) return; const db = loadLocalDB(); db.clients = (db.clients||[]).filter(x => String(x.id)!==String(id)); saveLocalDB(db); try{ renderClients(); }catch(e){}; return;
        }

        // Sales
        if(t.matches('.btn-edit-sale')){
            const id = t.getAttribute('data-id'); const db = loadLocalDB(); const idx = (db.sales||[]).findIndex(x => String(x.id) === String(id)); if(idx===-1) return alert('Venta no encontrada');
            const sale = db.sales[idx];
            const client = prompt('Cliente:', sale.client||''); if(client===null) return; if(!client.trim()) return alert('Cliente requerido');
            const service = prompt('Servicio:', sale.service||''); if(service===null) return; const amount = prompt('Monto:', sale.amount||''); if(amount===null) return; if(amount && !isNumeric(amount)) return alert('Monto inválido');
            sale.client = client.trim(); sale.service = service.trim(); sale.amount = amount; sale.updatedAt = new Date().toISOString(); db.sales[idx]=sale; saveLocalDB(db); try{ renderSales(); }catch(e){}
            return;
        }
        if(t.matches('.btn-delete-sale')){
            const id = t.getAttribute('data-id'); if(!confirm('Eliminar venta?')) return; const db = loadLocalDB(); db.sales = (db.sales||[]).filter(x => String(x.id)!==String(id)); saveLocalDB(db); try{ renderSales(); }catch(e){}; return;
        }
    });

    // Attach now and also on DOMContentLoaded to be safe
    try{ attachFormHandlers(); }catch(e){}
    document.addEventListener && document.addEventListener('DOMContentLoaded', attachFormHandlers);

    // Enhance render functions to use formatting helpers if available
    // (They live in the other IIFE scope; we rely on those names existing)

})();
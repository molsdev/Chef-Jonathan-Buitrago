document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos guardados (si existen) antes de inicializar UI
    try { if (typeof loadLocalDBFromStorage === 'function') loadLocalDBFromStorage(); } catch (e) { console.warn('No hay datos previos para cargar.', e); }
    
    // Toggle de contraseña
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const eyeOpen = this.querySelector('.eye-open');
            const eyeClosed = this.querySelector('.eye-closed');

            // Cambiar el tipo de input
            if (input.type === 'password') {
                input.type = 'text';
                eyeOpen.classList.add('hidden');
                eyeClosed.classList.remove('hidden');
            } else {
                input.type = 'password';
                eyeOpen.classList.remove('hidden');
                eyeClosed.classList.add('hidden');
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('button[onclick="toggleMobileMenu()"]');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu on link click
    const mobileMenuLinks = document.querySelectorAll('mobile-menu');
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

            if (!validateEmail(email)) {
                showMessage('Por favor ingrese un correo electrónico válido', 'error');
                return;
            }

            if (password.length < 4) {
                showMessage('La contraseña debe tener al menos 4 caracteres', 'error');
                return;
            }

            // Verificar credenciales
            if ((email === 'juandachacon56@gmail.com' || email === 'edwinalexandermolinasanabria@gmail.com') && password === '1234') {
                showMessage('¡Bienvenido Administrador!', 'success');
                setTimeout(() => {
                    window.location.href = 'admin/admin.html';
                }, 1000);
            } else if (email === 'edwinalexandermolinasanabria@gmail.com' && password === '0000') {
                showMessage('¡Bienvenido Vendedor!', 'success');
                setTimeout(() => {
                    window.location.href = 'seller/seller.html';
                }, 1000);
            } else {
                showMessage('¡Bienvenido!', 'success');
                setTimeout(() => {
                    window.location.href = 'user/miembros.html';
                }, 1000);
            }
        });
    }

    // Formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const name = document.getElementById('register-name')?.value;
            const phone = document.getElementById('register-phone')?.value;
            const identification = document.getElementById('register-id')?.value;

            // Validaciones
            if (!validateEmail(email)) {
                showMessage('Por favor ingrese un correo electrónico válido', 'error');
                return;
            }

            if (password.length < 4) {
                showMessage('La contraseña debe tener al menos 4 caracteres', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage('Las contraseñas no coinciden', 'error');
                return;
            }

            if (phone && !validatePhone(phone)) {
                showMessage('Por favor ingrese un número de teléfono válido', 'error');
                return;
            }

            if (identification && !validateIdentification(identification)) {
                showMessage('Por favor ingrese un número de identificación válido', 'error');
                return;
            }

            // Crear objeto de usuario
            const userData = {
                email,
                name,
                phone,
                identification,
                createdAt: new Date().toISOString()
            };

            // Guardar en la base de datos local
            saveToLocalDB('users', userData);

            // Verificar si es vendedor
            if (email === 'edwinalexandermolinasanabria@gmail.com' && password === '0000') {
                showMessage('¡Registro de vendedor exitoso!', 'success');
                setTimeout(() => {
                    window.location.href = 'seller/seller.html';
                }, 1000);
            } else {
                showMessage('¡Registro exitoso!', 'success');
                setTimeout(() => {
                    window.location.href = 'user/miembros.html';
                }, 1000);
            }
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

    // Formulario de visitas
    const visitForm = document.getElementById('visit-form');
    if (visitForm) {
        // Actualizar contador de visitas activas
        function updateVisitCounters() {
            const activeVisits = getFromLocalDB('visits', { estado: 'activa' });
            const totalVisitsToday = getFromLocalDB('visits').filter(v => 
                new Date(v.createdAt).toDateString() === new Date().toDateString()
            );

            const activeCounter = document.querySelector('[data-counter="active-visits"]');
            const totalCounter = document.querySelector('[data-counter="total-visits"]');

            if (activeCounter) activeCounter.textContent = activeVisits.length;
            if (totalCounter) totalCounter.textContent = totalVisitsToday.length;
        }

        // Actualizar tabla de visitas activas
        function updateActiveVisitsTable() {
            const activeVisits = getFromLocalDB('visits', { estado: 'activa' });
            const tbody = document.querySelector('.product-card table tbody');
            
            if (tbody) {
                tbody.innerHTML = activeVisits.map(visit => `
                    <tr class="border-t border-gray-700">
                        <td class="p-4 text-white">${visit.nombre}</td>
                        <td class="p-4 text-gray-300">${visit.dependencia}</td>
                        <td class="p-4 text-gray-300">${new Date(visit.createdAt).toLocaleTimeString()}</td>
                        <td class="p-4">
                            <span class="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs">Activa</span>
                        </td>
                    </tr>
                `).join('');
            }
        }

        // Actualizar tabla de historial
        function updateHistoryTable() {
            const allVisits = getFromLocalDB('visits').sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );

            const tbody = document.querySelector('#visits-history tbody');
            if (tbody) {
                tbody.innerHTML = allVisits.map(visit => `
                    <tr class="border-t border-gray-700">
                        <td class="p-4 text-white">${visit.nombre}</td>
                        <td class="p-4 text-gray-300">${visit.identificacion}</td>
                        <td class="p-4 text-gray-300">${visit.dependencia}</td>
                        <td class="p-4 text-gray-300">${visit.motivo}</td>
                        <td class="p-4 text-gray-300">${new Date(visit.createdAt).toLocaleTimeString()}</td>
                        <td class="p-4 text-gray-300">${visit.horaSalida || '-'}</td>
                        <td class="p-4 text-gray-300">${visit.duracion || '-'}</td>
                    </tr>
                `).join('');
            }
        }

        visitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const visitType = document.getElementById('visit-type').value;
            const visitorName = document.getElementById('visitor-name').value;
            const visitorId = document.getElementById('visitor-id').value;
            const department = document.getElementById('department').value;
            const reason = document.getElementById('visit-reason').value;

            // Validaciones
            if (!visitorName.trim()) {
                showMessage('El nombre del visitante es requerido', 'error');
                return;
            }

            if (!validateIdentification(visitorId)) {
                showMessage('Por favor ingrese una identificación válida', 'error');
                return;
            }

            if (visitType === 'entrada') {
                // Verificar si ya existe una visita activa con la misma identificación
                const activeVisit = getFromLocalDB('visits', { 
                    identificacion: visitorId,
                    estado: 'activa'
                })[0];

                if (activeVisit) {
                    showMessage('Ya existe una visita activa para esta identificación', 'error');
                    return;
                }

                const visitData = {
                    tipo: visitType,
                    nombre: visitorName,
                    identificacion: visitorId,
                    dependencia: department,
                    motivo: reason,
                    estado: 'activa',
                    createdAt: new Date().toISOString()
                };

                saveToLocalDB('visits', visitData);
                showMessage('Entrada registrada exitosamente', 'success');

                // Persistir después de crear entrada
                try { saveLocalDBToStorage(); } catch (e) { /* noop */ }

            } else if (visitType === 'salida') {
                // Buscar la visita activa correspondiente
                const activeVisit = getFromLocalDB('visits', { 
                    identificacion: visitorId,
                    estado: 'activa'
                })[0];

                if (!activeVisit) {
                    showMessage('No se encontró una visita activa para esta identificación', 'error');
                    return;
                }

                // Calcular duración
                const entrada = new Date(activeVisit.createdAt);
                const salida = new Date();
                const duracion = Math.round((salida - entrada) / (1000 * 60)); // en minutos

                // Actualizar visita
                activeVisit.estado = 'completada';
                activeVisit.horaSalida = salida.toLocaleTimeString();
                activeVisit.duracion = `${duracion}m`;

                // Persistir la actualización de la visita activa
                try { saveLocalDBToStorage(); } catch (e) { /* noop */ }

                showMessage('Salida registrada exitosamente', 'success');
            }

            // Actualizar todas las vistas
            updateVisitCounters();
            updateActiveVisitsTable();
            updateHistoryTable();

            this.reset();
        });

        // Inicializar contadores y tablas
        updateVisitCounters();
        updateActiveVisitsTable();
        updateHistoryTable();

        // Configurar filtros de historial
        const dateFilter = document.querySelector('input[type="date"]');
        const areaFilter = document.querySelector('select[aria-label="Filtrar por área"]');
        
        if (dateFilter) {
            dateFilter.addEventListener('change', updateHistoryTable);
        }
        if (areaFilter) {
            areaFilter.addEventListener('change', updateHistoryTable);
        }
    }

    // Formulario de servicios
    const serviceForm = document.getElementById('service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const serviceData = Object.fromEntries(formData.entries());
            
            console.log('Servicio registrado:', serviceData);
            alert('Servicio registrado exitosamente');
            this.reset();
        });
    }

    // Formulario de usuarios
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const userData = Object.fromEntries(formData.entries());
            
            console.log('Usuario registrado:', userData);
            alert('Usuario registrado exitosamente');
            this.reset();
        });
    }

    // Formulario de inscripciones
    const inscriptionForm = document.getElementById('inscription-form');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const inscriptionData = Object.fromEntries(formData.entries());
            
            console.log('Inscripción registrada:', inscriptionData);
            alert('Inscripción registrada exitosamente');
            this.reset();
        });
    }

    // Formulario de salidas
    const exitForm = document.getElementById('exit-form');
    if (exitForm) {
        exitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const exitData = Object.fromEntries(formData.entries());
            
            console.log('Salida registrada:', exitData);
            alert('Salida registrada exitosamente');
            this.reset();
        });
    }

    // Universal handler para formularios con id que terminen en '-form' (seller y admin)
    const formIdToCollection = {
        // Usuarios
        'create-user-form': 'users',
        'user-form': 'users',

        // Servicios
        'create-service-form': 'services',
        'service-form': 'services',

        // Inscripciones
        'register-inscription-form': 'inscriptions',
        'modify-inscription-form': 'inscriptions',
        'cancel-inscription-form': 'inscriptions',

        // Completions / certificados / facturas
        'register-completion-form': 'completions',
        'generate-certificate-form': 'certificates',
        'generate-invoice-form': 'invoices',

        // Ventas y vendedores
        'new-sale-form': 'sales',
        'seller-form': 'sellers',
        'new-client-form': 'clients',

        // Visitas
        'visit-form': 'visits'
    };

    const genericForms = document.querySelectorAll('form[id$="-form"]');
    genericForms.forEach(frm => {
        // evitar añadir dos veces el mismo listener
        if (frm.dataset.handled === 'true') return;
        frm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = this.id;
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Si el formulario ya es el de visitas, lo manejamos en su propio handler
            if (id === 'visit-form') return;

            const collection = formIdToCollection[id] || 'misc';
            // Añadir metadatos
            data.createdAt = new Date().toISOString();
            data.id = data.id || Date.now();

            // Guardar en localDB
            if (!localDB[collection]) localDB[collection] = [];
            localDB[collection].push(data);

            // Persistir cambio en localStorage
            try { saveLocalDBToStorage(); } catch (e) { /* noop */ }

            console.log(`Formulario (${id}) guardado en colección: ${collection}`, data);
            showMessage('Operación realizada exitosamente (simulada).', 'success');
            this.reset();
            this.dataset.handled = 'true';
        });
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

// Definir detalles para cada curso
const courseDetails = {
    "Chocolatería Avanzada": "Domina las técnicas más sofisticadas del chocolate, desde el templado perfecto hasta la creación de bombones de autor. Incluye técnicas profesionales y consejos para trabajar con chocolate de alta calidad.",
    "Pastelería de Vanguardia": "Explora las últimas tendencias de la pastelería mundial, aplicando técnicas innovadoras y creativas a tus postres. Aprende sobre ingredientes modernos y presentaciones artísticas.",
    "Gestión de Emprendimientos Gastronómicos": "Aprende a crear y gestionar tu propio negocio de pastelería, desde la planificación del menú hasta la estrategia de marketing. Incluye aspectos financieros y de gestión.",
    "Pastelería Vegana": "Aprende a crear postres deliciosos sin ingredientes de origen animal, utilizando alternativas vegetales innovadoras. Cubre técnicas para sustituir huevos, lácteos y otros ingredientes animales.",
    "Pastelería Libre de Gluten": "Descubre cómo hacer postres increíbles sin gluten, utilizando harinas alternativas y técnicas especializadas. Ideal para personas con intolerancia al gluten.",
    "Bases de Pastelería": "Domina los fundamentos esenciales de la pastelería, desde las técnicas básicas hasta recetas clásicas perfeccionadas. Ideal para principiantes.",
    "Chocolatería": "Iníciate en el mundo del chocolate y aprende a trabajar con él, desde la selección del cacao hasta la creación de piezas artesanales. Cubre temperado, moldeado y decoración con chocolate.",
    "Bombonería": "Crea bombones artesanales con diferentes rellenos y acabados, dominando las técnicas profesionales de la chocolatería fina. Aprende sobre rellenos, coberturas y decoración detallada.",
    "Pastelería Keto": "Elabora postres bajos en carbohidratos y deliciosos, perfectos para dietas cetogénicas sin sacrificar el sabor. Incluye recetas y técnicas para pastelería baja en carbohidratos.",
    "Cata de Cacao": "Una experiencia sensorial para descubrir los secretos del cacao, identificando notas y orígenes de distintas variedades. Incluye degustación y análisis sensorial del cacao."
};

function showCourseDetails(courseName) {
    const modal = document.getElementById('courseDetailsModal');
    const title = document.getElementById('courseTitle');
    const content = document.getElementById('courseDetailsContent');
    
    title.textContent = courseName;
    content.textContent = courseDetails[courseName] || "Detalles no disponibles.";
    modal.classList.remove('hidden');
}

function closeCourseDetails() {
    const modal = document.getElementById('courseDetailsModal');
    modal.classList.add('hidden');
}

// Event listener para cerrar modal al hacer clic fuera
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('courseDetailsModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCourseDetails();
            }
        });
    }
});

// Funciones de utilidad para validación
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

function validateIdentification(id) {
    const re = /^[0-9]{6,12}$/;
    return re.test(id);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Funciones para el manejo de datos localmente (simulando una base de datos)
const localDB = {
    visits: [],
    users: [],
    services: [],
    inscriptions: [],
    exits: []
};

// Función para guardar datos
function saveToLocalDB(collection, data) {
    if (localDB[collection]) {
        data.id = Date.now(); // Generar ID único
        data.createdAt = new Date().toISOString();
        localDB[collection].push(data);
        // Persistir cambio inmediatamente
        try { saveLocalDBToStorage(); } catch (e) { /* noop */ }
        return data;
    }
    return null;
}

// Guardado en localStorage
function saveLocalDBToStorage() {
    try {
        localStorage.setItem('chef_localDB_v1', JSON.stringify(localDB));
    } catch (e) {
        console.warn('Error guardando en localStorage', e);
    }
}

// Cargar desde localStorage
function loadLocalDBFromStorage() {
    try {
        const raw = localStorage.getItem('chef_localDB_v1');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        // Merge seguro: mantener colecciones esperadas
        Object.keys(localDB).forEach(key => {
            if (Array.isArray(parsed[key])) {
                localDB[key] = parsed[key];
            }
        });
    } catch (e) {
        console.warn('Error cargando localDB desde localStorage', e);
    }
}

// Función para obtener datos
function getFromLocalDB(collection, filters = {}) {
    if (!localDB[collection]) return [];
    
    return localDB[collection].filter(item => {
        return Object.entries(filters).every(([key, value]) => 
            item[key] === value
        );
    });
}

// Función para actualizar tablas
function updateTable(tableId, data, columns) {
    const table = document.getElementById(tableId);
    if (!table) return;

    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    tbody.innerHTML = data.map(item => `
        <tr class="border-t border-gray-700">
            ${columns.map(col => `
                <td class="p-4 text-white">${item[col]}</td>
            `).join('')}
        </tr>
    `).join('');
}

// Función para mostrar mensajes de error o éxito
function showMessage(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white z-50`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Función para exportar visitas
function exportVisits() {
    const visits = getFromLocalDB('visits');
    if (visits.length === 0) {
        showMessage('No hay visitas para exportar', 'error');
        return;
    }

    // Filtrar por fecha y área si hay filtros activos
    const dateFilter = document.getElementById('date-filter')?.value;
    const areaFilter = document.getElementById('area-filter')?.value;

    let filteredVisits = visits;
    if (dateFilter) {
        const filterDate = new Date(dateFilter).toDateString();
        filteredVisits = filteredVisits.filter(v => 
            new Date(v.createdAt).toDateString() === filterDate
        );
    }
    if (areaFilter) {
        filteredVisits = filteredVisits.filter(v => 
            v.dependencia === areaFilter
        );
    }

    // Crear CSV
    const headers = ['Fecha', 'Tipo', 'Nombre', 'Identificación', 'Dependencia', 'Motivo', 'Hora Entrada', 'Hora Salida', 'Duración'];
    const csvContent = [
        headers.join(','),
        ...filteredVisits.map(v => [
            new Date(v.createdAt).toLocaleDateString(),
            v.tipo,
            v.nombre,
            v.identificacion,
            v.dependencia,
            v.motivo,
            new Date(v.createdAt).toLocaleTimeString(),
            v.horaSalida || '',
            v.duracion || ''
        ].join(','))
    ].join('\n');

    // Crear y descargar el archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `visitas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showMessage('Archivo exportado exitosamente', 'success');
}

// Inicializar campos de fecha al cargar la página
function initializeDateFields() {
    const dateFields = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateFields.forEach(field => {
        if (!field.min) {
            field.min = today;
        }
        if (!field.value) {
            field.value = today;
        }
    });
}

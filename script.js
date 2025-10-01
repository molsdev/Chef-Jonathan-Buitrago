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

    if (reservationType) {
        reservationType.addEventListener('change', function() {
            if (this.value === 'curso') {
                courseSelection.style.display = 'block';
                advisorySelection.style.display = 'none';
            } else if (this.value === 'asesoria') {
                courseSelection.style.display = 'none';
                advisorySelection.style.display = 'block';
            } else {
                courseSelection.style.display = 'none';
                advisorySelection.style.display = 'none';
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
            // Simulación de login
            alert('Inicio de sesión exitoso. Serás redirigido al área de miembros.');
            window.location.href = 'miembros.html';
        });
    }

    // Formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulación de registro
            alert('Cuenta creada exitosamente. Por favor, inicia sesión.');
            window.location.href = 'registro.html';
        });
    }

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
    
    // Toggle visibility of answer
    answer.classList.toggle('hidden');
    
    // Rotate icon
    icon.classList.toggle('rotate-180');
}
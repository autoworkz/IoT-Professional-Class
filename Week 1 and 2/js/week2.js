document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Progress Tracker Logic for Week 2 ---
    // Sections (Week 2 only has one section now, ID 'activity-steps')
    const section1 = document.getElementById('activity-steps');

    // Global Visuals
    const topProgressBar = document.getElementById('progress-bar');
    const statusCircle = document.getElementById('status-circle');
    const statusPercent = document.getElementById('status-percent');
    const completionLabel = document.getElementById('completion-label');
    
    // Section 1 Specifics
    const checkboxes1 = section1 ? section1.querySelectorAll('.step-checkbox') : [];
    const progressText1 = document.getElementById('progress-text');
    const stepCards1 = section1 ? section1.querySelectorAll('.step-card') : [];

    // Combine for global tracking
    const allCheckboxes = [...checkboxes1];
    const allStepCards = [...stepCards1];

    // Circle circumference for SVG animation (r=20 -> 2*PI*20 ≈ 125.6)
    const circumference = 125.6;
    if(statusCircle) {
        statusCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        statusCircle.style.strokeDashoffset = circumference;
    }

    function updateProgress() {
        // --- Activity 1 Update ---
        const total1 = checkboxes1.length;
        const checked1 = Array.from(checkboxes1).filter(cb => cb.checked).length;
        if (progressText1) {
            progressText1.textContent = `${checked1}/${total1} Completed`;
        }

        // --- Global Update ---
        const totalGlobal = total1;
        const checkedGlobal = checked1;
        const percentGlobal = totalGlobal > 0 ? (checkedGlobal / totalGlobal) * 100 : 0;

        // Update Top Progress Bar
        if(topProgressBar) topProgressBar.style.width = `${percentGlobal}%`;

        // Update Circular Progress (Sidebar)
        if(statusCircle && statusPercent) {
            const offset = circumference - (percentGlobal / 100) * circumference;
            statusCircle.style.strokeDashoffset = offset;
            statusPercent.textContent = `${Math.round(percentGlobal)}%`;
            
            // Visual feedback on completion
            if (percentGlobal === 100) {
                if(completionLabel) {
                    completionLabel.textContent = "Activity Complete!";
                    completionLabel.classList.add('text-brand-accent');
                }
                statusCircle.classList.add('text-blue-400');
                statusCircle.classList.remove('text-brand-primary');
                triggerCompletionEffect();
            } else {
                if(completionLabel) {
                    completionLabel.textContent = `Activity Incomplete - Finish all ${totalGlobal} steps`;
                    completionLabel.classList.remove('text-brand-accent');
                }
                statusCircle.classList.add('text-brand-primary');
                statusCircle.classList.remove('text-blue-400');
            }
        }

        // Save state to localStorage (unique key for Week 2)
        const state = allCheckboxes.map(cb => cb.checked);
        localStorage.setItem('automationWorkzWeek2State', JSON.stringify(state));
        
        // Highlight active cards
        allCheckboxes.forEach((cb, index) => {
            if (cb.checked) {
                allStepCards[index].classList.add('border-brand-primary', 'bg-brand-primary/5');
                allStepCards[index].classList.remove('border-white/10');
            } else {
                allStepCards[index].classList.remove('border-brand-primary', 'bg-brand-primary/5');
                allStepCards[index].classList.add('border-white/10');
            }
        });
    }

    // Load state
    const savedState = JSON.parse(localStorage.getItem('automationWorkzWeek2State'));
    if (savedState) {
        allCheckboxes.forEach((cb, index) => {
            if (savedState[index]) cb.checked = true;
        });
        updateProgress();
    }

    // Add listeners
    allCheckboxes.forEach(cb => {
        cb.addEventListener('change', updateProgress);
    });


    // --- 2. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });


    // --- 3. Navbar Glass Effect ---
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-brand-dark/90', 'shadow-lg');
                navbar.classList.remove('bg-brand-dark/80', 'border-transparent');
            } else {
                navbar.classList.remove('bg-brand-dark/90', 'shadow-lg');
                navbar.classList.add('bg-brand-dark/80');
            }
        });
    }

    // --- 4. Simple Completion Effect ---
    function triggerCompletionEffect() {
        if(statusCircle && statusCircle.parentElement) {
            statusCircle.parentElement.classList.add('animate-pulse');
            setTimeout(() => {
                statusCircle.parentElement.classList.remove('animate-pulse');
            }, 1000);
        }
    }
});
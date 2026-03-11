document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Progress Tracker Logic ---
    // Sections
    const homeworkSection = document.getElementById('homework-tasks');

    // Global Visuals
    const topProgressBar = document.getElementById('progress-bar');
    const statusCircle = document.getElementById('status-circle');
    const statusPercent = document.getElementById('status-percent');
    const completionLabel = document.getElementById('completion-label');
    
    // Homework Specifics
    const checkboxes = homeworkSection ? homeworkSection.querySelectorAll('.step-checkbox') : [];
    const progressText = document.getElementById('progress-text');
    const stepCards = homeworkSection ? homeworkSection.querySelectorAll('.step-card') : [];

    // Circle circumference for SVG animation (r=20 -> 2*PI*20 ≈ 125.6)
    const circumference = 125.6;
    if(statusCircle) {
        statusCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        statusCircle.style.strokeDashoffset = circumference;
    }

    function updateHomeworkProgress() {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percent = total > 0 ? (checked / total) * 100 : 0;

        // Update Text
        if (progressText) {
            progressText.textContent = `${checked}/${total} Completed`;
        }

        // Update Top Progress Bar
        if(topProgressBar) topProgressBar.style.width = `${percent}%`;

        // Update Circular Progress (Sidebar)
        if(statusCircle && statusPercent) {
            const offset = circumference - (percent / 100) * circumference;
            statusCircle.style.strokeDashoffset = offset;
            statusPercent.textContent = `${Math.round(percent)}%`;
            
            // Visual feedback on completion
            if (percent === 100) {
                if(completionLabel) {
                    completionLabel.textContent = "Homework Complete!";
                    completionLabel.classList.add('text-brand-accent');
                }
                statusCircle.classList.add('text-blue-400');
                statusCircle.classList.remove('text-brand-primary');
                triggerCompletionEffect();
            } else {
                if(completionLabel) {
                    completionLabel.textContent = "Incomplete: Finish all 6 tasks";
                    completionLabel.classList.remove('text-brand-accent');
                }
                statusCircle.classList.add('text-brand-primary');
                statusCircle.classList.remove('text-blue-400');
            }
        }

        // Save state to localStorage
        const state = Array.from(checkboxes).map(cb => cb.checked);
        localStorage.setItem('automationWorkzHomeworkState', JSON.stringify(state));
        
        // Highlight active cards
        checkboxes.forEach((cb, index) => {
            if (cb.checked) {
                stepCards[index].classList.add('border-brand-primary', 'bg-brand-primary/5');
                stepCards[index].classList.remove('border-white/10');
            } else {
                stepCards[index].classList.remove('border-brand-primary', 'bg-brand-primary/5');
                stepCards[index].classList.add('border-white/10');
            }
        });
    }

    // Load state
    const savedState = JSON.parse(localStorage.getItem('automationWorkzHomeworkState'));
    if (savedState) {
        checkboxes.forEach((cb, index) => {
            if (savedState[index]) cb.checked = true;
        });
        updateHomeworkProgress();
    }

    // Add listeners
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateHomeworkProgress);
    });
    
    // Expose function globally for inline onclick handlers if needed
    window.updateHomeworkProgress = updateHomeworkProgress;


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

    // --- 5. File Upload Logic (UI Only) ---
    const dropZone = document.querySelector('.border-dashed');
    const fileInput = document.querySelector('input[type="file"]');
    const browseBtn = document.querySelector('.border-dashed button');
    const submitBtn = document.querySelector('#file-upload button.bg-brand-primary');

    if (dropZone && fileInput && browseBtn) {
        // Trigger file input when clicking browse button or drop zone
        browseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling to dropZone click
            fileInput.click();
        });
        
        dropZone.addEventListener('click', () => fileInput.click());

        // Drag and Drop Visual Feedback
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-brand-primary', 'bg-brand-primary/10');
            dropZone.classList.remove('border-white/20', 'bg-brand-dark/30');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-brand-primary', 'bg-brand-primary/10');
            dropZone.classList.add('border-white/20', 'bg-brand-dark/30');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-brand-primary', 'bg-brand-primary/10');
            dropZone.classList.add('border-white/20', 'bg-brand-dark/30');
            
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                const fileNames = Array.from(files).map(f => f.name).join(', ');
                const textElement = dropZone.querySelector('p.text-lg');
                const subTextElement = dropZone.querySelector('p.text-sm');
                
                // Change icon to check
                const iconContainer = dropZone.querySelector('.mb-4');
                iconContainer.innerHTML = '<i class="w-12 h-12 text-green-400 mx-auto" data-lucide="check-circle"></i>';
                lucide.createIcons();
                
                textElement.textContent = `${files.length} file(s) selected`;
                textElement.classList.add('text-green-400');
                subTextElement.textContent = fileNames;
            }
        }
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const files = fileInput.files;
            if (files.length === 0) {
                alert('Please select a file to upload first.');
            } else {
                // Mock submission
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Uploading... <i class="w-4 h-4 animate-spin" data-lucide="loader-2"></i>';
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
                
                setTimeout(() => {
                    submitBtn.innerHTML = 'Submitted Successfully! <i class="w-4 h-4" data-lucide="check"></i>';
                    submitBtn.classList.remove('bg-brand-primary', 'hover:bg-orange-600');
                    submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                    
                    setTimeout(() => {
                        alert('Assignment submitted successfully!');
                        // Reset form if needed, but keeping success state is nice for feedback
                    }, 500);
                }, 2000);
            }
        });
    }

});
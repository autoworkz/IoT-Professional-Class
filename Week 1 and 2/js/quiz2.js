document.addEventListener('DOMContentLoaded', () => {
    // Correct Answers Data for Week 2 Quiz
    const correctAnswers = {
        1: 'C',
        2: 'B',
        3: 'B',
        4: 'B',
        5: 'C',
        6: 'B',
        7: 'B',
        8: 'B',
        9: 'B',
        10: 'C'
    };

    const submitBtn = document.getElementById('submit-quiz-btn');
    const resetBtn = document.getElementById('reset-quiz-btn');
    const quizStatusCircle = document.getElementById('quiz-status-circle');
    const quizScorePercent = document.getElementById('quiz-score-percent');
    const quizStatusText = document.getElementById('quiz-status-text');
    const quizPointsText = document.getElementById('quiz-points-text');

    // Initialize Progress (0%)
    updateProgress(0);

    // Load saved state if available
    const savedState = localStorage.getItem('automationWorkzQuiz2State');
    if (savedState) {
        const state = JSON.parse(savedState);
        if (state.completed) {
            // Restore answers
            for (const [qId, answer] of Object.entries(state.answers)) {
                const radio = document.querySelector(`input[name="q${qId}"][value="${answer}"]`);
                if (radio) radio.checked = true;
            }
            // Re-evaluate to show results
            evaluateQuiz(true);
        }
    }

    submitBtn.addEventListener('click', () => {
        evaluateQuiz(false);
    });

    // Reset Quiz Logic
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // 1. Enable inputs and clear selection
            const inputs = document.querySelectorAll('input[type="radio"]');
            inputs.forEach(input => {
                input.disabled = false;
                input.checked = false;
            });

            // 2. Hide explanations and remove highlighting
            document.querySelectorAll('.explanation').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.correct-answer').forEach(el => el.classList.remove('correct-answer'));
            document.querySelectorAll('.incorrect-answer').forEach(el => el.classList.remove('incorrect-answer'));

            // 3. Reset Submit Button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit Quiz <i class="w-5 h-5" data-lucide="check-circle"></i>';
            submitBtn.classList.remove('bg-slate-500', 'cursor-not-allowed');
            submitBtn.classList.add('bg-brand-primary', 'hover:bg-orange-600');

            // 4. Hide Reset Button
            resetBtn.classList.add('hidden');

            // 5. Reset Progress UI
            updateProgress(0);
            quizStatusText.textContent = "Not Submitted";
            quizPointsText.textContent = "0 / 100 Points";

            // 6. Clear Local Storage
            localStorage.removeItem('automationWorkzQuiz2State');

            // 7. Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function evaluateQuiz(isRestore) {
        let score = 0;
        let totalQuestions = 10;
        let userAnswers = {};
        let allAnswered = true;

        // Check all questions
        for (let i = 1; i <= totalQuestions; i++) {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (!selected) {
                if (!isRestore) {
                    alert(`Please answer Question ${i} before submitting.`);
                    return; // Stop submission
                }
                allAnswered = false;
            } else {
                userAnswers[i] = selected.value;
            }
        }

        // Disable inputs and button after valid submission
        const inputs = document.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => input.disabled = true);
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Quiz Submitted <i class="w-5 h-5" data-lucide="check"></i>';
        submitBtn.classList.add('bg-slate-500', 'cursor-not-allowed');
        submitBtn.classList.remove('bg-brand-primary', 'hover:bg-orange-600');
        
        // Show Reset Button
        if (resetBtn) resetBtn.classList.remove('hidden');

        // Calculate Score and Highlight
        for (let i = 1; i <= totalQuestions; i++) {
            const card = document.querySelector(`.question-card[data-question="${i}"]`);
            const selectedVal = userAnswers[i];
            const correctVal = correctAnswers[i];
            const explanation = card.querySelector('.explanation');

            // Show explanation
            if (explanation) explanation.style.display = 'block';

            // Highlight Logic
            if (selectedVal === correctVal) {
                score += 10;
                // Highlight correct option
                const correctLabel = card.querySelector(`input[value="${correctVal}"]`).closest('label');
                correctLabel.classList.add('correct-answer');
            } else {
                // Highlight selected wrong option
                if (selectedVal) {
                    const wrongLabel = card.querySelector(`input[value="${selectedVal}"]`).closest('label');
                    wrongLabel.classList.add('incorrect-answer');
                }
                // Show correct option
                const correctLabel = card.querySelector(`input[value="${correctVal}"]`).closest('label');
                correctLabel.classList.add('correct-answer');
            }
        }

        // Update UI
        updateProgress(score);
        quizStatusText.textContent = "Quiz Completed";
        quizPointsText.textContent = `${score} / 100 Points`;

        // Save State
        if (!isRestore) {
            const state = {
                completed: true,
                score: score,
                answers: userAnswers
            };
            localStorage.setItem('automationWorkzQuiz2State', JSON.stringify(state));
            
            // Scroll to top to see results
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function updateProgress(percent) {
        // Circumference of circle r=20 is ~125.6
        const circumference = 125.6;
        const offset = circumference - (percent / 100) * circumference;
        quizStatusCircle.style.strokeDashoffset = offset;
        quizScorePercent.textContent = `${percent}%`;
        
        // Color based on score
        if (percent >= 70) {
            quizStatusCircle.classList.add('text-green-500');
            quizStatusCircle.classList.remove('text-brand-primary', 'text-red-500');
        } else if (percent > 0) {
            quizStatusCircle.classList.add('text-brand-primary');
            quizStatusCircle.classList.remove('text-green-500', 'text-red-500');
        }
    }
});

    // --- Scroll Animations (Intersection Observer) ---
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

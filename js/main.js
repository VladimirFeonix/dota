// Добавьте перед другими импортами
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js';
import { initializeApp, randomizeHeroes } from './core.js';
import { handleCardClick, handleMobileDoubleTap } from './events.js';
import { audioManager } from './audio.js';
import { challengeSystem } from './challenges.js';

// Ждем полной загрузки DOM и всех ресурсов
window.addEventListener('load', () => {
    initializeApp();

    // Даем время для полной инициализации перед показом челленджей
    setTimeout(() => {
        if (window.challengeSystem) {
            window.challengeSystem.updateCardsChallenges();
        }
    }, 1500);
});

// Обработчики событий - только после полной загрузки
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        // Пропускаем клики по плашке челленджа
        if (e.target.closest('.challenge-display')) {
            return;
        }
        
        if (e.target.closest('.option')) {
            handleCardClick(e);
            const card = e.target.closest('.option');
            if (window.challengeSystem) {
                window.challengeSystem.updateCardChallenge(card);
            }
        }
    });
    
    document.addEventListener('touchstart', (e) => {
        // Пропускаем тапы по плашке челленджа
        if (e.target.closest('.challenge-display')) {
            return;
        }
        
        if (e.target.closest('.option')) {
            handleMobileDoubleTap(e);
            const card = e.target.closest('.option');
            if (window.challengeSystem) {
                window.challengeSystem.updateCardChallenge(card);
            }
        }
    });

    // Cursor follower logic
    const cursorFollower = document.querySelector('.cursor-follower');
    if (cursorFollower) {
        document.addEventListener('mousemove', e => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
    }

    // Particle animation logic
    const particleContainer = document.getElementById('particle-container');
    if (particleContainer) {
        const canvas = document.createElement('canvas');
        particleContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                let color = 'rgba(255, 255, 255, 0.3)';
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        };

        const animateParticles = () => {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
        };

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        resizeCanvas();
        initParticles();
        animateParticles();
    }
});

// Глобальные функции
window.randomizeHeroes = randomizeHeroes;
window.challengeSystem = challengeSystem;
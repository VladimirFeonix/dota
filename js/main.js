(function () {
    const header = document.querySelector ('.header');
    window.onscroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header_active')
        } else {
            header.classList.remove('header_active')
        }
    }
}());

// Theme switcher
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    if (body.classList.contains('light-theme')) {
        themeSwitcher.textContent = '☀️';
    } else {
        themeSwitcher.textContent = '🌙';
    }
});

// Cursor Follower
const cursorFollower = document.querySelector('.cursor-follower');
window.addEventListener('mousemove', e => {
    cursorFollower.style.top = e.pageY + 'px';
    cursorFollower.style.left = e.pageX + 'px';
});

// Particle Background
const particleContainer = document.createElement('div');
particleContainer.id = 'particle-container';
document.body.appendChild(particleContainer);

const particles = [];
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.width = Math.random() * 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    particleContainer.appendChild(particle);
    particles.push(particle);
}

const particleStyle = document.createElement('style');
particleStyle.innerHTML = `
.particle {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: move linear infinite;
}

@keyframes move {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-100vh);
    }
}
`;
document.head.appendChild(particleStyle);


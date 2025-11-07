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

// Animated SVG
const container = document.getElementById('animated-svg-container');
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
container.appendChild(svg);

const points = [];
const numPoints = 100;
const radius = 2;

for (let i = 0; i < numPoints; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'rgba(255, 255, 255, 0.1)');
    svg.appendChild(circle);
    points.push({ x, y, circle });
}

const lines = [];
for (let i = 0; i < numPoints; i++) {
    for (let j = i + 1; j < numPoints; j++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', points[i].x);
        line.setAttribute('y1', points[i].y);
        line.setAttribute('x2', points[j].x);
        line.setAttribute('y2', points[j].y);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.05)');
        line.setAttribute('stroke-width', '1');
        svg.insertBefore(line, svg.firstChild);
        lines.push({ p1: points[i], p2: points[j], element: line });
    }
}

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    lines.forEach(line => {
        const dx1 = line.p1.x - mouseX;
        const dy1 = line.p1.y - mouseY;
        const dx2 = line.p2.x - mouseX;
        const dy2 = line.p2.y - mouseY;
        const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (dist1 < 200 && dist2 < 200) {
            const opacity = 1 - Math.min(dist1, dist2) / 200;
            line.element.setAttribute('stroke', `rgba(255, 77, 77, ${opacity})`);
        } else {
            line.element.setAttribute('stroke', 'rgba(255, 255, 255, 0.05)');
        }
    });
});

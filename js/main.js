import { HEROES } from './heroes.js';
import challenges from './challenges.js';

const heroContainer = document.getElementById('heroContainer');
const randomizeBtn = document.querySelector('.randomize-btn');
const updateChallengesBtn = document.getElementById('updateChallengesBtn');
const volumeSlider = document.querySelector('.volume-slider');
const volumeIcon = document.querySelector('.volume-icon');
const spinSound = new Audio('/dota/sound/spin.mp3');
const stopSound = new Audio('/dota/sound/stop.mp3');

let selectedHeroes = [];

function createHeroCard(hero, attribute) {
    const card = document.createElement('div');
    card.classList.add('option', attribute);
    card.dataset.heroName = hero.name;

    card.innerHTML = `
        <img src="${hero.image}" alt="${hero.name}" class="hero-image">
        <div class="attribute-info">
            <img src="${hero.image}" alt="${attribute}" class="attribute-icon">
            <span class="attribute-name">${attribute}</span>
        </div>
        <div class="challenge-display"></div>
        <div class="label">
            <div class="info">
                <span class="main">${hero.name}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => rerollSingleHero(card));

    return card;
}

function initializeApp() {
    const allHeroes = [...HEROES.strength, ...HEROES.agility, ...HEROES.intellect, ...HEROES.universal];
    const randomHeroes = getRandomHeroes(allHeroes, 4);

    randomHeroes.forEach(hero => {
        const attribute = getHeroAttribute(hero.name);
        const card = createHeroCard(hero, attribute);
        heroContainer.appendChild(card);
    });

    selectedHeroes = randomHeroes.map(hero => hero.name);
    updateChallenges();
}

function getRandomHeroes(heroes, count) {
    const shuffled = heroes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function getHeroAttribute(heroName) {
    if (HEROES.strength.some(hero => hero.name === heroName)) return 'strength';
    if (HEROES.agility.some(hero => hero.name === heroName)) return 'agility';
    if (HEROES.intellect.some(hero => hero.name === heroName)) return 'intellect';
    if (HEROES.universal.some(hero => hero.name === heroName)) return 'universal';
    return 'universal';
}

function updateChallenges() {
    const cards = document.querySelectorAll('.option');
    cards.forEach(card => {
        const challengeDisplay = card.querySelector('.challenge-display');
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        challengeDisplay.textContent = randomChallenge;
        challengeDisplay.style.display = 'flex';
    });
}

function randomizeHeroes() {
    const allHeroes = [...HEROES.strength, ...HEROES.agility, ...HEROES.intellect, ...HEROES.universal];
    const randomHeroes = getRandomHeroes(allHeroes, 4);

    heroContainer.innerHTML = '';
    randomHeroes.forEach(hero => {
        const attribute = getHeroAttribute(hero.name);
        const card = createHeroCard(hero, attribute);
        heroContainer.appendChild(card);
    });

    selectedHeroes = randomHeroes.map(hero => hero.name);
    updateChallenges();
}

function rerollSingleHero(card) {
    if (card.classList.contains('slot-spinning')) {
        return;
    }

    card.classList.add('slot-spinning');
    spinSound.play();

    setTimeout(() => {
        const allHeroes = [...HEROES.strength, ...HEROES.agility, ...HEROES.intellect, ...HEROES.universal];
        const newHero = getRandomHeroes(allHeroes, 1)[0];
        const newAttribute = getHeroAttribute(newHero.name);

        card.classList.remove('strength', 'agility', 'intellect', 'universal');
        card.classList.add(newAttribute);
        card.dataset.heroName = newHero.name;

        card.querySelector('.hero-image').src = newHero.image;
        card.querySelector('.hero-image').alt = newHero.name;
        card.querySelector('.attribute-icon').src = newHero.image;
        card.querySelector('.attribute-name').textContent = newAttribute;
        card.querySelector('.main').textContent = newHero.name;

        card.classList.remove('slot-spinning');
        card.classList.add('slot-landing');
        stopSound.play();

        setTimeout(() => {
            card.classList.remove('slot-landing');
        }, 500);
    }, 1000);
}

randomizeBtn.addEventListener('click', randomizeHeroes);
updateChallengesBtn.addEventListener('click', updateChallenges);

volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
    spinSound.volume = volume;
    stopSound.volume = volume;
});

initializeApp();

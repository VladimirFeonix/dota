const heroes = [
    "Abaddon", "Alchemist", "Ancient Apparition", "Anti-Mage", "Arc Warden", "Axe", "Bane", "Batrider", "Beastmaster", "Bloodseeker",
    "Bounty Hunter", "Brewmaster", "Bristleback", "Broodmother", "Centaur Warrunner", "Chaos Knight", "Chen", "Clinkz", "Clockwerk", "Crystal Maiden",
    "Dark Seer", "Dark Willow", "Dawnbreaker", "Dazzle", "Death Prophet", "Disruptor", "Doom", "Dragon Knight", "Drow Ranger", "Earth Spirit",
    "Earthshaker", "Elder Titan", "Ember Spirit", "Enchantress", "Enigma", "Faceless Void", "Grimstroke", "Gyrocopter", "Hoodwink", "Huskar",
    "Invoker", "Io", "Jakiro", "Juggernaut", "Keeper of the Light", "Kunkka", "Legion Commander", "Leshrac", "Lich", "Lifestealer",
    "Lina", "Lion", "Lone Druid", "Luna", "Lycan", "Magnus", "Marci", "Mars", "Medusa", "Meepo",
    "Mirana", "Monkey King", "Morphling", "Naga Siren", "Nature's Prophet", "Necrophos", "Night Stalker", "Nyx Assassin", "Ogre Magi", "Omniknight",
    "Oracle", "Outworld Destroyer", "Pangolier", "Phantom Assassin", "Phantom Lancer", "Phoenix", "Primal Beast", "Puck", "Pudge", "Pugna",
    "Queen of Pain", "Razor", "Riki", "Rubick", "Sand King", "Shadow Demon", "Shadow Fiend", "Shadow Shaman", "Silencer", "Skywrath Mage",
    "Slardar", "Slark", "Snapfire", "Sniper", "Spectre", "Spirit Breaker", "Storm Spirit", "Sven", "Techies", "Templar Assassin",
    "Terrorblade", "Tidehunter", "Timbersaw", "Tinker", "Tiny", "Treant Protector", "Troll Warlord", "Tusk", "Underlord", "Undying",
    "Ursa", "Vengeful Spirit", "Venomancer", "Viper", "Visage", "Void Spirit", "Warlock", "Weaver", "Windranger", "Winter Wyvern",
    "Witch Doctor", "Wraith King", "Zeus"
];

const heroDisplay = document.getElementById('hero-display');
const randomButton = document.getElementById('random-button');
const randomSound = new Audio('/dota/sound/random.mp3');

const challenges = [
    "Собрать Aghanim's Scepter до 20 минуты.",
    "Купить 5 Tango и отдать их своим союзникам.",
    "Сделать First Blood.",
    "Не умереть ни разу за игру.",
    "Собрать Divine Rapier.",
    "Сделать Rampage.",
    "Купить Boots of Travel до 15 минуты.",
    "Собрать 3 предмета с активной способностью.",
    "Нанести больше всех урона в команде.",
    "Вылечить больше всех в команде.",
    "Поставить больше всех вардов в команде.",
    "Сломать первым вражескую башню.",
    "Убить Рошана в одиночку.",
    "Собрать Hand of Midas до 10 минуты.",
    "Купить Blink Dagger до 12 минуты."
];

const challengesContainer = document.getElementById('challenges-container');

randomButton.addEventListener('click', () => {
    randomSound.currentTime = 0;
    randomSound.play();

    challengesContainer.innerHTML = '';

    let intervalCount = 0;
    const interval = setInterval(() => {
        intervalCount++;
        const randomIndex = Math.floor(Math.random() * heroes.length);
        heroDisplay.textContent = heroes[randomIndex];
        if (intervalCount > 20) {
            clearInterval(interval);
            displayChallenges();
        }
    }, 100);
});

function displayChallenges() {
    const selectedChallenges = [];
    while (selectedChallenges.length < 3) {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        const randomChallenge = challenges[randomIndex];
        if (!selectedChallenges.includes(randomChallenge)) {
            selectedChallenges.push(randomChallenge);
        }
    }

    selectedChallenges.forEach((challenge, index) => {
        const challengeCard = document.createElement('div');
        challengeCard.classList.add('challenge-card');
        challengeCard.textContent = challenge;
        challengeCard.style.animationDelay = `${index * 0.2}s`;
        challengesContainer.appendChild(challengeCard);
    });
}

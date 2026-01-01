lucide.createIcons();

/* ---------- FIREWORKS ---------- */
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createFirework(x, y) {
    const colors = ['#ff0044', '#ffdd00', '#00ccff'];
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        particles.push({
            x, y,
            vx: Math.cos(angle) * 3,
            vy: Math.sin(angle) * 3,
            life: 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

setInterval(() => {
    if (!document.getElementById('view-landing').classList.contains('hidden')) {
        createFirework(Math.random() * canvas.width, Math.random() * canvas.height / 2);
    }
}, 800);

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.02;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
    particles = particles.filter(p => p.life > 0);
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

/* ---------- MODAL ---------- */
let modalStep = 0;
const modalData = [
    { icon: "🎉", title: "Happy New Year 2026!", text: "Welcome to a new beginning!" },
    { icon: "🥂", title: "Fresh Start", text: "Ready to welcome 2026?" },
    { icon: "🚀", title: "Let’s Go!", text: "Make it unforgettable." }
];

function openModal() {
    document.getElementById('view-landing').classList.add('hidden');
    document.getElementById('view-modal').classList.remove('hidden');
    renderModal();
}

function renderModal() {
    const d = modalData[modalStep];
    document.getElementById('modal-content').innerHTML = `
        <div class="fade-in">
            <div class="text-4xl">${d.icon}</div>
            <h2 class="text-xl font-bold mt-2">${d.title}</h2>
            <p>${d.text}</p>
        </div>`;
}

function nextModalStep() {
    if (modalStep < 2) {
        modalStep++;
        renderModal();
    } else {
        startCelebration();
    }
}

function startCelebration() {
    document.getElementById('view-modal').classList.add('hidden');
    document.getElementById('view-celebration').classList.remove('hidden');
    document.getElementById('bgMusic').play().catch(() => {});
}

/* ---------- CURTAIN ---------- */
function openCurtain() {
    alert("🎊 Happy New Year 2026! 🎊");
}

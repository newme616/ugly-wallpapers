// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Create a rotating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Create floating text
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new THREE.TextGeometry('Ugly Wallpapers', {
        font: font,
        size: 0.5,
        height: 0.1,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-2, 2, 0);
    scene.add(textMesh);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Add some blinking text
const blinkingText = document.createElement('div');
blinkingText.textContent = 'Download Now!';
blinkingText.style.position = 'fixed';
blinkingText.style.top = '50%';
blinkingText.style.left = '50%';
blinkingText.style.transform = 'translate(-50%, -50%)';
blinkingText.style.fontSize = '36px';
blinkingText.style.fontWeight = 'bold';
blinkingText.style.color = '#ff0000';
document.body.appendChild(blinkingText);

setInterval(() => {
    blinkingText.style.visibility = blinkingText.style.visibility === 'hidden' ? 'visible' : 'hidden';
}, 500);

// Add cursor trail
const cursorTrail = document.createElement('div');
cursorTrail.style.position = 'fixed';
cursorTrail.style.width = '10px';
cursorTrail.style.height = '10px';
cursorTrail.style.borderRadius = '50%';
cursorTrail.style.backgroundColor = '#00ffff';
cursorTrail.style.pointerEvents = 'none';
document.body.appendChild(cursorTrail);

document.addEventListener('mousemove', (e) => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top = e.clientY + 'px';
});

// Add flying images
const flyingImages = ['💻', '🖥️', '📱', '🖱️', '⌨️'];
const flyingImagesContainer = document.getElementById('flying-images');

function createFlyingImage() {
    const img = document.createElement('div');
    img.textContent = flyingImages[Math.floor(Math.random() * flyingImages.length)];
    img.style.position = 'fixed';
    img.style.left = `${Math.random() * window.innerWidth}px`;
    img.style.top = `${Math.random() * window.innerHeight}px`;
    img.style.fontSize = '24px';
    img.style.pointerEvents = 'none';
    flyingImagesContainer.appendChild(img);

    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;

    function animateFlyingImage() {
        const x = parseFloat(img.style.left);
        const y = parseFloat(img.style.top);
        img.style.left = `${x + Math.cos(angle) * speed}px`;
        img.style.top = `${y + Math.sin(angle) * speed}px`;

        if (x < -50 || x > window.innerWidth + 50 || y < -50 || y > window.innerHeight + 50) {
            flyingImagesContainer.removeChild(img);
        } else {
            requestAnimationFrame(animateFlyingImage);
        }
    }

    animateFlyingImage();
}

setInterval(createFlyingImage, 1000);

// Add sparkles
const sparklesContainer = document.getElementById('sparkles');

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * window.innerWidth}px`;
    sparkle.style.top = `${Math.random() * window.innerHeight}px`;
    sparkle.style.animationDuration = `${0.5 + Math.random() * 1.5}s`;
    sparklesContainer.appendChild(sparkle);

    setTimeout(() => {
        sparklesContainer.removeChild(sparkle);
    }, 2000);
}

setInterval(createSparkle, 200);

// Rainbow text effect
const rainbowText = document.querySelector('h1');
const rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'];
let colorIndex = 0;

function animateRainbowText() {
    rainbowText.style.color = rainbowColors[colorIndex];
    colorIndex = (colorIndex + 1) % rainbowColors.length;
    requestAnimationFrame(animateRainbowText);
}

animateRainbowText();

// Bouncing download button
const downloadButtons = document.querySelectorAll('.wallpaper a');

downloadButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.animation = 'bounce 0.5s infinite';
    });

    button.addEventListener('mouseout', () => {
        button.style.animation = 'none';
    });
});
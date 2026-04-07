const glow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;

  glow.style.left = currentX - 100 + "px";
  glow.style.top = currentY - 100 + "px";

  requestAnimationFrame(animate);
}

animate();


const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

document.querySelector("main").addEventListener("scroll", revealOnScroll);


const sectionsGlow = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".brutal-nav a");

document.querySelector("main").addEventListener("scroll", () => {
  let current = "";

  sectionsGlow.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (document.querySelector("main").scrollTop >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

/* Work Card 3D Effect */
document.querySelectorAll(".work-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `
      perspective(500px)
      rotateX(${-(y - rect.height / 2) / 20}deg)
      rotateY(${(x - rect.width / 2) / 20}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});


const slider = document.querySelector('.work-slider');

document.getElementById('next').onclick = () => {
  slider.scrollBy({ left: 300, behavior: 'smooth' });
};

document.getElementById('prev').onclick = () => {
  slider.scrollBy({ left: -300, behavior: 'smooth' });
};



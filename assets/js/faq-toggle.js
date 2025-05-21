export function initFaqToggle(selector = ".brutal-faq-item") {
  const faqItems = document.querySelectorAll(selector);

  faqItems.forEach(item => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach(faq => {
        faq.classList.remove("active");
        faq.querySelector(".faq-content").style.display = "none";
        faq.querySelector(".faq-toggle").textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        item.querySelector(".faq-content").style.display = "block";
        item.querySelector(".faq-toggle").textContent = "−";
      }
    });
  });
}

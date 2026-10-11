// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link, .nav-contact");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMenu();
  } else {
    navLinks.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    document.body.classList.add("menu-open");
  }
});

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    closeMenu();
  }
});

// REVEAL ELEMENTS AS THEY ENTER THE SCREEN
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// UPDATE THE ACTIVE NAVIGATION LINK
const pageSections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// CONTACT FORM
// This opens the visitor's email application; it does not send email directly.
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const projectType = document.getElementById("project-type").value;
  const message = document.getElementById("message").value.trim();

  const subject = `Website project enquiry from ${name}`;

  const body = [
    `Hello Nana Yaa,`,
    "",
    `My name is ${name}.`,
    `My email address is ${email}.`,
    `Project type: ${projectType}.`,
    "",
    "Project details:",
    message,
    "",
    "I look forward to hearing from you."
  ].join("\n");

  const mailtoLink =
    `mailto:amoahowireduaamoah@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  formNote.textContent =
    "Opening your email app. If nothing happens, email me directly at amoahowireduaamoah@gmail.com.";

  window.location.href = mailtoLink;
});

// AUTOMATIC COPYRIGHT YEAR
document.getElementById("current-year").textContent =
  new Date().getFullYear();
/* ===== Agi Automobiles — shared behaviour ===== */

// mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("nav.links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  initCounters();
  initShopFilter();
  initConfigurator();
  initSpecChart();
  initGauge();
  initContactForm();
});

/* ---- animated stat counters (home) ---- */
function initCounters() {
  const nums = document.querySelectorAll(".stat .num[data-target]");
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach((n) => io.observe(n));
}

/* ---- shop page: filter by car type ---- */
function initShopFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cars = document.querySelectorAll(".car-card");
  if (!buttons.length || !cars.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const type = btn.dataset.type;
      cars.forEach((car) => {
        const match = type === "all" || car.dataset.type === type;
        car.classList.toggle("hidden", !match);
      });
    });
  });
}

/* ---- shop page: colour configurator on the featured car SVG ---- */
function initConfigurator() {
  const swatches = document.querySelectorAll(".swatch");
  const body = document.getElementById("configCarBody");
  if (!swatches.length || !body) return;

  swatches.forEach((sw) => {
    sw.addEventListener("click", () => {
      swatches.forEach((s) => s.classList.remove("active"));
      sw.classList.add("active");
      body.setAttribute("fill", sw.dataset.color);
    });
  });
}

/* ---- shop page: horsepower / mileage comparison chart ---- */
function initSpecChart() {
  const canvas = document.getElementById("specChart");
  if (!canvas || typeof Chart === "undefined") return;

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["Vega Hatchback", "Corsa Sedan", "Raptor SUV", "Bolt Sport"],
      datasets: [
        {
          label: "Horsepower (hp)",
          data: [82, 118, 168, 210],
          backgroundColor: "#e63946",
          borderRadius: 4,
        },
        {
          label: "Mileage (km/l)",
          data: [21, 17, 13, 10],
          backgroundColor: "#f2a93b",
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#eceff2" } },
        title: { display: false },
      },
      scales: {
        x: { ticks: { color: "#8b96a1" }, grid: { color: "#2a323b" } },
        y: { ticks: { color: "#8b96a1" }, grid: { color: "#2a323b" }, beginAtZero: true },
      },
    },
  });
}

/* ---- services page: canvas dyno gauge, before/after tuning ---- */
function initGauge() {
  const canvas = document.getElementById("gaugeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const buttons = document.querySelectorAll(".gauge-toggle button");

  const draw = (value, max, color) => {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h * 0.85, r = w * 0.4;
    const startAngle = Math.PI, endAngle = 2 * Math.PI;

    // track
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#2a323b";
    ctx.stroke();

    // value arc
    const frac = Math.min(value / max, 1);
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, startAngle + frac * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.stroke();

    // needle label
    ctx.fillStyle = "#eceff2";
    ctx.font = "700 28px Rajdhani, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${value} hp`, cx, cy - 14);
    ctx.fillStyle = "#8b96a1";
    ctx.font = "400 13px Inter, sans-serif";
    ctx.fillText("at the wheel", cx, cy + 10);
  };

  draw(96, 220, "#8b96a1");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("btn-primary"));
      buttons.forEach((b) => b.classList.add("btn-ghost"));
      btn.classList.remove("btn-ghost");
      btn.classList.add("btn-primary");
      if (btn.dataset.state === "before") draw(96, 220, "#8b96a1");
      else draw(178, 220, "#e63946");
    });
  });
}

/* ---- contact page: lightweight client-side validation ---- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll("[data-required]").forEach((field) => {
      const wrapper = field.closest(".field");
      const filled = field.value.trim().length > 0;
      const emailOk = field.type !== "email" || /^\S+@\S+\.\S+$/.test(field.value);
      const ok = filled && emailOk;
      wrapper.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });

    const status = document.getElementById("formStatus");
    if (valid) {
      status.textContent = "Thanks — your enquiry has been noted. Our team will call you back shortly.";
      status.classList.add("show", "ok");
      form.reset();
    } else {
      status.classList.remove("show");
    }
  });
}

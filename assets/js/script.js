// --------- Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// --------- Mobile menu
const hamburger = $("#hamburger");
const mobileMenu = $("#mobileMenu");
hamburger?.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});
$$("#mobileMenu a").forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.remove("show"))
);

// --------- Smooth scroll
$$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// --------- Hero progress animation
const readyBar = $("#readyBar");
const readyPct = $("#readyPct");
let target = 92;
setTimeout(() => {
    readyBar.style.width = target + "%";
    let n = 0;
    const t = setInterval(() => {
        n += 2;
        if (n >= target) {
            n = target;
            clearInterval(t);
        }
        readyPct.textContent = n + "%";
    }, 20);
}, 450);

// --------- Reveal on scroll
const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("show");
                io.unobserve(e.target);
            }
        });
    },
    { threshold: 0.12 }
);
$$(".reveal").forEach((el) => io.observe(el));

// --------- Counter animation
const counters = $$(".num[data-count]");
const io2 = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const end = parseFloat(el.dataset.count || "0");
            const isFloat = String(end).includes(".");
            const duration = 1100;
            const start = performance.now();

            const tick = (now) => {
                const p = Math.min((now - start) / duration, 1);
                const val = end * (0.08 + 0.92 * p);
                el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = isFloat ? end.toFixed(1) : String(end);
            };
            requestAnimationFrame(tick);
            io2.unobserve(el);
        });
    },
    { threshold: 0.25 }
);
counters.forEach((c) => io2.observe(c));

// --------- FAQ accordion
$$(".qa button").forEach((btn) => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".qa");
        const isOpen = card.classList.contains("open");
        // close others (optional)
        $$(".qa").forEach((x) => x.classList.remove("open"));
        if (!isOpen) card.classList.add("open");
    });
});

// --------- Contact form demo
$("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#formHint").textContent =
        "✅ Message captured (demo). Connect backend to actually send.";
    $("#formHint").style.color = "rgba(34, 197, 94, 0.9)";
    e.target.reset();
});

// --------- Demo call/email actions
$("#btnCall").addEventListener("click", () => {
    alert("+8809638336699");
});
$("#btnEmail").addEventListener("click", () => {
    window.location.href =
        "mailto:info.app360studio@gmail.com?subject=Project%20Inquiry&body=Hi%20team,%0A%0AI%20want%20to%20build%20a%20mobile%20app.%20Here%20is%20my%20brief:%0A";
});

// --------- Footer year
$("#year").textContent = new Date().getFullYear();

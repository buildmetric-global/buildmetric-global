const areaInput = document.getElementById("area");
const rateInput = document.getElementById("rate");
const currencySelect = document.getElementById("currency");
const estimateOutput = document.getElementById("estimate");
const estimateNote = document.getElementById("estimateNote");
const currencyPrefix = document.getElementById("currencyPrefix");

function calculateEstimate() {
  const area = Number(areaInput.value);
  const rate = Number(rateInput.value);
  const currency = currencySelect.value;
  if (!Number.isFinite(area) || !Number.isFinite(rate) || area <= 0 || rate <= 0) {
    estimateOutput.textContent = "Enter valid values";
    estimateNote.textContent = "Area and rate must both be greater than zero.";
    return;
  }
  const total = area * rate;
  estimateOutput.textContent = `${currency} ${new Intl.NumberFormat("en-US", {maximumFractionDigits: 2}).format(total)}`;
  estimateNote.textContent = `${area.toLocaleString("en-US")} m² × ${currency} ${rate.toLocaleString("en-US")} per m²`;
}
document.getElementById("calculate").addEventListener("click", calculateEstimate);
currencySelect.addEventListener("change", () => { currencyPrefix.textContent = currencySelect.value; calculateEstimate(); });
[areaInput, rateInput].forEach(input => input.addEventListener("input", calculateEstimate));
calculateEstimate();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

// Replace this placeholder with your real business email before publishing.
const BUSINESS_EMAIL = "hello@buildmetric.example";
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`BuildMetric enquiry: ${form.get("service")}`);
  const body = encodeURIComponent(
    `Name: ${form.get("name")}\nEmail: ${form.get("email")}\nService: ${form.get("service")}\n\nProject details:\n${form.get("details")}`
  );
  if (BUSINESS_EMAIL.endsWith(".example")) {
    document.getElementById("formHint").textContent = "Demo form: before publishing, replace hello@buildmetric.example in script.js with your real business email. Then this form will open a pre-filled email.";
    return;
  }
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});

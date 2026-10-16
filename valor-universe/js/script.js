// ===== EDIT THESE TWO LINES =====
const WHATSAPP_NUMBER = "2340000000000"; // country code + number, no + or spaces
const EMAIL = "hello@valoruniverse.com";
// ================================

const form = document.getElementById("orderForm");
const msg = document.getElementById("msg");
document.getElementById("yr").textContent = new Date().getFullYear();
document.getElementById("waLink").href = "https://wa.me/" + WHATSAPP_NUMBER;
document.getElementById("waLink").textContent = "+" + WHATSAPP_NUMBER;
document.getElementById("mailLink").href = "mailto:" + EMAIL;
document.getElementById("mailLink").textContent = EMAIL;

// "Order" links on collections pre-select the category
document.querySelectorAll("[data-pick]").forEach(a =>
  a.addEventListener("click", () => { form.category.value = a.dataset.pick; }));

function buildMessage() {
  let ok = true;
  [...form.elements].forEach(el => {
    if (el.required) { const bad = !el.value.trim(); el.classList.toggle("bad", bad); if (bad) ok = false; }
  });
  if (!ok) { msg.className = "msg"; msg.textContent = "Please fill in the highlighted fields."; return null; }
  const d = Object.fromEntries(new FormData(form));
  return `New order from Valor Universe website\n\nName: ${d.name}\nPhone: ${d.phone}\nCategory: ${d.category}\nOrder: ${d.details}\nDelivery address: ${d.address}`;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = buildMessage(); if (!text) return;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  msg.className = "msg ok"; msg.textContent = "Your order is ready in WhatsApp. Tap send to complete it.";
});

document.getElementById("emailBtn").addEventListener("click", () => {
  const text = buildMessage(); if (!text) return;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New order")}&body=${encodeURIComponent(text)}`;
  msg.className = "msg ok"; msg.textContent = "Your email app should open with the order filled in.";
});

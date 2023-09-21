export function escapeHTML(unsafeText) {
  let div = document.createElement("div");
  div.textContent = unsafeText;
  return div.innerHTML;
}

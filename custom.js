document.getElementById("customForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const phoneNumber = "918590033956"; // your WhatsApp number

  const productType = document.getElementById("productType").value;
  const color = document.getElementById("color").value;
  const size = document.getElementById("size").value;
  const quantity = document.getElementById("quantity").value;
  const deadline = document.getElementById("deadline").value;
  const notes = document.getElementById("notes").value;

  let message =
`Hello,

I would like to request a custom crochet order.

Details:
• Product Type: ${productType}
• Color Preference: ${color || "Not specified"}
• Size: ${size || "Not specified"}
• Quantity: ${quantity || "1"}
• Required By: ${deadline || "Flexible"}

Additional Notes:
${notes || "None"}

Please let me know the feasibility, pricing, and timeline.
Thank you.`;

  const url = `https://wa.me/${8590033956}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

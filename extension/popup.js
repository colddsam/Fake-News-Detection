
const script = document.createElement('script');
script.src = chrome.runtime.getURL("config.js");
script.onload = () => {
  console.log("API Endpoint:", API_BASE);
};

document.head.appendChild(script);

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedTab = btn.dataset.tab;
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tab === selectedTab);
    });
    document.querySelectorAll(".tab-btn").forEach((button) => {
      button.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

function showResult(html) {
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = html;
}

document.getElementById("textForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("textInput").value;
  showResult("🔍 Analyzing...");

  try {
    const res = await fetch(`${API_BASE}/verify_text_news`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    const data = await res.json();
    showResult(`
      <p class="font-semibold">${data.verdict === "Likely True" ? "✅ Likely True" : "🚨 Possibly Fake"}</p>
      <p><strong>Truth Score:</strong></p>
      <div class="truth-score-bar-container">
        <div class="truth-score-bar" style="width: ${data.truth_score}%; ">
          ${data.truth_score.toFixed(1)}%
        </div>
      </div>
      <p><strong>Reason:</strong> ${data.reason}</p>
      <div>
        <strong>Evidence Links:</strong>
        <ul style="padding-left: 1.2em; margin-top: 0.4em;">
          ${data.evidence_links
            .map(
              (link) =>
                `<li style="margin-bottom: 0.3em;">
                   <a href="${link}" target="_blank" rel="noopener noreferrer" style="color:#007bff; text-decoration: underline;">
                     ${link}
                   </a>
                 </li>`
            )
            .join('')}
        </ul>
      </div>
    `);
    
    
    
    
  } catch {
    showResult(`<span class="text-red-600">❌ Error verifying text.</span>`);
  }
});

document.getElementById("socialForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const link = document.getElementById("socialLink").value;
  const claim = document.getElementById("socialClaim").value;
  const option = document.querySelector('input[name="socialOption"]:checked').value;
  showResult("🔍 Analyzing...");

  try {
    const res = await fetch(`${API_BASE}/verify_social_news`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: link,
        claim: claim,
        type: option,
      }),
    });
    const data = await res.json();
    showResult(`
      <p class="font-semibold">${data.verdict === "Likely True" ? "✅ Likely True" : "🚨 Possibly Fake"}</p>
      <p><strong>Truth Score:</strong></p>
      <div class="truth-score-bar-container">
        <div class="truth-score-bar" style="width: ${data.truth_score}%; ">
          ${data.truth_score.toFixed(1)}%
        </div>
      </div>
      <p><strong>Reason:</strong> ${data.reason}</p>
      <div>
        <strong>Evidence Links:</strong>
        <ul style="padding-left: 1.2em; margin-top: 0.4em;">
          ${data.evidence_links
            .map(
              (link) =>
                `<li style="margin-bottom: 0.3em;">
                   <a href="${link}" target="_blank" rel="noopener noreferrer" style="color:#007bff; text-decoration: underline;">
                     ${link}
                   </a>
                 </li>`
            )
            .join('')}
        </ul>
      </div>
    `);
    
    
    
    
  } catch {
    showResult(`<span class="text-red-600">❌ Error verifying social news.</span>`);
  }
});

document.getElementById("imageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("imageFile");
  const claim = document.getElementById("imageClaim").value;
  showResult("🔍 Analyzing...");

  try {
    const formdata = new FormData();
    formdata.append("file", fileInput.files[0]);
    formdata.append("query", claim);

    const res = await fetch(`${API_BASE}/verify_image_news`, {
      method: 'POST',
      body: formdata,
    });
    const data = await res.json();

    showResult(`
      <p class="font-semibold">${data.verdict === "Likely True" ? "✅ Likely True" : "🚨 Possibly Fake"}</p>
      <p><strong>Truth Score:</strong></p>
      <div class="truth-score-bar-container">
        <div class="truth-score-bar" style="width: ${data.truth_score}%; ">
          ${data.truth_score.toFixed(1)}%
        </div>
      </div>
      <p><strong>Reason:</strong> ${data.reason}</p>
      <div>
        <strong>Evidence Links:</strong>
        <ul style="padding-left: 1.2em; margin-top: 0.4em;">
          ${data.evidence_links
            .map(
              (link) =>
                `<li style="margin-bottom: 0.3em;">
                   <a href="${link}" target="_blank" rel="noopener noreferrer" style="color:#007bff; text-decoration: underline;">
                     ${link}
                   </a>
                 </li>`
            )
            .join('')}
        </ul>
      </div>
    `);
    
    
    
    
  } catch (error) {
    showResult(`<span class="text-red-600">❌ Error verifying image and claim.</span>`);
    console.error(error);
  }
});


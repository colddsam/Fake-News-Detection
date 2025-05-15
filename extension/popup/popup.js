document.getElementById('checkPage').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'analyzePage' });
  });
  
  document.getElementById('checkSelection').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'analyzeSelection' });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'analysisResults') {
      displayResults(message.data);
    } else if (message.type === 'loading') {
      document.getElementById('loading').style.display = 'block';
    }
  });
  
  function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    document.getElementById('loading').style.display = 'none';
    
    resultsDiv.innerHTML = `
      <h3>Analysis Results</h3>
      <div class="score">Truth Score: ${data.truth_score}/100</div>
      <div class="verdict ${getVerdictClass(data.truth_score)}">
        Verdict: ${data.verdict}
      </div>
      <p>${data.reason}</p>
      ${data.evidence_links.length ? `
        <h4>Supporting Evidence:</h4>
        <ul class="evidence-list">
          ${data.evidence_links.map(link => `
            <li><a href="${link}" target="_blank">${new URL(link).hostname}</a></li>
          `).join('')}
        </ul>
      ` : ''}
    `;
  }
  
  function getVerdictClass(score) {
    if (score >= 70) return 'trustworthy';
    if (score >= 40) return 'questionable';
    return 'untrustworthy';
  }
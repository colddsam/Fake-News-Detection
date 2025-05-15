chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'analyzePage') {
      analyzePageContent();
    } else if (message.action === 'analyzeSelection') {
      analyzeSelectedText();
    }
  });
  
  async function analyzePageContent() {
    chrome.runtime.sendMessage({ type: 'loading' });
    
    const pageContent = {
      title: document.title,
      url: window.location.href,
      text: getMainPageText(),
      images: getPageImages()
    };
  
    const result = await sendToBackend(pageContent);
    chrome.runtime.sendMessage({ type: 'analysisResults', data: result });
  }
  
  async function analyzeSelectedText() {
    const selection = window.getSelection().toString().trim();
    if (!selection) {
      alert('Please select some text first');
      return;
    }
  
    chrome.runtime.sendMessage({ type: 'loading' });
    
    const result = await sendToBackend({
      text: selection,
      url: window.location.href
    });
    
    chrome.runtime.sendMessage({ type: 'analysisResults', data: result });
  }
  
  function getMainPageText() {
    // Extract main content (simplified - consider using Readability.js)
    const paragraphs = Array.from(document.querySelectorAll('p, article'))
      .map(el => el.textContent.trim())
      .filter(text => text.length > 50);
    return paragraphs.join('\n\n');
  }
  
  function getPageImages() {
    return Array.from(document.images)
      .filter(img => img.naturalWidth > 100 && img.naturalHeight > 100)
      .map(img => ({
        src: img.src,
        alt: img.alt
      }));
  }
  
  async function sendToBackend(data) {
    try {
      const response = await fetch('https://your-api-domain.com/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('Analysis failed:', error);
      return {
        truth_score: 0,
        verdict: 'Error',
        reason: 'Failed to analyze content',
        evidence_links: []
      };
    }
  }
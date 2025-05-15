// Context menu integration
chrome.contextMenus.create({
    id: 'verifyText',
    title: 'Verify with Fake News Detector',
    contexts: ['selection']
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'verifyText') {
      chrome.tabs.sendMessage(tab.id, { action: 'analyzeSelection' });
    }
  });
  
  // Handle extension installation
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Fake News Detector extension installed');
  });
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  // Monitor and optimize memory usage by discarding inactive tabs
  chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
      chrome.tabs.query({}, tabs => {
        tabs.forEach(t => {
          if (t.id !== activeInfo.tabId && !t.active) {
            chrome.tabs.discard(t.id);
          }
        });
      });
    });
  });
  
  // Real-time phishing detection
  chrome.webNavigation.onCompleted.addListener(details => {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      function: detectPhishing
    });
  });
  
  function detectPhishing() {
    const phishingPatterns = ["phishing.com", "malicious.com"]; // Add more patterns as needed
    if (phishingPatterns.some(pattern => window.location.href.includes(pattern))) {
      alert('Warning: This site may be a phishing site!');
    }
  }
  
  // Tab management: Group similar tabs and search tabs
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "groupTabs") {
      chrome.tabs.query({}, tabs => {
        const groups = {};
        tabs.forEach(tab => {
          const domain = new URL(tab.url).hostname;
          if (!groups[domain]) {
            groups[domain] = [];
          }
          groups[domain].push(tab.id);
        });
  
        for (const domain in groups) {
          chrome.tabs.group({ tabIds: groups[domain] });
        }
      });
    }
    // popup.js
document.getElementById('searchTabs').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    console.log("Searching for tabs with query:", query);
    chrome.runtime.sendMessage({ action: "searchTabs", query: query }, response => {
      console.log("Search response:", response);
      const resultsDiv = document.getElementById('searchResults');
      resultsDiv.innerHTML = '';
      response.forEach(tab => {
        const tabDiv = document.createElement('div');
        tabDiv.textContent = tab.title;
        resultsDiv.appendChild(tabDiv);
      });
    });
  });
  
  
    if (message.action === "searchTabs") {
      chrome.tabs.query({ title: message.query }, tabs => {
        sendResponse(tabs);
      });
      return true; // Indicates we want to send a response asynchronously
    }
  });
  
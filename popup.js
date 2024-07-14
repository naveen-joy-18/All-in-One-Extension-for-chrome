document.getElementById('groupTabs').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "groupTabs" });
  });
  
  document.getElementById('searchTabs').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    chrome.runtime.sendMessage({ action: "searchTabs", query: query }, response => {
      const resultsDiv = document.getElementById('searchResults');
      resultsDiv.innerHTML = '';
      response.forEach(tab => {
        const tabDiv = document.createElement('div');
        tabDiv.textContent = tab.title;
        resultsDiv.appendChild(tabDiv);
      });
    });
  });
  
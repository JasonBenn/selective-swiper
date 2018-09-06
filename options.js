var defaultKeywordString = "harvard stanford phd\nfounder CEO CTO artist writer composer\nphysics ai economics math quantum philosophy"

chrome.storage.sync.get('keywordString', data => {
  var textArea = document.getElementById('keywordString')

  var keywordString = data.keywordString || defaultKeywordString

  textArea.value = keywordString
  textArea.innerHTML = keywordString
  chrome.storage.sync.set({ keywordString: keywordString });
})

document.getElementById('save').onclick = () => {    
  var keywordString = document.getElementById('keywordString').value
  chrome.storage.sync.set({ keywordString: keywordString });
  console.log('saved keywordString:', keywordString)
}

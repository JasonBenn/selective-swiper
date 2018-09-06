console.log('starting...')
document.getElementById('save').onclick = () => {
  var keywords = document.getElementById('keywords').value.split(' ')
  chrome.storage.sync.set({ keywords: keywords });
  console.log('saved keywords:', keywords)
}

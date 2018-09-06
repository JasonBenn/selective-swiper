console.log('starting...')
document.getElementById('save').onclick = () => {
  var keywords = document.getElementById('keywords').value.split(' ').filter(x => x)
  chrome.storage.sync.set({ keywords: keywords });
  console.log('saved keywords:', keywords)
}

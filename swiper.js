chrome.storage.sync.get('keywordString', data => {
  var keywords = data.keywordString.split(/[\n ]/).filter(x => x)
  console.log('keywords:', keywords)
  var rightSwipes = 0
  var leftSwipes = 0

  var outOfSwipesModal = () => {
    return Array.from(document.getElementsByClassName("button")).find(el => el.textContent.toLowerCase().includes("no thanks"))
  }

  var maybeClickThroughMatchDialog = () => {
    var keepSwipingButton = Array.from(document.getElementsByClassName("button")).find(el => el.textContent.toLowerCase().includes("keep swiping"))

    if (keepSwipingButton) {
      keepSwipingButton.click()
    }
  }

  var openProfile = () => {
    var profile = document.getElementsByClassName("StretchedBox StretchedBox::a")[0]
    if (!profile) {
      setTimeout(openProfile, Math.random() * 500)
    } else {
      profile.click()
    }
  }

  var selectivelySwipe = () => {
    maybeClickThroughMatchDialog()
    openProfile()

    var text = document.getElementsByClassName("profileCard__card Expand")[0].textContent.toLowerCase()
    
    var match = keywords.find(keyword => {
      return RegExp(keyword).exec(text)
    })
    
    var nextSwipeTimeout = Math.max(Math.random() * 200 + 400, Math.random() * 5000)

    if (match) {

      var button = document.getElementsByClassName("recsGamepad__button--like")[0]
      if (button) {
        button.click()
        rightSwipes += 1
      }

      if (outOfSwipesModal()) {
        rightSwipes -= 1
        alert("Out of swipes - try again tomorrow!\n\nStats:\nRight swipes: " + rightSwipes + "\nLeft swipes: " + leftSwipes)
      } else {
        setTimeout(selectivelySwipe.bind(this), nextSwipeTimeout)
      }

    } else {
      var button = document.getElementsByClassName("recsGamepad__button--dislike")[0]
      if (button) {
        button.click()
        leftSwipes += 1
      }
      setTimeout(selectivelySwipe.bind(this), nextSwipeTimeout)
    }

  }

  selectivelySwipe()

})

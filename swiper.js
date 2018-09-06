chrome.storage.sync.get('keywordString', data => {
  var keywords = data.keywordString.split(/[\n ]/).filter(x => x)
  console.log('keywords:', keywords)
  var rightSwipes = 0
  var leftSwipes = 0
  var interval

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
      setTimeout(openProfile, 500)
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
    
    if (match) {
      document.getElementsByClassName("recsGamepad__button--like")[0].click()

      if (outOfSwipesModal()) {
        clearInterval(interval)
        alert("Out of swipes - try again tomorrow!\n\nStats:\nRight swipes: " + rightSwipes + "\nLeft swipes: " + leftSwipes)
      }

      rightSwipes += 1
    } else {
      document.getElementsByClassName("recsGamepad__button--dislike")[0].click()
      leftSwipes += 1
    }

  }

  interval = setInterval(selectivelySwipe, 1000)

})

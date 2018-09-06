var keywords = ["harvard", "yale", "princeton", "stanford", "mit", "neuro", "phd", "entrepreneur", "founder", "CEO", "CTO", "physics", "astro", "artist", "COO", "chief of staff", "ai", "google brain", "deepmind", "economics", "math", "quantum", "writer", "composer", "philosophy"]

var rightSwipes = 0
var leftSwipes = 0
var interval

var outOfSwipesModal = () => {
  var modal = document.getElementsByClassName("modalManager StretchedBox CenterAlign")[0]
  if (modal) {
    return modal.textContent.includes("Get Tinder Plus")
  }
}

var maybeClickThroughMatchDialog = () => {
  // var keepSwipingButton = document.getElementsByClassName("button Lts($ls-s) Z(0) Cur(p) Tt(u) Ell Bdrs(100px) Px(24px) Py(0) H(54px) Mih(54px) Lh(50px) button--outline Bdw(2px) Bds(s) Trsdu($fast) Bdc($c-gray) C($c-gray) Bdc($c-base):h C($c-base):h Fw($semibold) Bdc($c-pink) Bdc($c-orange):h C(#fff)!:h Bg(t):h W(100%) D(b) C(#fff) Bg(t) Mt(24px) Mt(12px)--xs Mt(10px)--lsh")[0]

  var keepSwipingButton = document.getElementsByClassName("button button--outline Bdc($c-gray) C($c-gray) Bdc($c-base):h C($c-base):h Fw($semibold) Bdc($c-pink) Bdc($c-orange):h C(#fff)!:h Bg(t):h C(#fff)")[0]

  if (keepSwipingButton) {
    keepSwipingButton[0].click()
  }
}

var waitFor = selector => {
  var el = document.getElementsByClassName(selector)[0]
  if (el) {
    return el
  } else {
    setTimeout(() => {
      waitFor(selector)
    })
  }
}

var openProfile = () => {
  document.getElementsByClassName("StretchedBox StretchedBox::a Cnt($blank)::a")[0].click()
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
    rightSwipes += 1
  } else {
    document.getElementsByClassName("recsGamepad__button--dislike")[0].click()
    leftSwipes += 1
  }

  if (outOfSwipesModal()) {
    clearInterval(interval)
    alert("Out of swipes - try again tomorrow!\n\nStats:\nRight swipes: " + rightSwipes + "\nLeft swipes: " + leftSwipes)
  }

}

interval = setInterval(selectivelySwipe, 1000)

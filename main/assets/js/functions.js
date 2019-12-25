$(window).on('load', function () {
  setTimeout(function () {
    $('.loader').fadeOut();
    $('.hidding').fadeIn();
  }, 500);
});
$(document).ready(function () {
  // DOMMouseScroll included for firefox support
  var canScroll = true,
    scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function (e) {
    if (!($('.outer-nav').hasClass('is-vis'))) {
      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;
      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function () {
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function () {
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }
    }
  });
  $('.side-nav li, .outer-nav li').click(function () {
    if (!($(this).hasClass('is-active'))) {
      var $this = $(this),
        curActive = $this.parent().find('.is-active'),
        curPos = $this.parent().children().index(curActive),
        nextPos = $this.parent().children().index($this),
        lastItem = $(this).parent().children().length - 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  });
  $('.cta').click(function () {
    window.location.href = 'register.html';
  });
  $('.ctaevent').click(function () {
    var curActive = $('.side-nav').find('.is-active'),
      curPos = $('.side-nav').children().index(curActive),
      lastItem = $('.side-nav').children().length - 4,
      nextPos = lastItem;
    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);
  });
  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
    mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function (e) {
    updateHelper(e);
  });
  $(document).keyup(function (e) {
    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }
  });
  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {
    var curActive = $('.side-nav').find('.is-active'),
      curPos = $('.side-nav').children().index(curActive),
      lastItem = $('.side-nav').children().length - 1,
      nextPos = 0;
    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0) {
      if (curPos !== 0) {
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
  }
  // sync side and outer navigations
  function updateNavs(nextPos) {
    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');
  }
  // update main content area
  function updateContent(curPos, nextPos, lastItem) {
    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');
    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }
    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }
  }
  function outerNav() {
    $('.header--nav-toggle').click(function () {
      $('.perspective').addClass('perspective--modalview');
      setTimeout(function () {
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');
    });
    $('.outer-nav--return, .outer-nav li').click(function () {
      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function () {
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');
    });
  }
  outerNav();
});


var firebaseConfig = {
  apiKey: "AIzaSyB3pGNF3fdjyT-X9ZXeSAotvyBv2mrkvlo",
  authDomain: "techxposure-2019.firebaseapp.com",
  databaseURL: "https://techxposure-2019.firebaseio.com",
  projectId: "techxposure-2019",
  storageBucket: "techxposure-2019.appspot.com",
  messagingSenderId: "1082992539334",
  appId: "1:1082992539334:web:de9de8033b4a474c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


$('#msgform').on('submit', (e) => {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var message = document.getElementById('message').value;

  firebase.database().ref('messages/' + Date.now()).set({
    name: name,
    email: email,
    phone: phone,
    message: message
  }).then(() => {
    console.log('Success!');
    document.getElementById('successMessage').classList.remove('is-hidden');
    document.getElementById('msgform').classList.add('is-hidden');
    document.getElementById('regtitle').classList.add('is-hidden');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });
})

$('.abouttxp').click(function (e) {
  if (e.detail == 5) {
    window.location.href = "games/tiles.html";
  }
});

$('.oursponsors').click(function (e) {
  if (e.detail == 5) {
    window.location.href = "games/tower.html";
  }
});

$('.txptitle').click(function (e) {
  if (e.detail == 5) {
    window.location.href = "games/2048.html";
  }
});

$('.technology').click(function (e) {
  if (e.detail == 5) {
    window.location.href = "games/math.html";
  }
});

function detectDoubleclick(element, time) {
  if (typeof window.ontouchstart !== 'undefined') {
    $('.' + element).click(function () {
      if (time == 0) {
        console.log("first click");
        time = new Date().getTime();
      }
      else {
        if (((new Date().getTime()) - time) < 8000) {
          time = 0;
          window.location.href = "events.html#" + element;
        }
        else {
          time = new Date().getTime();
        }
      }
      return false;
    })

  }
  else {
    $('.' + element).click(function () {
      window.location.href = "events.html#" + element;
    })
  }
}
var cats = document.getElementById("events").children;
for(var i=0;i<cats.length;i++){
  detectDoubleclick(cats[i].id,0);
}

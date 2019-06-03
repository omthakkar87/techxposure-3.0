$(window).load(function () {
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
      e.preventDefault();
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
    // var curActive = $('.side-nav').find('.is-active'),
    //   curPos = $('.side-nav').children().index(curActive),
    //   lastItem = $('.side-nav').children().length - 1,
    //   nextPos = lastItem;
    // updateNavs(lastItem);
    // updateContent(curPos, nextPos, lastItem);
    window.location.href = 'register.html';
  });
  $('.ctaevent').click(function () {
    // var curActive = $('.side-nav').find('.is-active'),
    //   curPos = $('.side-nav').children().index(curActive),
    //   lastItem = $('.side-nav').children().length - 4,
    //   nextPos = lastItem;
    // updateNavs(lastItem);
    // updateContent(curPos, nextPos, lastItem);
    window.location.href = 'register.html';
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


$('#msgform').on('submit',(e)=>{
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






var counttiles = 0;
$('.abouttxp').click(function () {
  counttiles += 1;
  if (counttiles == 7) {
    console.log("7 Taps");
    window.location.replace("games/tiles.html");
  }
});

var counttower = 0;
$('.oursponsors').click(function () {
  counttower += 1;
  if (counttower == 7) {
    console.log("7 Taps");
    window.location.replace("games/tower.html");
  }
});

var count2048 = 0;
$('.txptitle').click(function () {
  count2048 += 1;
  if (count2048 == 7) {
    console.log("7 Taps");
    window.location.replace("games/2048.html");
  }
});

var countmath = 0;
$('.tech').click(function () {
  countmath += 1;
  if (countmath == 7) {
    console.log("7 Taps");
    window.location.replace("games/math.html");
  }
});

if (typeof window.ontouchstart !== 'undefined') {
  var funtime = 0;
  $('.fun').click(function () {
    if (funtime == 0) {
      //set first click
      console.log("first click");
      funtime = new Date().getTime();
    }
    else {
      //compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - funtime) < 8000) {
        //double click occurred
        funtime = 0;
        window.location.href = "events.html#fun";
      }
      else {
        //not a double click so set as a new first click
        funtime = new Date().getTime();
      }
    }
    return false;
  });

  var techtime = 0;
  $('.tech').click(function () {
    if (techtime == 0) {
      //set first click
      console.log("first click");
      techtime = new Date().getTime();
    }
    else {
      //compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - techtime) < 8000) {
        //double click occurred
        techtime = 0;
        window.location.href = "events.html#tech";
      }
      else {
        //not a double click so set as a new first click
        techtime = new Date().getTime();
      }
    }
    return false;
  });

  var culturaltime = 0;
  $('.cultural').click(function () {
    if (culturaltime == 0) {
      //set first click
      console.log("first click");
      culturaltime = new Date().getTime();
    }
    else {
      //compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - culturaltime) < 8000) {
        //double click occurred
        culturaltime = 0;
        window.location.href = "events.html#cultural";
      }
      else {
        //not a double click so set as a new first click
        culturaltime = new Date().getTime();
      }
    }
    return false;
  });

  var gamingtime = 0;
  $('.gaming').click(function () {
    if (gamingtime == 0) {
      //set first click
      console.log("first click");
      gamingtime = new Date().getTime();
    }
    else {
      //compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - gamingtime) < 1000) {
        //double click occurred
        gamingtime = 0;
        window.location.href = "events.html#gaming";
      }
      else {
        //not a double click so set as a new first click
        gamingtime = new Date().getTime();
      }
    }
    return false;
  });

}
else {
  $('.fun').click(function () {
    window.location.href = "events.html#fun";
  });
  $('.tech').click(function () {
    window.location.href = "events.html#tech";
  });
  $('.cultural').click(function () {
    window.location.href = "events.html#cultural";
  });
  $('.gaming').click(function () {
    window.location.href = "events.html#gaming";
  });
}

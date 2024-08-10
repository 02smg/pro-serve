document.addEventListener("DOMContentLoaded", function () {
  handleGnb();
  handleScrollHeader();
  setupAlertPopup();
  setupAnchorScrolling();
});

function handleGnb() {
  const gnbTrigger = document.querySelector('.gnb-trigger');
  const gnb = document.querySelector('.gnb')
  gnbTrigger.addEventListener('click', function () {
    gnbTrigger.classList.toggle('on')
    gnb.classList.toggle('on');
  })
}

function handleScrollHeader() {
  let isScrolling; // 스크롤 상태 플래그
  let lastScrollTop = 0; // 마지막 스크롤 위치
  const scrollThreshold = 5; // 스크롤 감지 임계값
  const header = document.querySelector('.headerBody'); // 헤더 요소
  const headerHeight = header.offsetHeight; // 헤더 높이

  window.onscroll = function () {
    isScrolling = true;
  };

  setInterval(function () {
    if (isScrolling) {
      checkScrollPosition();
      isScrolling = false;
    }
  }, 250);

  function checkScrollPosition() {
    if (window.innerWidth > 800) {
      const currentScrollTop = window.scrollY;

      if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
        return;
      }

      if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
        header.classList.remove('scroll');
      } else if (currentScrollTop <= headerHeight) {
        header.classList.remove('fixed');
      } else {
        if (currentScrollTop + window.innerHeight < document.body.offsetHeight) {
          header.classList.add('scroll');
          header.classList.add('fixed');
        }
      }

      lastScrollTop = currentScrollTop;
    }
  }


}

function setupAnchorScrolling() {
  const anchorLinks = document.querySelectorAll('.anchorLinks');

  anchorLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      if (link.hash !== "") {
        event.preventDefault();

        const targetId = link.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          smoothScrollTo(targetElement);
        }
      }
    });
  });

  // anc 클릭시 해당 영역으로 scroll
  function smoothScrollTo(targetElement) {
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;

    function animateScroll(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const scrollPosition = easeInOutCubic(elapsedTime, startPosition, distance, duration);
      window.scrollTo(0, scrollPosition);

      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        window.location.hash = targetElement.id;
      }
    }

    function easeInOutCubic(time, start, change, duration) {
      time /= duration / 2;
      if (time < 1) return change / 2 * time * time * time + start;
      time -= 2;
      return change / 2 * (time * time * time + 2) + start;
    }

    requestAnimationFrame(animateScroll);
  }
}

// 알림 팝업 처리
function setupAlertPopup() {
  let isPopupVisible = false;
  const alertButton = document.querySelector('.alertBtn');
  const alertPopup = document.querySelector('.alertPopup');

  alertButton.addEventListener('click', function (event) {
    event.stopPropagation();
    if (!isPopupVisible) {
      alertPopup.classList.add('on');
      isPopupVisible = true;
    } else {
      alertPopup.classList.remove('on');
      isPopupVisible = false;
    }
  });
  if (window.innerWidth > 800) {
  document.body.addEventListener('click', function (event) {
    if (isPopupVisible && !alertPopup.contains(event.target) && !alertButton.contains(event.target)) {
      alertPopup.classList.remove('on');
      isPopupVisible = false;
    }
  });
}
  alertPopup.addEventListener('click', function (event) {
    event.stopPropagation();
  });
}

// 상단 헤더 공지사항 swiper
var swiper = new Swiper(".noticeSwiper", {
  direction: "vertical",
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 800,
  loop: true,
  touchRatio: 0
}); 

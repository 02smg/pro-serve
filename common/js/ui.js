let isPopupVisible = false;
let alertPopup;

document.addEventListener("DOMContentLoaded", function () {
  handleGnb();
  handleScrollHeader();
  setupAnchorScrolling();
  handleModal()
});

function handleGnb() {
  const gnbTrigger = document.querySelector('.gnb-trigger');
  const gnb = document.querySelector('.gnb');
  const gnbDimmed = document.querySelector('.gnb-dimmed');

  function toggleGnb(state) {
    gnbTrigger.classList.toggle('on', state);
    gnb.classList.toggle('on', state);
    gnbDimmed.classList.toggle('on', state);
    document.body.classList.toggle('no-scroll', state);
  }

  gnbTrigger.addEventListener('click', function () {
    const isOpen = gnbTrigger.classList.contains('on');
    toggleGnb(!isOpen);
  });

  gnbDimmed.addEventListener('click', function() {
    toggleGnb(false);
  });

  if (window.innerWidth > 800) {
    toggleGnb(false);
  }
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
      const currentScrollTop = window.scrollY;

      if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
        return;
      }

      if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
        header.classList.remove('scroll');
        if (isPopupVisible) {
          alertPopup.classList.remove('on');
          isPopupVisible = false;
        }
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

function setupAnchorScrolling() {
  const anchorLinks = document.querySelectorAll('.anchorLinks');
  const gnbTrigger = document.querySelector('.gnb-trigger');
  const gnb = document.querySelector('.gnb');
  anchorLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      if (link.hash !== "") {
        event.preventDefault();
        gnbTrigger.classList.remove('on');
        gnb.classList.remove('on');
        document.body.classList.remove('no-scroll');
        const targetId = link.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          smoothScrollTo(targetElement);
        }
      }
    });
  });

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


function handleModal(){
  const langBtn = document.querySelectorAll('.popupBtn'); 
  const modal = document.querySelector('.modal')
  const modalFilter = modal.querySelector('.modal .filter')
  const modalClose = modal.querySelector('.close_btn');

  langBtn.forEach(link => {
    link.addEventListener('click', function(e){
    e.preventDefault();
    modal.classList.add('show-modal');
    document.body.style.overflow = "hidden";
  })

  modalClose.addEventListener('click', function(e){
    e.preventDefault();
    modal.classList.remove('show-modal');
    document.body.style.overflow = "auto";
  })

  modalFilter.addEventListener('click', function(e){
    e.preventDefault();
    modal.classList.remove('show-modal');
    document.body.style.overflow = "auto";
})
  })
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

// html, css, js, image, font, video...
// 사용되는 리소스가 모두 로드가 완료되고 나서 형
// js 를 실행하여야 정상적인 처리가 가능하다.

window.onload = function () {
  // 모달창 처리
  // let body = document.querySelector("body");
  // body.classList.add("modal-active");
  // let modal = document.querySelector(".modal");
  // modal.onclick = function () {
  //   body.classList.remove("modal-active");
  //   this.style.display = "none";
  // };

  // 위로 이동하기
  // .gotop 을 js에 저장하자.
  const goTop = document.querySelector(".gotop");
  // goTop 클릭을 처리한다.
  // goTop.addEventListener("click", function () {
  //   // 위로 슬라이등 코드
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // });

  // anime.js
  const scrollElement =
    window.document.scrollingElement ||
    window.document.body ||
    window.document.documentElement;
  goTop.addEventListener("click", function () {
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 500,
      easing: "easeInOutQuad",
    });
  });
  // <!-- Initialize Swiper -->

  // 2번. json 데이터로 뽑아보기
  // 1번. 백틱을 이용한 html 생성
  // .sw-promotion 에 출력할 html 생성
  // for 문을 이용한 데이터 html 생성
  // json 형태: JavaScript Object Notaition 형식의 데이터가 전달됨.
  // prodata.json 을 불러와서 배치한다.

  let data;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      // console.log(req.response);
      // 현재 전달된 문자들은 josn 이 아닙니다.
      // req.response 는 데이터 타입이 문자열입니다.
      // 문자열을 json 객체로 변경하는 작업을 하셔야 합니다.
      data = JSON.parse(req.response);
      makePromotionSlide();
    }
  };
  xhttp.open("GET", "data/prodata.json");
  xhttp.send();

  function makePromotionSlide() {
    let swPromotionHtml = ``;
    for (let i = 0; i < data.good_count; i++) {
      let obj = data[`good_${i + 1}`];

      let html = `
      <div class="swiper-slide">
        <a href="${obj.link}">
          <img src="images/${obj.img}" alt="${obj.name}">
        </a>
      </div>
      `;
      swPromotionHtml += html;
    }
    // 위의 백틱 내용을 넣어줄 장소를 저장
    let swPromotionWrapper = document.querySelector(
      ".sw-promotion .swiper-wrapper"
    );
    swPromotionWrapper.innerHTML = swPromotionHtml;

    let promotionSwiper = new Swiper(".sw-promotion", {
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".promotion .sw-next",
        prevEl: ".promotion .sw-prev",
      },
      pagination: {
        el: ".sw-promotion-pg",
        clickable: true,
      },
      breakpoints: {
        760: {
          slidesPerView: 2,
        },
      },
    });
  }

  // let liveSwiper = new Swiper(".sw-live", {
  //   slidesPerView: 4,
  //   spaceBetween: 10,
  //   navigation: {
  //     nextEl: ".live .sw-next",
  //     prevEl: ".live .sw-prev",
  //   },
  //   breakpoints: {
  //     1024: {
  //       slidesPerView: 3,
  //       spaceBetween: 32,
  //     },
  //     1280: {
  //       slidesPerView: 4,
  //       spaceBetween: 27,
  //     },
  //   },
  // });
  // let booksSwiper = new Swiper(".sw-books", {
  //   slidesPerView: 3,
  //   grid: {
  //     rows: 4,
  //     fill: "row",
  //   },
  //   spaceBetween: 19,
  //   navigation: {
  //     nextEl: ".books .sw-next",
  //     prevEl: ".books .sw-prev",
  //   },
  //   breakpoints: {
  //     1024: {
  //       slidesPerView: 3,
  //       slidesPerGroup: 3,
  //       spaceBetween: 30,
  //       grid: {
  //         rows: 1,
  //       },
  //     },
  //     1280: {
  //       slidesPerView: 5,
  //       slidesPerGroup: 5,
  //       spaceBetween: 27,
  //       grid: {
  //         rows: 1,
  //       },
  //     },
  //   },
  // });

  let eventsSwiper = new Swiper(".sw-events", {
    slidesPerView: 3,
    spaceBetween: 27,
    navigation: {
      nextEl: ".event .sw-next",
      prevEl: ".event .sw-prev",
    },
    breakpoints: {
      1280: {
        slidesPerView: 4,
      },
    },
  });
};

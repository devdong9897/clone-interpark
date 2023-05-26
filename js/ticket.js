/**
 * 작성자 : 박지성
 * 연락처 : 비밀
 * 작성일 : 23-05-22
 * 기능 : 티켓 리스트 슬라이드 코드
 * 업데이트 : 각 티켓 리스트 목록
 */
window.addEventListener("load", function () {
  // 티켓 데이터
  function parseTicket(_cate) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
      let req = e.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeTicketSlide(data);
      }
    };
    if (_cate === "뮤지컬") {
      xhr.open("GET", "data/ticketdata.json");
    } else if (_cate === "콘서트") {
      xhr.open("GET", "data/ticketdata1.json");
    } else if (_cate === "연극") {
      xhr.open("GET", "data/ticketdata2.json");
    } else if (_cate === "클래식/무용") {
      xhr.open("GET", "data/ticketdata3.json");
    } else if (_cate === "스포츠") {
      xhr.open("GET", "data/sports.json");
    } else if (_cate === "레저/캠핑") {
      xhr.open("GET", "data/ticketdata5.json");
    } else if (_cate === "전시/행사") {
      xhr.open("GET", "data/ticketexhibition.json");
    } else if (_cate === "아동/가족") {
      xhr.open("GET", "data/ticketdata7.json");
    }
    xhr.send();
  }
  parseTicket("뮤지컬");
  let ticketSwiper;
  function makeTicketSlide(_data) {
    let swTicketHtml = ``;
    for (let i = 0; i < _data.ticket_total; i++) {
      let obj = _data[`good_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
      <a href="${obj.link}" class="ticket-link">
          <div class="ticket-img">
              <img src="images/${obj.pic}" alt="${obj.alt || obj.title}" />
              <span class="ticket-rank">${obj.rank}</span>
          </div>
          <div class="ticket-info">
              <ul class="ticket-info-list">
                  <li>
                      <span class="ticket-title"><b>${obj.title}</b></span>
                  </li>
                  <li>
                      <span class="ticket-hall">${obj.hall}</span>
                  </li>
                  <li>
                      <span class="ticket-date">${obj.date}</span>
                  </li>
                  <li ${
                    obj.sale ? "style=display:block" : "style=display:none"
                  }><span class="ticket-sale">${obj.sale}</span></li>
              </ul>
          </div>
      </a>
  </div>`;
      swTicketHtml += temp;
    }

    let swTicketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swTicketWrapper.innerHTML = swTicketHtml;
    if (ticketSwiper) {
      ticketSwiper.destroy();
    }
    ticketSwiper = new Swiper(".sw-ticket", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }
  const btns = this.document.querySelectorAll(".ticket .btns a");

  let cateName = ["뮤지컬", "콘서트", "연극", "클래식/무용", "스포츠", "레저/캠핑", "전시/행사","아동/가족"];
 
 
 
 
  btns[0].onclick = function (event) {
    event.preventDefault();
    parseTicket("뮤지컬");
  };
  btns[1].onclick = function (event) {
    event.preventDefault();
    parseTicket("콘서트");
  };
  btns[2].onclick = function (event) {
    event.preventDefault();
    parseTicket("연극");
  };
  btns[3].onclick = function (event) {
    event.preventDefault();
    parseTicket("클래식/무용");
  };
  btns[4].onclick = function (event) {
    event.preventDefault();
    parseTicket("스포츠");
  };
  btns[5].onclick = function (event) {
    event.preventDefault();
    parseTicket("레저/캠핑");
  };
  btns[6].onclick = function (event) {
    event.preventDefault();
    parseTicket("전시/행사");
  };
  btns[7].onclick = function (event) {
    event.preventDefault();
    parseTicket("아동/가족");
  };

  
  // 포커스 적용
  btns[0].classList.add("btns-active");
  
});

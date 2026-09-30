$(document).ready(function () {

    // Клик по пункту меню с подменю
    $('.parent-sub-menu > a').on('click', function (e) {
        const parent = $(this).closest('.parent-sub-menu');

        // Если пункт уже открыт — закрыть
        if (parent.hasClass('active')) {
            parent.removeClass('active');
            return false; // блокируем переход по ссылке
        }

        // Закрываем другие открытые меню
        $('.parent-sub-menu.active').removeClass('active');

        // Открываем текущее меню
        parent.addClass('active');

        // Блокируем переход по ссылке
        e.preventDefault();
    });

    // Клик вне меню — закрыть всё
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.parent-sub-menu').length) {
            $('.parent-sub-menu.active').removeClass('active');
        }
    });

});

$('.button-open-menu').click(function(){
    $('.menu-header').fadeIn();
});
$('.close-button-menu').click(function(){
    $('.menu-header').fadeOut();
});


const swiper = new Swiper('.swiper-reviews', {
    // Optional parameters,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.next-reviews',
        prevEl: '.prev-reviews',
    },
    breakpoints: {
        // when window width is >= 320px
        0: {
            slidesPerView: 1,
            spaceBetween: 12
        },
        // when window width is >= 480px
        799: {
            slidesPerView: 2,
            spaceBetween: 12
        },
        // when window width is >= 640px
        1279: {
            slidesPerView: 3,
            spaceBetween: 28
        }
    }
});



var swiper2 = new Swiper(".pagination-swiper-awards", {

    spaceBetween: 12,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        // when window width is >= 320px
        0: {
            slidesPerView: 4,
            spaceBetween: 12
        },
        // when window width is >= 480px
        799: {
            slidesPerView: 5,
            spaceBetween: 12
        }
    }
});
var swiper3 = new Swiper(".swiper-awards", {

    spaceBetween: 10,
    navigation: {
        nextEl: ".next-awards",
        prevEl: ".prev-awards",
    },
    thumbs: {
        swiper: swiper2,
    },
});

const swiper4 = new Swiper('.swiper-reviews-analitic-person', {
    // Optional parameters,
    loop: true,
    autoplay: {
        delay: 5000,
      },
    // Navigation arrows
    navigation: {
        nextEl: '.next-reviews',
        prevEl: '.prev-reviews',
    },
    breakpoints: {
        // when window width is >= 320px
        0: {
            slidesPerView: 1,
            spaceBetween: 12
        },
        // when window width is >= 480px
        799: {
            slidesPerView: 2,
            spaceBetween: 12
        },
        // when window width is >= 640px
        1279: {
            slidesPerView: 3,
            spaceBetween: 48
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const checkboxBlocks = document.querySelectorAll('.checkbox');

    checkboxBlocks.forEach(checkboxBlock => {
        const checkboxInput = checkboxBlock.querySelector('input[type="checkbox"]');
        const link = checkboxBlock.querySelector('a');

        if (!checkboxInput) return;

        // клик по блоку (переключение)
        checkboxBlock.addEventListener('click', (e) => {
            // если клик по ссылке — не переключаем чекбокс
            if (link && e.target === link) return;

            checkboxInput.checked = !checkboxInput.checked;
            checkboxBlock.classList.toggle('active', checkboxInput.checked);
        });

        // если меняют чекбокс через клавиатуру / скрипты
        checkboxInput.addEventListener('change', () => {
            checkboxBlock.classList.toggle('active', checkboxInput.checked);
        });
    });
});

document.addEventListener("input", function (e) {
    if (!e.target.classList.contains("phone")) return;

    let value = e.target.value.replace(/\D/g, ""); // оставляем цифры
    if (value[0] === "8") value = "7" + value.slice(1); // если вводят 8, заменяем на 7
    if (value[0] !== "7") value = "7" + value; // всегда начинаем с 7

    value = value.substring(0, 11); // максимум 11 цифр

    let formatted = "+7";

    if (value.length > 1) formatted += " (" + value.substring(1, 4);
    if (value.length >= 4) formatted += ")";
    if (value.length >= 4) formatted += " " + value.substring(4, 7);
    if (value.length >= 7) formatted += " " + value.substring(7, 9);
    if (value.length >= 9) formatted += " " + value.substring(9, 11);

    e.target.value = formatted;
});



document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion"); // Каждый блок аккордеона

    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll(".accordion-item");

        items.forEach(item => {
            const header = item.querySelector(".accordion-header");

            header.addEventListener("click", () => {

                // закрываем только внутри текущего аккордеона
                items.forEach(i => {
                    if (i !== item) i.classList.remove("active");
                });

                // раскрываем/закрываем выбранный
                item.classList.toggle("active");
            });
        });
    });
});



function dateMask(input) {
    input.addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '').slice(0, 6);

        if (v.length >= 5) {
            this.value = v.replace(/(\d{2})(\d{2})(\d{1,2})/, '$1.$2.$3');
        } else if (v.length >= 3) {
            this.value = v.replace(/(\d{2})(\d{1,2})/, '$1.$2');
        } else {
            this.value = v;
        }
    });
}

document.querySelectorAll('.period-block input').forEach(dateMask);


document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".button-more-does-menedger");
    const items = document.querySelectorAll(".accordion-does-menedger .accordion-item.hide");

    if (button) {
        button.addEventListener("click", function () {
            items.forEach(item => item.classList.remove("hide")); // показать скрытые
            button.style.display = "none"; // скрываем кнопку
        });
    }
});


new Swiper(".slider-reviews-education", {
    slidesPerView: 'auto',
    freeMode: true,
    navigation: {
        nextEl: '.next-reviews-education',
        prevEl: '.prev-reviews-education',
    },
    breakpoints: {
        // when window width is >= 320px
        0: {
            slidesPerView: 1,
            spaceBetween: 12
        },
        // when window width is >= 480px
        799: {
            slidesPerView: 2,
            spaceBetween: 12,
            freeMode: false,
        },
        // when window width is >= 640px
        1279: {
            slidesPerView: 'auto',
            spaceBetween: 28,
            
        }
    }
});


const swiper5 = new Swiper('.swiper-gallery-education', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.gallery-education-next',
        prevEl: '.gallery-education-prev',
    },
    pagination: {
        el: '.swiper-gallery-education-pagination',
    },

});
const swiper6 = new Swiper('.swiper-trust', {
    // Optional parameters
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 48,
    loopedSlides: 0,                
    allowTouchMove: false,          
    speed: 5000,                   
    autoplay: {
        delay: 0,                     
        disableOnInteraction: false,
        pauseOnMouseEnter: true,      
        reverseDirection: false      
    },
    freeMode: false,               
    centeredSlides: false,
    breakpoints: {
        // when window width is >= 320px
        0: {
            spaceBetween: 24
        },
        // when window width is >= 480px
        799: {
            spaceBetween: 32,
        },
        // when window width is >= 640px
        1279: {
            spaceBetween: 48,

        }
    }
});
const swiper7 = new Swiper('.swiper-directions-education', {
    slidesPerView: 'auto',
    spaceBetween: 20,

});
let msnry;

function initMasonry() {
    const grid = document.querySelector('.wrapp-program-eduaction');
    if (!grid) return;

    if (window.innerWidth > 1280) {
        // если masonry ещё не инициализирован — запускаем
        if (!grid.classList.contains('masonry-active')) {
            grid.classList.add('masonry-active');
            msnry = new Masonry(grid, {
                itemSelector: '.card-program',
                columnWidth: '.card-program',   // обязательно!
                gutter: 32,
                percentPosition: true,
                horizontalOrder: true
            });
        }
    } else {
        // отключаем masonry, чтобы сетка перестроилась
        grid.classList.remove('masonry-active');
        if (msnry) {
            msnry.destroy();
            msnry = null;
        }
    }
}

window.onload = initMasonry;
window.onresize = () => {
    clearTimeout(window.msnryTimer);
    window.msnryTimer = setTimeout(initMasonry, 200);
};


$('.open-popup').click(function (e) {
    e.stopPropagation();
    $('.popup').fadeIn(200);
    $('body').addClass('no-scroll'); // добавь в CSS:
});

$('.popup').click(function (e) {
    if (!$(e.target).closest('.content-popup').length) {
        $('.popup').fadeOut(200);
        $('body').removeClass('no-scroll');
    }
});

$('.close-popup').click(function (e) {
    e.stopPropagation();
    $('.popup').fadeOut(200);
    $('body').removeClass('no-scroll');
});



document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.trust .typewriter');

  if (!el) return;

  const words = [
    'Сетевых отелей',
    'Апарт-отелей',
    'Санаториев',
    'Баз отдыха',
    'Глэмпингов'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 90;      // скорость печати
  const deletingSpeed = 45;    // скорость удаления
  const endPause = 1800;       // пауза после полного слова
  const startPause = 400;      // маленькая пауза перед новым словом

  function type() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      el.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, endPause);
        return;
      }

      setTimeout(type, typingSpeed);
    } else {
      el.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, startPause);
        return;
      }

      setTimeout(type, deletingSpeed);
    }
  }

  type();
});



document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-mentor-level");
    const tabContents = document.querySelectorAll(".wrapp-content-mentor-lvl");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const tabId = this.dataset.tabLvl;

            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");

            const activeContent = document.querySelector(`.wrapp-content-mentor-lvl[data-content-mentor-lvl="${tabId}"]`);
            if (activeContent) {
                activeContent.classList.add("active");
            }
        });
    });
});


const swiper_interview = new Swiper('.swiper-interview', {
    // Optional parameters,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.next-interviews',
        prevEl: '.prev-interviews',
    },
    breakpoints: {
        // when window width is >= 320px
        0: {
            slidesPerView: 1,
            spaceBetween: 32
        },
        // when window width is >= 480px
        799: {
            slidesPerView: 2,
            spaceBetween: 32
        },
        // when window width is >= 640px
        1279: {
            slidesPerView: 2,
            spaceBetween: 32
        }
    }
});
const swiper_gallery_events = new Swiper('.swiper-gallery-events', {
    // Optional parameters,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.next-gallery-event',
        prevEl: '.prev-gallery-event',
    },
    breakpoints: {
        // when window width is >= 320px
        0: {
            slidesPerView: 1,
            spaceBetween: 24
        },
        // when window width is >= 480px
        799: {
            slidesPerView: 3,
            spaceBetween: 32
        },
        // when window width is >= 640px
        1279: {
            slidesPerView: 5,
            spaceBetween: 32
        }
    }
});


const swiper_blog_singles = new Swiper('.swiper-blog-single', {
    slidesPerView: 1,
    spaceBetween: 10,
    // Navigation arrows
    navigation: {
        nextEl: '.button-single-blog-slide.next',
        prevEl: '.button-single-blog-slide.prev',
    },
    pagination: {
        el: '.swiper-pagination',
      },
});
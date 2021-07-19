// Smooth scrolling

document.querySelector(".nav__list").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    id !== "#" &&
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Slider

const sliders = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  //Event Handlers

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowLeft":
        prevSlide();
        break;

      case "ArrowRight":
        nextSlide();
        break;
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

sliders();

// Mobile Nav

const navButton = document.querySelector(".navigation__button");
const navButton1 = document.querySelector(".closeNav");
const navIcon = document.querySelector(".navigation__icon");
const navBackground = document.querySelector(".navigation__background");
const navigationNav = document.querySelector(".navigation__nav");

const openNav = function () {
  navBackground.classList.toggle("hide");
  navigationNav.classList.toggle("hide");
  navIcon.classList.toggle("hide");
  navButton1.classList.toggle("hide");
};

navButton.addEventListener("click", openNav);

// Image pop ups

const grid = document.querySelector(".grid");
const popup = document.querySelector(".popup");
const popupButton = document.querySelector(".popup__btn");
const popUpBackground = document.querySelector(".popup__background");

const openPopup = function (e) {
  popup.classList.remove("hide");
  popUpBackground.classList.remove("hide");
  navButton.classList.add("hide");
  popup.children[1].src = e.target.src;
};

const closePopup = function () {
  popup.classList.add("hide");
  navButton.classList.remove("hide");
  popUpBackground.classList.add("hide");
};

grid.addEventListener("click", function (e) {
  if (e.target.classList.contains("responsive-image")) {
    openPopup(e);
  }
});

popupButton.addEventListener("click", function () {
  closePopup();
});

popUpBackground.addEventListener("click", closePopup);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !popUpBackground.classList.contains("hide")) {
    popUpBackground.classList.add("hide");
    popup.classList.add("hide");
  }
});

// Lazy Loading

const loadImg = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.target.getAttribute("data-processed") || !entry.isIntersecting)
      return true;

    entry.target.setAttribute("src", entry.target.getAttribute("data-src"));

    entry.target.setAttribute("data-processed", true);
  });
};

const observer = new IntersectionObserver(loadImg);

document.querySelectorAll("[data-lazy-load]").forEach(function (img) {
  observer.observe(img);
});

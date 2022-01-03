"use strict";

////////////////////////////////////////////////////
//ELEMENTS

//Main elements

const headerEl = document.querySelector(".header");
const subheadingEl = document.querySelector(".subheading");
const headingPrimaryEl = document.querySelector(".heading-primary");
const mainNavEl = document.querySelector(".main-nav");
const mainEl = document.querySelector("main");
const sectionMarabuEl = document.querySelector(".section-marabu");
const footerEl = document.querySelector(".footer");

const formEl = document.getElementById("contact-form");

//Links

// const facebookLink = document.querySelector(".facebook");
// const instaLink = document.querySelector(".instagram");
// const mailLink = document.querySelector(".mail");
const webdesign = document.querySelector(".webdesign");

//Marabus

const marabuOneEl = document.querySelector(".container-marabu--one");
const marabuTwoEl = document.querySelector(".container-marabu--two");
const marabuThreeEl = document.querySelector(".container-marabu--three");

//Container elements

const containerImgAbout = document.querySelector(".container-img-about");
const containerSongs = document.querySelector(".container-songs");
const containerImg = document.querySelector(".container-imgs");
const containerCookieEl = document.querySelector(".container-cookie");

const rowBandEl = document.querySelectorAll(".row-band");

//Audio-Player elements

const audios = document.querySelectorAll(".player");
const sngMarabuStomp = document.getElementById("marabu-stomp");
const sngBrunosSong = document.getElementById("brunos-song");
const sngTumeric = document.getElementById("tumeric");

//Design elements

const blurryOverlay = document.querySelector(".overlay");
const overlayIntroEl = document.querySelector(".overlay-intro");

////////////////////////////////////////////////////
//MODALS

const modalOne = document.querySelector(".modal--about");
const modalTwo = document.querySelector(".modal--media");
const modalThree = document.querySelector(".modal--band");
const modalContact = document.querySelector(".modal--contact");
const modalImpressum = document.querySelector(".modal--impressum");

////////////////////////////////////////////////////
//BUTTONS

const btnCloseModal = document.querySelectorAll(".btn--close-modal");

const btnNavAbout = document.querySelector(".btn-about");
const btnNavMedia = document.querySelector(".btn-media");
const btnNavBand = document.querySelector(".btn-band");
const btnNavContact = document.querySelector(".btn-contact");

const btnNavOpen = document.querySelector(".btn-nav--open");
const btnNavClose = document.querySelector(".btn-nav--close");

const btnLinkMedia = document.querySelector(".btn-link--media");
const btnLinkForm = document.querySelector(".btn-link--form");
const btnLinkImpressum = document.querySelector(".btn-link--impressum");
const btnImpressum = document.querySelector(".btn-impressum");

const btnCookie = document.querySelector(".btn-cookie");

////////////////////////////////////////////////////
//ARRAYS

const modalArr = [modalOne, modalTwo, modalThree, modalContact, modalImpressum];

const tabFocusArr = [
  btnNavOpen,
  marabuOneEl,
  marabuTwoEl,
  marabuThreeEl,
  btnImpressum,
  mainNavEl,
  btnLinkForm,
  webdesign,
];

////////////////////////////////////////////////////
// FUNCTIONS

//Blurry background overlay

const showBlurryOverlay = function () {
  //Add blurry background
  blurryOverlay.classList.remove("overlay-hidden");

  //Hide other elements from tabindex
  for (let i = 0; i < tabFocusArr.length; i++) {
    tabFocusArr[i].setAttribute("tabindex", "-1");
  }
};

const hideBlurryOverlay = function () {
  //Remove blurry background
  blurryOverlay.classList.add("overlay-hidden");

  //Add other elements back to tabindex
  for (let i = 0; i < tabFocusArr.length; i++) {
    tabFocusArr[i].removeAttribute("tabindex", "-1");
  }
};

//Scroll intersection observer

const scrollUp = function (element) {
  const options = {
    root: null,
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetEl = entry.target;
        targetEl.classList.add("scroll-up");
      }
    });
  }, options);
  element.length
    ? element.forEach((el) => {
        observer.observe(el);
      })
    : observer.observe(element);
};

/////////////////////////////////
// Open modals

const openModal = function (modal) {
  modal.classList.add("modal-open");
  showBlurryOverlay();
  modal.scrollTo(0, 0);

  //Add slide animation about modal
  if (modal == modalOne) {
    document
      .querySelector(".container-btn--media")
      .classList.add("slide-in-left");
    containerImgAbout.classList.add("slide-in--left");
  }

  //Add slide animation media modal
  if (modal == modalTwo) {
    containerSongs.classList.add("slide-in-left-songs");
    scrollUp(containerImg);
  }

  //Add scroll animation band modal
  if (modal == modalThree) {
    scrollUp(rowBandEl);
  }
};

/////////////////////////////////
// Close modals

const closeModal = function () {
  modalArr.forEach((entry) => {
    entry.classList.remove("modal-open");
  });
  hideBlurryOverlay();

  //Remove slide animation about modal
  containerImgAbout.classList.remove("slide-in--left");

  document
    .querySelector(".container-img-about")
    .classList.remove("container-show");

  //Remove band scroll animation
  rowBandEl.forEach((entry) => entry.classList.remove("scroll-up"));

  //Removing media animation
  containerSongs.classList.remove("slide-in-left-songs");
  containerImg.classList.remove("scroll-up");

  //Stop audios
  for (let i = 0; i < audios.length; i++) {
    audios[i].pause();
    audios[i].currentTime = 0;
  }

  // Reset contact form
  document.querySelector(".form-answer").classList.remove("appear");
  document.querySelector(".container-form").classList.remove("hidden");
  formEl.reset();
};

////////////////////////////////////////////////////
//Navigation

//Open navigation
const openNav = function () {
  mainNavEl.classList.add("nav--open");
  btnNavOpen.classList.toggle("hide");
  btnNavOpen.classList.remove("fade-in");
  btnNavClose.classList.toggle("hide");
  showBlurryOverlay();
};

//Close navigation
const closeNav = function () {
  mainNavEl.classList.remove("nav--open");
  btnNavOpen.classList.toggle("hide");
  btnNavClose.classList.toggle("hide");
};

////////////////////////////////////////////////////
// HANDLER

////////////////////////////////////////////////////
// General handler

//Remove preload transition class

window.addEventListener("load", function () {
  document.querySelector("body").classList.remove("preload");
});

//CLOSING MODALS

//Close modals with click on blurry background overlay
blurryOverlay.addEventListener("click", function () {
  closeModal();
  if (mainNavEl.classList.contains("nav--open")) {
    closeNav();
  }
});

//Close modals with close-btn
for (let i = 0; i < btnCloseModal.length; i++) {
  btnCloseModal[i].addEventListener("click", closeModal);
}

//Close modals with esc key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
    if (mainNavEl.classList.contains("nav--open")) closeNav();
  }
});

//INTERNAL LINKS

//Link from "About" to "Media"
btnLinkMedia.addEventListener("click", function () {
  closeModal();
  openModal(modalTwo);
});

//Link from "Footer" to "Form"
btnLinkForm.addEventListener("click", function () {
  closeModal();
  openModal(modalContact);
});

//AUDIO PLAYER

//Stop audio when other one is played
sngMarabuStomp.addEventListener("play", function () {
  sngBrunosSong.pause();
  sngTumeric.pause();
});

sngBrunosSong.addEventListener("play", function () {
  sngMarabuStomp.pause();
  sngTumeric.pause();
});

sngTumeric.addEventListener("play", function () {
  sngMarabuStomp.pause();
  sngBrunosSong.pause();
});

/////
////////////////////////////////////////////////////
// Handler Marabus

marabuOneEl.addEventListener("click", function () {
  openModal(modalOne);
});

marabuTwoEl.addEventListener("click", function () {
  openModal(modalTwo);
});

marabuThreeEl.addEventListener("click", function () {
  openModal(modalThree);
});

////////////////////////////////////////////////////
// Handler Navigation

btnNavOpen.addEventListener("click", function () {
  openNav();
  btnNavClose.classList.remove("hide");
});

btnNavClose.addEventListener("click", function () {
  closeNav();
  hideBlurryOverlay();
});

btnNavAbout.addEventListener("click", function () {
  openModal(modalOne);
  closeNav();
});

btnNavMedia.addEventListener("click", function () {
  openModal(modalTwo);
  closeNav();
});

btnNavBand.addEventListener("click", function () {
  openModal(modalThree);
  closeNav();
});

btnNavContact.addEventListener("click", function () {
  openModal(modalContact);
  closeNav();
});

////////////////////////////////////////////////////
// Handler Footer

btnImpressum.addEventListener("click", function () {
  openModal(modalImpressum);
});

////////////////////////////////////////////////////
// Handler Form

formEl.onsubmit = function () {
  //After submit show answer message and hide form
  document.querySelector(".form-answer").classList.add("appear");
  document.querySelector(".container-form").classList.add("hidden");
};

////////////////////////////////////////////////////
//MOBILE ORIENTATION CHANGE

//Show only orientation change animation when device too small
if (window.innerWidth < 480) {
  //Prevent fade-out of intro background
  overlayIntroEl.classList.remove("fade-out");

  //Add Intro Animation when decive is turned to lanscape mode
  window.addEventListener("orientationchange", function () {
    //Fade Out Intro Background
    overlayIntroEl.classList.add("fade-out");

    //Remove Intro Animations for following device turns
    setTimeout(function () {
      headerEl.classList.remove("slideup");
      subheadingEl.classList.remove("get-small-sub");
      headingPrimaryEl.classList.remove("get-small-primary");
      btnNavOpen.classList.remove("fade-in");
    }, 6000);
  });
}

//Remove all Intro animations when device is turned after initially being in landscape mode first
if (window.innerWidth > 480) {
  window.addEventListener("orientationchange", function () {
    headerEl.classList.remove("slideup");
    subheadingEl.classList.remove("get-small-sub");
    headingPrimaryEl.classList.remove("get-small-primary");
    btnNavOpen.classList.remove("fade-in");
  });
}

////////////////////////////////////////////////////
//COOKIE BANNER

//Timeout for intro animation
setTimeout(function () {
  document.querySelector("body").classList.remove("no-overflow");

  //Show cookie banner first time
  if (!localStorage.getItem("cookieBannerDisplayed")) {
    containerCookieEl.classList.add("appear");
  }
}, 6000);

//Btn-Link to impressum
btnLinkImpressum.addEventListener("click", function () {
  openModal(modalImpressum);
});

//Accept-btn
btnCookie.addEventListener("click", function () {
  //Hide cookie banner
  containerCookieEl.classList.remove("appear");

  //Remove link & btn in banner form tabindex
  btnLinkImpressum.setAttribute("tabindex", "-1");
  btnCookie.setAttribute("tabindex", "-1");

  //Add bannder displayed to local storage for future visits
  localStorage.setItem("cookieBannerDisplayed", true);
});

//Take btns in cookie bannder out of tabindex if cookies were accepted in earlier session
if (localStorage.getItem("cookieBannerDisplayed")) {
  btnCookie.setAttribute("tabindex", "-2");
  btnLinkImpressum.setAttribute("tabindex", "-1");
}

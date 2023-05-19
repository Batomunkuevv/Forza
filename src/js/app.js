"use strict";

function initHeader() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    animateHeader();
    setPaddingForBody();

    function setPaddingForBody() {
        document.body.style.paddingTop = `${header.clientHeight}px`;
    }

    function animateHeader() {
        let lastScrollTop = 0;

        window.addEventListener("scroll", (e) => {
            const scrollTop = document.documentElement.scrollTop;

            header.classList.remove("scroll-down");
            header.classList.add("scroll-up");

            if (scrollTop > lastScrollTop) {
                header.classList.add("scroll-down");
                header.classList.remove("scroll-up");
            }

            if (scrollTop === 0) {
                header.classList.remove("scroll-up");
            }

            lastScrollTop = scrollTop;
        });
    }
}

function initBurger() {
    const burger = document.querySelector(".burger");
    const headerPanel = document.querySelector(".site-header__panel");

    if (!burger || !headerPanel) return;

    if (window.matchMedia("(max-width: 1200px)").matches) {
        setHeightHeaderPanel();
    }

    burger.addEventListener("click", (e) => {
        burger.classList.toggle("is-active");
        headerPanel.classList.toggle("is-active");
        document.body.classList.toggle("lock");
    });

    function setHeightHeaderPanel() {
        const header = document.querySelector(".site-header");

        headerPanel.style.height = `calc(100% - ${header.clientHeight}px)`;
        headerPanel.style.top = `${header.clientHeight}px`;
    }
}

function initPhoneMask() {
    [].forEach.call(document.querySelectorAll('[name="tel"]'), function (input) {
        var keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);

            var pos = this.selectionStart;

            if (pos < 3) event.preventDefault();

            var matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i);
            }
            var reg = matrix
                .substr(0, this.value.length)
                .replace(/_+/g, function (a) {
                    return "\\d{1," + a.length + "}";
                })
                .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = "";
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
    });
}

function initReviewsSlider() {
    const reviewsSliderContainer = document.querySelector(".reviews__slider-container");
    const reviewsSliderPrev = reviewsSliderContainer?.querySelector(".arrow--prev");
    const reviewsSliderNext = reviewsSliderContainer?.querySelector(".arrow--next");
    let reviewsSlider = reviewsSliderContainer?.querySelector(".reviews__slider");

    if (!reviewsSlider) return;

    reviewsSlider = new Swiper(reviewsSlider, {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 1500,
        loop: true,
        effect: "coverflow",
        grabCursor: true,
        navigation: {
            prevEl: reviewsSliderPrev,
            nextEl: reviewsSliderNext,
        },
        autoplay: {
            delay: 3000,
        },
        coverflowEffect: {
            depth: 50,
        },
    });
}

function initLazyload() {
    const lazyItems = document.querySelectorAll("[data-lozad]");

    if (!lazyItems) return;

    const observer = lozad(lazyItems);
    observer.observe();
}

function initTabs() {
    const tabsContainer = document.querySelector("[data-tabs]");

    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll("[data-tab]");
    const tabcontents = Array.from(tabsContainer.querySelectorAll("[data-tabcontent]"));

    tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            const tabTabcontent = tabcontents.find((tabcontent) => tabcontent.dataset.tabcontent === tab.dataset.tab);

            removeActiveClassesFromOther(tabs);
            removeActiveClassesFromOther(tabcontents);

            tab.classList.add("is-active");
            tabTabcontent.classList.add("is-active");
        });
    });

    function removeActiveClassesFromOther(arr) {
        arr.forEach((item) => {
            item.classList.remove("is-active");
        });
    }
}

function validateForms() {
    const forms = document.querySelectorAll("[data-form]");

    if (!forms) return;

    forms.forEach((form) => {
        form.addEventListener("submit", formSend);

        async function formSend(e) {
            e.preventDefault();
            let error = formValidate(form);
            let formData = new FormData(form);

            if (error === 0) {
            }
        }

        function formValidate(form) {
            let error = 0;
            let formReq = form.querySelectorAll("._req");

            formReq.forEach((input) => {
                input.classList.remove("_error");

                if (input.name === "tel" && input.value.length !== 18) {
                    input.classList.add("_error");
                    error++;
                }

                if (input.name === "name" && !checkName(input.value)) {
                    input.classList.add("_error");
                    error++;
                }

                if (input.value === "") {
                    input.classList.add("_error");
                    error++;
                }
            });
        }
    });

    function checkName(name) {
        return /^[a-zA-Z ]+$/.test(name);
    }

    function checkTel(tel) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(tel);
    }
}

window.addEventListener("DOMContentLoaded", (e) => {
    initHeader();
    initBurger();
    initPhoneMask();
    initLazyload();
    initReviewsSlider();
    initTabs();
    validateForms();
});

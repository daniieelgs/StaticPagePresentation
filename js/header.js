document.querySelectorAll(".menu-item")
    .forEach(n => {
        
        //const menu = n.lastElementChild;
        const menu = Array.from(n.children).filter(x => x.classList.contains("desplegable-menu-item"))[0];

        if(!menu) return;

        menu.style.display = "none";

        n.addEventListener("mouseenter", e => {
            menu.style.display = "block";
            setTimeout(() => menu.classList.add("visible"), 10);
        });

        n.addEventListener("mouseleave", e => {
            menu.classList.remove("visible");
        });

        menu.addEventListener("transitionend", e => {
            if(!menu.classList.contains("visible")) menu.style.display = "none"
        });

    });

const header = document.querySelector("header");
const header_mobile = document.querySelector("header.responsive");
const go_up = document.getElementById("go-up");

let lastScroll;

addEventListener('scroll', e => {
    let scroll = (window.scrollY / (document.body.offsetHeight - window.innerHeight))*100;
    header.classList.toggle("down", scroll > 5);
    header_mobile.classList.toggle("visible", scroll < 5 || scroll < lastScroll);
    go_up.classList.toggle("visible", scroll > 10);
    if(scroll > lastScroll && nav.classList.contains("active")) nav.classList.remove("active")
    lastScroll = scroll;
}
);

document.querySelectorAll("header .search").forEach(n => n.addEventListener("click", () => openModal("modal-search", () => document.getElementById("search").focus())));

const nav = document.querySelector("header.responsive nav");
document.querySelector("header.responsive .menu-responsive").addEventListener("click", () => nav.classList.toggle("active"));

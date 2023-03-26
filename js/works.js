

function createContainer(...classes){
    return createElement("DIV", classes);
}

function createElement(element, ...classes){
    const container = document.createElement(element);
    container.classList.add(...classes);
    return container;
}

const createWork = (img_src, title, short_description, number) => {

    const work_container = createContainer("work-container");
    work_container.setAttribute("nth", number);

    const image_work = createContainer("image-work");

    const img = document.createElement("IMG");
    img.src = img_src;
    image_work.appendChild(img);

    const image_work_links = createContainer("image-work-links");
    image_work.appendChild(image_work_links);

    const icons_link = createContainer("icons-link");

    const clip_icon = createElement("A", "clip-icon");
    clip_icon.href="#";
    clip_icon.addEventListener("mouseenter", mouseenter);
    clip_icon.addEventListener("mouseleave", mouseleave);
    icons_link.appendChild(clip_icon);

    const search_icon = createElement("A", "search-icon");
    search_icon.addEventListener("mouseenter", mouseenter);
    search_icon.addEventListener("mouseleave", mouseleave);
    icons_link.appendChild(search_icon);

    image_work.appendChild(icons_link);

    work_container.appendChild(image_work);

    const title_work = createContainer("titles-work");

    const h4 = document.createElement("H4");
    const a = document.createElement("A");
    a.href = "#";
    a.innerText = title;
    h4.appendChild(a);
    title_work.appendChild(h4);

    const h5 = document.createElement("H5");
    h5.innerText = short_description;
    title_work.appendChild(h5);

    work_container.appendChild(title_work);

    if(window.innerWidth > 800){
        observer.observe(work_container);
    }


    return work_container;

}

const mouseenter = e => {
    e.target.parentElement.previousElementSibling.classList.add("active");
}

const mouseleave = e => {
    e.target.parentElement.previousElementSibling.classList.remove("active");
}


let works;

axios("../projects/works.json")
    .then(res => {
        
        works = res.data.works;

        if(res.data.works.length == 0) return;

        const container = document.querySelector("#projects .works");

        const fragment = document.createDocumentFragment();

        const a = res.data.works.forEach((n, id) => fragment.appendChild(createWork(n.img, n.title, n.short_description, id)))
        
        container.append(fragment);

        if(window.innerWidth <= 800)
            new IntersectionObserver(entries => {

                for(let entry of entries)
                    if(entry.isIntersecting){
                        Array.from(container.children).forEach((n, i) => setTimeout(() => n.classList.add("load"), 250*i));
                    }

            }, {threshold: .2}).observe(container);

        loadModal(res.data.works);

    });

const modal = document.getElementById("modal");
const modal_images = document.getElementById("modal-images");
const current_image = document.querySelector("#modal-images .current-image");
const name_current_image = document.querySelector("#modal-images .name-current-image");
const number_current_image = document.querySelector("#modal-images .number-current-image");
const length_current_image = document.querySelector("#modal-images .length-images");

document.querySelector("#modal-images .arrow.next").addEventListener("click", e => loadWorkOnModal(modal_images.getAttribute("current-nth") == works.length - 1 ? 0 : parseInt(modal_images.getAttribute("current-nth")) + 1))
document.querySelector("#modal-images .arrow.previous").addEventListener("click", e => loadWorkOnModal(modal_images.getAttribute("current-nth") == 0 ? works.length - 1 : parseInt(modal_images.getAttribute("current-nth")) - 1))

function loadModal(){
    length_current_image.innerText = works.length;
    document.querySelectorAll(".works .icons-link .search-icon").forEach(n => {
        n.addEventListener("click", e => {
            let id = e.target.parentElement.parentElement.parentElement.getAttribute("nth");
            loadWorkOnModal(id);
            openModal("modal-images");
        })
    })
    
}

function loadWorkOnModal(id){
    console.log("load", id, works[id]);
    modal_images.setAttribute("current-nth", id);
    current_image.src = works[id].img;
    name_current_image.innerText = works[id].title;
    number_current_image.innerText = parseInt(id) + 1;
}

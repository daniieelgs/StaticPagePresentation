let options = {
    threshold: window.innerWidth <= 800 ? .5 : 1
}

HTMLDivElement.prototype.getChildByClass = function(classChild) {
    return Array.from(this.children).filter(n => n.classList.contains(classChild))[0]
}

HTMLElement.prototype.getNthChild = function(element){

    const children = Array.from(this.children);

    for(let i = 0; i < children.length; i++){
        if(children[i] == element) return i;
    }

    return -1;
}

const verifyVisibility = entries => {

        for(let i = 0; i < entries.length; i++){

            let entry = entries[i];

            if(entry.isIntersecting){
                
                let element = entry.target;

                // console.log(element);

                setTimeout(() => {
                    if(element.classList.contains("stadistic-content") && !element.classList.contains("load")){
                        effectNumberStadistic(element.getChildByClass("stadistic-contain").getChildByClass("number-stadistic"));
                    }

                    element.classList.add("load")
                }, 200*i);

            }
            
        }
}

function effectNumberStadistic(element){
    const numMax = element.innerText;
    element.innerText = 0;
    let intervalId = setInterval(() => {
        element.innerText = parseInt(element.innerText) + 20;
        if(parseInt(element.innerText) >= numMax) clearInterval(intervalId);
    }, 1);
}

const observer = new IntersectionObserver(verifyVisibility, options);

document.querySelectorAll("#modules .modul")
    .forEach(n => observer.observe(n));

document.querySelectorAll("#stadistics .stadistic-content")
    .forEach(n => observer.observe(n)); 



document.querySelectorAll("#who > div").forEach(n => new IntersectionObserver(entries => {

    for(let entry of entries){

        if(entry.isIntersecting){
            let element = entry.target;
            element.classList.add("load");
        }

    }

}, {threshold: .5}).observe(n));


const openModal = (submodal, callback) => {
    document.getElementById(submodal).style.display = "";
    modal.style.top = window.scrollY + "px";
    document.body.style.overflowY = "hidden";
    modal.classList.add("visible");
    if(callback) callback();
}

const close_modal = document.querySelector("#modal .close-modal")

const closeModal = () => {
    modal.classList.remove("visible");
    return new Promise((resolved, reject) => {

        const transitionEnd = () => {
            document.body.style.overflowY = "";
            Array.from(modal.children).forEach(n => n.style.display = "none");
            close_modal.style.display = "";
            modal.removeEventListener("transitionend", transitionEnd);
            resolved();
        }

        modal.addEventListener("transitionend", transitionEnd);
    
    });
}

close_modal.addEventListener("click", closeModal);

document.addEventListener("keydown", async function(e) {
    if(e.key == 'Escape' && modal.classList.contains("visible")){
        close_modal.classList.add("hover");
        await closeModal(e);
        close_modal.classList.remove("hover");
    }
});
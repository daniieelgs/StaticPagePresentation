const timing = 300;

document.querySelectorAll(".icon-svg")
    .forEach(n => {

        const svg = n.getAttribute("d");
        const startColor = n.getAttribute("start-color");
        const endColor = n.getAttribute("end-color");
        const nameIcon = n.getAttribute("nameIcon");
        
        const seconsTiming = timing / 1000;

        n.innerHTML += `            
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="64"
        height="64"
        id="${nameIcon}"
        >
            <linearGradient
            id="putColor${nameIcon}"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            >
            <stop offset="0%" stop-color="${startColor}">
                <animate
                attributeName="offset"
                values="1;0"
                dur="${seconsTiming}s"
                restart = "whenNotActive" begin="${nameIcon}.mouseenter"
                ></animate>
            </stop>
            <stop offset="100%" stop-color="${endColor}">
                <animate
                attributeName="offset"
                values="1;0"
                dur="${seconsTiming}s"
                restart = "whenNotActive" begin="${nameIcon}.mouseenter"
                ></animate>

                <stop offset="100%" stop-color="${endColor}" stop-opacity="1">
            </stop>
            </linearGradient>

            <linearGradient
            id="quitColor${nameIcon}"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            >
            <stop offset="0%" stop-color="${startColor}">
                <animate
                attributeName="offset"
                values="0;1"
                dur="${seconsTiming}s"
                restart = "whenNotActive" begin="${nameIcon}.mouseleave"
                ></animate>
            </stop>
            <stop offset="100%" stop-color="${endColor}">
                <animate
                attributeName="offset"
                values="0;1"
                dur="${seconsTiming}s"
                restart = "whenNotActive" begin="${nameIcon}.mouseleave"
                ></animate>

                <stop offset="100%" stop-color="${endColor}" stop-opacity="1">
            </stop>
            </linearGradient>

            <g fill="#fff" class="icon-svg">
            <path
                fill="url=(#putColor${nameIcon})"
                d=${svg}
                stroke="black"
                stroke-width=".3"
            ></path>
            </g>
        </svg>
        `;

        const path = Array.from(n.lastElementChild.children).filter(x => x.classList.contains("icon-svg"))[0].firstElementChild

        let on = false;

        path.addEventListener("mouseenter", e => {
            path.setAttribute("fill", `url(#putColor${nameIcon})`);
            on = true;
            setTimeout(() => path.setAttribute("fill", on ? endColor : startColor), timing-50);
        });

        path.addEventListener("mouseleave", e => {
            path.setAttribute("fill", `url(#quitColor${nameIcon})`);
            on = false;
            setTimeout(() => path.setAttribute("fill", startColor), timing-50);
        });
    });
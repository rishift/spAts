const jobType = document.getElementById("type");
const stipend = document.getElementById("stipend");
const desc = document.getElementById("jdesc");
const upload = document.getElementById("upload");
const fetchc = document.getElementById("fetchc");

upload.onclick = () => {
    if (desc.value == "")
        Swal.fire({
            title: "Ohho!",
            text: "Please provide the job description!",
            icon: "warning",
            color: "#fff",
            background: "#2b2b37",
            confirmButtonText: `<button class="btn">OK</button>`,
        });
    else if (jobType.selectedIndex === 0)
        Swal.fire({
            title: "Ohho!",
            text: "Please select a job type!",
            icon: "warning",
            color: "#fff",
            background: "#2b2b37",
            confirmButtonText: `<button class="btn">OK</button>`,
        });
    else {
        let n = localStorage.length;
        let dt = {
            t: jobType.selectedOptions[0].innerText,
            s: stipend.value,
            d: desc.value,
        };
        localStorage.setItem(n + 1, JSON.stringify(dt));

        Swal.fire({
            title: "Yayy!",
            text: "Your job has been successfully saved",
            color: "#fff",
            background: "#2b2b37",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
        addj(dt);
    }
};

let n = localStorage.length;

function addj(dt) {
    let cont = document.createElement("div");
    cont.classList.add("cont");
    let descc = document.createElement("div");
    descc.classList.add("descc");
    descc.textContent = dt.d;
    let sideb = document.createElement("div");
    sideb.classList.add("sideb");
    let ty = document.createElement("div");
    ty.textContent = dt.t;
    sideb.appendChild(ty);
    if (dt.s) {
        let st = document.createElement("div");
        st.textContent = "₹" + dt.s;
        sideb.appendChild(st);
    }
    cont.appendChild(descc);
    cont.appendChild(sideb);
    fetchc.appendChild(cont);
}

for (let i = 1; i <= n; ++i) {
    let dt = JSON.parse(localStorage.getItem(i));
    addj(dt);
}

let fbs = document.getElementsByClassName("fb");
let on = [];

Array.from(fbs).forEach((e) => {
    e.onclick = () => {
        
            if (e.classList.contains("sel")) {
                on.splice(on.indexOf(e));
                Array.from(fetchc.children).forEach(r=>{
                    if (r.children[1].children[0].textContent == e.textContent) r.remove()
                })
            } else {
                on.push(e);
                fetchc.replaceChildren();
                for (let i = 1; i <= n; ++i) {
                    let dt = JSON.parse(localStorage.getItem(i));
                    on.forEach(r=> {
                    if (dt.t == r.textContent) addj(dt);
                    })
                }
            }
            if (fetchc.children.length == 0) {
                for (let i = 1; i <= n; ++i) {
                    let dt = JSON.parse(localStorage.getItem(i));
                    addj(dt);
                }
            }
        e.classList.toggle("sel");
    };
});

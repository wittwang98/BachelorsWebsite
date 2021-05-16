var lang = "sv"
var swapable = document.querySelectorAll('[json]')
var keyAddon = ""

updateLanguage = () =>{
    
    if (lang == "sv"){
        window.localStorage.setItem("lang", "en")
    }
    else{
        window.localStorage.setItem("lang", "sv")
    }
    lang = window.localStorage.getItem("lang")
    loadAll()
}

startPageButtons = () =>{
    document.getElementById("chair").addEventListener("click", toChair)
    document.getElementById("desk").addEventListener("click", toDesk)
    document.getElementById("whiteboard").addEventListener("click", toWhiteboard)
    document.getElementById("portable").addEventListener("click", toPortable)
    document.getElementById("projectReport").addEventListener("click", toProject)
    document.getElementById("pedagogicsReport").addEventListener("click", toPedagogics)
    document.getElementById("designReport").addEventListener("click", toDesign)
    document.getElementById("circularityReport").addEventListener("click", toCircularity)
}

toChair = () =>{
    window.localStorage.setItem("keyAddon", "chair")
    window.location.href="/products.html"
}
toDesk = () =>{
    window.localStorage.setItem("keyAddon", "desk")
    window.location.href="/products.html"
}
toWhiteboard = () =>{
    window.localStorage.setItem("keyAddon", "whiteboard")
    window.location.href="/products.html"
}
toPortable = () =>{
    window.localStorage.setItem("keyAddon", "portable")
    window.location.href="/products.html"
}
toProject = () =>{
    window.localStorage.setItem("keyAddon", "projectReport")
    window.location.href="/reports.html"
}
toPedagogics = () =>{
    window.localStorage.setItem("keyAddon", "pedagogicsReport")
    window.location.href="/reports.html"
}
toDesign = () =>{
    window.localStorage.setItem("keyAddon", "designReport")
    window.location.href="/reports.html"
}
toCircularity = () =>{
    window.localStorage.setItem("keyAddon", "circularityReport")
    window.location.href="/reports.html"
}

loadAll = ()=>{
    swapable.forEach(element => {
        key = element.getAttribute("json")
        //console.log(key)
        //console.log(keyAddon)

        if (keyAddon == null){
            element.innerHTML = content[lang][key]
        }
        else{
            element.innerHTML = content.sv.chair[key]
            //[lang].keyAddon[key]
        }
        element.style.opacity="1"
    })

    var image = document.querySelector('[jsonImage="languageImage"]')
    image.src = content[lang]["languageImage"]
    image.style.opacity="1"

    image = document.querySelector('[jsonImage="logo"]')
    image.src = content[lang]["logo"]
    image.style.opacity="1"

    image = document.querySelector('[jsonImage="contactImage"]')
    image.src = content[lang]["contactImage"]
    image.style.opacity="1"
}

start = async ()=>{
    const res = await fetch("content.json")
    content = await res.json()

    if ((new URL(window.location.href).pathname) == "/"){
        window.localStorage.setItem("keyAddon", "")
        console.log(window.localStorage.getItem("keyAddon"))
        startPageButtons()
    }
    
    keyAddon = window.localStorage.getItem(keyAddon)
    console.log(keyAddon)

    if (window.localStorage.getItem("lang") === null){    
        window.localStorage.setItem("lang", "sv")
    }
    else{
        lang = window.localStorage.getItem("lang")
    }

    loadAll()

    document.getElementById("language").addEventListener("click", updateLanguage)

}

start()
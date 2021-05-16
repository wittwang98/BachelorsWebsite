var lang = "sv"
var swapable = document.querySelectorAll('[json]')
var swapableImages = document.querySelectorAll('[jsonImage]')
var keyAddon = ""

console.log(swapable)

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

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

toPage = (address, keyAddonValue) =>{
    window.localStorage.setItem("keyAddon", keyAddonValue)
    keyAddon = window.localStorage.getItem("keyAddon")

    window.location.href=address
}

toReport = (report) =>{
    var address = content[lang][report]["link"]
    window.location.href=address
}

loadAll = ()=>{
    swapable.forEach(element => {
        key = element.getAttribute("json")
        console.log(key)
        if (keyAddon == ""){
            element.innerHTML = content[lang][key]
        }
        else{
            element.innerHTML = content[lang][keyAddon][key]
        }
        element.style.opacity="1"
    })

    swapableImages.forEach(element => {
        console.log(element)
        key = element.getAttribute("jsonImage")
        console.log(key)
        if (keyAddon == ""){
            element.src = content[lang][key]
        }
        else{
            element.src = content[lang][keyAddon][key]
        }
        element.style.opacity="1"
    })
    
   /* var image = document.querySelector('[jsonImage="languageImage"]')
    image.src = content[lang]["languageImage"]
    image.style.opacity="1"

    image = document.querySelector('[jsonImage="logo"]')
    image.src = content[lang]["logo"]
    image.style.opacity="1"

    image = document.querySelector('[jsonImage="contactImage"]')
    image.src = content[lang]["contactImage"]
    image.style.opacity="1" */
}

start = async ()=>{
    const res = await fetch("content.json")
    content = await res.json()

    if ((new URL(window.location.href).pathname) == "/"){
        window.localStorage.setItem("keyAddon", "")
        console.log(window.localStorage.getItem("keyAddon"))
    }
    
    keyAddon = window.localStorage.getItem("keyAddon")

    console.log(keyAddon)

    if (window.localStorage.getItem("lang") === null){    
        window.localStorage.setItem("lang", "sv")
    }
    else{
        lang = window.localStorage.getItem("lang")
    }

    loadAll()

    document.getElementById("language").addEventListener("click", updateLanguage)

    //card swap function if there's time

}

start()
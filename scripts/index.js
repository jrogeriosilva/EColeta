const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const Fechar = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

Fechar.addEventListener("click", () => {
    modal.classList.add("hide")
})

function populateUFs() {
    const UfSelect =  document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then ( states => {

        for( const state of states ) {

            UfSelect.innerHTML += `<option value="${state.id}">${state.nome}`
        }

    })
}

populateUFs();


function getCities(event){
    const citySelect =  document.querySelector("[name=city]")
    const stateInput =  document.querySelector("[name=state]")
    
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade </option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then ( cities => {

        for( const city of cities ) {

            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}`
        }
        citySelect.disabled = false
    }) 
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 


// Itens de coleta
// Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")


for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Adcionar ou remover uma classe com javascript

    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id



    // Verificar se existe items selecionados, se sim
    //pegar os items selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    } )

    //se já estiver selecionado, 

    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        } )
        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado
        // adicionar a seleção
        selectedItems.push(itemId)

    }

    // atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems
}

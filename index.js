document.addEventListener("DOMContentLoaded",()=>{

    //DOM
    const form = document.querySelector("form")
    const selectForm = document.querySelector("form select")
    const result = document.querySelector("#result")

    //Get All Assets Platforms
    fetch("https://api.coingecko.com/api/v3/asset_platforms").then((res => res.json())).then((res => {
        res.map(rs => selectForm.insertAdjacentHTML("beforeend",`<option value="${rs.id}">${rs.name}</option>`))
    })).catch(err => alert(err.message))

    //Find Contract
    form.addEventListener("submit", e =>{
        e.preventDefault()
        result.style.display = "none"
        spinner(true)
        const obj = {
            id: e.currentTarget.querySelector("select").value,
            name: e.currentTarget.querySelector("input").value
        }

        fetch(`https://api.coingecko.com/api/v3/coins/${obj.id}/contract/${obj.name}`).then(res => res.json()).then(res => {

            spinner(false)
            

            //Check If There is Error
            if(res.error) return alert(res.error)

            //Here Are The Retrieved Datas
            result.style.display = "block"
            result.innerHTML = ``
            result.innerHTML = `<ol class="list-group list-group-numbered">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Name</div>
                <span>${res.name}</span>
              </div>
              
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Symbol</div>
                <span>${res.symbol}</span>
              </div>
              
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Assets ID</div>
                <span>${res.asset_platform_id}</span>
              </div>
              
            </li>
          </ol>`
          
            

        }).catch(err => alert(err.message))
    })

    //Spinner
    function spinner(status){
        const spinnerWrapper = document.querySelector("#spinner");

        if(status){
            spinnerWrapper.style.display = "flex";
        }else{
            spinnerWrapper.style.display = "none";
        }
        
    }
})

//https://api.coingecko.com/api/v3/asset_platforms
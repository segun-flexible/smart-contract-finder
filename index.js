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

        fetcher(obj.id,obj.name)
        
    })

    //Auto Submit
    form.querySelector("input").addEventListener("input",e =>{
        //Check If Contract Type Is Selected
        if(form.querySelector("select").value){

            result.style.display = "none"
            spinner(true)
            const obj = {
                id: form.querySelector("select").value,
                name: form.querySelector("input").value
            }

            fetcher(obj.id,obj.name)

        }else return alert("Select A Contract Type")
        
    })

    //Spinner
    function spinner(status){
        const spinnerBtn = form.querySelector("button");

        if(status){
            spinnerBtn.innerHTML = `<div class="spinner-border text-white" role="status"><span class="visually-hidden">Loading...</span></div>`
        }else{
            spinnerBtn.innerHTML = `Find`
        }
        
    }

    function fetcher(id,name){
        fetch(`https://api.coingecko.com/api/v3/coins/${id}/contract/${name}`).then(res => res.json()).then(res => {

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
    }
})

//https://api.coingecko.com/api/v3/asset_platforms

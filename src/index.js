start().then(data => {renderDoggo(data, false)})

const dogBar = document.querySelector('#dog-bar');

const dogInfo = document.querySelector("#dog-info");

function renderDoggo (data, filter = false){
    dogBar.innerHTML = ""
    data.forEach((data)=>{
        const nameSpan = document.createElement('span')
        nameSpan.textContent = data.name;
        let isGoodDog = data.isGoodDog;
        
        
        if (filter && isGoodDog){
            dogBar.append(nameSpan)
        }

        if (!filter){
            dogBar.append(nameSpan)
        }
        
        nameSpan.addEventListener("click", (e) => {
            dogInfo.innerHTML = ""
            const id = data.id;
            const nameH2 = document.createElement('h2')
            nameH2.textContent = data.name;
            const image = document.createElement('img')
            image.src = data.image;
            const button = document.createElement('btn')
            if (isGoodDog){button.textContent = "Good Dog"
            }else{button.textContent = "Bad Dog"}

            button.addEventListener('click', (e) => {
                if (isGoodDog){                
                    fetch('http://localhost:3000/pups/'+id, {
                        method: 'PATCH',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({isGoodDog : false})
                    })
                    .then(response => response.json())
                    .then(()=>{
                        isGoodDog = false;
                        button.textContent = "Bad Dog";
                        nameSpan.className = "bad";
                        if (goodDogFilter.textContent === "Filter good dogs: ON"){
                            start().then(data => {renderDoggo(data, true)})
                        };
                    })  
                } else if (!isGoodDog){
                    fetch('http://localhost:3000/pups/'+id, {
                        method: 'PATCH',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({isGoodDog : true})
                    })
                    .then(response => response.json())
                    .then(()=>{
                        isGoodDog = true;
                        button.textContent = "Good Dog";
                        nameSpan.className = "good";
                        if (goodDogFilter.textContent === "Filter good dogs: ON"){
                            start().then(data => {renderDoggo(data, true)})
                        }
                    })
                }
            })
            dogInfo.append(image);
            dogInfo.append(nameH2);
            dogInfo.append(button);
        })
    })
}




    
function start(){
    return fetch('http://localhost:3000/pups')
    .then(response => response.json())
}

/////////////////////



const goodDogFilter = document.querySelector('#good-dog-filter');



goodDogFilter.addEventListener("click", (e)=>{
    if (goodDogFilter.textContent === "Filter good dogs: OFF"){
        goodDogFilter.textContent = "Filter good dogs: ON";
        start().then(data => {renderDoggo(data, true)});
    } else if (goodDogFilter.textContent === "Filter good dogs: ON"){
        goodDogFilter.textContent = "Filter good dogs: OFF";
        start().then(data => {renderDoggo(data, false)});
    }
})
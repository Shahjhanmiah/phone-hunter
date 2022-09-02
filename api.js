const loadPhone = async(searchText,daatLimit) =>{
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const  data = await res.json();
    displayPhones(data.data,daatLimit);

}
const displayPhones = (phones,daatLimit,) =>{
    //console.log(phones)
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.textContent = '';
    //phones = phones.slice(0,3);
    const showAll  = document.getElementById('show-all');
   if( daatLimit && phones.length > 10) {
    phones = phones.slice(0,10)
    showAll.classList.remove('d-none');
   }
    else{
        showAll.classList.add('d-none');

    }
    
// button click button
    const noPhone = document.getElementById('no-found-message');
    if( phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    phones . forEach(phone =>{
        console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML= `
        <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <button onclick="loadPhoneDeatails
        ('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">showDeatilce</button>
      
                </div>
              </div>
            </div>
            `;
            phonesContainer.appendChild(phoneDiv);
    })
    toggleSpinner(false);

}
const processSearch = (daatLimit) =>{
    toggleSpinner(true);
    //toggleSpinner(false);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText,daatLimit);

}


document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10)
})


document.getElementById('search-field').addEventListener('keypress', function (e){
    console.log(e.key);
    if(e.key === 'Enter'){
        processSearch(10)

    }
})


/*const toggleSpinner = isLoading => {
    const loadeSection = document.getElementById('loader')
    if(isLoading){
        loadeSection.classList.remove('d-none');
    }
    else{
        loadeSection.classList.add('d-none');
    }
    
}
*/
const toggleSpinner = isLoading => {
    const loadeSection = document.getElementById('loader')
    if(isLoading){
        loadeSection.classList.remove('d-none')
    }
    else{
        loadeSection.classList.add('d-none') 
    }
}




 document.getElementById('btn-show-all').addEventListener('click',function(){
    
    processSearch();
 })
loadPhone();

const loadPhoneDeatails = async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    disPhoneDeatails (data.data);
}

 const disPhoneDeatails = phone =>{
    console.log(phone)

    const modalTitle = document.getElementById('phoneDetailModalLable');
     modalTitle.innerText = phone.name;
    const PhoneDeatails = document.getElementById('phone-details');
    PhoneDeatails . innerHTML =`
    <p> Release Date: ${phone.releaseDate}</p>
    <img src="${phone.image}" class="card-img-top" alt="">`
    
    
    
    

}
loadPhoneDeatails();

 



///
 
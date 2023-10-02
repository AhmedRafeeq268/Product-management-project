let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let update = document.getElementById('update');
let mood = 'create';
let indexOfUpdate;
// console.log(title,price,taxes,ads,discount,count,category,submit)
// get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else
    {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//create product
let dataPro;
//هان كتبناالكود هاد علشان لو كان في بيانات وانا اعملت ريلود وضفت بيانات جديدة حيشيل البيانات القديمة 
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = function (){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    //count
    if(title.value!='' && price.value!='' && category.value!=''){
        if(mood === 'create'){

            if(newPro.count > 1){
                for (let i = 0; i < newPro.count; i++) {
                     dataPro.push(newPro);   
                }
            }
            else{
                     dataPro.push(newPro);
        
            }
            }
            else
            {
                dataPro[indexOfUpdate]=newPro;
                mood = 'create';
                submit.innerHTML='Create';
                count.style.display='block';
        
            }
            //بنستتدعي هادي الفنكشن علشان نمسح الاكلام من مربعات الانبوت بعد منخلص من عمليات الادخال
            clearData();
    }
    else{
        
    }

    //save localstorage
    // خزنا الاري باللوكل ستورج علشان لمن نعمل رييلود متروحش البيانات
    localStorage.setItem('product' , JSON.stringify(dataPro));

   
    showData();

}

//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
//read
function showData(){
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML=table;

    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDeleteAll.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length}) </button>
        `
    }
    else{
        btnDeleteAll.innerHTML='';
    }
    getTotal();

}
showData();





//delete
function deleteData(index){
    dataPro.splice(index,1);
    //بعد مامسح البيانات الي بدي اياها من الاري باحدث الاري باللوكل ستورج
    localStorage.product = JSON.stringify(dataPro);
    // باستدعي الفنكشن هادي علشان يحدث البيانات كل ماحذف من البيانات
showData();

}
// deleteAll
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
//update

function updateData(index){
    let element = dataPro[index];
    title.value=element.title;
    price.value=element.price;
    taxes.value=element.taxes;
    ads.value=element.ads;
    discount.value=element.discount;
    category.value=element.category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood='update';
    getTotal();
    indexOfUpdate=index;
    scroll({
        top:0,
        behavior:'smooth',
    });
}
//search

let searchMood='title';
function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id === 'searchTitle')
    {
        searchMood='title';
    }
    else{
        searchMood='category';
    }
    search.placeholder = 'Search By '+searchMood;

    search.focus();
    search.value='';
    showData();
}

function searchData(value){
    let table = '';
    if(searchMood === 'title'){
        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].title.includes(value))
            {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `;
                console.log(i);
            }
        }
    }
    else{
        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].category.includes(value))
            {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `;
                console.log(i);
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;

}
//clean data




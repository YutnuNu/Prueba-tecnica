const filtre = document.getElementById("filtre");
const catalogo = document.getElementById("catalogo");
let nameProduct = document.getElementById("nameProduct");
let priceProduct = document.getElementById("price");
const categoryProduct = document.getElementById("categorySelect");
const btnGuardar = document.getElementById("btnGuardar");
const alertSucces = document.getElementById("alertSucces");
const alertDanger = document.getElementById("alertDanger");
const alertData = document.getElementById("alertData");
const form = document.getElementsByTagName("form");
const categorySelect = document.getElementById("categorySelect");
let bd = [];

//validaciones nombre y precio del producto
function valNumber() {
    if (price.value <= 0) {
        return false;
    }
    if (isNaN(price.value)) {
        return false;
    }
    return true;
}
function valName() {
    if (nameProduct.value.trim().length < 7) {
        return false;
    }
    return true;
}
window.addEventListener("load",mostarCatalogo);
//let id = 0;
function generarID(){
    let id = localStorage.getItem("id") || [];
    id++;
    localStorage.setItem("id",id)
    return id;
}
//vefiricar las validacones y guardar el producto de estar todo bien
function addProduct(e) {
    e.preventDefault();
    
    alertData.classList.add("d-none");
    if (!valNumber() || !valName()) {
        alertData.classList.remove("d-none");
    } else {
        alertData.classList.add("d-none");

        
        const data = {
            id: generarID(),
            name: nameProduct.value,
            price: priceProduct.value,
            category: categoryProduct.value
        };
        bd.push(data);
        localStorage.setItem("product",JSON.stringify(bd));
        
    }
    mostarCatalogo();
}
//evento boton para subir los datos y guardarlos
btnGuardar.addEventListener("click", addProduct);

//mostrar en el catalogo
function mostarCatalogo(e){
     catalogo.innerHTML="";
     bd = JSON.parse(localStorage.getItem("product")) || [];
     //console.log(bd);
     bd.forEach((d)=>{
         console.log(d)
         const prod = 
         `
         <div class="card text-center productos" data-category="${d.category}" id="${d.id}">
             <div class="card-body">
             <p id="nombre"> ${d.name} </p>
             <p id="precio"> precio:$${d.price}</p>
                 <button class="btn btn-outline-danger btnEliminar mt-4" style="width:100px" >Eliminar</button>
                 <button class="btn btn-outline-primary btnEditar mt-4" style="width:100px" 
                 data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
             </div>
             
         </div>
         `;
         catalogo.insertAdjacentHTML("beforeend", prod);
     });
     catalogo.addEventListener("click",deleteProduct);
     btnSaveEdit.addEventListener("click",editProduct);
     price.value = "";
     nameProduct.value = "";
     categoryProduct.value = "";
}
// elimionar productos
function deleteProduct(e){
    if(e.target.classList.contains("btnEliminar")){
        const item = e.target.closest(".productos");
        const id = item.getAttribute("id");
        item.remove();
        bd = bd.filter(p=> p.id !=id);
        localStorage.setItem("product",JSON.stringify(bd));
    }
    
}
//variables para la edicion de informacion
const productos = document.querySelectorAll(".productos");
const btnSaveEdit = document.getElementById("btnSaveEdit");
let nameProductE = document.getElementById("nameProductE");
let priceProductE = document.getElementById("priceE");
const categoryProductE = document.getElementById("categorySelectE");
let editId = null;
catalogo.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btnEditar")){
        const item = e.target.closest(".productos");
        editId = item.getAttribute("id");
        const productoEdit = bd.find(tem=>item.id == editId);
        if(productoEdit){
            nameProductE.value = productoEdit.name;
            priceProductE.value = productoEdit.price;
            categoryProductE.value = productoEdit.category;
        }
        
    }
})
function editProduct(){
    const itemLS = JSON.parse(localStorage.getItem("product")) || [];
    const itemM = itemLS.find(item=>item.id == editId);
    
    if(itemM){
        itemM.name = nameProductE.value;
        itemM.price = priceProductE.value;
        itemM.category = categoryProductE.value;
    }
    localStorage.setItem("product",JSON.stringify(itemLS))
    mostarCatalogo();
}
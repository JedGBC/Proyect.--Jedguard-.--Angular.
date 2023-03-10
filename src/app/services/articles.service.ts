import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface pubs{
  cardTitlePub : string,
  message : string,
  imagen : string,
  id_user : string,
  item_id : string
}
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private itemsPersonalPubs : pubs [] = [];
  private itemsBase : pubs [] = [];
  private itemsPubs : pubs [] = [];
  private pubsDB:any = [];

  private newDataPublication : any = {
  cardTitlePub : 'Pequeño Affenpinsher', 
  message : 'Hola estoy buscando un hogar que me pueda acoger, por favor sé mi guardián.',
  imagen : './assets/img/affenpninsher.jpg',
  id_user: '0',
  item_id: '1'};
  
  private dataPublications:any = [ //DATA BASE PARA RELLENO
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '2'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '3'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '4'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '5'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '6'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '7'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '8'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '9'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '10'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '11'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '12'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '13'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '14'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '15'},
    {cardTitlePub : 'Rescatado hermoso perrito', 
    message : 'Hola estoy buscando un hogar fui abandonado en la calle, Adoptame!',
    imagen : '',
    id_user: '0',
    item_id: '16'}
  ];

  private urlApi = 'https://dog.ceo/api/breeds/image/random';

  constructor(private http:HttpClient) { }

  getDogsPictures():Observable<any>{
    let cant = this.dataPublications.length;
    console.log("Is hited : ArticlesService.getDogsPictures()",cant);
    this.http.get(this.urlApi+'/'+(cant));
    
    return this.http.get(this.urlApi+'/'+(cant));
  }
  
  getPublications(){
    console.log("Is hited : ArticlesService.getPublications()");
    let X = this.integratePubs();
    sessionStorage.setItem("publicacionesWeb", JSON.stringify(X)); //almaceno en sessionStorage
    console.log("***Data de publicaciones del getPublications() guardada en SesionStorage***");
    //JSON.parse(sessionStorage.getItem("publicacionesWeb") || "[]"); //para rescatar la data
    return X;
  }
  
  
  private integratePubs(){ //carga imagenes en las cards
    
    this.pubsDB = [];
    //console.log(this.pubsDB);

    this.pubsDB.push(this.newDataPublication);
    //console.log(this.pubsDB);
    
    for (let index = 0; index < this.dataPublications.length; index++) {
      const img = JSON.parse(sessionStorage.getItem("picsServiceResponse") || "[]");
      this.dataPublications[index].imagen = img[index];
    }
    
    
    for (let index = 0; index < this.dataPublications.length; index++) {
    this.pubsDB.push(this.dataPublications[index]);
    }
    
    //console.log(this.pubsDB);
    return this.pubsDB;

    
  }

  getPubsDetail(id:any){
    //console.log(this.pubsDB);
    console.log(id);
    //return this.pubsDB[id];
    let list = this.getDataListComplete();
    return list[id];
  }
  
  getOnePic(){
    return this.http.get(this.urlApi);
  }

  postPublication(value:any){
    //debugger;
    let check : number;
    
    check = Number(localStorage.getItem("check"));
    

    if (check === 0 ||
      check === null || 
    check === undefined) {
      localStorage.setItem("postPublication",JSON.stringify(value));
      localStorage.setItem("check","1");
      console.log("°°°°°°°°°°°°°°°°°°1==0");
    } else {
      console.log("°°°°°°°°°°°°°°°°°°2>0");
      let value2 =[];
      
      if (check === 1) {
        console.log("°°°°°°°°°°°°°°°°°°2.1",check);
        let value1 = JSON.parse(localStorage.getItem("postPublication") || "[]");
        let check2 = Number(localStorage.getItem("check2"));
        if (check2 === 1) {
          value2 = value1;
        } else {
          value2.push(value1);
        }
        value2.push(value);
        localStorage.setItem("postPublication",JSON.stringify(value2));
        check=check+1;
        localStorage.setItem("check2","0");
        localStorage.setItem("check",check.toString());
      } else if (check > 1) {
        let value1 = JSON.parse(localStorage.getItem("postPublication") || "[]");
        for (let index = 0; index < check; index++) {
          value2.push(value1[index]);
        }
        value2.push(value);
        localStorage.setItem("postPublication",JSON.stringify(value2)); 
        console.log("°°°°°°°°°°°°°°°°°°2.2",check);
        check=check+1;
        localStorage.setItem("check",check.toString());
      }
    }
  }

    
  getLocalStoragePostPublication(id:any){
    console.log(id);
    let check : number;
    let check2 : number;
    let value;
    check = Number(localStorage.getItem("check"));
    check2 = Number(localStorage.getItem("check2"));
    if (check === 1 && check2 === 0) {
      value = JSON.parse("["+(localStorage.getItem("postPublication") || "[]")+"]");
    } else {
      value = JSON.parse(localStorage.getItem("postPublication") || "[]");
    }

    
    console.log("*** getLocalStoragePostPublication() devuelve objeto a editar***");
    return value[id]; //retornamos el object
    
  }

  postChangeObjectInLocalStorage(obj:any,id:any){
    console.log("*** postChangeObjectInLocalStorage() Se edita el objeto correctamente***");
    //debugger;
    let value;
    let check : number;
    let check2 : number;
    check = Number(localStorage.getItem("check"));
    check2 = Number(localStorage.getItem("check2"));
    
    if (check === 1 && check2 === 0) {
      value = JSON.parse("["+(localStorage.getItem("postPublication") || "[]")+"]");
      console.log("Valor antiguo: ",value);
      value = obj;
      console.log("Valor Nuevo: ",value);
    } else if (check > 1 && check2 === 0) {
      value = JSON.parse(localStorage.getItem("postPublication") || "[]");
      console.log("Valor antiguo: ",value[id]);
      value[id] = obj;
      console.log("Valor Nuevo: ",value[id]);
    } else if (check === 1 && check2 === 1){
      value = JSON.parse(localStorage.getItem("postPublication") || "[]");
      console.log("Valor antiguo: ",value[id]);
      value[id] = obj;
      console.log("Valor Nuevo: ",value[id]);
    }
    
    localStorage.setItem("postPublication",JSON.stringify(value));
    return console.log("Se actualizo el valor correctamente del obj:",value[id]);
  }

  deleteObjectInLocalStorage(id:any){
    //debugger;
    console.log("*** deleteObjectInLocalStorage() Se eliminara el objeto #***",id);
    let check : number;
    check = Number(localStorage.getItem("check"))-1;
    if (check === 1) {
      localStorage.setItem("check2","1");
    }
    localStorage.setItem("check",check.toString());
    if (check === 0) {
      localStorage.removeItem('check');
      localStorage.removeItem('check2');
      localStorage.removeItem('postPublication');
      return console.log("Actualizando Almacenamiento: VACIO");
    } else {
      let value = JSON.parse(localStorage.getItem("postPublication") || "[]");
      value.splice(id,1);
      localStorage.setItem("postPublication",JSON.stringify(value));
      return console.log("Actualizando Almacenamiento:",value);
    }
    
    
  }

  getDataListComplete(){ //tiene todos los arrays
    //debugger;
    
    

    this.itemsBase = [];
    this.itemsPubs = [];
    this.itemsBase = this.getPublications();
    this.itemsPubs = this.callPublications();
    console.log("-------------------1-publicas",this.itemsBase.length);
    console.log("-------------------2-privadas",this.itemsPubs.length);
    let itemsA = [];
    for (let index = 0; index < (this.itemsBase.length); index++) {
      itemsA.push(this.itemsBase[index]);
    }

    for (let index = 0; index < (this.itemsPubs.length); index++) {
      itemsA.push(this.itemsPubs[index]);
    }
    console.log("getDataListComplete()",itemsA);
    return itemsA;
  }

  private callPublications(){ //complemento de getDataListComplete()
    //debugger;
    let check : number;
    let check2 : number;
    check = Number(localStorage.getItem("check"));
    check2 = Number(localStorage.getItem("check2"));
    if (check === 1 && check2 === 0) {
      this.itemsPersonalPubs = JSON.parse("["+(localStorage.getItem("postPublication") || "[]")+"]");
    } else if (check > 1 && check2 === 0) {
      this.itemsPersonalPubs = JSON.parse(localStorage.getItem("postPublication") || "[]");
    } else if (check === 1 && check2 === 1){
      this.itemsPersonalPubs = JSON.parse(localStorage.getItem("postPublication") || "[]");
    } else if (check === 0 && check2 === 0){
      this.itemsPersonalPubs = [];
    }

    return this.itemsPersonalPubs;
  }

  getAdoptionsCartList(){
    let listAdopt:pubs[]=[];
    listAdopt = JSON.parse(localStorage.getItem("cartList") || "null");
    return listAdopt;
  }

  postAdoptionsCartList(obj:pubs){
        
    if (JSON.parse(localStorage.getItem("cartList") || "null")===null) {
      if (obj.id_user !== sessionStorage.getItem("userData")) {
        localStorage.setItem("cartList","["+JSON.stringify(obj)+"]");
      } else {
        alert("No puedes adoptar tu propia mascota publicada!");
      }
    } else {
      if (obj.id_user !== sessionStorage.getItem("userData")) {
        let obj1 = JSON.parse(localStorage.getItem("cartList") || "null");
        let contador=0;
        for (let index = 0; index < obj1.length; index++) {
          if (obj1[index].item_id === obj.item_id) {
            contador++;
          } 
        }
        if (contador===0) {
          obj1.push(obj);
          localStorage.setItem("cartList",JSON.stringify(obj1));
        } else {
          console.log("PUBLICACION YA ESTA EN CARRITO");
        }
      } else {
        alert("No puedes adoptar tu propia mascota publicada!");
      }
    }
  }
  
  deleteAdoptionsCartList(id:number){
    console.log("BORRAR ITEM ",id);
    let obj1 = JSON.parse(localStorage.getItem("cartList") || "null");
    
    if (obj1.length===1) {
      localStorage.removeItem("cartList");
    } else {
      obj1.splice(id,1);
      localStorage.setItem("cartList",JSON.stringify(obj1));
    }
  }

  deleteCartList(){
    localStorage.removeItem("cartList");
  }

}

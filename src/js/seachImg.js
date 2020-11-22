import ApiService from './apiService.js';
import cardTpl from '../templates/cardTemplate.hbs';
import ref from './ref.js';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

// Set default styling.
PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material';



const apiService = new ApiService ();

ref.form.addEventListener(`submit`, onSearch);
ref.btnLoadMore.addEventListener(`click`, onCreatesMarkupMore);

function onSearch(e) {
    e.preventDefault();
    apiService.searchValue = e.currentTarget.elements.query.value;

    if (apiService.searchValue === ``) {
       return  PNotify.info({
                text: "Enter the data!"
                           });
    }
    clearMarkupGalleryContainer();
    apiService.clearPage();
    onCreateCard();
    
    imgModal()

 }

async function onCreateCard() { 
    try {
        const asyncFetchApi = await apiService.fetchApi();
        const markupString = cardTpl(asyncFetchApi.hits);
       
        if (asyncFetchApi.hits.length === 0) {
           return PNotify.info({
                          text: "No results were found for your search."
                            });
        }
        markupCards(markupString)
        ref.btnLoadMore.classList.remove(`is-hidden`);   
        
    }
    catch {
       
            PNotify.error({
                  text: "Sorry, server error."
                       });           
       
    }
 }
    
function markupCards (data) {
 return ref.gallery.insertAdjacentHTML(`beforeend`, data);
}

function clearMarkupGalleryContainer() {
    return ref.gallery.innerHTML = ``;
}

function onCreatesMarkupMore() {
    onCreateCard();
    imgModal();
    // scrollTo();

    
}

// function scrollTo() {
//     const {y} = ref.gallery.lastElementChild.getClientRects() ;
//      window.scrollTo({
//          top: 2500 ,
//          behavior: 'smooth'
// })
// }

function imgModal() {
    setTimeout(() => {
        const imgRef = document.querySelectorAll('#template');

        imgRef.forEach((e) => {
             const instance = basicLightbox.create(`<img width="1400" height="900" 
       src="${e.dataset.src}">`);
            
            e.onclick = () => {
            instance.show()
        }
        });
        
    }, 1500)
}




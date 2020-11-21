const KEY = `19168514-abe4fd6e9277293fb68a0fc7f`;
const URL = `https://pixabay.com/api`;


export default class ApiService {
    constructor () {
        this.searchValue = ``;
        this.page = 1
    }


 fetchApi () {
    return fetch(`${URL}/?key=${KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`)
            .then(response => response.json())
        .then(data => {
            this.incrementPage();
            return data
        })
} 
    
incrementPage() {
    this.page += 1;
}

clearPage() {
    this.page = 1;
}
}
    
    
    
    
   
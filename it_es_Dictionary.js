class it_es_LingueeDictionary {
    constructor() {
        this.baseURL = 'https://www.linguee.com/italian-spanish/search?source=auto&query=';
    }

    findTerm(word) {
        return new Promise((resolve, reject) => {
            const url = `${this.baseURL}${word}`;
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const definition = doc.querySelector('.lemma .exact').innerText;
                    if (definition) {
                        resolve(definition);
                    } else {
                        reject('No se encontró definición');
                    }
                })
                .catch(error => reject(error));
        });
    }
}

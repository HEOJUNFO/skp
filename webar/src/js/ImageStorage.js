class ImageStorage {
            
    constructor(databaseName, storeName) {
        this.dbName     = databaseName;
        this.storeName  = storeName;
        this.db         = null;
    }

    openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName);

            request.onerror = () => {
                reject(Error('Failed to open database'));
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
            };
        });
    }

    getStore(isWrite = true) {
        const transaction = this.db.transaction([this.storeName], isWrite==true? 'readwrite' : 'readonly');
        return transaction.objectStore(this.storeName);
    }

    saveImage(imageData) {
        return new Promise((resolve, reject) => {
            const objectStore   = this.getStore();
            const request       = objectStore.put({ image: imageData });

            request.onerror = () => {
                reject(Error('Failed to save image'));
            };

            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }

    deleteImage(id) {
        const objectStore   = this.getStore();
        objectStore.delete(id);
    }
    
    deleteList(list) {
        const objectStore   = this.getStore();

        list.forEach(id=>{
            objectStore.delete(id);
        });
    }

    getImage(imageId) {
        return new Promise((resolve, reject) => {
            const objectStore   = this.getStore(false);
            const request       = objectStore.get(imageId);

            request.onerror = () => {
                reject(Error('Failed to get image'));
            };

            request.onsuccess = () => {
                resolve(request.result.data);
            };
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {

            const objectStore   = this.getStore(false);
            const request       = objectStore.getAll();

            request.onerror = () => {
                reject(Error('Failed to get image'));
            };

            request.onsuccess = () => {
                if (Array.isArray(request.result)) {
                    resolve(request.result.map(item => ({id: item.id, url: URL.createObjectURL(item.image)})));
                } else {
                    console.log('Failed to get image')
                }
            };
          
        }); 
    }

    clear() {
        const objectStore   = this.getStore();
        const request       = objectStore.getAll();

        request.onsuccess = ()=>{
            request.result.forEach(item=>{
                objectStore.delete(item.id);
            });
        }
    }
}

export default ImageStorage;
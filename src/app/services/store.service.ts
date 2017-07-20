import { Injectable } from "@angular/core";

export interface IStore {
    openDB(name: string, version: number): IPromise<IDBDatabase>;
    createObjectStore(db: any, objectStoreValue: string, keyPath: string): IPromise;
    addValueToObjectStore(db:any, transactionValue: string, objectStoreValue: string, value: Array<any>);
    removeValueFromObjectStore (db: any, objectStoreName: string, key: string);
    updateValueInTheObjectStore(objectStore: any, key:string);
    getValueFromObjectStore(db: any, transactionValue: string, objectStoreValue: string, field: string );
    createIndex(objectStore: any, indexName: string, isUniq: boolean): void;
    openCursor(db: any);
    getValueByIndex(objectStore: any, indexName: string, indexKey: string);
}

@Injectable()
export class StoreService {

    private indexedDB: IDBFactory;
    private indexedDBRequest: IDBOpenDBRequest;

    constructor() {
        this.indexedDB = window.indexedDB;
    };

    openDB(name: string, version: number): IPromise<IDBDatabase> {
        this.indexedDBRequest = this.indexedDB.open(name, version);
        this.indexedDBRequest.onerror = function(event) {
            // event.target.errorCode
            console.warn("error while opening the IndexedDB: "+ JSON.stringify(event))
        }

        this.indexedDBRequest.onblocked = function(event) {
            // If some other tab is loaded with the database, then it needs to be closed
            // before we can proceed.
            alert("Please close all other tabs with this site open!");
        };

        this.indexedDBRequest.onsuccess = function(event) {
            const customeEvent: any = event.target;
            const db = customeEvent.result;
            db.onclose = function (event){
                console.log(event);
            }
            return db;
        };

        this.indexedDBRequest.onupgradeneeded = function(event) {
            //aalter the structure of the DB
        }

        
    }


    createObjectStore(db: any, objectStoreValue: string, keyPath: string): IPromise {
        const objectStore = db.createObjectStore(objectStoreValue, { keyPath: keyPath });
        return objectStore.transaction; // return a Promise
    }

    addValueToObjectStore(db:any, transactionValue: string, objectStoreValue: string, value: Array<any>) {
        // Store values in the newly created objectStore.
        const os = db.transaction(transactionValue, "readwrite").objectStore(objectStoreValue);
        for (var i in value) {
            os.add(value[i]);
        }
    }

    removeValueFromObjectStore (db: any, objectStoreName: string, key: string) {
        var request = db.transaction([objectStoreName], "readwrite")
                .objectStore(objectStoreName)
                .delete(key);
        request.onsuccess = function(event) {
            // It's gone!
        };  
    }

    updateValueInTheObjectStore(objectStore: any, key:string){
        var request = objectStore.get(key);
        request.onerror = function(event) {
            // Handle errors!
        };
        request.onsuccess = function(event) {
            // Get the old value that we want to update
            var data = event.target.result;
  
            // update the value(s) in the object that you want to change
            data.age = 42;

            // Put this updated object back into the database.
            var requestUpdate = objectStore.put(data);
            requestUpdate.onerror = function(event) {
            // Do something with the error
            };
            requestUpdate.onsuccess = function(event) {
            // Success - the data is updated!
            };
        };
    }

    getValueFromObjectStore(db: any, transactionValue: string, objectStoreValue: string, field: string ): any{
        const transaction = db.transaction([transactionValue]);
        const objectStore = transaction.objectStore(objectStoreValue);
        objectStore.get(field).then( (event) => {    
            alert("Name for SSN 444-44-4444 is " + event.result.name);
            return event.result;
        })
        .catch( (event) => {
            // event.target.errorCode
            console.warn("error while opening the IndexedDB: "+ JSON.stringify(event))
        });
    }

    createIndex(objectStore: any, indexName: string, isUniq: boolean): void {
          objectStore.createIndex(indexName, indexName, { unique: isUniq });
    }

    openCursor(db: any) {
        var objectStore = db.transaction("customers").objectStore("customers");
        objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
            if (cursor) {
                alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
                cursor.continue();
            }
            else {
                alert("No more entries!");
            }
        };
    }

    getValueByIndex(objectStore: any, indexName: string, indexKey: string) {
        var index = objectStore.index(indexName);
        index.get(indexKey).onsuccess = function(event) {
            return event.target.result;
        };
    }
}
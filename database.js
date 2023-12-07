
import { openDB } from "idb";
const initdb = async () => openDB("PWA", 1, 
{
    upgrade(db) 
    {
        if (db.objectStoreNames.contains("PWA")) 
        {
            console.log("PWA database already exists");
            return;
        }
        db.createObjectStore("PWA", { keyPath: "id", autoIncrement: true });
        console.log("PWA database created");
    },
});
export const putDb = async (content) => 
{
    const PWADB = await openDB("PWA", 1);
    const tx = PWADB.transaction("PWA", "readwrite");
    const store = tx.objectStore("PWA");
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log("data saved to the database", result);
};
export const getDb = async () => 
{
    const PWADB = await openDB("PWA", 1);
    const tx = PWADB.transaction("PWA", "readonly");
    const store = tx.objectStore("PWA");
    const request = store.getAll();
    const result = await request;
    console.log("data read from database", result);
    return result.value;
};
initdb();
function SetData(key, data) {
    sessionStorage.setItem(key, data);
}

function GetData(key) {
    try {
        return sessionStorage.getItem(key);
    }
    catch (err) {
        return null;
    }
}

export const SessionStorage = { SetData, GetData }
import { parse, isToday, format } from 'date-fns';

const storageDateFormat = 'dd-MMM-yyyy pp'
function ValidateStorageData(key) {
    let updateKey = `${key}UpdatedDate`;
    let updatedDate = localStorage.getItem(updateKey);
    let parsedUpdatedDate = updatedDate ? parse(updatedDate, storageDateFormat, new Date()) : null;
    let isTodaysDate = parsedUpdatedDate ? isToday(parsedUpdatedDate) : false;

    if (isTodaysDate) {
        return;
    }

    localStorage.removeItem(key);
    localStorage.setItem(updateKey, format(new Date(), storageDateFormat));
}

function SetStorageUpdatedDate(key) {
    let updateKey = `${key}UpdatedDate`;
    localStorage.setItem(updateKey, format(new Date(), storageDateFormat));
}

function SetData(key, data) {
    if (!key || key === 'undefined')
        return;

    SetStorageUpdatedDate(key);
    localStorage.setItem(key, data);
}

function GetData(key) {
    if (!key || key === 'undefined')
        return;

    ValidateStorageData(key);
    return localStorage.getItem(key);
}

export const LocalStorage = { SetData, GetData }
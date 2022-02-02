"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addDays(date, days) {
    const dates = new Date(date);
    dates.setDate(dates.getDate() + days);
    const array = dates.toLocaleDateString().toString().split('/');
    let day = '';
    let month = '';
    array[1].length < 2 ? day = '0' + array[1] : day = array[1];
    array[0].length < 2 ? month = '0' + array[0] : month = array[0];
    const formatedDate = array[2] + '-' + month + '-' + day;
    return formatedDate.toString();
}
exports.default = addDays;

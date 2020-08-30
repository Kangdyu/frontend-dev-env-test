import "./app.scss";
import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
        <img src="${nyancat}" />
        <h1>HI</h1>
    `;
});

console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(TWO_STRING);
console.log(api.domain);

/* eslint-disable-next-line no-unused-vars */
let promise = new Promise((resolve, reject) => {});

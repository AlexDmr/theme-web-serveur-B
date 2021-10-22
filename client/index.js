"use strict";
const [bths, bthc, btss, btsc] = document.querySelectorAll("button");
if (!!bths && !!bthc && !!btss && btsc) {
    bths.onclick = async () => console.log(await fetch("http://localhost:8080/noCORS/tete.svg"));
    bthc.onclick = async () => console.log(await fetch("http://localhost:8080/withCORS/tete.svg"));
    btss.onclick = async () => console.log(await fetch("https://localhost:8443/noCORS/tete.svg"));
    btsc.onclick = async () => console.log(await fetch("https://localhost:8443/withCORS/tete.svg"));
}

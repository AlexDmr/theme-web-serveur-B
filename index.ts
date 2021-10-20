// Import stylesheets
import './style.css';

const btNon = document.querySelector("#btNon") as HTMLButtonElement;
const btOui = document.querySelector("#btOui") as HTMLButtonElement;

btNon.onclick = async () => console.log( await fetch('http://localhost:8080/noCORS/tete.svg') );
btOui.onclick = async () => console.log( await fetch('http://localhost:8080/withCORS/tete.svg') );

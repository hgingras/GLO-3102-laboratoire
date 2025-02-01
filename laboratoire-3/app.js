import { Toast }  from "./toast.js";

const text_input = document.getElementById("toast-text");
const btns = [...document.getElementsByClassName("toast-btn")];
const container = document.getElementById("toast-container");

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const toast = new Toast(btn.dataset.type, text_input.value, container);
        toast.toast();
    });
});

export class Toast {
    constructor(type, text, container) {
        this.type = type;
        this.text = text;
        this.container = container;
    }

    toast() {
        //creer la balise
        let toast = document.createElement("div");
        toast.className = `toast ${this.type}`;
        toast.innerText = this.text;

        //ajouter au container
        this.container.appendChild(toast);

        //detruire la toast
        setTimeout(() => {
            this.remove(toast);
        }, 3000);

    }

    
    remove(toast) {
        this.container.removeChild(toast);
    }
}

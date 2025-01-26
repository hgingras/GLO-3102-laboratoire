// Données de test (vous pouvez les remplacer par vos propres données)
const items = [
    "Pâtes Carbonara",
    "Pizza Margherita",
    "Salade César",
    "Burger Classic",
    "Sushi California",
    "Ramen au Porc",
    "Couscous Royal",
    "Paella Valenciana"
];

const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');

// Fonction pour filtrer les résultats
function filterItems(searchTerm) {
    return items.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Fonction pour afficher les résultats
function displayResults(results) {
    dropdown.innerHTML = '';
    
    if (results.length === 0) {
        noResults()
    }

    results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = result;
        div.className = 'dropdown-item';
        div.addEventListener('click', () => {
            searchInput.value = result;
            dropdown.style.display = 'none';
        });
        dropdown.appendChild(div);
    });

    dropdown.style.display = 'block';
}

// Écouteur d'événements pour l'input
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    const filteredItems = filterItems(searchTerm);
    displayResults(filteredItems);
});

// Fermer le dropdown quand on clique ailleurs
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});
// Fonction reset de la recherche
function reset(){
    searchInput.value = "" ;
    dropdown.innerHTML = "";   
}

// Afficher 'Pas de résultat' si la recherche est null
function noResults() {
    dropdown.innerText = "Pas de résultat...";
}

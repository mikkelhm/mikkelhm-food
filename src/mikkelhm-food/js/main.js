var allRecipies = "https://cdn.umbraco.io/content/35339975-4e6b-40f1-8bde-23ffdee4a743/descendants?contentType=recipe";

document.addEventListener('alpine:init', () => {
    Alpine.store('recipieData', {
        currentRecipie: null,
        recipies: [],
        navOpen: true,
        toggleNav() {
            this.navOpen = !this.navOpen;
        },
        init() {
            fetch(allRecipies, {
                headers: {
                    'Accept-Language': 'da-DK',
                    'umb-project-alias': 'mikkelhm-food'
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((myJson) => {
                    console.log(myJson._embedded.content);
                    this.recipies = myJson._embedded.content;
                    onRouteChanged();
                });
        }

    });
})

function onRouteChanged() {
    const hash = window.location.hash.replace("#", "");
    var recipieData = Alpine.store('recipieData')
    var currentRecipie = recipieData.recipies.find(({ _url }) => _url == hash);
    if (currentRecipie !== undefined) {
        recipieData.currentRecipie = currentRecipie;
    }
}

window.addEventListener("hashchange", onRouteChanged);
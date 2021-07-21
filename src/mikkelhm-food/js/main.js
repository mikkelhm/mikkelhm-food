var allRecipies = "https://cdn.umbraco.io/content/35339975-4e6b-40f1-8bde-23ffdee4a743/descendants?contentType=recipe";

document.addEventListener('alpine:init', () => {
    Alpine.store('recipieData', {
        currentRecipie: null,
        recipies: [],
        init() {
            console.log("now");
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
    //console.log(hash);
    var recipieData = Alpine.store('recipieData')
    var currentRecipie = recipieData.recipies.find(({ _url }) => _url == hash);
    //console.log(recipieData.recipies);
    console.log(currentRecipie);
    recipieData.currentRecipie = currentRecipie;
    console.log("Hash changed!");
}

window.addEventListener("hashchange", onRouteChanged);
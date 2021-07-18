var allRecipies = "https://cdn.umbraco.io/content/35339975-4e6b-40f1-8bde-23ffdee4a743/descendants?contentType=recipe";

function recipieData() {
    return {
        currentRecipie: null,
        recipies: [],
        loadRecipies() {
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
            });
        }

    }
}
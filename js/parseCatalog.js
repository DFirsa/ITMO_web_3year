function parse_catalog(path){

    var tmpl = document.getElementById("catalog_tmpl").content.children[0];
    var catalog = document.getElementById("test")

    $.getJSON(path)
        .done(function(data){
            data["products"].forEach(element => {
                var catalog_card = tmpl.cloneNode(true);
                catalog_card.children[0].src =  element["img"]
                catalog_card.children[1].textContent = element["title"]
                catalog_card.children[2].textContent = element["name"]
                catalog_card.children[3].textContent = element["price"]
                
                catalog.appendChild(catalog_card)
            });
        });
}
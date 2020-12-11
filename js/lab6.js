// Overlay
function overlay_on(overlay_id){
    let overlay = document.getElementById(overlay_id)
    overlay.style.display = "block"
    setTimeout(() => {overlay.classList.remove("img_invis"), 150})
}

function overlay_off(overlay_id){
    let overlay = document.getElementById(overlay_id)
    overlay.classList.add("img_invis")
    setTimeout(() => {overlay.style.display = "none"}, 150)
}

function set_overlay(overlay_id, clos_el_id, open_el_id){
    let open = document.getElementById(open_el_id);
    let close = document.getElementById(clos_el_id);

    open.onclick = () => {overlay_on(overlay_id)}
    close.onclick = () => {overlay_off(overlay_id)}
}

set_overlay("nice", "nice_btn", "nice_link");

function fill_stats(){
    var container = document.getElementById("stats_container");
    var stats = tag_counter();
    var template = document.querySelector("#stats_template");
    var tmp = template.content.children[0];

    var items = Object.keys(stats).map(function(key) {
        return [key, stats[key]];
    });
    
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    items.forEach(pair => {
        var clone = tmp.cloneNode(true);
        clone.children[0].textContent = pair[0] + ":"
        clone.children[1].textContent = pair[1]
        container.appendChild(clone);
    });
}

fill_stats();
set_overlay("stats_overlay", "stats_btn", "tag_info")

// TODO show overlay with tags -- done
//TODO show full img version
// TASK 2
function galery_next(source, id){
    var img = document.getElementById(id);
    img.classList.add('img_invis');

    setTimeout(() => {
        img.src = source + names[current_index];
        img.classList.remove('img_invis');
    }, 400);
}

function galery_click(min, max){
    current_index = (current_index+1) % names.length;

    galery_next(min, 'galery')
    galery_next(max, 'galery_full')
}

function get_imgs(){

    var imgs = []
    $.getJSON("./js/galery.json")
        .done(function(data){
            data["images"].forEach(element => {
                imgs.push(element);
            });
        });
    return imgs; 
}

set_overlay("galery_overlay", "galery_close", "galery_open")
var names = get_imgs();
var current_index = 0;
document.getElementById("galery_overlay").onclick = () => {galery_click('./img/galery/min/','/img/galery/full/')}
document.getElementById("galery").onclick = () => {galery_click('./img/galery/min/','/img/galery/full/')}
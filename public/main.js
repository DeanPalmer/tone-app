var root = 'http://localhost:3333';

function loadData(root) {
    let url = root + '/tones';
    fetch(url)
        .then(response => response.json())
        .then(response => {
                buildList(response);
        });
}

function buildList(res){
    let source = document.getElementById('list-template').innerHTML;
    let target = document.getElementById('list-target');
    let template = Handlebars.compile(source);
    let html = template(res);
    target.innerHTML = html;
}

loadData(root);

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

function createTone(){
  let url = root + '/tones';
  let body = {
    name: null,
    type: null,
    gain: null,
    bass: null,
    middle: null,
    treble: null
  };
  form = document.forms[0];
  let arr = Object.keys(form).map(function (key) { return form[key]; });
  arr.forEach(function(item){
    if (item.type !== "button"){
      if(item.name === "name"){
        body[item.name] = item.value;
      } else{
        body[item.name] = parseInt(item.value);
      }
    }
  });

  body = JSON.stringify(body);

  fetch(url, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: body
  })
  .then(response => {console.log(response)});
}

function deleteTone(id){
  let url = root + '/tones';
  let body = {id: id};

  body = JSON.stringify(body);

  fetch(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
    })
    .then(response => {console.log(response)});
}

loadData(root);

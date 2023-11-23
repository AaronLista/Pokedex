const url = "https://pokeapi.co/api/v2/pokemon/";
const ob = document.querySelector('#observer');
const ob2 = document.getElementById('observer');
const sc = document.querySelector('#screen');
const glass = document.querySelector('#glass');
const intersectionOptions = {
    threshold: 0.1
};
const colors = {
    "bug": '#267408',
    "dark": '#171917',
    "dragon": '#0a008f',
    "electric": '#ffe300',
    "fairy": '#fa20a8',
    "fighting": '#d96511',
    "fire": '#ff1818',
    "flying": '#18ffe4',
    "ghost": '#410452',
    "grass": '#2af00d',
    "ground": '#7e3309',
    "ice": '#9afaf7',
    "normal": '#f0cc72',
    "poison": '#c018bd',
    "psychic": '#ec2c76',
    "rock": '#c97b09',
    "steel": '#799089',
    "water": '#1b29d3',
};
var loading = false;
var i = 1,z=0,m=0;

const onIntersect = ([entry]) =>{
    z=0;
    if(!loading && entry.isIntersecting){
        makeRequest();
    }
}

var observer = new IntersectionObserver(onIntersect,intersectionOptions);
observer.observe(ob);

const makeRequest = () => {
    loading = true;
        fetch(url+i+'/')
        .then(response => response.json())
        .then(data =>{
            const NewPokemon = document.createElement('article');
            NewPokemon.classList.add('pokemon');
            if(data.types.length>1){
                let color1 = colors[data.types[0].type.name];
                let color2 = colors[data.types[1].type.name]
                NewPokemon.innerHTML = 
            ` 
            <div style="border-color:${color1}"; onclick="pokeInfo(${data.id})">      
            <h2>${data.name}</h2>
            <h3>${data.id}</h3>
            <img src='${data.sprites.front_default}'>
            <span class="types">
                <span style="border-color:${color1};">${data.types[0].type.name}</span>
                <span style="border-color:${color2};">${data.types[1].type.name}</span>
            </span>
            </div>
            `;
            }else {
                let color1 = colors[data.types[0].type.name];
                NewPokemon.innerHTML = 
                `  
                <div style="border-color:${color1}"; onclick="pokeInfo(${data.id})">           
                <h2>${data.name}</h2>
                <h3>${data.id}</h3>
                <img src='${data.sprites.front_default}'>
                <span class="types">
                    <span style="border-color:${color1};">${data.types[0].type.name}</span>
                </span>
                </div>
                `;
            }
            sc.appendChild(NewPokemon);
            loading= false;
            i++;
            if(z < 5){
                z++;
                makeRequest();
            }
        });
}
const printmoves = (element,moves) => {
    fetch(moves[m].move.url).
    then(response => response.json()).
    then(move => {
        const newMove = document.createElement("div");
        newMove.classList.add("move");
        let color = colors[move.type.name];
        newMove.innerHTML = 
        `
            <span class="f">
                <span>
                    <strong>name:</strong><br> ${move.name}
                </span>
                <span>
                    <strong>damage class:</strong><br> ${move.damage_class.name}
                </span>
                <span class="types">
                    <span style="border-color:${color};">${move.type.name}</span>
                </span>
            </span>
            <span class="f">
                <span>
                    <strong>pp:</strong><br> ${move.pp}
                </span>
                <span>
                    <strong>accuracy:</strong><br> ${move.accuracy}
                </span>
                <span>
                    <strong>power:</strong><br>${move.power}
                </span>
                <span>
                    <strong>at level:</strong><br>${moves[m].version_group_details[0].level_learned_at}
                </span>
                <span>
                    <strong>by:</strong><br>${moves[m].version_group_details[0].move_learn_method.name}
                </span>
            </span>
        `;
        element.appendChild(newMove);
        if(m < moves.length - 1){
            m++;
            printmoves(element,moves);
        } else {
            m = 0;
        }
    })
}

const buildPanel = data => {
    const newPanel = document.createElement("div");
    newPanel.classList.add("glass");
    let color1 = colors[data.types[0].type.name];
    let height = data.height/10;
    let weight = data.weight/10;
    newPanel.innerHTML = 
        `
        <div class="close" onclick="cerrar()">
            X
        </div>
        <article class="infoP" style="border-color:${color1};">
            <div class="left">
                <div class="poke">
                    <h2>${data.id} ${data.name}</h2>
                    <img src="${data.sprites.front_default}" style="border-color:${color1};">
                    <span class="types" id="types${data.id}">
                    </span>
                </div>
                <div class="stats">
                   <div class="stat"><span>${data.stats[0].stat.name}</span><span>${data.stats[0].base_stat}</span></div>
                   <div class="stat"><span>${data.stats[1].stat.name}</span><span>${data.stats[1].base_stat}</span></div>
                   <div class="stat"><span>${data.stats[2].stat.name}</span><span>${data.stats[2].base_stat}</span></div>
                   <div class="stat"><span>${data.stats[3].stat.name}</span><span>${data.stats[3].base_stat}</span></div>
                   <div class="stat"><span>${data.stats[4].stat.name}</span><span>${data.stats[4].base_stat}</span></div>
                   <div class="stat"><span>${data.stats[5].stat.name}</span><span>${data.stats[5].base_stat}</span></div>
                </div>
            </div>
            <div class="rigth">
                <span class="sprites">
                    <figure>
                        <h3>front</h3>
                        <img src="${data.sprites.front_default}">
                    </figure>
                    <figure>
                        <h3>back</h3>
                        <img src="${data.sprites.back_default}">
                    </figure>
                    <figure>
                        <h3>front-shiny</h3>
                        <img src="${data.sprites.front_shiny}">
                    </figure>
                    <figure>
                        <h3>back-shiny</h3>
                        <img src="${data.sprites.back_shiny}">
                    </figure>
                </span>
                <span class="sprites" id="female${data.id}">

                </span>
                <span class="size">
                    <span>
                        height: ${height} m
                    </span>
                    <span>  
                        weight: ${weight} kg
                    </span>
                </span>
                <div class="moves" id="move${data.id}">
                    <h3>moves: </h3>
                </div>
            </div>
        </article>
        `;
    glass.appendChild(newPanel);
    if(data.types.length > 1){
        let color2 = colors[data.types[1].type.name];
        let types = document.getElementById("types"+data.id);
        types.innerHTML = 
        `
        <span style="border-color:${color1};">${data.types[0].type.name}</span>
        <span style="border-color:${color2};">${data.types[1].type.name}</span>
        `;
    } else {
        let types = document.getElementById("types"+data.id);
        types.innerHTML = 
        `
        <span style="border-color:${color1};">${data.types[0].type.name}</span>
        `;
    }
    let femaleSprites = document.getElementById("female"+data.id);
    if(data.sprites.front_female == null){
        femaleSprites.innerHTML = 
        `
            <figure>
                <h3>front-female</h3>
                <img src="${data.sprites.front_default}">
            </figure>
            <figure>
                <h3>back-female</h3>
                <img src="${data.sprites.back_default}">
            </figure>
            <figure>
                <h3>shiny-female</h3>
                <img src="${data.sprites.front_shiny}">
            </figure>
            <figure>
                <h3>B-shiny-female</h3>
                <img src="${data.sprites.back_shiny}">
            </figure>
        `;
    } else {
        femaleSprites.innerHTML = 
        `
            <figure>
                <h3>front-female</h3>
                <img src="${data.sprites.front_female}">
            </figure>
            <figure>
                <h3>back-female</h3>
                <img src="${data.sprites.back_female}">
            </figure>
            <figure>
                <h3>shiny-female</h3>
                <img src="${data.sprites.front_shiny_female}">
            </figure>
            <figure>
                <h3>B-shiny-female</h3>
                <img src="${data.sprites.back_shiny_female}">
            </figure>
        `
    }
    let moves = document.getElementById("move"+data.id);
    printmoves(moves,data.moves);
}

const notEntry = () => {
    const notPokemon = document.createElement('div');
    notPokemon.classList.add("glass");
    notPokemon.innerHTML = 
    `
    <div class="close" onclick="cerrar()">
            X
        </div>
        <article class="infoP">
            <div class="left">
                <div class="poke">
                    <h2>pokemon not found</h2>
                    <img src="errP.jpg">
                    <span class="types">
                        <span>?</span>
                        <span>?</span>
                    </span>
                </div>
                <div class="stats">
                   <div class="stat"><span>?</span><span>0</span></div>
                   <div class="stat"><span>?</span><span>0</span></div>
                   <div class="stat"><span>?</span><span>0</span></div>
                   <div class="stat"><span>?</span><span>0</span></div>
                   <div class="stat"><span>?</span><span>0</span></div>
                   <div class="stat"><span>?</span><span>0</span></div>
                </div>
            </div>
            <div class="rigth">
                <span class="sprites">
                    <figure>
                        <h3>front</h3>
                        <img src="errP.jpg">
                    </figure>
                    <figure>
                        <h3>back</h3>
                        <img src="errP.jpg">
                    </figure>
                    <figure>
                        <h3>front-shiny</h3>
                        <img src="errP.jpg">
                    </figure>
                    <figure>
                        <h3>back-shiny</h3>
                        <img src="errP.jpg">
                    </figure>
                </span>
                <span class="sprites">
                    <figure>
                        <h3>front</h3>
                        <img src="errP.jpg">
                    </figure>
                    <figure>
                        <h3>back</h3>
                        <img src="errP.jpg">
                    </figure>
                    <figure>
                        <h3>front-shiny</h3>
                        <img src="errP.jpg">
                    </figure>
                    <figure>
                        <h3>back-shiny</h3>
                        <img src="errP.jpg">
                    </figure>
                </span>
                <span class="size">
                    <span>
                        height: ?cm
                    </span>
                    <span>  
                        weight: ?g
                    </span>
                </span>
                <div class="moves">
                    <h3>moves: </h3>
                </div>
            </div>
        </article>
    `;
    glass.appendChild(notPokemon);
}

const pokeInfo = id => {
    fetch(url+id+'/')
    .then(response => response.json())
    .then(data => {
        buildPanel(data);
    }).catch(err =>{
        notEntry();
    })
}

const pokeSearch = event => {
    event.preventDefault();
    pokeInfo(event.target.pokemon.value);
}

const cerrar = () =>{
    let paneles = document.getElementsByClassName("glass");
    for(let o = 0; o < paneles.length; o++){
        glass.removeChild(paneles[o]);
    }
}

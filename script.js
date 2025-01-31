function prepara(){
    albums();
    sorteia();
    criaInputs();
    trocaChance();
}
function criaInputs(){
    inputs = document.createElement("div");
    inputs.setAttribute("id","inputs");
    if(modo){
        m = 6;
    }
    else{
        m = 1;
    }
    for(var c = 0; c < m; c++){
        divp = document.createElement("div");
        divp.setAttribute("class", "principal");

        criaDatalist(c);

        div = document.createElement("div");
        div.setAttribute("class", "disabled");
        div.setAttribute("id", "div" + c);

        input = document.createElement("input");
        input.setAttribute("id", "input" + c);
        input.setAttribute("onfocus", "lista(" + c + ");");
        input.setAttribute("oninput", "testaLista();");
        input.disabled = true;

        button = document.createElement("button");
        button.setAttribute("id", "button" + c);
        button.setAttribute("onclick","testa()");
        texto = document.createTextNode("Enviar");
        button.appendChild(texto);
        
        div.appendChild(input);
        div.appendChild(button);
        divp.appendChild(div);
        divp.appendChild(datalist);
        inputs.appendChild(divp);
    }
    document.querySelector(".main").appendChild(inputs);
}
function simplificaNome(nome){
    return nome.toLowerCase().replaceAll(".", "").replaceAll(" ", "").replaceAll("?", "").replaceAll("'", "").replaceAll("!", "").replaceAll(",", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll("ê","e").replaceAll("ú","u").replaceAll(":","").replaceAll("ã","a").replaceAll("ó","o").replaceAll("á","a");
}
function testaAlbum(album, chute, musica){
    tof = false;
    if(album.includes(musica)){
        for(let i = 0; i < album.length; i++){
            if(simplificaNome(album[i]) == simplificaNome(chute)){
                tof = true;
            }
        }
    }
    return tof;
}
function albums(){
    if(jaotof){
        todas = todas.concat(jao);
    }
    else{
        if(debuttof){
            todas = todas.concat(debut);
        }
        if(fearlesstof){
            todas = todas.concat(fearless);
        }
        if(speaknowtof){
            todas = todas.concat(speaknow);
        }
        if(redtof){
            todas = todas.concat(red);
        }
        if(a1989tof){
            todas = todas.concat(a1989);
        }
        if(reputationtof){
            todas = todas.concat(reputation);
        }
        if(lovertof){
            todas = todas.concat(lover);
        }
        if(folkloretof){
            todas = todas.concat(folklore);
        }
        if(evermoretof){
            todas = todas.concat(evermore);
        }
        if(midnightstof){
            todas = todas.concat(midnights);
        }
        if(ttpdtof){
            todas = todas.concat(ttpd);
        }
    }
    todas.sort(function(a, b){
        let x = a.toUpperCase().replaceAll("'", "").replaceAll(".", "");
        let y = b.toUpperCase().replaceAll("'", "").replaceAll(".", "");
        return x == y ? 0 : x > y ? 1 : -1;
    });
}
function sorteia(){
    n = Math.floor(Math.random() * todas.length);
    musica = todas[n];
    tocada = false;
    audio = "audio/" + simplificaNome(musica) + ".mp3";
    audio = new Audio(audio);
    audio.preload = "auto";
    if(!modo){
        n = Math.floor(Math.random()*120);
        audio.currentTime = n;
    }
    if(tocadas.indexOf(musica) != -1 && tocadas.length < todas.length){
        sorteia();
    }
    else if(tocadas.indexOf(musica) == -1){
        tocadas.push(musica);
        tocadas.sort(function(a, b){
            let x = a.toUpperCase().replaceAll("'", "").replaceAll(".", "");
            let y = b.toUpperCase().replaceAll("'", "").replaceAll(".", "");
            return x == y ? 0 : x > y ? 1 : -1;
        });
    }
}
function trocaChance(){
    div = document.getElementById("div" + chance);
    input = document.getElementById("input" + chance);
    button = document.getElementById("button" + chance);
    circle = document.getElementById("circle");
    datalist = document.getElementById("datalist" + chance)
    raio = Number(circle.getAttribute("r"));
    comprimento = Math.PI * 2 * raio;
    propcircle = -1 * comprimento * (1 / 6 * (6  + chance + 1));
    if(!modo){
        propcircle = -464.9557127312894;
    }
    circle.setAttribute("stroke-dasharray", comprimento);
    circle.setAttribute("stroke-dashoffset", propcircle);
    div.removeAttribute("class");
    div.setAttribute("class", "abled");
    input.disabled = false;
    chance++;
}
function reinicia(){
    todas = [];
    if(inputs.parentNode != null){
        inputs.parentNode.removeChild(inputs);
    }
    chance = 0;
    audio.pause();
    clearInterval(intervalo);
    prepara();
    p = document.querySelector(".pontos");
    p.style = "display: none;";
    p = document.querySelector(".highscore");
    p.style = "display: none;";
    play = document.getElementById("play");
    play.setAttribute("onclick","toca();");
    if(!modo){
        p = document.querySelector(".pontos");
        p.style = "display: block;";
        p.innerHTML = "Pontuação: " + pontos;
        p = document.querySelector(".highscore");
        p.style = "display: block;";
        p.innerHTML = "Recorde: " + highscore;
        play = document.getElementById("play");
        play.removeAttribute("onclick");
        toca();
    }
    p = document.querySelector(".play");
    p.style = "display:none;"
    p2 = document.querySelector(".resposta");
    p2.style = "display:none;"
}
function testa(){
    chute = input.value;
    if(simplificaNome(chute) == simplificaNome(musica)){
        input.style = "background-color: lawngreen; color: white;";
        div.setAttribute("class", "disabled");
        datalist.style = "display:none";
        input.disabled = true;
        chance = 6;
        propcircle = -464.9557127312894;
        circle.setAttribute("stroke-dashoffset", propcircle);
        audio.pause();
        audio.currentTime = 0;
        if(albumatual == "Debut"){
            debutac++
            localStorage.setItem("debutac", debutac);
        }
        if(albumatual == "Fearless"){
            fearlessac++
            localStorage.setItem("fearlessac", fearlessac);
        }
        if(albumatual == "Speak Now"){
            speaknowac++
            localStorage.setItem("speaknowac", speaknowac);
        }
        if(albumatual == "Red"){
            redac++
            localStorage.setItem("redac", redac);
        }
        if(albumatual == "1989"){
            a1989ac++
            localStorage.setItem("a1989ac", a1989ac);
        }
        if(albumatual == "Reputation"){
            reputationac++
            localStorage.setItem("reputationac", reputationac);
        }
        if(albumatual == "Lover"){
            loverac++
            localStorage.setItem("loverac", loverac);
        }
        if(albumatual == "Folklore"){
            folkloreac++
            localStorage.setItem("folkloreac", folkloreac);
        }
        if(albumatual == "Evermore"){
            evermoreac++
            localStorage.setItem("evermoreac", evermoreac);
        }
        if(albumatual == "Midnights"){
            midnightsac++
            localStorage.setItem("midnightsac", midnightsac);
        }
        if(albumatual == "TTPD"){
            ttpdac++
            localStorage.setItem("ttpdac", ttpdac);
        }
        if(modo){
            p = document.querySelector(".play");
            p.style = "display:block;"
            toca();
        }
        else{
            pontos++;
            if(pontos > highscore){
                highscore = pontos;
                localStorage.setItem("highscore", highscore);
            }
            reinicia();
        }
    }
    else{
        if(modo){
            div.setAttribute("class", "disabled");
            input.disabled = true;
            datalist.style = "display:none";
            if(testaAlbum(debut, chute, musica) || testaAlbum(fearless, chute, musica) || testaAlbum(speaknow, chute, musica) ||  testaAlbum(red, chute, musica) || testaAlbum(a1989, chute, musica) || testaAlbum(reputation, chute, musica) || testaAlbum(lover, chute, musica) || testaAlbum(folklore, chute, musica) || testaAlbum(evermore, chute, musica) || testaAlbum(midnights, chute, musica) || testaAlbum(ttpd, chute, musica)){
                input.style = "background-color: yellow; color: black;";
            }
            else{
                input.style = "background-color: red;color: white;";
            }
            if(chance < 6){
                trocaChance();
            }
            else{
                p2 = document.querySelector(".resposta");
                p2.innerHTML = "A música era " + musica + ".";
                p2.style = "display: block;"
                p = document.querySelector(".play");
                p.style = "display: block;"
            }
            audio.pause();
            audio.currentTime = 0;
            toca();
        }
        else{
            derrota();
        }
    }
}
function Menu(){
    main = document.querySelector(".main");
    nav = document.querySelector(".nav");
    linhas = document.querySelector(".linhas");
    xis = document.querySelector(".xis");
    pontos = 0;
    if(menu){
        nav.style = "display: block;";
        main.style = "display: none;";
        linhas.style = "display: none;";
        xis.style = "display: block;";
        menu = !menu;
        audio.pause();
        audio.currentTime = 0;
        document.addEventListener("keyup",testaJao);
        if(stats){
            criaStats();
        }
        else{
            document.querySelector("#stats").innerHTML = "";
        }
    }
    else{
        document.removeEventListener("keyup",testaJao);
        nav.style = "display: none;";
        main.style = "display: block;";
        linhas.style = "display: block;";
        xis.style = "display: none;";
        menu = !menu;
        reinicia();
    }
}
function Stats(){
    stats = !stats;
    if(stats){
        document.querySelector("#off").style.display = "none";
        document.querySelector("#on").style.display = "block";
        criaStats();
    }
    else{
        document.querySelector("#on").style.display = "none";
        document.querySelector("#off").style.display = "block";
        document.querySelector("#stats").innerHTML = "";
    }
}
function criaStats(){
    stats = `
    <div class="albumstats">
    <p style="color:lawngreen;">Taylor Swift(${parseInt(debutac/debuttoc*100)}%)</p> 
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="lawngreen" stroke="2"></rect>
        <rect x="1" y="1" width="${debutac/debuttoc*250}" height="30" fill="lawngreen" stroke="lawngreen" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:#FFFF00;">Fearless(${parseInt(fearlessac/fearlesstoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="#FFFF00" stroke="2"></rect>
        <rect x="1" y="1" width="${fearlessac/fearlesstoc*250}" height="30" fill="#FFFF00" stroke="#FFFF00" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:#D500FF;">Speak Now(${parseInt(speaknowac/speaknowtoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="#D500FF" stroke="2"></rect>
        <rect x="1" y="1" width="${speaknowac/speaknowtoc*250}" height="30" fill="#D500FF" stroke="#D500FF" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:red;">Red(${parseInt(redac/redtoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="red" stroke="2"></rect>
        <rect x="1" y="1" width="${redac/redtoc*250}" height="30" fill="red" stroke="red" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:cyan;">1989(${parseInt(a1989ac/a1989toc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="cyan" stroke="2"></rect>
        <rect x="1" y="1" width="${a1989ac/a1989toc*250}" height="30" fill="cyan" stroke="cyan" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:black;">Reputation(${parseInt(reputationac/reputationtoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="black" stroke="2"></rect>
        <rect x="1" y="1" width="${reputationac/reputationtoc*250}" height="30" fill="black" stroke="black" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:#ff00c8;">Lover(${parseInt(loverac/lovertoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="#ff00c8" stroke="2"></rect>
        <rect x="1" y="1" width="${loverac/lovertoc*250}" height="30" fill="#ff00c8" stroke="#ff00c8" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:gray;">Folklore(${parseInt(folkloreac/folkloretoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="gray" stroke="2"></rect>
        <rect x="1" y="1" width="${folkloreac/folkloretoc*250}" height="30" fill="gray" stroke="gray" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:rgb(141, 107, 53);">Evermore(${parseInt(evermoreac/evermoretoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="rgb(141, 107, 53)" stroke="2"></rect>
        <rect x="1" y="1" width="${evermoreac/evermoretoc*250}" height="30" fill="rgb(141, 107, 53)" stroke="rgb(141, 107, 53)" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:rgb(0, 0, 176);">Midnights(${parseInt(midnightsac/midnightstoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="rgb(0, 0, 176)" stroke="2"></rect>
        <rect x="1" y="1" width="${midnightsac/midnightstoc*250}" height="30" fill="rgb(0, 0, 176)" stroke="rgb(0, 0, 176)" stroke="2"></rect>
    </svg>
    </div>
    <br>
    <div class="albumstats">
    <p style="color:rgb(203, 203, 180);">The Tortured Poets Department(${parseInt(ttpdac/ttpdtoc*100)}%)</p>
    <svg width="300" height="34" class="stats">
        <rect x="1" y="1" width="250" height="30" fill="rgb(228, 225, 225)" stroke="rgb(203, 203, 180)" stroke="2"></rect>
        <rect x="1" y="1" width="${ttpdac/ttpdtoc*250}" height="30" fill="rgb(203, 203, 180)" stroke="rgb(203, 203, 180)" stroke="2"></rect>
    </svg>
    </div>
    `
    document.querySelector("#stats").innerHTML = stats;
}
function criaDatalist(n){
    datalist = document.createElement("div");
    datalist.setAttribute("id", "datalist" + n);
    datalist.setAttribute("class", "datalist");
    for(var c = 0; c < todas.length; c++){
        option = document.createElement("div");
        option.setAttribute("class", "option");
        option.setAttribute("id", "option" + n + c);
        option.setAttribute("onclick", "option(" + c + ");");
        option.innerHTML = todas[c];
        datalist.appendChild(option)
    }
}
function option(n){
    option = document.getElementById("option" + (chance - 1) + n);
    input.value = option.innerHTML;
}
function lista(n){
    data = document.getElementById("datalist"+n);
    data.style = "display: block;" + "left:" + ((window.screen.width / 2) - 150) + "px;";
}
function testaOpcoes(opcao){
    let tof = false;
    for(let i = 0; i < todas.length; i++){
        if(simplificaNome(opcao) == simplificaNome(todas[i])){
            tof = true;
        }
    }
    return tof;
}
function testaLista(){
    lista(chance - 1);
    for(var c = 0; c < todas.length; c++){
        option = document.getElementById("option" + (chance - 1) + c);
        if(simplificaNome(option.innerHTML).indexOf(simplificaNome(input.value)) == -1){
            option.style = "display: none;";
        }
        else{
            option.style = "display: block;";
        }
    }
}
function completa(){
    for(var c = 0; c < todas.length; c++){
        option = document.getElementById("option" + (chance - 1) + c);
        if(option.style.display == "block"){
            input.value = option.innerHTML;
            break;
        }
    }
}
function enter(){
    if(document.querySelector(".main").style.display == "block"){
        tecla = event.key;
        if(tecla == "Enter"){
            if(testaOpcoes(input.value)){
                testa();
            }
            else{
                completa();
            }
        }
    }
}
function testaJao(){
    if(event.key == "j"){
        jaotof = !jaotof;
    }
}
function Modo(){
    normal = document.querySelector(".normal");
    maratona = document.querySelector(".maratona");
    if(modo){
        normal.style = "display: none";
        maratona.style = "display: block";
    }
    else{
        normal.style = "display: block";
        maratona.style = "display: none";
    }
    modo = !modo;
}
function toca(){
    if(!tocada){
        if(debut.includes(musica)){
            debuttoc++;
            albumatual = "Debut";
            localStorage.setItem("debuttoc", debuttoc);
        }
        if(fearless.includes(musica)){
            fearlesstoc++;
            albumatual = "Fearless";
            localStorage.setItem("fearlesstoc", fearlesstoc);
        }
        if(speaknow.includes(musica)){
            speaknowtoc++;
            albumatual = "Speak Now";
            localStorage.setItem("speaknowtoc", speaknowtoc);
        }
        if(a1989.includes(musica)){
            a1989toc++;
            albumatual = "1989";
            localStorage.setItem("a1989toc", a1989toc);
        }
        if(red.includes(musica)){
            redtoc++;
            albumatual = "Red";
            localStorage.setItem("redtoc", redtoc);
        }
        if(reputation.includes(musica)){
            reputationtoc++;
            albumatual = "Reputation";
            localStorage.setItem("reputationtoc", reputationtoc);
        }
        if(lover.includes(musica)){
            lovertoc++;
            albumatual = "Lover";
            localStorage.setItem("lovertoc", lovertoc);
        }
        if(folklore.includes(musica)){
            folkloretoc++;
            albumatual = "Folklore";
            localStorage.setItem("folkloretoc", folkloretoc);
        }
        if(evermore.includes(musica)){
            evermoretoc++;
            albumatual = "Evermore";
            localStorage.setItem("evermoretoc", evermoretoc);
        }
        if(midnights.includes(musica)){
            midnightstoc++;
            albumatual = "Midnights";
            localStorage.setItem("midnightstoc", midnightstoc);
        }
        if(ttpd.includes(musica)){
            ttpdtoc++;
            albumatual = "TTPD";
            localStorage.setItem("ttpdtoc", ttpdtoc);
        }
    }
    multi = chance;
    if(!modo){
        multi = 6;
    }
    parte = ((propcircle * (-1)) - comprimento) / (50 * multi);
    contador = 0;
    circle.setAttribute("stroke-dasharray", propcircle * -1);
    audio.pause();
    if(modo){
        audio.currentTime = 0;
    }
    clearInterval(intervalo);
    audio.play();
    teste = setInterval(() => {
        if(audio.readyState > 1){
            intervalo = setInterval(conta, 50);
            clearInterval(teste);
        }
    }, 1000);
}
function derrota(){
    div.setAttribute("class", "disabled");
    input.disabled = true;
    datalist.style = "display: none";
    input.style = "background-color: red; color: white;";
    p2 = document.querySelector(".resposta");
    p2.innerHTML = "Sinto muito! Você perdeu! A música era " + musica + ".";
    p2.style = "display: block;"
    p = document.querySelector(".play");
    p.style = "display:block;"
    pontos = 0;
}
function conta(){
    contador++
    menos = (propcircle * -1) - (contador * parte);
    circle.setAttribute("stroke-dasharray", menos);
    if(contador >= 50 * multi){
        clearInterval(intervalo);
        circle.setAttribute("stroke-dasharray", comprimento);
        audio.pause();
        audio.currentTime = 0;
        if(!modo){
            derrota();
        }
    }
}
function Debut(){
    quaddebut = document.querySelector("#quaddebut");
    debutcheck = document.querySelectorAll(".debut");
    if(debuttof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof || ttpdtof)){
        quaddebut.setAttribute("fill", "rgb(228, 225, 225)");
        debutcheck[0].style = "display: none;";
        debutcheck[1].style = "display: none;";
        debuttof = !debuttof;
    }
    else if(!debuttof){
        quaddebut.setAttribute("fill", "lawngreen");
        debutcheck[0].style = "display: block;";
        debutcheck[1].style = "display: block;";
        debuttof = !debuttof;
    }
}
function Fearless(){
    quadfearless = document.querySelector("#quadfearless");
    fearlesscheck = document.querySelectorAll(".fearless");
    if(fearlesstof && (debuttof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof || ttpdtof)){
        quadfearless.setAttribute("fill", "rgb(228, 225, 225)");
        fearlesscheck[0].style = "display: none;";
        fearlesscheck[1].style = "display: none;";
        fearlesstof = !fearlesstof;
    }
    else if(!fearlesstof){
        quadfearless.setAttribute("fill", "#FFFF00");
        fearlesscheck[0].style = "display: block;";
        fearlesscheck[1].style = "display: block;";
        fearlesstof = !fearlesstof;
    }
}
function SpeakNow(){
    quadspeaknow = document.querySelector("#quadspeaknow");
    speaknowcheck = document.querySelectorAll(".speaknow");
    if(speaknowtof && (fearlesstof || debuttof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof || ttpdtof)){
        quadspeaknow.setAttribute("fill", "rgb(228, 225, 225)");
        speaknowcheck[0].style = "display: none;";
        speaknowcheck[1].style = "display: none;";
        speaknowtof = !speaknowtof;
    }
    else if(!speaknowtof){
        quadspeaknow.setAttribute("fill", "#D500FF");
        speaknowcheck[0].style = "display: block;";
        speaknowcheck[1].style = "display: block;";
        speaknowtof = !speaknowtof;
    }
}
function Red(){
    quadred = document.querySelector("#quadred");
    redcheck = document.querySelectorAll(".red");
    if(redtof && (fearlesstof || speaknowtof || debuttof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof || ttpdtof)){
        quadred.setAttribute("fill", "rgb(228, 225, 225)");
        redcheck[0].style = "display: none;";
        redcheck[1].style = "display: none;";
        redtof = !redtof;
    }
    else if(!redtof){
        quadred.setAttribute("fill", "red");
        redcheck[0].style = "display: block;";
        redcheck[1].style = "display: block;";
        redtof = !redtof;
    }
}
function A1989(){
    quada1989 = document.querySelector("#quada1989");
    a1989check = document.querySelectorAll(".a1989");
    if(a1989tof && (fearlesstof || speaknowtof || redtof || debuttof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof || ttpdtof)){
        quada1989.setAttribute("fill", "rgb(228, 225, 225)");
        a1989check[0].style = "display: none;";
        a1989check[1].style = "display: none;";
        a1989tof = !a1989tof;
    }
    else if(!a1989tof){
        quada1989.setAttribute("fill", "cyan");
        a1989check[0].style = "display: block;";
        a1989check[1].style = "display: block;";
        a1989tof = !a1989tof;
    }
}
function Reputation(){
    quadreputation = document.querySelector("#quadreputation");
    reputationcheck = document.querySelectorAll(".reputation");
    if(reputationtof && (fearlesstof || speaknowtof || redtof || a1989tof || debuttof || lovertof || folkloretof || evermoretof || midnightstof || ttpdtof)){
        quadreputation.setAttribute("fill", "rgb(228, 225, 225)");
        reputationcheck[0].style = "display: none;";
        reputationcheck[1].style = "display: none;";
        reputationtof = !reputationtof;
    }
    else if(!reputationtof){
        quadreputation.setAttribute("fill", "black");
        reputationcheck[0].style = "display: block;";
        reputationcheck[1].style = "display: block;";
        reputationtof = !reputationtof;
    }
}
function Lover(){
    quadlover = document.querySelector("#quadlover");
    lovercheck = document.querySelectorAll(".lover");
    if(lovertof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || debuttof || folkloretof || evermoretof || midnightstof || ttpdtof)){
        quadlover.setAttribute("fill", "rgb(228, 225, 225)");
        lovercheck[0].style = "display: none;";
        lovercheck[1].style = "display: none;";
        lovertof = !lovertof;
    }
    else if(!lovertof){
        quadlover.setAttribute("fill", "#ff00c8");
        lovercheck[0].style = "display: block;";
        lovercheck[1].style = "display: block;";
        lovertof = !lovertof;
    }
}
function Folklore(){
    quadfolklore = document.querySelector("#quadfolklore");
    folklorecheck = document.querySelectorAll(".folklore");
    if(folkloretof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || debuttof || evermoretof || midnightstof || ttpdtof)){
        quadfolklore.setAttribute("fill", "rgb(228, 225, 225)");
        folklorecheck[0].style = "display: none;";
        folklorecheck[1].style = "display: none;";
        folkloretof = !folkloretof;
    }
    else if(!folkloretof){
        quadfolklore.setAttribute("fill", "gray");
        folklorecheck[0].style = "display: block;";
        folklorecheck[1].style = "display: block;";
        folkloretof = !folkloretof;
    }
}
function Evermore(){
    quadevermore = document.querySelector("#quadevermore");
    evermorecheck = document.querySelectorAll(".evermore");
    if(evermoretof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || debuttof || midnightstof || ttpdtof)){
        quadevermore.setAttribute("fill", "rgb(228, 225, 225)");
        evermorecheck[0].style = "display: none;";
        evermorecheck[1].style = "display: none;";
        evermoretof = !evermoretof;
    }
    else if(!evermoretof){
        quadevermore.setAttribute("fill", "rgb(141, 107, 53)");
        evermorecheck[0].style = "display: block;";
        evermorecheck[1].style = "display: block;";
        evermoretof = !evermoretof;
    }
}
function Midnights(){
    quadmidnights = document.querySelector("#quadmidnights");
    midnightscheck = document.querySelectorAll(".midnights");
    if(midnightstof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || debuttof || ttpdtof)){
        quadmidnights.setAttribute("fill", "rgb(228, 225, 225)");
        midnightscheck[0].style = "display: none;";
        midnightscheck[1].style = "display: none;";
        midnightstof = !midnightstof;
    }
    else if(!midnightstof){
        quadmidnights.setAttribute("fill", "rgb(0, 0, 176)");
        midnightscheck[0].style = "display: block;";
        midnightscheck[1].style = "display: block;";
        midnightstof = !midnightstof;
    }
}
function TTPD(){
    quadttpd = document.querySelector("#quadttpd");
    ttpdcheck = document.querySelectorAll(".ttpd");
    if(ttpdtof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || debuttof || midnightstof)){
        quadttpd.setAttribute("fill", "rgb(228, 225, 225)");
        ttpdcheck[0].style = "display: none;";
        ttpdcheck[1].style = "display: none;";
        ttpdtof = !ttpdtof;
    }
    else if(!ttpdtof){
        quadttpd.setAttribute("fill", "rgb(203, 203, 180)");
        ttpdcheck[0].style = "display: block;";
        ttpdcheck[1].style = "display: block;";
        ttpdtof = !ttpdtof;
    }
}
var debut = ["Teardrops On My Guitar","Tim McGraw","Picture To Burn","Cold As You","Mary's Song (Oh My, My, My)","Our Song","A Place In This World","Tied Together With A Smile","The Outside","Stay Beautiful","Should've Said No","I'm Only Me When I'm With You","Invisible","A Perfectly Good Heart"];
var fearless = ["Fearless","Fifteen","Forever And Always","The Way I Loved You","You Belong With Me","Hey Stephen","The Other Side Of The Door","Love Story","Change","The Best Day","White Horse","Breathe","You're Not Sorry","Tell Me Why","Jump Then Fall","Untouchable","Come In With The Rain","Today Was A Fairytale","Mr. Perfectly Fine","You All Over Me","That's When","Don't You","Bye Bye Baby","We Were Happy","Superstar"];
var speaknow = ["Mine","Sparks Fly","Speak Now","Better Than Revenge","Back To December","Dear John","The Story Of Us","Mean","Ours","If This Was A Movie","Superman","Never Grow Up","Enchanted","Last Kiss","Innocent","Haunted","Long Live","Electric Touch","When Emma Falls In Love","I Can See You","Foolish One","Timeless","Castles Crumbling"];
var red = ["State Of Grace","22","All Too Well","All Too Well (Ten Minutes Version)","We Are Never Ever Getting Back Together","I Knew You Were Trouble","Babe","Girl At Home","Come Back... Be Here","Everything Has Changed","Red","Treacherous","I Almost Do","Stay Stay Stay","The Last Time","Holy Ground","I Bet You Think About Me","The Very First Night","Sad Beautiful Tragic","The Lucky One","Starlight","Begin Again","The Moment I Knew","Ronan","Better Man","Nothing New","Message In A Bottle","Forever Winter","Run"];
var a1989 = ["Welcome To New York","Blank Space","Style","Out Of The Woods","All You Had To Do Was Stay","Shake It Off","I Wish You Would","Bad Blood","Wildest Dreams","How You Get The Girl","This Love","I Know Places","Clean","Wonderland","You Are In Love","New Romantics","Slut!","Say Don't Go","Now That We Don't Talk","Suburban Legends","Is It Over Now?"];
var reputation = ["...Ready For It?","Endgame","I Did Something Bad","Don't Blame Me","Delicate","Look What You Made Me Do","So It Goes...","Gorgeous","Dress","Dancing With Our Hands Tied","Getaway Car","This Is Why We Can't Have Nice Things","New Year's Day","Call It What You Want","King Of My Heart"];
var lover = ["I Forgot That You Existed","Cruel Summer","Lover","The Man","The Archer","Paper Rings","Miss Americana And The Heartbreak Prince","Death By A Thousand Cuts","You Need To Calm Down","ME!","Afterglow","Daylight","False God","London Boy","I Think He Knows","Cornelia Street","Soon You'll Get Better","It's Nice To Have A Friend","All Of The Girls You Loved Before"];
var folklore = ["the 1","cardigan","the last great american dynasty","exile","my tears ricochet","mirrorball","seven","august","this is me trying","illicit affairs","invisible string","mad woman","epiphany","betty","peace","hoax","the lakes"];
var evermore = ["willow","champagne problems","gold rush","'tis the damn season","tolerate it","no body, no crime","happiness","dorothea","coney island","ivy","cowboy like me","long story short","marjorie","closure","evermore","right where you left me","it's time to go"];
var midnights = ["Lavender Haze","Maroon","Anti-Hero","Snow On The Beach","You're On Your Own, Kid","Midnight Rain","Question...?","Bejeweled","Vigilante Shit","Labyrinth","Karma","Sweet Nothing","Mastermind","The Great War","Bigger Than The Whole Sky","Paris","High Infidelity","Glitch","Would've, Could've, Should've","Dear Reader","Hits Different","You're Losing Me"];
var ttpd = ["Fortnight","The Tortured Poets Department","My Boy Only Breaks His Favorite Toys","Down Bad","So Long, London","But Daddy I Love Him", "Fresh Out The Slammer","Florida!!!","Guilty as Sin?","Who's Afraid Of Little Old Me?","I Can Fix Him (No Really I Can)","loml","I Can Do It With a Broken Heart","The Smallest Man Who Ever Lived","The Alchemy","Clara Bow","The Black Dog","imgonnagetyouback","The Albatross","Chloe or Sam or Sophia or Marcus","How Did It End","So High School","I Hate It Here","thanK you aIMee","I Look in People's Windows","The Prophecy","Cassandra","Peter","The Bolter","Robin","The Manuscript"];
var jao = ["Vou Morrer Sozinho","Me Beija Com Raiva","Lindo Demais","Imaturo","Ainda Te Amo","A Rua","Lobos","Eu Quero Ser Como Você","Aqui","Monstros","Fim do Mundo","Ressaca","A Última Noite","Triste Pra Sempre","Enquanto Me Beija","Essa Eu Fiz Pro Nosso Amor","Fim De Festa","Barcelona","Você Vai Me Destruir","VSF","Hotel San Diego",":((Nota De Voz 8)","Clarão","Não Te Amo","Idiota","Santo","Acontece","Você Me Perdeu","Meninos e Meninas","Coringa","Doce","Tempos de Glória","Olhos Vermelhos","Escorpião","Me Lambe","Gameboy","Alinhamento Milenar","Lábia","Maria","Julho","Eu Posso Ser Como Você","Sinais","Se O Problema Era Você, Por Que Doeu Em Mim?","Locadora","Rádio","São Paulo, 2015","Super"];
var todas = [], tocadas = [], chance = 0, div, input, button, comprimento, propcircle, contador, intervalo, circle, audio, musica, inputs, datalist, pontos = 0, multi, albumatual, stats = false, menu = true, modo = true, tocada = false;
var debuttof = true, fearlesstof = true, speaknowtof = true, redtof = true, a1989tof = true, reputationtof = true, lovertof = true, folkloretof = true, evermoretof = true, midnightstof = true, ttpdtof = true, jaotof = false;
var debutac = 0, fearlessac = 0, speaknowac = 0, redac = 0, a1989ac = 0, reputationac = 0, loverac = 0, folkloreac = 0, evermoreac = 0, midnightsac = 0, ttpdac = 0;
var debuttoc = 0, fearlesstoc = 0, speaknowtoc = 0, redtoc = 0, a1989toc = 0, reputationtoc = 0, lovertoc = 0, folkloretoc = 0, evermoretoc = 0, midnightstoc = 0, ttpdtoc = 0;
var highscore = 0;
if(localStorage.getItem("highscore") != null){
    highscore = Number(localStorage.getItem("highscore"));
}
if(localStorage.getItem("debutac") != null){
    debutac = Number(localStorage.getItem("debutac"));
}
if(localStorage.getItem("fearlessac") != null){
    fearlessac = Number(localStorage.getItem("fearlessac"));
}
if(localStorage.getItem("speaknowac") != null){
    speaknowac = Number(localStorage.getItem("speaknowac"));
}
if(localStorage.getItem("redac") != null){
    redac = Number(localStorage.getItem("redac"));
}
if(localStorage.getItem("a1989ac") != null){
    a1989ac = Number(localStorage.getItem("a1989ac"));
}
if(localStorage.getItem("reputationac") != null){
    reputationac = Number(localStorage.getItem("reputationac"));
}
if(localStorage.getItem("loverac") != null){
    loverac = Number(localStorage.getItem("loverac"));
}
if(localStorage.getItem("folkloreac") != null){
    folkloreac = Number(localStorage.getItem("folkloreac"));
}
if(localStorage.getItem("evermoreac") != null){
    evermoreac = Number(localStorage.getItem("evermoreac"));
}
if(localStorage.getItem("midnightsac") != null){
    midnightsac = Number(localStorage.getItem("midnightsac"));
}
if(localStorage.getItem("ttpdac") != null){
    ttpdac = Number(localStorage.getItem("ttpdac"));
}
if(localStorage.getItem("debuttoc") != null){
    debuttoc = Number(localStorage.getItem("debuttoc"));
}
if(localStorage.getItem("fearlesstoc") != null){
    fearlesstoc = Number(localStorage.getItem("fearlesstoc"));
}
if(localStorage.getItem("speaknowtoc") != null){
    speaknowtoc = Number(localStorage.getItem("speaknowtoc"));
}
if(localStorage.getItem("redtoc") != null){
    redtoc = Number(localStorage.getItem("redtoc"));
}
if(localStorage.getItem("a1989toc") != null){
    a1989toc = Number(localStorage.getItem("a1989toc"));
}
if(localStorage.getItem("reputationtoc") != null){
    reputationtoc = Number(localStorage.getItem("reputationtoc"));
}
if(localStorage.getItem("lovertoc") != null){
    lovertoc = Number(localStorage.getItem("lovertoc"));
}
if(localStorage.getItem("folkloretoc") != null){
    folkloretoc = Number(localStorage.getItem("folkloretoc"));
}
if(localStorage.getItem("evermoretoc") != null){
    evermoretoc = Number(localStorage.getItem("evermoretoc"));
}
if(localStorage.getItem("midnightstoc") != null){
    midnightstoc = Number(localStorage.getItem("midnightstoc"));
}
if(localStorage.getItem("ttpdtoc") != null){
    ttpdtoc = Number(localStorage.getItem("ttpdtoc"));
}
prepara();

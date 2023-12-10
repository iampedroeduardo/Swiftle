class Musica{
    nome;
    nomesimples;
    album;
    audio;
    constructor(nome,album){
        this.nome = nome;
        this.album = album;
        this.nomesimples = SimplificaNome(nome);
        this.audio = new Audio("audio/"+this.nomesimples+".mp3");
    }
}
function Prepara(){
    Albums();
    Sorteia();
    CriaInputs();
    TrocaChance();
}
function CriaInputs(){
    inputs=document.createElement("div");
    inputs.setAttribute("id","inputs");
    if(modo){
        m=6;
    }
    else{
        m=1
    }
    for(var c=0;c<m;c++){
        divp=document.createElement("div");
        divp.setAttribute("class","principal")
        CriaDatalist(c);
        div=document.createElement("div");
        div.setAttribute("class","disabled");
        div.setAttribute("id","div"+c);
        input=document.createElement("input");
        input.setAttribute("id","input"+c);
        input.setAttribute("onfocus","Lista("+c+");");
        input.setAttribute("oninput","TestaLista();");
        input.disabled=true;
        button=document.createElement("button");
        button.setAttribute("id","button"+c);
        button.setAttribute("onclick","Testa()");
        texto=document.createTextNode("Enviar");
        button.appendChild(texto);
        div.appendChild(input);
        div.appendChild(button);
        divp.appendChild(div);
        divp.appendChild(datalist);
        inputs.appendChild(divp);
    }
    document.querySelector(".main").appendChild(inputs);
}
function SimplificaNome(nome){
    return nome.toLowerCase().replaceAll(".","").replaceAll(" ","").replaceAll("?","").replaceAll("'","").replaceAll("!","").replaceAll(",","").replaceAll("-","").replaceAll("(","").replaceAll(")","");
}
function EncontraAlbum(musica){
    for(c=0;c<todas.length;c++){
        if(SimplificaNome(musica) == todas[c].nomesimples){
            return todas[c].album;
            break;
        }
    }
}
function Albums(){
    for(var c=0;c<musicas.length;c++){
        if(debuttof && musicas[c].album == "Taylor Swift" || fearlesstof && musicas[c].album == "Fearless" || speaknowtof && musicas[c].album == "Speak Now" || redtof && musicas[c].album == "Red" || a1989tof && musicas[c].album == "1989" || reputationtof && musicas[c].album == "Reputation" || lovertof && musicas[c].album == "Lover" || folkloretof && musicas[c].album == "Folklore" || evermoretof && musicas[c].album == "Evermore" || midnightstof && musicas[c].album == "Midnights"){
            todas.push(musicas[c]);
        }
        else{
            console.log(musicas[c]);
        }
    }
    todas.sort(function(a,b){
        let x=a.nome.toUpperCase().replaceAll("'","").replaceAll(".","");
        let y=b.nome.toUpperCase().replaceAll("'","").replaceAll(".","");
        return x==y?0:x>y?1:-1;
    });
}
function Sorteia(){
    n=Math.floor(Math.random()*todas.length);
    musica=todas[n];
    audio=musica.audio;
    audio.preload="auto";
    if(!modo){
        n=Math.floor(Math.random()*120);
        audio.currentTime=n;
    }
    if(tocadas.indexOf(musica)!=-1 && tocadas.length<todas.length){
        Sorteia();
    }
    else if(tocadas.indexOf(musica)==-1){
        tocadas.push(musica);
        tocadas.sort(function(a,b){
            let x=a.nome.toUpperCase().replaceAll("'","").replaceAll(".","");
            let y=b.nome.toUpperCase().replaceAll("'","").replaceAll(".","");
            return x==y?0:x>y?1:-1;
        });
    }
}
function TrocaChance(){
    div=document.getElementById("div"+chance);
    input=document.getElementById("input"+chance);
    button=document.getElementById("button"+chance);
    circle=document.getElementById("circle");
    datalist=document.getElementById("datalist"+chance)
    raio=Number(circle.getAttribute("r"));
    comprimento=Math.PI*2*raio;
    propcircle=-1*comprimento*(1/6*(6-chance+chance+chance+1));
    if(!modo){
        propcircle=-464.9557127312894;
    }
    circle.setAttribute("stroke-dasharray",comprimento);
    circle.setAttribute("stroke-dashoffset",propcircle);
    div.removeAttribute("class");
    div.setAttribute("class","abled");
    input.disabled=false;
    chance++;
}
function Reinicia(){
    todas=[]
    if(inputs.parentNode!=null){
        inputs.parentNode.removeChild(inputs);
    }
    chance=0;
    audio.pause();
    clearInterval(intervalo);
    Prepara();
    p=document.querySelector(".pontos");
    p.style="display: none;";
    p=document.querySelector(".highscore");
    p.style="display: none;";
    play=document.getElementById("play");
    play.setAttribute("onclick","Toca();");
    if(!modo){
        p=document.querySelector(".pontos");
        p.style="display: block;";
        p.innerHTML="Pontuação: "+pontos;
        p=document.querySelector(".highscore");
        p.style="display: block;";
        p.innerHTML="Recorde: "+highscore;
        play=document.getElementById("play");
        play.removeAttribute("onclick");
        Toca();
    }
    p=document.querySelector(".play");
    p.style="display:none;"
    p2=document.querySelector(".resposta");
    p2.style="display:none;"
}
function Testa(){
    chute=input.value;
    if(SimplificaNome(chute)==musica.nomesimples){
        input.style="background-color: lawngreen; color: white;";
        div.setAttribute("class","disabled");
        datalist.style="display:none";
        input.disabled=true;
        chance=6;
        propcircle=-464.9557127312894;
        circle.setAttribute("stroke-dashoffset",propcircle);
        audio.pause();
        audio.currentTime=0;
        if(modo){
            p=document.querySelector(".play");
            p.style="display:block;"
            Toca();
        }
        else{
            pontos++;
            if(pontos>highscore){
                highscore = pontos;
                localStorage.setItem("highscore",highscore);
            }
            Reinicia();
        }
    }
    else{
        if(modo){
            div.setAttribute("class","disabled");
            input.disabled=true;
            datalist.style="display:none";
            if(EncontraAlbum(chute) == musica.album){
                input.style="background-color: yellow; color: black;";
            }
            else{
                input.style="background-color: red;color: white;";
            }
            if(chance<6){
                TrocaChance();
            }
            else{
                p2=document.querySelector(".resposta");
                p2.innerHTML="A música era "+musica.nome+".";
                p2.style="display:block;"
                p=document.querySelector(".play");
                p.style="display:block;"
            }
            audio.pause();
            audio.currentTime=0;
            Toca();
        }
        else{
            Derrota();
        }
    }
}
function Menu(){
    main=document.querySelector(".main");
    nav=document.querySelector(".nav");
    linhas=document.querySelector(".linhas");
    xis=document.querySelector(".xis");
    pontos=0;
    if(menu){
        nav.style="display: block;";
        main.style="display: none;";
        linhas.style="display: none;";
        xis.style="display: block;";
        menu=!menu;
        audio.pause();
        audio.currentTime=0;
    }
    else{
        nav.style="display: none;";
        main.style="display: block;";
        linhas.style="display: block;";
        xis.style="display: none;";
        menu=!menu;
        Reinicia();
    }
}
function CriaDatalist(n){
    datalist=document.createElement("div");
    datalist.setAttribute("id","datalist"+n);
    datalist.setAttribute("class","datalist");
    for(var c=0;c<todas.length;c++){
        option=document.createElement("div");
        option.setAttribute("class","option");
        option.setAttribute("id","option"+n+c);
        option.setAttribute("onclick","Option("+c+");");
        option.innerHTML=todas[c].nome;
        datalist.appendChild(option)
    }
}
function Option(n){
    option=document.getElementById("option"+(chance-1)+n);
    input.value=option.innerHTML;
}
function Lista(n){
    data=document.getElementById("datalist"+n);
    data.style="display:block;"+"left:"+((window.screen.width/2)-150)+"px;";
}
function TestaLista(){
    Lista(chance-1);
    for(var c=0;c<todas.length;c++){
        option=document.getElementById("option"+(chance-1)+c);
        if(SimplificaNome(option.innerHTML).indexOf(SimplificaNome(input.value))==-1){
            option.style="display:none;";
        }
        else{
            option.style="display:block;";
        }
    }
}
function Enter(){
    if(document.querySelector(".main").style.display == "block"){
        tecla=event.key;
        if(tecla=="Enter"){
            Testa();
        }
    }
}
function Modo(){
    normal=document.querySelector(".normal");
    maratona=document.querySelector(".maratona");
    if(modo){
        normal.style="display: none";
        maratona.style="display: block";
    }
    else{
        normal.style="display: block";
        maratona.style="display: none";
    }
    modo=!modo;
}
function Toca(){
    multi=chance;
    if(!modo){
        multi=6;
    }
    parte=((propcircle*(-1))-comprimento)/(50*multi);
    contador=0;
    circle.setAttribute("stroke-dasharray",propcircle*-1);
    audio.pause();
    if(modo){
        audio.currentTime=0;
    }
    clearInterval(intervalo);
    audio.play();
    intervalo=setInterval(Conta,50);
}
function Derrota(){
    div.setAttribute("class","disabled");
    input.disabled=true;
    datalist.style="display:none";
    input.style="background-color: red;color: white;";
    p2=document.querySelector(".resposta");
    p2.innerHTML="Sinto muito! Você perdeu! A música era "+ musica.nome +".";
    p2.style="display:block;"
    p=document.querySelector(".play");
    p.style="display:block;"
    pontos=0;
    inputs.parentNode.removeChild(inputs);
}
function Conta(){
    contador++
    menos=(propcircle*-1)-(contador*parte);
    circle.setAttribute("stroke-dasharray",menos);
    if(contador>=50*multi){
        clearInterval(intervalo);
        circle.setAttribute("stroke-dasharray",comprimento);
        audio.pause();
        audio.currentTime=0;
        if(!modo){
            Derrota();
        }
    }
}
function Debut(){
    quaddebut=document.querySelector("#quaddebut");
    debutcheck=document.querySelectorAll(".debut");
    if(debuttof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof)){
        quaddebut.setAttribute("fill","rgb(228, 225, 225)");
        debutcheck[0].style="display: none;";
        debutcheck[1].style="display: none;";
        debuttof=!debuttof;
    }
    else if(!debuttof){
        quaddebut.setAttribute("fill","lawngreen");
        debutcheck[0].style="display: block;";
        debutcheck[1].style="display: block;";
        debuttof=!debuttof;
    }
}
function Fearless(){
    quadfearless=document.querySelector("#quadfearless");
    fearlesscheck=document.querySelectorAll(".fearless");
    if(fearlesstof && (debuttof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof)){
        quadfearless.setAttribute("fill","rgb(228, 225, 225)");
        fearlesscheck[0].style="display: none;";
        fearlesscheck[1].style="display: none;";
        fearlesstof=!fearlesstof;
    }
    else if(!fearlesstof){
        quadfearless.setAttribute("fill","#FFFF00");
        fearlesscheck[0].style="display: block;";
        fearlesscheck[1].style="display: block;";
        fearlesstof=!fearlesstof;
    }
}
function SpeakNow(){
    quadspeaknow=document.querySelector("#quadspeaknow");
    speaknowcheck=document.querySelectorAll(".speaknow");
    if(speaknowtof && (fearlesstof || debuttof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof)){
        quadspeaknow.setAttribute("fill","rgb(228, 225, 225)");
        speaknowcheck[0].style="display: none;";
        speaknowcheck[1].style="display: none;";
        speaknowtof=!speaknowtof;
    }
    else if(!speaknowtof){
        quadspeaknow.setAttribute("fill","#D500FF");
        speaknowcheck[0].style="display: block;";
        speaknowcheck[1].style="display: block;";
        speaknowtof=!speaknowtof;
    }
}
function Red(){
    quadred=document.querySelector("#quadred");
    redcheck=document.querySelectorAll(".red");
    if(redtof && (fearlesstof || speaknowtof || debuttof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof)){
        quadred.setAttribute("fill","rgb(228, 225, 225)");
        redcheck[0].style="display: none;";
        redcheck[1].style="display: none;";
        redtof=!redtof;
    }
    else if(!redtof){
        quadred.setAttribute("fill","red");
        redcheck[0].style="display: block;";
        redcheck[1].style="display: block;";
        redtof=!redtof;
    }
}
function A1989(){
    quada1989=document.querySelector("#quada1989");
    a1989check=document.querySelectorAll(".a1989");
    if(a1989tof && (fearlesstof || speaknowtof || redtof || debuttof || reputationtof || lovertof || folkloretof || evermoretof || midnightstof)){
        quada1989.setAttribute("fill","rgb(228, 225, 225)");
        a1989check[0].style="display: none;";
        a1989check[1].style="display: none;";
        a1989tof=!a1989tof;
    }
    else if(!a1989tof){
        quada1989.setAttribute("fill","cyan");
        a1989check[0].style="display: block;";
        a1989check[1].style="display: block;";
        a1989tof=!a1989tof;
    }
}
function Reputation(){
    quadreputation=document.querySelector("#quadreputation");
    reputationcheck=document.querySelectorAll(".reputation");
    if(reputationtof && (fearlesstof || speaknowtof || redtof || a1989tof || debuttof || lovertof || folkloretof || evermoretof || midnightstof)){
        quadreputation.setAttribute("fill","rgb(228, 225, 225)");
        reputationcheck[0].style="display: none;";
        reputationcheck[1].style="display: none;";
        reputationtof=!reputationtof;
    }
    else if(!reputationtof){
        quadreputation.setAttribute("fill","black");
        reputationcheck[0].style="display: block;";
        reputationcheck[1].style="display: block;";
        reputationtof=!reputationtof;
    }
}
function Lover(){
    quadlover=document.querySelector("#quadlover");
    lovercheck=document.querySelectorAll(".lover");
    if(lovertof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || debuttof || folkloretof || evermoretof || midnightstof)){
        quadlover.setAttribute("fill","rgb(228, 225, 225)");
        lovercheck[0].style="display: none;";
        lovercheck[1].style="display: none;";
        lovertof=!lovertof;
    }
    else if(!lovertof){
        quadlover.setAttribute("fill","#ff00c8");
        lovercheck[0].style="display: block;";
        lovercheck[1].style="display: block;";
        lovertof=!lovertof;
    }
}
function Folklore(){
    quadfolklore=document.querySelector("#quadfolklore");
    folklorecheck=document.querySelectorAll(".folklore");
    if(folkloretof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || debuttof || evermoretof || midnightstof)){
        quadfolklore.setAttribute("fill","rgb(228, 225, 225)");
        folklorecheck[0].style="display: none;";
        folklorecheck[1].style="display: none;";
        folkloretof=!folkloretof;
    }
    else if(!folkloretof){
        quadfolklore.setAttribute("fill","gray");
        folklorecheck[0].style="display: block;";
        folklorecheck[1].style="display: block;";
        folkloretof=!folkloretof;
    }
}
function Evermore(){
    quadevermore=document.querySelector("#quadevermore");
    evermorecheck=document.querySelectorAll(".evermore");
    if(evermoretof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || debuttof || midnightstof)){
        quadevermore.setAttribute("fill","rgb(228, 225, 225)");
        evermorecheck[0].style="display: none;";
        evermorecheck[1].style="display: none;";
        evermoretof=!evermoretof;
    }
    else if(!evermoretof){
        quadevermore.setAttribute("fill","rgb(141, 107, 53)");
        evermorecheck[0].style="display: block;";
        evermorecheck[1].style="display: block;";
        evermoretof=!evermoretof;
    }
}
function Midnights(){
    quadmidnights=document.querySelector("#quadmidnights");
    midnightscheck=document.querySelectorAll(".midnights");
    if(midnightstof && (fearlesstof || speaknowtof || redtof || a1989tof || reputationtof || lovertof || folkloretof || evermoretof || debuttof)){
        quadmidnights.setAttribute("fill","rgb(228, 225, 225)");
        midnightscheck[0].style="display: none;";
        midnightscheck[1].style="display: none;";
        midnightstof=!midnightstof;
    }
    else if(!midnightstof){
        quadmidnights.setAttribute("fill","rgb(0, 0, 176)");
        midnightscheck[0].style="display: block;";
        midnightscheck[1].style="display: block;";
        midnightstof=!midnightstof;
    }
}
var musicas = [
    new Musica("Tim Mcgraw","Taylor Swift"),
    new Musica("Picture To Burn","Taylor Swift"),
    new Musica("Teardrops On My Guitar","Taylor Swift"),
    new Musica("A Place In This World","Taylor Swift"),
    new Musica("Cold As You","Taylor Swift"),
    new Musica("The Outside","Taylor Swift"),
    new Musica("Tied Together With A Smile","Taylor Swift"),
    new Musica("Stay Beautiful","Taylor Swift"),
    new Musica("Should've Said No","Taylor Swift"),
    new Musica("Mary's Song","Taylor Swift"),
    new Musica("Our Song","Taylor Swift"),
    new Musica("I'm Only Me When I'm With You","Taylor Swift"),
    new Musica("Invisible","Taylor Swift"),
    new Musica("A Perfectly Good Heart","Taylor Swift"),
    new Musica("Fearless","Fearless"),
    new Musica("Fifteen","Fearless"),
    new Musica("Love Story","Fearless"),
    new Musica("Hey Stephen","Fearless"),
    new Musica("White Horse","Fearless"),
    new Musica("You Belong With Me","Fearless"),
    new Musica("Breathe","Fearless"),
    new Musica("Tell Me Why","Fearless"),
    new Musica("You're Not Sorry","Fearless"),
    new Musica("The Way I Loved You","Fearless"),
    new Musica("Forever And Always","Fearless"),
    new Musica("The Best Day","Fearless"),
    new Musica("Change","Fearless"),
    new Musica("Jump Then Fall","Fearless"),
    new Musica("Untouchable","Fearless"),
    new Musica("Come In With The Rain","Fearless"),
    new Musica("Superstar","Fearless"),
    new Musica("The Other Side Of The Door","Fearless"),
    new Musica("Today Was A Fairytale","Fearless"),
    new Musica("You All Over Me","Fearless"),
    new Musica("Mr. Perfectly Fine","Fearless"),
    new Musica("We Were Happy","Fearless"),
    new Musica("That's When","Fearless"),
    new Musica("Don't You","Fearless"),
    new Musica("Bye Bye Baby","Fearless"),
    new Musica("Mine","Speak Now"),
    new Musica("Sparks Fly","Speak Now"),
    new Musica("Back To December","Speak Now"),
    new Musica("Speak Now","Speak Now"),
    new Musica("Dear John","Speak Now"),
    new Musica("Mean","Speak Now"),
    new Musica("The Story Of Us","Speak Now"),
    new Musica("Never Grow Up","Speak Now"),
    new Musica("Enchanted","Speak Now"),
    new Musica("Better Than Revenge","Speak Now"),
    new Musica("Innocent","Speak Now"),
    new Musica("Haunted","Speak Now"),
    new Musica("Last Kiss","Speak Now"),
    new Musica("Long Live","Speak Now"),
    new Musica("Ours","Speak Now"),
    new Musica("Superman","Speak Now"),
    new Musica("Electric Touch","Speak Now"),
    new Musica("When Emma Falls In Love","Speak Now"),
    new Musica("I Can See You","Speak Now"),
    new Musica("Castles Crumbling","Speak Now"),
    new Musica("Foolish One","Speak Now"),
    new Musica("Timeless","Speak Now"),
    new Musica("If This Was A Movie","Speak Now"),
    new Musica("State Of Grace","Red"),
    new Musica("Red","Red"),
    new Musica("Treacherous","Red"),
    new Musica("I Knew You Were Trouble","Red"),
    new Musica("All Too Well","Red"),
    new Musica("22","Red"),
    new Musica("I Almost Do","Red"),
    new Musica("We Are Never Ever Getting Back Together","Red"),
    new Musica("Stay Stay Stay","Red"),
    new Musica("The Last Time","Red"),
    new Musica("Holy Ground","Red"),
    new Musica("Sad Beautiful Tragic","Red"),
    new Musica("The Lucky One","Red"),
    new Musica("Everything Has Changed","Red"),
    new Musica("Starlight","Red"),
    new Musica("Begin Again","Red"),
    new Musica("The Moment I Knew","Red"),
    new Musica("Come Back... Be Here","Red"),
    new Musica("Girl At Home","Red"),
    new Musica("Ronan","Red"),
    new Musica("Better Man","Red"),
    new Musica("Nothing New","Red"),
    new Musica("Babe","Red"),
    new Musica("Message In A Bottle","Red"),
    new Musica("I Bet You Think About Me","Red"),
    new Musica("Forever Winter","Red"),
    new Musica("Run","Red"),
    new Musica("The Very First Night","Red"),
    new Musica("All Too Well (Ten Minutes Version)","Red"),
    new Musica("Welcome To New York","1989"),
    new Musica("Blank Space","1989"),
    new Musica("Style","1989"),
    new Musica("Out Of The Woods","1989"),
    new Musica("All You Had To Do Was Stay","1989"),
    new Musica("Shake It Off","1989"),
    new Musica("I Wish You Would","1989"),
    new Musica("Bad Blood","1989"),
    new Musica("Wildest Dreams","1989"),
    new Musica("How You Get The Girl","1989"),
    new Musica("This Love","1989"),
    new Musica("I Know Places","1989"),
    new Musica("Clean","1989"),
    new Musica("Wonderland","1989"),
    new Musica("You Are In Love","1989"),
    new Musica("New Romantics","1989"),
    new Musica("Slut!","1989"),
    new Musica("Say Don't Go","1989"),
    new Musica("Now That We Don't Talk","1989"),
    new Musica("Suburban Legends","1989"),
    new Musica("Is It Over Now?","1989"),
    new Musica("...Ready For It?","Reputation"),
    new Musica("Endgame","Reputation"),
    new Musica("I Did Something Bad","Reputation"),
    new Musica("Don't Blame Me","Reputation"),
    new Musica("Delicate","Reputation"),
    new Musica("Look What You Made Me Do","Reputation"),
    new Musica("So It Goes...","Reputation"),
    new Musica("Gorgeous","Reputation"),
    new Musica("Getaway Car","Reputation"),
    new Musica("King Of My Heart","Reputation"),
    new Musica("Dancing With Our Hands Tied","Reputation"),
    new Musica("Dress","Reputation"),
    new Musica("This Is Why We Can't Have Nice Things","Reputation"),
    new Musica("Call It What You Want","Reputation"),
    new Musica("New Year's Day","Reputation"),
    new Musica("I Forgot That You Existed","Lover"),
    new Musica("Cruel Summer","Lover"),
    new Musica("Lover","Lover"),
    new Musica("The Man","Lover"),
    new Musica("The Archer","Lover"),
    new Musica("I Think He Knows","Lover"),
    new Musica("Miss Americana And The Heartbreak Prince","Lover"),
    new Musica("Paper Rings","Lover"),
    new Musica("Cornelia Street","Lover"),
    new Musica("Death By A Thousand Cuts","Lover"),
    new Musica("London Boy","Lover"),
    new Musica("Soon You'll Get Better","Lover"),
    new Musica("False God","Lover"),
    new Musica("You Need To Calm Down","Lover"),
    new Musica("Afterglow","Lover"),
    new Musica("ME!","Lover"),
    new Musica("It's Nice To Have A Friend","Lover"),
    new Musica("Daylight","Lover"),
    new Musica("All Of The Girls You Loved Before","Lover"),
    new Musica("the 1","Folklore"),
    new Musica("cardigan","Folklore"),
    new Musica("the last great american dynasty","Folklore"),
    new Musica("exile","Folklore"),
    new Musica("my tears ricochet","Folklore"),
    new Musica("mirrorball","Folklore"),
    new Musica("seven","Folklore"),
    new Musica("august","Folklore"),
    new Musica("this is me trying","Folklore"),
    new Musica("illicit affairs","Folklore"),
    new Musica("invisible string","Folklore"),
    new Musica("mad woman","Folklore"),
    new Musica("epiphany","Folklore"),
    new Musica("betty","Folklore"),
    new Musica("peace","Folklore"),
    new Musica("hoax","Folklore"),
    new Musica("the lakes","Folklore"),
    new Musica("willow","Evermore"),
    new Musica("champagne problems","Evermore"),
    new Musica("gold rush","Evermore"),
    new Musica("'tis the damn season","Evermore"),
    new Musica("tolerate it","Evermore"),
    new Musica("no body, no crime","Evermore"),
    new Musica("happiness","Evermore"),
    new Musica("dorothea","Evermore"),
    new Musica("coney island","Evermore"),
    new Musica("ivy","Evermore"),
    new Musica("cowboy like me","Evermore"),
    new Musica("long story short","Evermore"),
    new Musica("marjorie","Evermore"),
    new Musica("closure","Evermore"),
    new Musica("evermore","Evermore"),
    new Musica("right where you left me","Evermore"),
    new Musica("it's time to go","Evermore"),
    new Musica("Lavender Haze","Midnights"),
    new Musica("Maroon","Midnights"),
    new Musica("Anti-Hero","Midnights"),
    new Musica("Snow On The Beach","Midnights"),
    new Musica("You're On Your Own, Kid","Midnights"),
    new Musica("Midnight Rain","Midnights"),
    new Musica("Question...?","Midnights"),
    new Musica("Vigilante Shit","Midnights"),
    new Musica("Bejeweled","Midnights"),
    new Musica("Labyrinth","Midnights"),
    new Musica("Karma","Midnights"),
    new Musica("Sweet Nothing","Midnights"),
    new Musica("Mastermind","Midnights"),
    new Musica("The Great War","Midnights"),
    new Musica("Bigger Than The Whole Sky","Midnights"),
    new Musica("Paris","Midnights"),
    new Musica("High Infidelity","Midnights"),
    new Musica("Glitch","Midnights"),
    new Musica("Would've, Could've, Should've","Midnights"),
    new Musica("Dear Reader","Midnights"),
    new Musica("Hits Different","Midnights"),
]
var todas=[], tocadas=[], chance=0, div, input, button, comprimento, propcircle, contador, intervalo, circle, audio, musica, inputs, datalist, pontos=0, multi, menu=true, modo=true;
var debuttof=true, fearlesstof=true, speaknowtof=true, redtof=true, a1989tof=true, reputationtof=true, lovertof=true, folkloretof=true, evermoretof=true, midnightstof=true;
var highscore = 0;
if(localStorage.getItem("highscore") != null){
    highscore = Number(localStorage.getItem("highscore"));
}
Prepara();


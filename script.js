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
function TestaAlbum(album,chute,musica){
    tof=false;
    if(album.includes(musica)){
        for(let i=0;i<album.length;i++){
            if(SimplificaNome(album[i])==SimplificaNome(chute)){
                tof=true;
            }
        }
    }
    return tof;
}
function Albums(){
    if(debuttof){
        todas=todas.concat(debut);
    }
    if(fearlesstof){
        todas=todas.concat(fearless);
    }
    if(speaknowtof){
        todas=todas.concat(speaknow);
    }
    if(redtof){
        todas=todas.concat(red);
    }
    if(a1989tof){
        todas=todas.concat(a1989);
    }
    if(reputationtof){
        todas=todas.concat(reputation);
    }
    if(lovertof){
        todas=todas.concat(lover);
    }
    if(folkloretof){
        todas=todas.concat(folklore);
    }
    if(evermoretof){
        todas=todas.concat(evermore);
    }
    if(midnightstof){
        todas=todas.concat(midnights);
    }
    todas.sort(function(a,b){
        let x=a.toUpperCase().replaceAll("'","").replaceAll(".","");
        let y=b.toUpperCase().replaceAll("'","").replaceAll(".","");
        return x==y?0:x>y?1:-1;
    });
}
function Sorteia(){
    n=Math.floor(Math.random()*todas.length);
    musica=todas[n];
    audio="audio/"+SimplificaNome(musica)+".mp3";
    audio= new Audio(audio);
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
            let x=a.toUpperCase().replaceAll("'","").replaceAll(".","");
            let y=b.toUpperCase().replaceAll("'","").replaceAll(".","");
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
    if(SimplificaNome(chute)==SimplificaNome(musica)){
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
            if(TestaAlbum(debut,chute,musica) || TestaAlbum(fearless,chute,musica) || TestaAlbum(speaknow,chute,musica) ||  TestaAlbum(red,chute,musica) || TestaAlbum(a1989,chute,musica) || TestaAlbum(reputation,chute,musica) || TestaAlbum(lover,chute,musica) || TestaAlbum(folklore,chute,musica) || TestaAlbum(evermore,chute,musica) || TestaAlbum(midnights,chute,musica)){
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
                p2.innerHTML="A música era "+musica+".";
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
        option.innerHTML=todas[c];
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
function TestaOpcoes(opcao){
    let tof=false;
    for(let i=0;i<todas.length;i++){
        if(SimplificaNome(opcao)==SimplificaNome(todas[i])){
            tof=true
        }
    }
    return tof;
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
function Completa(){
    for(var c=0;c<todas.length;c++){
        option=document.getElementById("option"+(chance-1)+c);
        if(option.style.display=="block"){
            input.value=option.innerHTML;
            break;
        }
    }
}
function Enter(){
    if(document.querySelector(".main").style.display == "block"){
        tecla=event.key;
        if(tecla=="Enter"){
            if(TestaOpcoes(input.value)){
                Testa();
            }
            else{
                Completa();
            }
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
    p2.innerHTML="Sinto muito! Você perdeu! A música era "+ musica +".";
    p2.style="display:block;"
    p=document.querySelector(".play");
    p.style="display:block;"
    pontos=0;
    if(inputs!=undefined){
        inputs.parentNode.removeChild(inputs);
    }
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
var debut=["Teardrops On My Guitar","Tim McGraw","Picture To Burn","Cold As You","Marys's Song (Oh My,My)","Our Song","A Place In This World","Tied Together With A Smile","The Outside","Stay Beautiful","Should've Said No","I'm Only Me When I'm With You","Invisible","A Perfectly Good Heart"];
var fearless=["Fearless","Fifteen","Forever And Always","The Way I Loved You","You Belong With Me","Hey Stephen","The Other Side Of The Door","Love Story","Change","The Best Day","White Horse","Breathe","You're Not Sorry","Tell Me Why","Jump Then Fall","Untouchable","Come In With The Rain","Today Was A Fairytale","Mr. Perfectly Fine","You All Over Me","That's When","Don't You","Bye Bye Baby","We Were Happy","Superstar"];
var speaknow=["Mine","Sparks Fly","Speak Now","Better Than Revenge","Back To December","Dear John","The Story Of Us","Mean","Ours","If This Was A Movie","Superman","Never Grow Up","Enchanted","Last Kiss","Innocent","Haunted","Long Live","Electric Touch","When Emma Falls In Love","I Can See You","Foolish One","Timeless","Castles Crumbling"];
var red=["State Of Grace","22","All Too Well","All Too Well (Ten Minutes Version)","We Are Never Ever Getting Back Together","I Knew You Were Trouble","Babe","Girl At Home","Come Back... Be Here","Everything Has Changed","Red","Treacherous","I Almost Do","Stay Stay Stay","The Last Time","Holy Ground","I Bet You Think About Me","The Very First Night","Sad Beautiful Tragic","The Lucky One","Starlight","Begin Again","The Moment I Knew","Ronan","Better Man","Nothing New","Message In A Bottle","Forever Winter","Run"];
var a1989=["Welcome To New York","Blank Space","Style","Out Of The Woods","All You Had To Do Was Stay","Shake It Off","I Wish You Would","Bad Blood","Wildest Dreams","How You Get The Girl","This Love","I know Places","Clean","Wonderland","You Are In Love","New Romantics","Slut!","Say Don't Go","Now That We Don't Talk","Suburban Legends","Is It Over Now?"];
var reputation=["...Ready For It?","Endgame","I Did Something Bad","Don't Blame Me","Delicate","Look What You Made Me Do","So It Goes...","Gorgeous","Dress","Dancing With Our Hands Tied","Getaway Car","This Is Why We Can't Have Nice Things","New Year's Day","Call It What You Want","King Of My Heart"];
var lover=["I Forgot That You Existed","Cruel Summer","Lover","The Man","The Archer","Paper Rings","Miss Americana And The Heartbreak Prince","Death By A Thousand Cuts","You Need To Calm Down","ME!","Afterglow","Daylight","False God","London Boy","I Think He Knows","Cornelia Street","Soon You'll Get Better","It's Nice To Have A Friend","All Of The Girls You Loved Before"];
var folklore=["the 1","cardigan","the last great american dynasty","exile","my tears ricochet","mirrorball","seven","august","this is me trying","illicit affairs","invisible string","mad woman","epiphany","betty","peace","hoax","the lakes"];
var evermore=["willow","champagne problems","gold rush","'tis the damn season","tolerate it","no body, no crime","happiness","dorothea","coney island","ivy","cowboy like me","long story short","marjorie","closure","evermore","right where you left me","it's time to go"];
var midnights=["Lavender Haze","Maroon","Anti-Hero","Snow On The Beach","You're On Your Own, Kid","Midnight Rain","Question...?","Bejeweled","Vigilante Shit","Labyrinth","Karma","Sweet Nothing","Mastermind","The Great War","Bigger Than The Whole Sky","Paris","High Infidelity","Glitch","Would've, Could've, Should've","Dear Reader","Hits Different"];
var todas=[], tocadas=[], chance=0, div, input, button, comprimento, propcircle, contador, intervalo, circle, audio, musica, inputs, datalist, pontos=0, multi, menu=true, modo=true;
var debuttof=true, fearlesstof=true, speaknowtof=true, redtof=true, a1989tof=true, reputationtof=true, lovertof=true, folkloretof=true, evermoretof=true, midnightstof=true;
var highscore = 0;
if(localStorage.getItem("highscore") != null){
    highscore = Number(localStorage.getItem("highscore"));
}
Prepara();

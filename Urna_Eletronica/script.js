let seuVotoPara  = document. querySelector('.d-1-1 span');
let cargo  = document. querySelector('.d-1-2 span');
let descricao  = document. querySelector('.d-1-4');
let aviso  = document. querySelector('.d-2');
let lateral  = document. querySelector('.d-1-right');
let numeros  = document. querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++){
        if(i === 0){
numeroHtml +='<div class="numero pisca"></div>';    
}else{
    numeroHtml +='<div class="numero"></div>';
}
}
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface(){
let etapa = etapas[etapaAtual];
let candidatos = etapa.candidatos.filter((item)=>{
    if(item.numero === numero){
        return true;
    }else {
        return false;
    }
});
if(candidatos.length>0){
candidatos = candidatos[0];
seuVotoPara.style.display = 'block';
aviso.style.display = 'block';
descricao.innerHTML =`Nome ${candidatos.nome}<br/>Partido: ${candidatos.partido}`
let fotosHtml = '';
for(let i in candidatos.fotos){
    if(candidatos.fotos[i].small){
    fotosHtml += `<div class="d-1-img small"><img src="img/${candidatos.fotos[i].url}" alt="${candidatos.titulo}">${candidatos.fotos[i].legenda}</div>`
}else {
    fotosHtml += `<div class="d-1-img"><img src="img/${candidatos.fotos[i].url}" alt="${candidatos.titulo}">${candidatos.fotos[i].legenda}</div>`

}
}
lateral.innerHTML = fotosHtml; 
}else {
    seuVotoPara.innerHTML = '';
    aviso.style.display = 'block';
    cargo.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
}
    console.log(candidatos);
}
function clicou(n){
let elNumero = document.querySelector('.numero.pisca');

    if(elNumero !== null){
elNumero.innerHTML = n;
numero = `${numero}${n}`
elNumero.classList.remove('pisca');
if(elNumero.nextElementSibling!== null){
    elNumero.nextElementSibling.classList.add('pisca');
}else {
    atualizaInterface();
}
}
}
function branco(){ 
numero = '';
votoBranco = true;
cargo.innerHTML = '';
seuVotoPara.innerHTML = '';
aviso.style.display = 'block';
numeros.innerHTML = '';
lateral.innerHTML = '';
descricao.innerHTML = '<div class="branco pisca">VOTO EM BRANCO</div>'
}
function corrige(){
comecarEtapa()
}
function confirma (){
let etapa = etapas[etapaAtual]

let votoConfirmado = false;
    
if(votoBranco === true){
        votoConfirmado = true;
    votos.push({
        etapa: etapas[etapaAtual].titulo,
        votos: 'branco'
    })
 }else if(numero.length === etapa.numeros){
votoConfirmado = true;
votos.push({
    etapa: etapas[etapaAtual].titulo,
    voto: numero
})
}

if(votoConfirmado){
etapaAtual++;
if(etapas[etapaAtual] !== undefined){
comecarEtapa();
}else {
    document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
    document.querySelector('.teclado--btn').innerHTML = '';
    console.log(votos);
    
    window.setTimeout('location.reload()', 5000);
}
}
}



comecarEtapa();
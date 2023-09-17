//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raio = diametro/2;

//velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variáveis da divisão
let xDivisao = 300;
let yDivisao = 0;
let divisaoComprimento = 1;
let divisaoAltura = 400;

//variáveis da raquete
let xRaquete = 2;
let yRaquete = 150;

//variáveis tamanho raquetes
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 587;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//variáveis do placar de jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload()
{
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() 
{
  createCanvas(600, 400);
  trilha.loop();
}

//função desenhar
function draw() 
{
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  verificaColisaoRaqueteOponente();
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  mostraDivisao();
  bolinhaNaoFicaPresa();
}

//função bolinha não ficar presa
function bolinhaNaoFicaPresa()
{
    if (xBolinha - raio < 0){
      xBolinha = 23
    }
    if (xBolinha + raio > 600){
      xBolinha = 580
    }
}
//função mostrar a bolinha
function mostraBolinha()
{
  circle(xBolinha, yBolinha, diametro);
}

//função movimentar a bolinha
function movimentaBolinha()
{
  xBolinha += velocidadeXBolinha; 
  yBolinha += velocidadeYBolinha; 
}

//função verificar colisão das bordas
function verificaColisaoBorda()
{
  if (xBolinha + raio > width || xBolinha - raio < 0)
    {
      velocidadeXBolinha *= -1;
    }
  
  else if (yBolinha + raio > height || yBolinha - raio  < 0)
    {
      velocidadeYBolinha *= -1;
    }
}

//função mostrar raquete
function mostraRaquete(x,y)
{
  rect(x, y, raqueteComprimento, raqueteAltura);
}

//função movimento da raquete
function movimentaMinhaRaquete()
{
  if (keyIsDown(87))
    {
      yRaquete -= 10;
    }
  else if (keyIsDown(83))
    {
      yRaquete += 10;
    }
  yRaquete = constrain(yRaquete, 10, 310);
}

//função verificar colisão com a raquete
function verificaColisaoRaquete()
{
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete)
    
    {
      velocidadeXBolinha *= -1;
      raquetada.play();
    }
}

//função movimento da raquete do oponente
function movimentaRaqueteOponente()
{
  if (keyIsDown(UP_ARROW))
    {
      yRaqueteOponente -= 10;
    }
  else if (keyIsDown(DOWN_ARROW))
    {
      yRaqueteOponente += 10;
    }
  yRaqueteOponente = constrain(yRaqueteOponente, 5, 315);
}

//função verificar colisão com a raquete do oponente
function verificaColisaoRaqueteOponente()
{
if (xBolinha + raio > xRaqueteOponente && yBolinha - raio < yRaqueteOponente + raqueteAltura && yBolinha + raio > yRaqueteOponente)
  {
    velocidadeXBolinha *= -1;
    raquetada.play();
  } 
}

//função divisão de lados
function mostraDivisao()
{
  rect(xDivisao, yDivisao, divisaoComprimento, divisaoAltura);
}

//função incluir placar
function incluiPlacar()
{
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill (color(255,140,0))
  rect(200,10,40,20);
  rect(360,10,40,20);
  fill(255)
  text(meusPontos, 220, 26);
  text(pontosOponente, 380, 26)
}

//função marcar pontos
function marcaPonto()
{
  if (xBolinha > 585)
    {
      meusPontos += 1;
      ponto.play();
    }
  
  else if (xBolinha < 15)
    {
      pontosOponente += 1;
      ponto.play();
    }
}

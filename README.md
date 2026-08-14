# SOS Truck Service — Site Institucional

Site institucional de página única (one-page) para a **SOS Truck Service — Mecânica Diesel**,
oficina móvel e socorro mecânico 24 horas para caminhões, em Caxias do Sul/RS.

O site foi construído com um único objetivo: **converter visitantes em conversas no WhatsApp.**

---

## 1. Como colocar o site no ar

O site é 100% estático (HTML + CSS + JavaScript puro). Não precisa de servidor PHP, banco de
dados nem processo de build. Basta enviar a pasta inteira para a hospedagem.

### Opção A — Hospedagem tradicional (cPanel, Hostgator, Locaweb, KingHost)

1. Acesse o Gerenciador de Arquivos da sua hospedagem.
2. Entre na pasta `public_html` (ou `www`).
3. Envie **todo o conteúdo** desta pasta, mantendo a estrutura:
   `index.html`, a pasta `assets/`, `site.webmanifest`, `robots.txt`, `sitemap.xml` e `.htaccess`.
4. Pronto. O site já responde no domínio.

> **Importante:** o arquivo `.htaccess` começa com ponto e costuma ficar oculto.
> Ative "mostrar arquivos ocultos" no gerenciador para enviá-lo. Ele cuida de HTTPS,
> compressão e cache. Se sua hospedagem não for Apache (ex.: Nginx), pode ignorá-lo.

### Opção B — Hospedagem gratuita e rápida (recomendada)

- **Netlify:** acesse [app.netlify.com/drop](https://app.netlify.com/drop) e arraste a pasta.
  Fica no ar em segundos, com HTTPS grátis.
- **Vercel** ou **Cloudflare Pages:** mesmo princípio, também gratuitos.
- **GitHub Pages:** suba a pasta para um repositório e ative Pages nas configurações.

### Opção C — Testar no seu computador

Abra o arquivo `index.html` com duplo clique. Tudo funciona, exceto a logo dentro da
ilustração do caminhão (alguns navegadores bloqueiam imagens dentro de SVG em arquivos
locais). No servidor isso não acontece.

---

## 2. Estrutura dos arquivos

```
sos-truck-service/
├── index.html                 ← O site inteiro (HTML + CSS + JS em um só arquivo)
├── site.webmanifest           ← Ícone e nome ao "instalar" o site no celular
├── robots.txt                 ← Autoriza a indexação pelo Google
├── sitemap.xml                ← Mapa do site para os buscadores
├── .htaccess                  ← HTTPS, compressão, cache e segurança (servidores Apache)
├── README.md                  ← Este documento
└── assets/
    ├── logo-sos-truck-service.png   ← Logo em círculo, fundo transparente (223×223)
    ├── og-image.jpg                 ← Imagem exibida ao compartilhar o link (1200×630)
    ├── favicon.ico                  ← Ícone da aba do navegador
    ├── favicon-32.png               ← Ícone 32×32
    ├── favicon-192.png              ← Ícone Android
    └── apple-touch-icon.png         ← Ícone iPhone/iPad (180×180)
```

Todo o CSS e o JavaScript estão dentro do `index.html`. Isso é proposital: o site carrega
em uma única requisição, o que o deixa muito rápido.

---

## 3. Como alterar as informações

Abra o `index.html` em qualquer editor de texto (recomendo o **Visual Studio Code**, gratuito).
Use `Ctrl + F` para localizar os trechos abaixo.

### 3.1. Trocar o número de WhatsApp — o ajuste mais importante

O número está centralizado em **um único lugar**. Localize, perto do final do arquivo:

```javascript
var WA_NUMBER = "5554999005275"; /* (54) 99900-5275 */
```

Troque apenas os números, no formato `55` + DDD + número, **sem espaços, traços ou parênteses**.
Isso atualiza automaticamente **os 21 botões de WhatsApp do site**.

Depois, atualize também os lugares onde o número aparece escrito para o cliente ler:

- Rodapé: procure por `(54) 99900-5275` (aparece 2 vezes).
- Dados do Google: procure por `"telephone": "+55-54-99900-5275"`.

### 3.2. Mensagens automáticas do WhatsApp

Cada botão abre a conversa com uma mensagem já digitada, de acordo com o contexto.
Procure por `data-msg=` para encontrá-las. Exemplo:

```html
data-msg="🚨 Preciso de socorro mecânico AGORA para meu caminhão. Minha localização é:"
```

Basta editar o texto entre aspas.

### 3.3. Endereço, horário e área de atendimento

Procure por `Rua Amábile Telli` — o endereço aparece no rodapé, no link do mapa e nos
dados estruturados do Google. Altere nos três pontos.

Para mudar a área de cobertura, procure por `RS e SC` e `RIO GRANDE DO SUL · SANTA CATARINA`.

### 3.4. Depoimentos

> **Atenção:** os depoimentos atuais são **exemplos ilustrativos**, criados para demonstrar
> o layout. Substitua-os pelas avaliações reais do Google antes de divulgar o site.

Procure por `<div class="review reveal"`. Cada bloco tem: inicial do cliente, nome, data,
5 estrelas e o texto. Para remover uma avaliação, apague o bloco `<div class="review ...">`
inteiro, até o `</div>` correspondente.

A nota geral (`5,0`) aparece em dois lugares: no hero e no cabeçalho da seção de avaliações.

### 3.5. Serviços

Procure por `<div class="s-card reveal"`. Copie um bloco inteiro para criar um serviço novo,
ou apague para remover. Os ícones disponíveis estão no início do `<body>`, dentro do bloco
`<svg width="0" height="0">` — cada um tem um `id` (ex.: `i-engine`, `i-brake`, `i-diag`).
Para trocar o ícone de um card, mude o nome dentro de `<use href="#i-engine"/>`.

---

## 4. Identidade visual

As cores estão centralizadas no início do CSS, no bloco `:root`. Alterando ali, muda no site inteiro.

| Variável | Cor | Uso |
|---|---|---|
| `--red` | `#EE1119` | Vermelho da marca, extraído da logo. Destaques, ícones, títulos |
| `--red-hi` | `#FF3D45` | Vermelho claro, para brilhos e estados de hover |
| `--red-deep` | `#A00A11` | Vermelho escuro, para sombras e profundidade |
| `--asphalt` | `#0C0D10` | Preto asfalto — fundo principal |
| `--steel` | `#1A1D22` | Grafite — fundo dos cards |
| `--chrome` | `#F3F4F1` | Branco levemente frio — texto principal |
| `--smoke` | `#A0A6AF` | Cinza — textos de apoio |
| `--wa` | `#25D366` | Verde oficial do WhatsApp |

**Regra de ouro do projeto:** o verde é usado **exclusivamente** em botões de WhatsApp.
Isso ensina o visitante, em poucos segundos, que "verde = falar com a empresa agora".
Evite usar verde em qualquer outro elemento.

As estrelas das avaliações usam o dourado oficial do Google (`#FBBC05`) de propósito, para
dar credibilidade à seção.

**Tipografia:** a fonte é a *Archivo* (Google Fonts), em pesos 500 a 900. Foi escolhida por
ter o desenho condensado e robusto típico da sinalização de transporte e de placas de rodovia.

**Faixas diagonais vermelho e branco:** são o elemento de assinatura do site. Referenciam a
sinalização de veículos de emergência e de socorro — reforçam o "SOS" do nome sem precisar
explicar.

---

## 5. Estrutura das seções

| # | Seção | Âncora | Função |
|---|---|---|---|
| 1 | Cabeçalho fixo | — | Logo + menu + botão de WhatsApp sempre visível |
| 2 | Hero | `#inicio` | Título, 2 botões, ilustração do caminhão e 4 cards de destaque |
| 3 | Faixa deslizante | — | Reforço das palavras-chave em movimento |
| 4 | Benefícios | `#beneficios` | 6 motivos para escolher a empresa |
| 5 | Como funciona | `#como-funciona` | 4 etapas + botão de WhatsApp |
| 6 | Serviços | `#servicos` | 10 serviços, cada um com botão próprio de WhatsApp |
| 7 | Diferenciais | `#diferenciais` | 6 diferenciais + 4 números de destaque |
| 8 | Avaliações | `#avaliacoes` | Nota, estrelas e depoimentos estilo Google |
| 9 | CTA gigante | — | Grande bloco verde — o maior botão do site |
| 10 | Rodapé | `#contato` | Contato, endereço, horário, mapa, redes sociais |

---

## 6. Recursos de conversão

- **21 pontos de contato com o WhatsApp**, distribuídos por todas as seções.
- **Mensagens contextuais**: quem clica no card "Freios" já abre a conversa falando de freios.
  Isso reduz o atrito e aumenta muito a taxa de resposta.
- **Botão flutuante** no canto inferior direito (desktop), com pulso animado e dica ao passar o mouse.
- **Barra fixa no rodapé** em celulares: `🚚 Chamar Atendimento no WhatsApp`, sempre à mão.
- **Botão no menu fixo**, visível durante toda a rolagem.
- **CTA gigante em verde**, com botão pulsante — o maior elemento clicável do site.
- **Selo "Disponível agora"** com ponto verde piscando, transmitindo disponibilidade imediata.

---

## 7. SEO — como o site foi otimizado

- Título e descrição escritos com as palavras-chave principais.
- Hierarquia correta de títulos: um único `<h1>`, seguido de `<h2>` e `<h3>`.
- **Dados estruturados** (Schema.org `AutoRepair`) com endereço, telefone, coordenadas,
  horário 24h, área atendida e lista de serviços — é o que faz a empresa aparecer bem
  formatada nos resultados do Google.
- `robots.txt` e `sitemap.xml` prontos.
- Textos alternativos (`alt`) em todas as imagens.
- Imagem de compartilhamento (Open Graph) configurada: ao enviar o link no WhatsApp ou
  Instagram, aparece um card bonito com a logo e o telefone.

**Palavras-chave trabalhadas:** oficina móvel, mecânica diesel, socorro mecânico, caminhão,
manutenção de caminhões, atendimento 24 horas, oficina para caminhões, mecânico diesel,
assistência para caminhões, oficina móvel diesel.

### Antes de publicar, faça estes 3 ajustes

1. **Domínio.** Já configurado com o domínio real `sostruckbr.com` em `index.html`,
   `galeria.html`, `reels.html`, `trabalhe-conosco.html`, `sitemap.xml` e `robots.txt`.
2. **Google Meu Negócio.** Cadastre ou reivindique o perfil da empresa e coloque o endereço
   do site lá. Isso vale mais para busca local do que qualquer outro ajuste.
3. **Google Search Console.** Cadastre o site em
   [search.google.com/search-console](https://search.google.com/search-console) e envie o
   `sitemap.xml`. É gratuito e acelera a indexação.

---

## 8. Desempenho e acessibilidade

- **Peso total: cerca de 440 KB**, sendo que o HTML sozinho tem ~84 KB.
- **Nenhuma biblioteca externa**: sem jQuery, Bootstrap ou frameworks. Só o essencial.
- **Ilustrações em SVG** desenhadas à mão no código: nítidas em qualquer tela, peso mínimo.
- **Animações por CSS**, aceleradas por GPU, que não travam a rolagem.
- Respeita a preferência de **movimento reduzido** do sistema operacional: quem tem
  sensibilidade a animações vê o site estático.
- Navegação por **teclado** com contorno visível em todos os botões e links.
- Contraste alto entre texto e fundo, adequado para leitura sob luz solar — importante,
  já que boa parte dos visitantes vai acessar o site parado no acostamento.

---

## 9. Perguntas frequentes

**O site funciona em celular?**
Sim, foi desenhado primeiro pensando no celular. Em telas pequenas, a barra verde fixa no
rodapé garante que o botão de WhatsApp esteja sempre a um toque de distância.

**Preciso pagar algo mensal?**
Só a hospedagem e o domínio. Se usar Netlify ou Cloudflare Pages, a hospedagem é gratuita.

**Como adiciono o Google Analytics?**
Cole o código de acompanhamento fornecido pelo Google logo antes da tag `</head>`,
no início do `index.html`.

**Posso trocar a ilustração do caminhão por uma foto real?**
Pode, e é uma boa ideia quando houver fotos boas da equipe e da oficina móvel. Localize
`<div class="truck-frame">` e substitua todo o bloco `<svg>...</svg>` por
`<img src="assets/sua-foto.jpg" alt="Equipe da SOS Truck Service em atendimento">`.
Use fotos horizontais, com boa iluminação, e comprima antes ([squoosh.app](https://squoosh.app)).

**A logo ficou pequena no cabeçalho.**
Procure por `.brand-logo{` no CSS e altere `width` e `height` (o padrão é `52px`).

---

## 10. Checklist antes de divulgar

- [ ] Número de WhatsApp conferido — clique em pelo menos 3 botões diferentes e teste
- [ ] Endereço e horário conferidos no rodapé
- [ ] Depoimentos de exemplo substituídos por avaliações reais do Google
- [ ] Domínio real trocado no `index.html` e no `sitemap.xml`
- [ ] Link do Google Maps abrindo no local certo
- [ ] Link do Instagram funcionando
- [ ] Site testado no celular, com internet móvel (não só no Wi-Fi)
- [ ] Link enviado para você mesmo no WhatsApp, para conferir se o card de imagem aparece
- [ ] Sitemap enviado no Google Search Console

---

*Documentação da versão entregue em agosto de 2026.*

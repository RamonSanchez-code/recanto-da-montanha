# Prompt — Construção e Arquitetura da Landing Page "Chácara Recanto da Montanha"

> Copie tudo abaixo da linha e cole na ferramenta de IA / entregue ao desenvolvedor.

---

## 1. Papel e objetivo

Você é um(a) desenvolvedor(a) front-end sênior e designer de conversão. Construa uma **landing page de página única, responsiva (mobile-first), rápida e otimizada para SEO local** para a **Chácara Recanto da Montanha**, um espaço para festas, eventos e hospedagem de lazer em Ribeirão Preto/SP.

**Objetivo de negócio:** gerar pedidos de orçamento/reserva pelo **WhatsApp**. Toda decisão de layout deve encurtar o caminho do visitante até o botão "Reservar pelo WhatsApp".

## 2. Dados reais do negócio (fonte: Google Maps)

| Campo | Valor |
|---|---|
| Nome | Chácara Recanto da Montanha |
| Categoria | Local para eventos (festas, confraternizações, aniversários, fins de semana em família) |
| Endereço | Av. Alfredo Ravaneli – Ribeirão Preto, SP, CEP 14093-663 |
| Plus Code | V889+CM Ribeirão Preto, São Paulo |
| Coordenadas | -21.1339822, -47.6807581 |
| Telefone / WhatsApp | (16) 99225-1622 → link `https://wa.me/5516992251622` |
| Site atual | nositedafesta.com.br |
| Avaliação Google | **4,6 ★ (42 avaliações)** |
| Link Maps | https://maps.app.goo.gl/hQ3vu6zz4HTxSzKY6 |

**Diferenciais citados pelos clientes nas avaliações:** ambiente ideal para reunir família e amigos; espaço muito bonito, organizado, limpo e bem cuidado; **piscina**; **cachoeira**; **campinho de futebol** (as crianças adoram); **hospedagem**; preço justo.

**Depoimentos reais para usar (com nome e nota 5★):**
- "Excelente lugar para reunir a família e amigos em uma festa." — Paulo Henrique
- "Excelente área, tudo muito organizado e limpo. As crianças adoraram o campinho... Nos divertimos muito, recomendo!" — Mauro Kinchin
- "O lugar é incrível para família, muito bem cuidado e organizado, além da hospedagem que também é ótima." — Euler Fernandes

> ⚠️ Itens **não confirmados** (deixar como placeholders `{{...}}` editáveis, nunca inventar): capacidade de pessoas, nº de quartos/leitos, área total, preços/diárias, horários de check-in/out, lista completa de itens (churrasqueira, salão coberto, cozinha, Wi-Fi, estacionamento etc.), regras da casa, Instagram.

## 3. Identidade visual

- **Conceito:** "refúgio verde perto da cidade" — natureza, montanha, água, alegria em família. Acolhedor e rústico-moderno, não luxuoso-frio.
- **Paleta sugerida:**
  - Verde mata `#2F5D3A` (primária)
  - Verde folha `#7FA650` (apoio)
  - Azul piscina/cachoeira `#3BA3C7` (destaques/ícones de água)
  - Terra/madeira `#8B5E3C` (detalhes)
  - Creme `#F7F3EA` (fundo)
  - Botão de conversão: verde WhatsApp `#25D366` com texto escuro `#0B3D2E`
- **Tipografia:** títulos em serif ou slab amigável (ex.: *Fraunces* ou *Playfair Display*); texto em sans legível (ex.: *Inter* ou *Nunito*). Máx. 2 famílias, `font-display: swap`.
- **Fotos:** reais do local (piscina, cachoeira, campinho, áreas de festa, quartos). Proporção consistente, cantos levemente arredondados, sem filtros pesados. Placeholders com `alt` descritivo até chegarem as fotos oficiais.
- **Elemento gráfico:** silhueta sutil de montanha como divisor entre seções (SVG).

## 4. Arquitetura da página (ordem das seções)

1. **Header fixo (sticky)** — logo/nome à esquerda; âncoras: Espaço · Estrutura · Eventos · Galeria · Avaliações · Localização; botão "Reservar" à direita. No mobile, menu hambúrguer + botão sempre visível.
2. **Hero** — foto/vídeo de fundo (piscina ou vista geral) com overlay escuro.
   - H1: "Chácara Recanto da Montanha — seu refúgio para festas e fins de semana em Ribeirão Preto"
   - Sub: "Piscina, cachoeira, campinho e hospedagem em um espaço limpo, organizado e feito para reunir quem você ama."
   - CTA primário: **"Consultar datas no WhatsApp"**; CTA secundário: "Ver o espaço" (âncora).
   - Selo de prova social: "★ 4,6 no Google · 42 avaliações".
3. **Faixa de destaques (4 ícones)** — Piscina · Cachoeira · Campinho de futebol · Hospedagem.
4. **Sobre o espaço** — 2 parágrafos curtos + foto; foco em família, tranquilidade e proximidade da cidade.
5. **Estrutura completa** — grid de cards com ícone + título + 1 linha (itens confirmados + placeholders `{{item}}`).
6. **Para quais ocasiões** — cards: Aniversários · Confraternizações de empresa · Chás (bebê/revelação) · Encontros de família · Fim de semana/hospedagem · Retiros. Cada card com CTA "Pedir orçamento" que abre WhatsApp com mensagem pré-preenchida específica.
7. **Galeria** — grid masonry/carrossel com lightbox, lazy-load, filtros (Piscina · Áreas de festa · Hospedagem · Natureza).
8. **Avaliações** — nota 4,6 em destaque + 3 depoimentos reais + link "Ver todas no Google".
9. **Como reservar (3 passos)** — 1) Escolha a data · 2) Fale conosco no WhatsApp · 3) Confirme e aproveite.
10. **FAQ (acordeão)** — capacidade, horários, pode levar som/decoração/buffet próprio, animais, política de cancelamento, sinal/pagamento (respostas como `{{placeholder}}`).
11. **Localização** — mapa Google embutido (iframe lazy, com fachada clicável para não pesar), endereço, Plus Code, botões "Abrir no Google Maps" e "Abrir no Waze".
12. **CTA final** — faixa verde com frase forte ("Sua próxima festa merece esse cenário") + botão WhatsApp.
13. **Footer** — nome, endereço, telefone, redes sociais `{{instagram}}`, link do Maps, © ano automático.
14. **Botão flutuante de WhatsApp** — canto inferior direito, em todas as telas, com leve animação de pulso (respeitar `prefers-reduced-motion`).

**Mensagem padrão do WhatsApp (URL-encoded):**
`Olá! Vim pelo site e gostaria de consultar disponibilidade na Chácara Recanto da Montanha para o dia ___, para ___ pessoas.`

## 5. Arquitetura técnica

**Stack recomendada:** Astro (saída estática) + Tailwind CSS. Alternativa mais simples: HTML + CSS + JS vanilla em um único projeto estático. Sem backend.

```
recanto-da-montanha/
├─ public/
│  ├─ images/            # fotos otimizadas (AVIF/WebP + fallback JPG)
│  ├─ favicon.svg
│  └─ og-image.jpg       # 1200x630
├─ src/
│  ├─ data/site.ts       # TODOS os dados do negócio (nome, tel, endereço, textos, FAQ, depoimentos)
│  ├─ components/        # Header, Hero, Highlights, About, Amenities, Occasions,
│  │                     # Gallery, Reviews, HowToBook, FAQ, Location, FinalCTA,
│  │                     # Footer, WhatsAppFloat
│  ├─ layouts/Base.astro # <head>, SEO, JSON-LD, fontes
│  └─ pages/index.astro
├─ astro.config.mjs
└─ package.json
```

- **Fonte única de dados:** todo texto e contato vem de `src/data/site.ts`; nada hardcoded nos componentes. Função utilitária `whatsappLink(mensagem)` gera os links.
- **JS mínimo:** apenas menu mobile, acordeão do FAQ, lightbox da galeria e fachada do mapa.
- **Imagens:** `<picture>` com AVIF/WebP, `width/height` definidos, `loading="lazy"` (exceto o hero, com `fetchpriority="high"`).

## 6. SEO local

- `<title>`: "Chácara Recanto da Montanha | Chácara para Festas e Eventos em Ribeirão Preto"
- Meta description (≤155 caracteres): "Chácara para festas, eventos e hospedagem em Ribeirão Preto. Piscina, cachoeira e campinho. Nota 4,6 no Google. Consulte datas pelo WhatsApp."
- Palavras-chave alvo: *chácara para festas Ribeirão Preto*, *chácara para alugar Ribeirão Preto*, *espaço para eventos Ribeirão Preto*, *chácara com piscina Ribeirão Preto*.
- Hierarquia: um único H1; H2 por seção.
- Open Graph + Twitter Card com `og-image.jpg`.
- **JSON-LD** `LocalBusiness` (tipo `EventVenue`) com: name, address (PostalAddress: Av. Alfredo Ravaneli, Ribeirão Preto, SP, 14093-663, BR), geo (-21.1339822, -47.6807581), telephone `+55 16 99225-1622`, url, image, `aggregateRating` (4.6 / 42), `hasMap`. JSON-LD `FAQPage` para o FAQ.
- `sitemap.xml`, `robots.txt`, URL canônica, `lang="pt-BR"`.

## 7. Requisitos de qualidade

- **Performance:** Lighthouse ≥ 90 em todas as categorias no mobile; LCP < 2,5 s; CLS < 0,1; página total < 1,5 MB no primeiro carregamento.
- **Acessibilidade (WCAG 2.1 AA):** contraste mínimo 4.5:1, foco visível, navegação por teclado, `alt` em todas as imagens, `aria-expanded` no menu e FAQ, botão flutuante com `aria-label`.
- **Responsivo:** testar em 360 px, 768 px, 1024 px e 1440 px. Botões com área de toque ≥ 44 px.
- **Analytics:** eventos de clique em todos os CTAs de WhatsApp (GA4 ou Plausible), com o nome da seção de origem.
- **LGPD:** banner simples de cookies apenas se usar analytics com cookies.

## 8. Tom de voz

Caloroso, familiar e direto. Frases curtas, verbos de ação ("Reserve", "Venha", "Reúna"). Evitar exageros e promessas não confirmadas. Segunda pessoa ("você").

## 9. Entregáveis

1. Código-fonte completo, rodando com `npm install && npm run dev` e build estático com `npm run build`.
2. `README.md` explicando como trocar textos/fotos em `src/data/site.ts` e como publicar (Vercel, Netlify ou Hostinger).
3. Lista de todos os placeholders `{{...}}` pendentes de informação do proprietário.

## 10. Critérios de aceite

- [ ] Todo botão de reserva abre o WhatsApp (16) 99225-1622 com mensagem pré-preenchida.
- [ ] Nenhuma informação inventada: dados não confirmados aparecem como `{{placeholder}}`.
- [ ] Nota 4,6 / 42 avaliações e os 3 depoimentos reais exibidos.
- [ ] Mapa e botões de rota apontam para as coordenadas corretas.
- [ ] JSON-LD válido no Rich Results Test do Google.
- [ ] Lighthouse mobile ≥ 90.

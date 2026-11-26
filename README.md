# Chácara Recanto da Montanha — Landing page

Site estático (HTML + CSS + JS), sem etapa de build e sem dependências.

## Rodar localmente

```powershell
npx --yes http-server -p 5173 -c-1
```

Abra http://localhost:5173. Para ver todos os efeitos mesmo com "reduzir movimento" ligado no sistema, use http://localhost:5173/?movimento=1.

## Onde editar

| O quê | Arquivo |
|---|---|
| WhatsApp, telefone, endereço, coordenadas, nota | `js/config.js` |
| Textos, seções, perguntas frequentes | `index.html` |
| Cores, fontes, espaçamentos | `css/style.css` (variáveis no `:root`) |
| Efeitos de scroll e parallax, carrossel, galeria, mapa | `js/main.js` |

## Fotos

As fotos em `images/` foram tiradas do perfil da chácara no Google Maps (fotos com pessoas foram retiradas):

`piscina-dia.jpg`, `piscina-noite.jpg`, `area-gourmet.jpg`, `cozinha.jpg`, `salao-coberto.jpg`, `campinho.jpg`, `sinuca.jpg`, `campo-estacionamento.jpg` e `og-image.jpg` (imagem ao compartilhar o link).

Fundos: o topo usa `piscina-dia.jpg` e a chamada final usa `campinho.jpg`.

Parte das fotos do Google Maps é enviada por visitantes. Antes de publicar, confirme com o proprietário que pode usá-las ou troque por fotos próprias. Para trocar, basta substituir o arquivo mantendo o mesmo nome. Se um arquivo faltar, aparece uma ilustração no lugar.

Ainda não há fotos da **hospedagem**: vale fotografar os quartos.

## Pendências do proprietário

Procure por `{{` no `index.html`. Os campos são: capacidade máxima de pessoas, número de quartos/leitos, horários de entrada e saída, regras de buffet/som/decoração, pagamento/sinal/cancelamento.

Atualize também o domínio em `<link rel="canonical">` no `index.html`.

## Publicar

Envie a pasta inteira para Vercel, Netlify ou qualquer hospedagem estática (Hostinger, etc.). Não precisa de build.

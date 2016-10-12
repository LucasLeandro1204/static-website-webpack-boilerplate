# Repositório base

Pug e Sass, compilando com GULP.

## Estrutura

Pug: Views/Partials/Página/Partial
EX: Views/Partials/Index/_home.pug
OBS: Quando é algo global, como a estrutura de um menu, a partial se localiza em views/partials/global

Pug: Sass/Partials/Página/Partial
EX: Sass/Partials/Index/_home.sass
OBS: Quando é algo global, como o estilo menu, a partial se localiza em sass/partials/global

Imagens: Images/Página/img
EX: images/Index/_home.jpg
OBS: Quando é algo global, como uma logo localizada no menu, a imagem se localiza em images/global/_logo.jpg

## Páginas

Pra criar uma nova página, é necessário criar uma pasta nova, com um arquivo index.pug dentro, e chamar os arquivos um nível antes. Exemplo:

extends ../_layouts/main.pug

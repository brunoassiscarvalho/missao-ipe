# Regras do jogo

## Objetivos

- **Objetivo principal:** chegar ao destino da missão.
- **Objetivo científico:** preservar instrumentos e dados para realizar pesquisas.
- O sucesso considera capacidade de carga, massa, energia, orçamento, capacidade científica e eficiência do projeto.

## Missões

Cada missão define o destino, a carga científica, a duração-base, os desafios e a recompensa. A duração-base é uma estimativa didática em dias, convertida das durações apresentadas no briefing quando necessário.

## Nave e equipamentos

A nave é montada com um veículo e equipamentos de propulsão, energia, proteção e navegação. Cada componente informa:

- **Massa:** soma-se à carga da missão para obter a massa total.
- **Preço:** integra o custo de compra previsto; só é debitado quando a missão é lançada.
- **Energia:** valor positivo representa consumo e valor negativo representa geração ou armazenamento.
- **Confiabilidade:** participa do cálculo da capacidade científica.
- **Propriedade específica:** por exemplo, capacidade de carga, potência ou precisão.
- **Regra do item:** informa efeitos de jogo, como modificadores de dias e capacidade científica.

O veículo precisa comportar a carga da missão. A massa total é a carga mais as massas dos componentes. A capacidade de tripulantes prevista para o projeto é de 0 a 5; tripulantes ainda não são selecionáveis na montagem atual.

### Energia

A energia disponível começa em 64 unidades. Subtrai-se o consumo dos sistemas e soma-se a geração dos equipamentos. A reserva deve ser de pelo menos 30 unidades para a missão ser aprovada.

### Dias de viagem

Os dias são recalculados a cada escolha de equipamento:

1. Calcule o fator de massa: `1 + max(0, massa total − 800) / 10.000`.
2. Multiplique os dias-base da missão pelo fator de massa e pelos fatores de viagem da propulsão, proteção e navegação.
3. Arredonde o resultado para cima ao próximo dia inteiro.

Um fator menor que 1 reduz os dias; um fator maior que 1 os aumenta. A massa adicional também pode prolongar a viagem.

### Orçamento e custo

Cada projeto começa com orçamento de **US$ 15 milhões**. O custo previsto combina:

- soma dos preços dos equipamentos selecionados;
- custo operacional de **US$ 0,0005 milhão (US$ 500) por dia** multiplicado pelos dias calculados.

O painel da montagem mostra o saldo projetado depois do lançamento e discrimina a compra futura e a operação. Selecionar ou trocar um equipamento **não debita** o orçamento: a compra e o custo operacional só são considerados pagos quando a missão é lançada. Cada missão recebe seu próprio orçamento de projeto.

### Capacidade científica e sucesso

A capacidade científica é a média da confiabilidade dos cinco sistemas, somada ao modificador científico da proteção. O resultado fica entre 0% e 100%. Uma proteção melhor pode preservar instrumentos e dados; sistemas menos confiáveis podem reduzir o potencial científico.

A eficiência compara capacidade científica e custo previsto:

`eficiência = capacidade científica (pontos percentuais) / custo previsto (US$ milhões)`

A missão é aprovada quando a carga cabe no veículo, a massa total é inferior a 1.800 kg, a reserva de energia é de pelo menos 30 unidades, o custo previsto não passa de US$ 15 milhões, a capacidade científica é de pelo menos 95% e a eficiência é de pelo menos 5 pontos percentuais por US$ milhão.

## Regras por categoria

- **Veículo:** limita a massa da carga que pode ser transportada. Sua massa também participa do fator de duração da viagem.
- **Propulsão:** modifica a duração conforme o fator do equipamento e consome energia. Mais dias aumentam o custo operacional.
- **Energia:** geração e armazenamento compensam o consumo de propulsão, navegação e outros sistemas. A reserva mínima é obrigatória.
- **Proteção:** altera a capacidade científica e a duração conforme o modificador indicado no item; seus equipamentos também podem consumir energia.
- **Navegação:** modifica a duração conforme o fator do equipamento e consome energia.

## Dados científicos

Os textos principais dos detalhamentos apresentam fatos ou conceitos reais associados a tecnologias e missões espaciais. O quadro **Regra do jogo** mostra o efeito daquele item no simulador. Massas, preços, confiabilidades, capacidades e fatores exibidos são parâmetros didáticos do jogo, não especificações oficiais ou preços reais da NASA.

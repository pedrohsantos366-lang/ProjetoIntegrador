# Requisitos do Sistema de Endereçamento Inteligente para Estoque

## RF - Requisitos Funcionais

### RF01 - Padronização de Endereços
O sistema deve padronizar os endereços de armazenagem utilizando:

- Rua (localização física)
- Nível (localização física)
- Posição (localização física)
- Coluna Virtual (identificação lógica indicada por LEDs)

O sistema deve permitir a localização dos produtos através da combinação desses elementos.

### RF02 - Registro de Movimentações
O sistema deve registrar digitalmente todas as entradas e saídas de produtos.

### RF03 - Controle de Ocupação
O sistema deve controlar a ocupação e a capacidade máxima de cada posição de armazenagem.

### RF04 - Atualização de Posições Vazias
O sistema deve atualizar automaticamente as posições vazias, eliminando endereços fantasmas.

### RF05 - Identificação Visual
O sistema deve disponibilizar identificação visual para cada endereço por meio de LEDs, permitindo que os operadores localizem rapidamente os produtos armazenados.

### RF06 - Rastreabilidade
O sistema deve garantir a rastreabilidade completa das movimentações internas dos produtos.

### RF07 - Sinalização de Status
O sistema deve indicar visualmente o status de cada posição através de LEDs.

Os estados possíveis são:

- Livre
- Ocupado em movimentacao
- Bloqueado

---

## RNF - Requisitos Não Funcionais

### RNF01 - Baixo Custo
O sistema deve utilizar ferramentas acessíveis, como:

- Planilhas eletrônicas
- Softwares básicos
- Arduino
- LEDs
- Tags de identificação

### RNF02 - Facilidade de Uso
O sistema deve ser simples, responsivo e intuitivo, dispensando treinamento avançado dos operadores.

### RNF03 - Confiabilidade
O sistema deve garantir precisão das informações para apoiar a tomada de decisões.

### RNF04 - Eficiência
O sistema deve reduzir o tempo gasto em movimentações e retrabalhos.

### RNF05 - Escalabilidade
O sistema deve ser capaz de se adaptar a diferentes tamanhos de estoque.

### RNF06 - Automação
O sistema deve minimizar a dependência de processos manuais por meio da automação de etapas críticas.

### RNF07 - Disponibilidade
O sistema deve permanecer operacional durante toda a jornada de trabalho da operação logística.

---

## RN - Regras de Negócio

### RN01 - Endereço Único
Todo produto deve ser armazenado em um endereço único composto por:

- Rua
- Nível
- Posição
- Coluna Virtual

A coluna virtual não representa uma divisão física da estrutura de armazenagem, sendo utilizada apenas para identificação lógica e orientação visual por meio de LEDs.

### RN02 - Multi-Endereçamento
Não é permitido multi-endereçamento sem registro da quantidade armazenada em cada posição.

### RN03 - Capacidade Máxima
Cada posição deve possuir uma capacidade máxima previamente definida.

### RN04 - Limite de Armazenagem
Não é permitido armazenar produtos acima da capacidade máxima da posição.

### RN05 - Registro Obrigatório
Toda entrada e saída de produto deve ser registrada digitalmente no sistema.

### RN06 - Proibição de Baixas Manuais
Não são permitidas baixas manuais sem registro no sistema.

### RN07 - Atualização de Estoque
Endereços sem produtos devem ser atualizados imediatamente no sistema.

### RN08 - Proibição de Endereços Fantasmas
Não pode haver posições registradas como ocupadas sem estoque físico correspondente.

### RN09 - Identificação Obrigatória
Cada endereço deve possuir identificação visual por LEDs controlados pelo sistema.

### RN10 - Sinalização de Status
As alterações de status das posições devem ser sinalizadas visualmente.

Estados permitidos:

- Livre
- Ocupado
- Em movimentação

### RN11 - Ferramentas Acessíveis
O sistema deve utilizar tecnologias de baixo custo para implantação e manutenção.

### RN12 - Operação Simplificada
A operação do sistema deve ser intuitiva e não exigir treinamento avançado.

### RN13 - Consistência das Informações
As informações exibidas pelo sistema devem refletir o estoque físico existente.

### RN14 - Atualização em Tempo Real
Toda movimentação registrada deve atualizar imediatamente a ocupação da posição correspondente e o estado dos LEDs associados.
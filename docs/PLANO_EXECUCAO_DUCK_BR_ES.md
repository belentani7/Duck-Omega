# Plano de Execução Técnico — Duck Prod / Hey Duck

**Escopo:** selo e estúdio musical assíncrono entre Sergipe, Brasil, e Barcelona, Espanha.  
**Objetivo operacional:** vender instrumentais e serviços, contratar produção, entregar arquivos protegidos, registrar splits e acompanhar royalties com o mínimo de intervenção manual.

> **Aviso jurídico, fiscal e financeiro:** este documento é uma arquitetura de negócio e engenharia de processos, não aconselhamento jurídico, fiscal ou financeiro individual. Sou uma IA, não advogado, contador ou consultor financeiro licenciado. Antes de faturar, remeter royalties, escolher residência fiscal, assinar cessões ou anunciar tratamento tributário, um advogado e um contador habilitados no Brasil e na Espanha devem revisar a estrutura concreta, as partes, os valores e a documentação.

## 1. Decisão de arquitetura em uma frase

A recomendação inicial é manter o **Duck Hub como fonte única de verdade operacional**, com uma entidade contratual/faturadora claramente definida para cada venda, Stripe Connect ou checkout equivalente para cobrança e divisão controlada quando disponível, Wise Business ou transferência bancária para tesouraria e reconciliação, e um registro interno de direitos separado para master, composição, publishing, direitos conexos e serviços.

O sistema não deve tentar “eliminar” tributos por automação. A automação deve produzir documentação, aplicar regras previamente aprovadas, reservar valores, evitar pagamentos duplicados e gerar relatórios para o contador. O acordo Brasil–Espanha pode ser relevante para evitar dupla tributação, mas sua aplicação depende da natureza do rendimento, residência fiscal, beneficiário efetivo, documentação e legislação vigente.[1] [2]

## 2. Entidades e responsabilidades

| Entidade | Papel recomendado | Registro no Duck Hub | Decisão obrigatória |
|---|---|---|---|
| Duck Prod / Hey Duck | Produtor, prestador e/ou licenciante no Brasil | `producer`, catálogo, masters, composição, CNPJ/CPF, dados bancários | Qual entidade brasileira fatura e quem possui cada ativo |
| Parceiro em Barcelona | Agência, operador comercial, prestador ou coexplorador, conforme contrato | `partner`, território, tarefas, despesas e participação | Se recebe comissão, fee de serviço, revenue share ou royalties |
| Cliente/artista | Comprador, licenciado ou cocriador | CRM, KYC comercial mínimo, contrato, pedido, dados de entrega | Tipo de licença, créditos, splits e autorização de uso |
| Selo/projeto | Unidade de exploração de uma gravação ou catálogo | `release`, ISRC, ISWC quando aplicável, metadata, território | Quem controla master, composição, distribuição e cobrança |
| Provedor de pagamento | Processador e/ou plataforma de repasse | IDs externos, taxas, moeda, estado, chargeback | Não é a fonte autoral; seus relatórios devem reconciliar com o Hub |
| Contador/advogado | Camada de validação e exceção | `compliance_case`, parecer, documentos, prazo de revisão | Aprova regras antes de produção e remessas internacionais |

### Separação de direitos

Cada faixa deve ter pelo menos quatro registros conceitualmente separados: **composição** (autores e percentuais), **master** (titularidade e licença da gravação), **direitos conexos** (artistas, produtores fonográficos e intérpretes, quando aplicável) e **serviço** (mix, master, produção, edição ou consultoria). Um pagamento de serviço não deve ser automaticamente classificado como royalty; a classificação precisa seguir o contrato e a orientação profissional aplicável.

## 3. Fluxo financeiro Brasil–Espanha

### 3.1 Modelo recomendado para a primeira fase

Para reduzir complexidade, a primeira fase deve operar com **um vendedor contratual por pedido**. O vendedor indicado no checkout emite o documento comercial, recebe o pagamento e depois liquida com o outro participante conforme uma regra contratual e um relatório de reconciliação. Só depois de validar volume, residência fiscal, documentação e chargebacks deve-se ativar um marketplace com múltiplas contas conectadas.

| Cenário | Faturador inicial | Fluxo de recebimento | Quando usar |
|---|---|---|---|
| Beat/licença do Duck | Duck Prod ou entidade brasileira | Checkout → conta do faturador → reserva de taxas/refundos → entrega | Catálogo próprio, baixo número de participantes |
| Serviço vendido ao cliente europeu | Entidade que efetivamente presta/contrata o serviço, definido por contrato | Checkout em EUR → liquidação → fatura/recibo → reconciliação | Cliente fora do Brasil e operação comercial conduzida pela Espanha |
| Comissão do parceiro espanhol | Entidade que vende paga fee/comissão documentada | Relatório mensal aprovado → invoice/fatura/recibo conforme orientação fiscal | Operação comercial ou marketing, sem copropriedade automática do master |
| Royalty de gravação/composição | Titular do direito ou agente autorizado | Statement por período → cálculo do líquido contratual → pagamento | Exploração posterior à venda/licença; não misturar com fee de produção |
| Marketplace com múltiplos titulares | Plataforma e contas conectadas, se disponíveis e aprovadas | Cobrança → transfers/splits → payout para contas verificadas | Escala, múltiplos vendedores e compliance formalizado |

### 3.2 Provedores e decisão prática

| Opção | Vantagem | Limitação/riscos | Recomendação |
|---|---|---|---|
| **Stripe Connect** | Suporta connected accounts, destination charges, separate charges and transfers, application fees, onboarding e eventos de payout; a própria documentação descreve splits e repasses entre partes.[3] [4] | Disponibilidade regional, onboarding, KYC, moeda de settlement, responsabilidade por chargebacks e classificação fiscal devem ser confirmados antes do lançamento | Candidato principal para o checkout próprio e futura divisão técnica, desde que a entidade e os países elegíveis sejam aprovados |
| **Wise Business** | Útil para tesouraria, conversão e transferências para contas brasileiras; a documentação informa requisitos de destinatário, Pix/TED, limites e prazos que variam por região.[5] | Não substitui checkout, contrato, registro autoral nem razão de royalties; custos, limites e disponibilidade devem ser confirmados na conta | Usar para tesouraria/repatriação documentada, não como mecanismo de “split na fonte” |
| **PayPal** | Familiar para compradores e aceito no ecossistema BeatStars; BeatStars documenta a conexão de PayPal para payouts de vendas de beats.[6] | Disputas, reservas, conversão e reconciliação podem ser menos controláveis; não deve ser a razão principal | Canal alternativo/fallback, com IDs e webhooks registrados no Hub |
| **BeatStars** | Marketplace pronto para descoberta e vendas, com conexão de payout do produtor | Menor controle sobre CRM, contratos, ownership, automações e reconciliação interna | Canal de aquisição/distribuição, sincronizado ao Hub por importação de relatórios; não substituir o núcleo |
| **Transferência bancária/Pix** | Boa para B2B conhecido e reconciliação | Mais fricção, confirmação manual e maior risco de liberar ativo antes de confirmar | Fallback para clientes aprovados, sempre com conciliação por referência única |

**Decisão:** começar com checkout próprio e um faturador por pedido. Manter Stripe Connect como trilho futuro de marketplace, Wise como tesouraria e BeatStars/PayPal como canais complementares. A plataforma não deve prometer “bitributação zero”; deve gerar um **tax packet** por pagamento contendo contrato, invoice/recibo, residência declarada, natureza do pagamento, moeda, taxas, retenções aplicadas conforme orientação profissional e comprovante de transferência.

### 3.3 Split de royalties sem caos operacional

O split deve ser calculado sobre uma base explicitamente definida no contrato, nunca sobre “o que sobrar” de forma ambígua. A ordem recomendada é: valor bruto recebido; menos impostos indiretos ou retenções aplicáveis; menos taxa do processador; menos reembolsos/chargebacks; menos despesas aprovadas e documentadas; igual a **receita líquida distribuível**; aplicar percentuais de master, composição, publishing e comissão separadamente.

O Duck Hub deve guardar `grossAmount`, `taxAmount`, `processorFee`, `refundReserve`, `approvedCosts`, `netDistributable`, `currency`, `fxRateSource`, `fxRateDate`, `splitRuleVersion` e `statementPeriod`. Cada split deve exigir aprovação quando houver alteração de titular, território, percentual ou base de cálculo.

```text
Pedido criado
  → contrato e split congelados por versão
  → pagamento confirmado por webhook assinado
  → reserva para reembolso/chargeback
  → cálculo do líquido distribuível
  → ledger registra cada componente
  → payout/transfer somente para beneficiários verificados
  → statement mensal por obra/master
  → exceções vão para fila de aprovação
```

## 4. Pipeline de contratos, beats e entrega

### 4.1 Formulário de entrada

O formulário Tally deve coletar apenas o necessário: nome legal/nome artístico, email, país, tipo de cliente, faixa/projeto, serviço ou beat escolhido, licença, créditos, participantes, percentuais propostos, prazo, referência de arquivo, aceite de termos e consentimento de comunicação operacional. Dados sensíveis desnecessários não devem entrar no formulário.

Tally documenta que um webhook de submissão envia POST JSON, exige resposta 2XX em até dez segundos, oferece assinatura `Tally-Signature` e reintenta entregas que falhem.[7] Portanto, o endpoint deve validar a assinatura, gravar o `eventId`, responder rápido e delegar PDF, email, assinatura e processamento de áudio a uma fila.

### 4.2 Fluxo Make/Zapier ou equivalente

```text
[Tally: nova submissão]
        │ POST JSON + Tally-Signature
        ▼
[Duck Hub: validar assinatura + idempotência]
        │ 2XX em menos de 10 s
        ▼
[Normalizar cliente, beat, participantes e percentuais]
        │
        ├── percentuais inválidos → fila de exceção + pedido bloqueado
        ├── dados incompletos → email operacional + status NEEDS_INFO
        └── válido → criar versão de split/contrato
                         │
                         ├── gerar PDF a partir de template
                         ├── enviar para assinatura digital
                         ├── criar checkout com orderId único
                         └── registrar atividade/auditoria
```

### 4.3 Assinatura digital

Dropbox Sign oferece API, templates e modo de teste; a documentação distingue claramente o modo de teste, que não é juridicamente vinculante, da produção, que requer plano pago.[8] Seus callbacks podem informar o ciclo de assinatura, e o evento `signature_request_all_signed` é o momento indicado para baixar o documento final assinado.[9]

O fluxo correto é **contrato gerado → assinatura de todas as partes → callback validado → PDF assinado armazenado em S3 → hash do documento registrado → checkout liberado ou entrega permitida conforme a política comercial**. O pagamento não deve substituir o aceite contratual quando a licença exige assinatura.

### 4.4 Entrega de áudio após pagamento

```text
[Pagamento confirmado]
  → verificar orderId, moeda, valor, status e idempotência
  → confirmar que contrato exigido está assinado
  → gerar pacote de entrega por licença
  → aplicar watermark apenas em preview público
  → manter master/stems privados no S3
  → criar URLs assinadas com expiração curta
  → enviar email com link e instruções
  → registrar download, versão, IP/UA minimizados e timestamp
  → reprocessar falhas sem duplicar contrato ou email
```

A entrega deve ser feita por chave privada, não por URL pública permanente. O cliente recebe uma URL assinada limitada por tempo e escopo. O sistema deve poder revogar uma versão, gerar nova versão, preservar o hash anterior e bloquear a entrega em caso de chargeback, cancelamento ou divergência de contrato.

## 5. Stack recomendada

| Camada | Escolha principal | Alternativa mais leve | Papel no Duck Hub |
|---|---|---|---|
| Interface operacional | Duck Hub Astro + backend existente | Airtable Interface | CRM, pedidos, arquivos, royalties e auditoria |
| Formulário | Tally com assinatura de webhook | Formulário nativo do Hub | Briefing, dados contratuais e consentimentos |
| Automação | Make para fluxos visíveis e roteamento | Zapier para poucos fluxos | Orquestração, retries e alertas; lógica crítica permanece no Hub |
| Banco operacional | MySQL/TiDB do Hub | Airtable apenas para protótipo | Fonte de verdade e idempotência |
| Arquivos | S3 com metadados no Hub | Google Drive para colaboração editorial | Masters, stems, PDFs, versões e URLs assinadas |
| Documento | pdf-lib + template versionado | Google Docs → PDF | Contratos, statements e comprovantes |
| Assinatura | Dropbox Sign API | DocuSign ou ferramenta local aprovada | Assinatura, callback e trilha de auditoria |
| Pagamento | Stripe Checkout/Connect após aprovação | PayPal/BeatStars como canal | Cobrança, estado, fees, refunds e payouts |
| Tesouraria | Wise Business/banco da entidade | Transferência bancária | Conversão e envio documentado, nunca regra autoral |
| Distribuição | DistroKid/TuneCore/ditto após revisão | Distribuição direta de parceiros | Entrega a DSPs e relatórios de royalties |
| CRM/analytics | Duck Hub + PostHog/analytics consentido | Airtable views | Funil, cohort, conversão e retenção |
| Alertas | Email transacional + painel | Slack/Telegram interno | Falhas, assinatura, chargeback e exceções |

A regra arquitetural é simples: **Make/Zapier movimenta eventos; o Duck Hub decide estados e direitos**. Não colocar percentuais autorais críticos exclusivamente em cenários de automação no-code, porque isso dificulta versionamento, auditoria, testes e recuperação de falhas.

## 6. Máquina de estados mínima

| Estado | Entrada | Saída permitida | Ação automática |
|---|---|---|---|
| `LEAD` | Formulário recebido | `NEEDS_INFO`, `QUOTED` | Criar CRM e atividade |
| `QUOTED` | Orçamento aprovado | `CONTRACT_DRAFT` | Congelar preço e validade |
| `CONTRACT_DRAFT` | Dados completos | `SIGNING` | Gerar PDF e enviar assinatura |
| `SIGNING` | Documento enviado | `SIGNED`, `SIGNATURE_FAILED` | Aguardar callback validado |
| `SIGNED` | Todas as partes assinaram | `PENDING_PAYMENT` | Criar checkout |
| `PENDING_PAYMENT` | Checkout criado | `PAID`, `EXPIRED`, `FAILED` | Nunca liberar master ainda |
| `PAID` | Webhook verificado | `READY_TO_DELIVER` | Criar pacote de entrega |
| `READY_TO_DELIVER` | Arquivos verificados | `DELIVERED` | URLs assinadas e email |
| `DELIVERED` | Download/aceite | `ROYALTY_ACCRUED` | Registrar obrigação e statement |
| `ROYALTY_ACCRUED` | Fechamento do período | `PAYABLE`, `PAID_OUT`, `ON_HOLD` | Gerar statement e aprovação |
| `ON_HOLD` | Chargeback, documento faltante ou conflito | `RELEASED` ou `CANCELLED` | Bloquear payout e abrir exceção |

## 7. Controles de segurança e confiabilidade

Cada webhook deve usar assinatura HMAC ou mecanismo equivalente, `eventId` único, timestamp de recebimento, payload bruto, hash, fornecedor, versão do schema e estado de processamento. A resposta ao provedor deve ser rápida; tarefas como PDF, emails e transcodificação devem ser reprocessáveis.

A operação deve ter uma fila de exceções para percentuais que não somam 100%, menores de idade, conflitos de titularidade, dados fiscais inconsistentes, chargeback, assinatura incompleta, arquivo ausente e payout rejeitado. Nenhuma exceção deve ser “corrigida” silenciosamente por um cenário Make/Zapier.

## 8. Plano de implementação em quatro ciclos

| Ciclo | Prazo indicativo | Entrega | Critério de aceite |
|---|---:|---|---|
| 1. Ledger e contrato | 1–2 semanas | entidades de split, versões, tax packet, template e estados | pedido consegue gerar contrato e registrar composição do valor |
| 2. Checkout e assinatura | 1–2 semanas | Tally webhook, assinatura, checkout, callbacks e idempotência | uma submissão repetida não duplica contrato nem pedido |
| 3. Entrega e royalties | 2–3 semanas | pacote S3, URLs assinadas, statements, reservas e aprovação | pagamento confirmado libera somente arquivos autorizados |
| 4. Escala e distribuição | 2–4 semanas | Connect/marketplace, DistroKid/TuneCore, dashboards e reconciliação | relatório mensal reconcilia bruto, fees, líquido, splits e payouts |

Antes de qualquer produção, executar uma prova controlada com uma faixa própria, um cliente de teste autorizado e valores pequenos. Não usar dados fictícios como se fossem vendas reais, nem conectar contas de terceiros sem autorização expressa.

## 9. Decisões que precisam de aprovação humana

A equipe deve aprovar quem fatura cada tipo de venda; se o parceiro espanhol é prestador, agente, comissionista, coproprietário ou licenciado; se a exploração será feita em nome de pessoa física ou jurídica; a política de reembolso; a base de cálculo dos splits; a moeda de cada statement; o limiar mínimo de payout; a retenção de reserva; e o tratamento de chargebacks.

A implementação deve permanecer **fail-closed** quando faltarem credenciais, assinatura válida, contrato assinado, titularidade comprovada ou confirmação de pagamento. A automação pode ser assíncrona, mas não pode ser autônoma em decisões jurídicas ou fiscais não aprovadas.

## Referências

[1]: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/legislacao/acordos-internacionais/acordos-para-evitar-a-dupla-tributacao/acordos-para-evitar-a-dupla-tributacao "Receita Federal — acordos para evitar dupla tributação"
[2]: https://www.planalto.gov.br/ccivil_03/decreto/1970-1979/d76975.htm "Planalto — Decreto 76.975, Convenção Brasil–Espanha"
[3]: https://stripe.com/connect "Stripe Connect — plataformas e marketplaces"
[4]: https://docs.stripe.com/connect/payouts-connected-accounts "Stripe Docs — payouts para connected accounts"
[5]: https://wise.com/help/articles/2932353/guide-to-brl-transfers "Wise Help — guia de transferências BRL"
[6]: https://help.beatstars.com/hc/en-us/articles/22578119639067-How-Do-I-Connect-My-PayPal-Account-For-Beat-Sales "BeatStars — conectar PayPal para vendas de beats"
[7]: https://tally.so/help/webhooks "Tally — webhooks"
[8]: https://developers.hellosign.com/ "Dropbox Sign API — documentação"
[9]: https://sign.dropbox.com/blog/using-hellosign-api-callbacks "Dropbox Sign — callbacks da API"

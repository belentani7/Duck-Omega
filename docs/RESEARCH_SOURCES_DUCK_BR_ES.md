# Fontes verificadas — expansão Brasil–Espanha do Duck Prod

## Pagamentos e settlement

1. **Stripe Connect** — a plataforma documenta contas conectadas, cobranças de destino, separate charges and transfers, splits, payouts e onboarding/compliance para marketplaces: https://stripe.com/connect
2. **Stripe — payouts para connected accounts** — descreve payout schedules, payouts manuais/instantâneos, moedas de settlement, estados `pending`, `in_transit`, `paid`, `failed`, `canceled` e eventos `payout.created`, `payout.updated`, `payout.paid` e `payout.failed`: https://docs.stripe.com/connect/payouts-connected-accounts
3. **Wise — transferências BRL** — informa transferências para contas pessoais ou empresariais no Brasil, dados de CPF/CNPJ, Pix/TED, prazos indicativos, limites e observações sobre IOF; valores, limites e disponibilidade devem ser confirmados na conta/região no momento da contratação: https://wise.com/help/articles/2932353/guide-to-brl-transfers
4. **BeatStars — PayPal para vendas de beats** — documenta a conexão de uma conta PayPal para receber pagamentos/payouts de vendas de beats e conteúdo: https://help.beatstars.com/hc/en-us/articles/22578119639067-How-Do-I-Connect-My-PayPal-Account-For-Beat-Sales

## Entrada, assinatura e callbacks

5. **Tally — webhooks** — submissão de formulário envia POST JSON; o endpoint deve responder 2XX em até 10 segundos; há assinatura `Tally-Signature`, retries em caso de falha e recomendação de delegar processamento longo a outro serviço: https://tally.so/help/webhooks
6. **Dropbox Sign API** — oferece modo de teste, API de assinatura, templates e limites por plano; requisições de produção juridicamente vinculantes dependem de plano pago: https://developers.hellosign.com/
7. **Dropbox Sign callbacks** — callbacks podem acompanhar o ciclo da assinatura; o evento `signature_request_all_signed` é indicado antes de baixar o documento final, e o endpoint deve responder com 200 e `Hello API Event Received.`: https://sign.dropbox.com/blog/using-hellosign-api-callbacks

## Distribuição e colaboração

8. **DistroKid** — a página consultada documenta extras de distribuição, identificação de gravações e entrega a serviços; a funcionalidade de splits deve ser confirmada no plano e fluxo atual antes de contratar: https://support.distrokid.com/hc/en-us/articles/360013534274-Splitting-Earnings-with-Collaborators

## Tributação e direitos

9. **Receita Federal — acordo Brasil/Espanha** — índice oficial do acordo para evitar dupla tributação e prevenir evasão fiscal em matéria de impostos sobre a renda: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/legislacao/acordos-internacionais/acordos-para-evitar-a-dupla-tributacao/acordos-para-evitar-a-dupla-tributacao
10. **Planalto — Decreto 76.975** — texto promulgador da Convenção Brasil–Espanha: https://www.planalto.gov.br/ccivil_03/decreto/1970-1979/d76975.htm
11. **União Europeia — licensing and selling intellectual property** — explica que licenciamento de PI normalmente remunera o licenciante por royalties percentuais; é orientação geral e não substitui a análise fiscal/local: https://europa.eu/youreurope/business/growing/protecting-intellectual-property/licensing-selling/index_en.htm

## Decisões provisórias

- Usar o Duck Hub como **source of truth** para pedidos, IDs de ativos, versões, contratos, splits, estados, aprovações e trilha de auditoria.
- Tratar Stripe Connect como candidato à orquestração de marketplace/splits quando a entidade e a disponibilidade regional forem confirmadas; Wise como trilho de tesouraria/repatriação, não como registro autoral; PayPal/BeatStars como canal alternativo ou marketplace, não como razão contábil principal.
- Responder rapidamente a webhooks, verificar assinatura, persistir o evento antes de efeitos, aplicar idempotência por `provider + eventId` e mover o trabalho pesado para processamento assíncrono.
- Nenhum contrato, split, classificação fiscal, retenção ou promessa de não bitributação deve ser tratado como definitivo sem validação de advogado e contador habilitados no Brasil e na Espanha.

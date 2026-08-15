import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { storagePut } from "./storage";

export type ContractInput = {
  orderId: number;
  buyerEmail: string;
  beatTitle: string;
  licenseType: "exclusive" | "non_exclusive";
  totalCents: number;
  provider: string;
  createdAt?: Date | string;
};

function brl(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

function wrap(text: string, max = 92) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > max && line) {
      lines.push(line);
      line = word;
    } else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
}

export async function buildContractPdf(input: ContractInput) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const green = rgb(0.05, 0.55, 0.35);
  let y = 790;
  const draw = (text: string, size = 10, font = regular, color = rgb(0.12, 0.15, 0.14)) => {
    page.drawText(text, { x: 48, y, size, font, color });
    y -= size + 8;
  };
  const paragraph = (text: string) => {
    for (const line of wrap(text)) draw(line, 9);
    y -= 4;
  };

  draw("DUCK HUB", 22, bold, green);
  draw("Instrumento de licença de beat — registro operacional", 11, bold);
  draw(`Pedido #${input.orderId}`, 10);
  draw(`Data de emissão: ${new Date(input.createdAt ?? Date.now()).toLocaleDateString("pt-BR")}`, 10);
  y -= 14;

  draw("1. Partes e ativo", 12, bold, green);
  paragraph(`Licenciante operacional: Duck Hub / Duck Prod. Licenciado: ${input.buyerEmail}. Ativo: ${input.beatTitle}. Este documento registra o pedido e a licença selecionada no sistema.`);
  draw("2. Licença selecionada", 12, bold, green);
  paragraph(input.licenseType === "exclusive"
    ? "Licença exclusiva, sujeita à confirmação dos termos definitivos e à verificação de disponibilidade do ativo. Nenhuma cessão adicional é presumida além do que vier a ser formalmente assinado pelas partes."
    : "Licença não exclusiva para o uso do beat conforme os termos comerciais apresentados no catálogo e qualquer contrato definitivo aplicável. A titularidade do ativo não é transferida por este registro operacional.");
  draw("3. Valor e pagamento", 12, bold, green);
  paragraph(`Valor registrado: ${brl(input.totalCents)}. Provedor registrado no pedido: ${input.provider}. A confirmação de pagamento deve ser mantida nos registros do Duck Hub.`);
  draw("4. Entrega e direitos", 12, bold, green);
  paragraph("Arquivos e permissões de uso devem ser entregues somente pelos fluxos autenticados e pelas URLs assinadas do Duck Hub. Direitos autorais, créditos, território, prazo, usos permitidos e restrições devem ser conferidos no contrato definitivo antes de qualquer exploração comercial.");
  draw("5. Natureza do documento", 12, bold, green);
  paragraph("Este PDF é um comprovante operacional gerado automaticamente a partir dos dados do pedido. Não substitui revisão jurídica nem contrato definitivo quando a operação exigir instrumento específico.");
  y -= 18;
  draw("Duck Hub · Protocolo Belentani · Documento gerado automaticamente", 8, regular, rgb(0.35, 0.4, 0.38));
  return Buffer.from(await pdf.save());
}

export async function storeContractPdf(input: ContractInput) {
  const bytes = await buildContractPdf(input);
  return storagePut(`contracts/order-${input.orderId}.pdf`, bytes, "application/pdf");
}

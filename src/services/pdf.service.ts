import PDFDocument from 'pdfkit';
import { worldCupData, Group } from '../data/teams';

export class PdfService {
  /**
   * Generates a PDF document for the specified World Cup year.
   * Returns the PDFDocument stream which can be piped to the response.
   */
  public async generateWorldCupPdf(year: number): Promise<PDFKit.PDFDocument> {
    const data = worldCupData[year];
    if (!data) {
      throw new Error(`Data for World Cup year ${year} not found.`);
    }

    // Initialize document with A4 size and 50pt margins
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      bufferPages: true // Allows multi-pass for page numbers in footer
    });

    // Theme Colors
    const PRIMARY_COLOR = '#1b4332'; // Deep Forest Green
    const SECONDARY_COLOR = '#2d6a4f'; // Medium Green
    const ACCENT_COLOR = '#d4af37'; // Gold
    const LIGHT_BG = '#f4f9f4'; // Light grayish green
    const TEXT_DARK = '#1b1b1b';
    const TEXT_MUTED = '#555555';

    // ==========================================
    // PAGE 1: HEADER & GROUPS A-D
    // ==========================================

    // Draw top dark banner (x: 0, y: 0, width: 595.28 [A4 width], height: 110)
    doc.rect(0, 0, 595.28, 110).fill(PRIMARY_COLOR);

    // Banner Text
    doc.fillColor('#ffffff')
       .font('Helvetica-Bold')
       .fontSize(22)
       .text(`FIFA WORLD CUP ${data.year}`, 50, 30);

    doc.fillColor(ACCENT_COLOR)
       .font('Helvetica-Bold')
       .fontSize(12)
       .text(`OFFICIAL PARTICIPATING TEAMS & GROUPS`, 50, 58);

    doc.fillColor('#ffffff')
       .font('Helvetica')
       .fontSize(9)
       .text(`Host Country: ${data.host}   |   Champion: ${data.champion} (${data.championCode})`, 50, 78);

    // Tournament Details Card (below banner)
    const cardY = 130;
    const cardHeight = 65;
    const cardWidth = 495.28; // 595.28 - 100 (margins)

    doc.roundedRect(50, cardY, cardWidth, cardHeight, 6)
       .fillAndStroke(LIGHT_BG, SECONDARY_COLOR);

    doc.fillColor(PRIMARY_COLOR)
       .font('Helvetica-Bold')
       .fontSize(11)
       .text('TOURNAMENT OVERVIEW', 65, cardY + 12);

    doc.fillColor(TEXT_DARK)
       .font('Helvetica')
       .fontSize(9)
       .text(`• Host Country: ${data.host}`, 65, cardY + 30)
       .text(`• Champion: ${data.champion}`, 65, cardY + 45);

    doc.text(`• Runner-up: ${data.runnerUp} (${data.runnerUpCode})`, 250, cardY + 30)
       .text(`• Number of Teams: 32 Teams`, 250, cardY + 45);

    // Section Title for Groups
    doc.fillColor(PRIMARY_COLOR)
       .font('Helvetica-Bold')
       .fontSize(14)
       .text('GROUPS A - D', 50, 215);

    doc.moveTo(50, 233)
       .lineTo(545.28, 233)
       .strokeColor(SECONDARY_COLOR)
       .lineWidth(1.5)
       .stroke();

    // Draw Groups A to D
    // Column 1 (left): x=50, width=235. Column 2 (right): x=310, width=235.
    const col1X = 50;
    const col2X = 310;
    const colWidth = 235.28;
    const groupHeight = 115;

    // Group A (Col 1, Row 1)
    this.drawGroupBox(doc, data.groups[0], col1X, 250, colWidth, groupHeight, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_DARK);
    // Group B (Col 2, Row 1)
    this.drawGroupBox(doc, data.groups[1], col2X, 250, colWidth, groupHeight, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_DARK);

    // Group C (Col 1, Row 2)
    this.drawGroupBox(doc, data.groups[2], col1X, 385, colWidth, groupHeight, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_DARK);
    // Group D (Col 2, Row 2)
    this.drawGroupBox(doc, data.groups[3], col2X, 385, colWidth, groupHeight, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_DARK);

    // Quick Stats/Footer Info on Page 1
    doc.fillColor(TEXT_MUTED)
       .font('Helvetica-Oblique')
       .fontSize(8.5)
       .text('Note: FIFA Rankings displayed inside group boxes represent the rankings leading up to the tournament.', 50, 740, { width: 495.28 });

    // ==========================================
    // PAGE 2: GROUPS E-H & STATS SUMMARY
    // ==========================================
    doc.addPage();

    // Small Uniform Header for Page 2
    doc.rect(0, 0, 595.28, 60).fill(PRIMARY_COLOR);
    doc.fillColor('#ffffff')
       .font('Helvetica-Bold')
       .fontSize(14)
       .text(`FIFA WORLD CUP ${data.year} - GROUPS E - H`, 50, 22);

    // Section Title
    doc.fillColor(PRIMARY_COLOR)
       .font('Helvetica-Bold')
       .fontSize(14)
       .text('GROUPS E - H', 50, 85);

    doc.moveTo(50, 103)
       .lineTo(545.28, 103)
       .strokeColor(SECONDARY_COLOR)
       .lineWidth(1.5)
       .stroke();

    // Group E (Col 1, Row 1)
    this.drawGroupBox(doc, data.groups[4], col1X, 120, colWidth, groupHeight, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_DARK);
    // Group F (Col 2, Row 1)
    this.drawGroupBox(doc, data.groups[5], col2X, 120, colWidth, groupHeight, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_DARK);

    // Group G (Col 1, Row 2)
    this.drawGroupBox(doc, data.groups[6], col1X, 255, colWidth, groupHeight, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_DARK);
    // Group H (Col 2, Row 2)
    this.drawGroupBox(doc, data.groups[7], col2X, 255, colWidth, groupHeight, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_DARK);

    // Premium Analytics Card on Page 2
    const statsY = 400;
    const statsHeight = 180;
    doc.roundedRect(50, statsY, cardWidth, statsHeight, 8)
       .fillAndStroke(LIGHT_BG, PRIMARY_COLOR);

    doc.fillColor(PRIMARY_COLOR)
       .font('Helvetica-Bold')
       .fontSize(12)
       .text('TECHNICAL & STATISTICAL OVERVIEW', 70, statsY + 15);

    doc.moveTo(70, statsY + 32)
       .lineTo(525.28, statsY + 32)
       .strokeColor(SECONDARY_COLOR)
       .lineWidth(0.8)
       .stroke();

    // Column 1 in Stats
    doc.fillColor(TEXT_DARK)
       .font('Helvetica-Bold')
       .fontSize(9.5)
       .text('Top FIFA Seeded Teams in Tournament:', 70, statsY + 45);

    // Filter top teams (ranking <= 10)
    const topTeams = data.groups
      .flatMap(g => g.teams.map(t => ({ ...t, groupName: g.name })))
      .filter(t => t.ranking !== undefined && t.ranking <= 10)
      .sort((a, b) => (a.ranking || 99) - (b.ranking || 99))
      .slice(0, 5);

    let listY = statsY + 65;
    topTeams.forEach((t) => {
      doc.font('Helvetica')
         .fontSize(9)
         .text(`• FIFA Rank #${t.ranking}: ${t.name} (${t.code}) - ${t.groupName}`, 75, listY);
      listY += 15;
    });

    // Column 2 in Stats (Information/Trivia)
    const col2StatsX = 310;
    doc.font('Helvetica-Bold')
       .fontSize(9.5)
       .text('Tournament Facts:', col2StatsX, statsY + 45);

    doc.font('Helvetica')
       .fontSize(9)
       .text(`• Champion: ${data.champion} (${data.championCode})`, col2StatsX, statsY + 65)
       .text(`• Runner-up: ${data.runnerUp} (${data.runnerUpCode})`, col2StatsX, statsY + 80)
       .text(`• Microservice: Node.js PDF Generator`, col2StatsX, statsY + 95)
       .text(`• Stack: TS + Zod + PDFKit + Express`, col2StatsX, statsY + 110)
       .text(`• Generation Time: ${new Date().toLocaleDateString()}`, col2StatsX, statsY + 125);

    // Decorative footer message
    doc.fillColor(SECONDARY_COLOR)
       .font('Helvetica-Bold')
       .fontSize(10)
       .text('Generated Automatically by PDF Generator Microservice', 50, 715, { align: 'center', width: cardWidth });

    // ==========================================
    // FOOTER (Page Numbers on all pages)
    // ==========================================
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.fillColor(TEXT_MUTED)
         .font('Helvetica')
         .fontSize(8.5)
         .text(
           `Page ${i + 1} of ${range.count}`,
           50,
           755,
           { align: 'right', width: cardWidth }
         );
    }

    return doc;
  }

  /**
   * Helper to draw a clean structured Group box.
   */
  private drawGroupBox(
    doc: PDFKit.PDFDocument,
    group: Group,
    x: number,
    y: number,
    width: number,
    height: number,
    primaryColor: string,
    secondaryColor: string,
    textColor: string
  ): void {
    // White background card, light border
    doc.roundedRect(x, y, width, height, 5)
       .fillAndStroke('#ffffff', '#e2e8f0');

    // Header header background block (draw a path inside the top part of the card)
    doc.rect(x + 0.5, y + 0.5, width - 1, 22).fill(secondaryColor);

    // Group Name Text
    doc.fillColor('#ffffff')
       .font('Helvetica-Bold')
       .fontSize(9.5)
       .text(group.name.toUpperCase(), x, y + 6, { align: 'center', width });

    // List teams
    let currentY = y + 29;
    group.teams.forEach((team, idx) => {
      // FIFA Rank indicator text
      doc.fillColor(secondaryColor)
         .font('Helvetica-Bold')
         .fontSize(8.5)
         .text(`[${team.code}]`, x + 10, currentY + 1);

      // Team name
      doc.fillColor(textColor)
         .font('Helvetica')
         .fontSize(9.5)
         .text(team.name, x + 50, currentY);

      // Rank number on the right
      const rankText = team.ranking ? `Rank #${team.ranking}` : 'N/A';
      doc.fillColor('#718096')
         .font('Helvetica')
         .fontSize(8)
         .text(rankText, x + width - 55, currentY + 1, { align: 'right', width: 45 });

      // Fine separator line
      if (idx < 3) {
        doc.moveTo(x + 8, currentY + 16)
           .lineTo(x + width - 8, currentY + 16)
           .strokeColor('#edf2f7')
           .lineWidth(0.5)
           .stroke();
      }

      currentY += 21;
    });
  }
}

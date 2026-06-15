import { Request, Response, NextFunction } from 'express';
import { PdfService } from '../services/pdf.service';
import { GetPdfQuerySchema } from '../schemas/pdf.schema';

const pdfService = new PdfService();

export class PdfController {
  /**
   * Generates and returns a PDF of World Cup teams for a specific year.
   * Path: GET /api/v1/pdf/world-cup
   */
  public async generateWorldCupPdf(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      // 1. Validate query parameters using Zod
      const parsedQuery = GetPdfQuerySchema.safeParse(req.query);

      if (!parsedQuery.success) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid request query parameters',
          errors: parsedQuery.error.format(),
        });
        return;
      }

      const { year } = parsedQuery.data;

      // 2. Generate PDF stream
      const doc = await pdfService.generateWorldCupPdf(year);

      // 3. Set Headers for PDF viewing in Postman / Browser
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="world-cup-${year}-teams.pdf"`);

      // 4. Pipe document stream directly to the response
      doc.pipe(res);
      
      // 5. Finalize the PDF document
      doc.end();
    } catch (error: unknown) {
      console.error('Error generating PDF:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}

import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';

const router = Router();
const pdfController = new PdfController();

router.get('/world-cup', pdfController.generateWorldCupPdf.bind(pdfController));

export default router;

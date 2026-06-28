import PDFDocument from 'pdfkit';

export class PdfExportStrategy {
  async export(users: any[]) {
    const doc = new PDFDocument();

    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));

    const endPromise = new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    doc.fontSize(18).text('Users Report');

    doc.moveDown();

    users.forEach((user) => {
      doc.fontSize(12).text(`${user.name} | ${user.email} | ${user.role}`);
    });

    doc.end();

    const buffer = await endPromise;

    return {
      fileName: 'users.pdf',
      mimeType: 'application/pdf',
      buffer,
    };
  }
}

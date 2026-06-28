import ExcelJS from 'exceljs';

export class XlsxExportStrategy {
  async export(users: any[]) {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('Users');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 35 },
      { header: 'Role', key: 'role', width: 20 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });

    const buffer = Buffer.from(await workbook.xlsx.writeBuffer());

    return {
      fileName: 'users.xlsx',
      mimeType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      buffer,
    };
  }
}

import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

/* strategies */
import { PdfExportStrategy } from '@modules/users/api/strategies/pdf.strategy';
import { XlsxExportStrategy } from '@modules/users/api/strategies/xlsx.strategy';
import { TxtExportStrategy } from '@modules/users/api/strategies/txt.strategy';
import { CsvExportStrategy } from '@modules/users/api/strategies/csv.strategy';

export class ExportUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(currentUser: any, format: string) {
    const users = await this.usersRepository.findAll(currentUser);

    const strategy = this.getStrategy(format);

    return strategy.export(users);
  }

  private getStrategy(format: string) {
    switch (format) {
      case 'pdf':
        return new PdfExportStrategy();

      case 'xlsx':
        return new XlsxExportStrategy();

      case 'csv':
        return new CsvExportStrategy();

      case 'txt':
        return new TxtExportStrategy();

      default:
        throw new Error('INVALID_FORMAT');
    }
  }
}

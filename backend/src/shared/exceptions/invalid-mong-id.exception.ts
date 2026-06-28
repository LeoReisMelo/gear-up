import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidMongoId extends UnprocessableEntityException {
  constructor(message = 'Invalid mongo id') {
    super(message);
    this.name = 'InvalidMongoId';
  }
}

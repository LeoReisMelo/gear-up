import { PipeTransform } from '@nestjs/common';
import { InvalidMongoId } from '@shared/exceptions/invalid-mong-id.exception';
import { isValidObjectId } from 'mongoose';

export class ValidateMongoId implements PipeTransform<string> {
  transform(id: string) {
    if (isValidObjectId(id)) {
      return id;
    } else {
      throw new InvalidMongoId();
    }
  }
}

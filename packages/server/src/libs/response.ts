import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  public constructor(status: ResponseStatusType, message: string, data: T) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
  }

  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }
}

const ResponseStatus = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  FAIL: 'FAIL',
};

type ResponseStatusType = typeof ResponseStatus[keyof typeof ResponseStatus];

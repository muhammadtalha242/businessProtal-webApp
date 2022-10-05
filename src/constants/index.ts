export const VERIFY_ACCOUNT_CODE_LENGTH = 6;
export const MAX_MOBILE_NUMBER_LENGTH = 12;
export const DATE_FROMATE_FILTERS_OPS = 'DD.MM.YYYY';

interface IDataTypeMapper {
  [key: string]: string;
}

export const DATA_TYPES_MAPPER: IDataTypeMapper = {
  Email: 'string',
  Duration: 'string',
  Link: 'string',
  Location: 'string',
  Document: 'string',
  Image: 'string',
  Section: 'string',
  'Text Single Line': 'string',
  'Text Multi Line': 'string',
  'Auto Number': 'number',
  Currency: 'number',
  Progress: 'number',
  Number: 'number',
};



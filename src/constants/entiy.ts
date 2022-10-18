import { IOptionType } from '../components/common/select';

export const DATA_TYPES = {
  AUTO_NUMBER: 'Auto Number',
  EMAIL: 'Email',
  CURRENCY: 'Currency',
  PHONE: 'Phone',
  PROGRESS: 'Progress',
  DURATION: 'Duration',
  LINK: 'Link',
  DATE: 'Date',
  LOCATION: 'Location',
  DOCUMENT: 'Document',
  IMAGE: 'Image',
  SECTION: 'Section',
  NUMBER: 'Number',
  TEXT_SINGLE_LINE: 'Text Single Line',
  TEXT_MULTI_LINE: 'Text Multi Line',
  YES_NO: 'Yes/No',
};

export interface IDatatypeFieldSettings {
  [key: string]: IDatatypeFieldType;
}
export interface IDatatypeField {
  name: string;
  placeholder?: string;
  label: string;
  type?: string;
  defaultValue?: string;
}

export interface IDatatypeFieldType {
  defaultCheckBoxes: IDatatypeField[];
  checkbox?: IDatatypeField[];
  input?: IDatatypeField[];
  select?: IDatatypeField[];
  isDisplayForRecords: boolean;
  isDefaultFieldVisible: boolean;
  defaultDataType: string;
}

export const DATA_TYPES_OPTIONS: IOptionType[] = [
  { value: DATA_TYPES.AUTO_NUMBER, label: 'Auto Number' },
  { value: DATA_TYPES.EMAIL, label: 'Email' },
  { value: DATA_TYPES.CURRENCY, label: 'Currency' },
  { value: DATA_TYPES.PHONE, label: 'Phone' },
  { value: DATA_TYPES.PROGRESS, label: 'Progress' },
  { value: DATA_TYPES.DURATION, label: 'Duration' },
  { value: DATA_TYPES.LINK, label: 'Link' },
  { value: DATA_TYPES.DATE, label: 'Date' },
  { value: DATA_TYPES.LOCATION, label: 'Location' },
  { value: DATA_TYPES.DOCUMENT, label: 'Document' },
  { value: DATA_TYPES.IMAGE, label: 'Image' },
  { value: DATA_TYPES.SECTION, label: 'Section' },
  { value: DATA_TYPES.NUMBER, label: 'Number' },
  { value: DATA_TYPES.TEXT_SINGLE_LINE, label: 'Text Single Line' },
  { value: DATA_TYPES.TEXT_MULTI_LINE, label: 'Text Multi Line' },
  { value: DATA_TYPES.YES_NO, label: 'Yes/No' },
];

export const DEFAULT_CHECKBOX_FIELDS = [
  { name: 'isRequired', label: 'Required' },
  { name: 'isUnique', label: 'Unique' },
  { name: 'isComment', label: 'Comment' },
  { name: 'isPublic', label: 'Public' },
];

export const DATA_FIELD_SETTINGS: IDatatypeFieldSettings = {
  [DATA_TYPES.AUTO_NUMBER]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isRegenerate', label: 'Regenerate' }],
    input: [
      { name: 'prefix', label: 'Prefix' },
      { name: 'digits', label: 'Digits', type: 'number' },
    ],
    select: [{ name: 'prefixCol', label: 'Column' }],
    isDisplayForRecords: false,
    isDefaultFieldVisible: false,
    defaultDataType: '',
  },
  [DATA_TYPES.CURRENCY]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [
      { name: 'prefix', label: 'Prefix' },
      { name: 'decimals', label: 'Decimals', type: 'number' },
    ],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'number',
  },
  [DATA_TYPES.PHONE]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'format', label: 'Format' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'number',
  },
  [DATA_TYPES.TEXT_SINGLE_LINE]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'fieldLength', label: 'Field Length' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  [DATA_TYPES.TEXT_MULTI_LINE]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'fieldLength', label: 'Field Length' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  [DATA_TYPES.NUMBER]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [
      { name: 'prefix', label: 'Prefix' },
      { name: 'decimals', label: 'Decimals', type: 'number' },
    ],
    checkbox: [{ name: 'isDisplayPercetage', label: 'Display %' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'number',
  },
  [DATA_TYPES.EMAIL]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  [DATA_TYPES.PROGRESS]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    isDisplayForRecords: true,
    isDefaultFieldVisible: false,
    defaultDataType: '',
  },
  [DATA_TYPES.LINK]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  [DATA_TYPES.DATE]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isTime', label: 'Time' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'date',
  },
  [DATA_TYPES.LOCATION]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isShowMap', label: 'Show map' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  [DATA_TYPES.DOCUMENT]: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  [DATA_TYPES.IMAGE]: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  [DATA_TYPES.SECTION]: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
    isDisplayForRecords: false,
    isDefaultFieldVisible: false,
    defaultDataType: '',
  },
  [DATA_TYPES.YES_NO]: {
    defaultCheckBoxes: [
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
    select: [{ name: 'Yes/No', label: 'Yes/No' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: false,
    defaultDataType: 'select',
  },
  [DATA_TYPES.DURATION]: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [
      { name: 'isDays', label: 'Display Day' },
      { name: 'isHours', label: 'Display Hours' },
      { name: 'isMints', label: 'Display minutes' },
      { name: 'isSeconds', label: 'Display seconds' },
    ],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
};

import { IOptionType } from '../components/common/select';

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

export const DATA_TYPES: IOptionType[] = [
  { value: 'Auto Number', label: 'Auto Number' },
  { value: 'Email', label: 'Email' },
  { value: 'Currency', label: 'Currency' },
  { value: 'Phone', label: 'Phone' },
  { value: 'Progress', label: 'Progress' },
  { value: 'Duration', label: 'Duration' },
  { value: 'Link', label: 'Link' },
  { value: 'Date', label: 'Date' },
  { value: 'Location', label: 'Location' },
  { value: 'Document', label: 'Document' },
  { value: 'Image', label: 'Image' },
  { value: 'Section', label: 'Section' },
  { value: 'Number', label: 'Number' },
  { value: 'Text Single Line', label: 'Text Single Line' },
  { value: 'Text Multi Line', label: 'Text Multi Line' },
  { value: 'Yes/No', label: 'Yes/No' },
];

export const DEFAULT_CHECKBOX_FIELDS = [
  { name: 'isRequired', label: 'Required' },
  { name: 'isUnique', label: 'Unique' },
  { name: 'isComment', label: 'Comment' },
  { name: 'isPublic', label: 'Public' },
];

export const DATA_FIELD_SETTINGS: IDatatypeFieldSettings = {
  'Auto Number': {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isRegenerate', label: 'Regenerate' }],
    input: [
      { name: 'prefix', label: 'Prefix' },
      { name: 'digits', label: 'Digits', type: 'number' },
    ],
    select: [{ name: 'prefixCol', label: 'Column' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: false,
    defaultDataType: '',
  },
  Currency: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [
      { name: 'prefix', label: 'Prefix' },
      { name: 'decimals', label: 'Decimals', type: 'number' },
    ],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'number',
  },
  Phone: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'format', label: 'Format' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'number',
  },
  'Text Single Line': {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'fieldLength', label: 'Field Length' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  'Text Multi Line': {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'fieldLength', label: 'Field Length' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  Number: {
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
  Email: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  Progress: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    isDisplayForRecords: true,
    isDefaultFieldVisible: false,
    defaultDataType: '',
  },
  Link: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  Date: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isTime', label: 'Time' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'date',
  },
  Location: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isShowMap', label: 'Show map' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  Document: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  Image: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
    isDisplayForRecords: true,
    isDefaultFieldVisible: true,
    defaultDataType: 'string',
  },
  Section: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
    isDisplayForRecords: true,
    isDefaultFieldVisible: false,
    defaultDataType: '',
  },
  'Yes/No': {
    defaultCheckBoxes: [
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
    select: [{ name: 'Yes/No', label: 'Yes/No' }],
    isDisplayForRecords: true,
    isDefaultFieldVisible: false,
    defaultDataType: 'select',
  },
  Duration: {
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

export interface INPUT_PROPS_COMMON {
  label?: React.ReactNode | string;
  disabled?: boolean;
  value?: any;
  setValue?: Function;
  placeholder?: string;
  name?: string;
  linkLabel?: string;
  link?: string;
  deactiveIcon?: string;
  activeIcon?: string;
  icon?: string;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
  iconWidth?: number;
  inputWidth?: number;
  iconLeft?: number;
  bordered?: boolean;
  height?: number;
  padding?: string;
  defaultValue?: string;
  status?: '' | 'error' | 'warning';
  showCount?: boolean;
  maxLength?: number;
  inputFieldContainerProps?: IInputFieldProps;
}

export interface IInputFieldProps {
  marginBottom?: number | undefined;
  iconWidth?: number | undefined;
  inputWidth?: number | undefined;
  iconLeft?: number | undefined;
  bordered?: boolean | undefined;
  height?: number | undefined;
  padding?: string | undefined;
}

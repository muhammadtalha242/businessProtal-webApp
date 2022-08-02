import React from 'react';
import styled from 'styled-components';
import { GREEN_PRIMARY, RED_PRIMARY, WHITE } from '../../styles/colors';
import { OutlinedButton, FilledButton } from './button';

interface Props {
  onSave?: (e: any) => any | undefined;
  onCancel?: (e: any) => any | undefined;
  saving?: boolean;
  formButtonsStyleProps?: IFormButtonsStyleProps;
  leftButtonText?: string;
  rightButtonText?: string;
}

interface IFormButtonsStyleProps {
  padding?: string | undefined;
}

const Footer = styled.div<IFormButtonsStyleProps>`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => (props.padding || props.padding === '0' ? props.padding : '16px 0px')}; ;
`;

const FormActions: React.FC<Props> = (props) => {
  return (
    <Footer {...props.formButtonsStyleProps}>
      <div className="footer-left">
        <OutlinedButton color={RED_PRIMARY} onClick={props.onCancel}>
          {props.leftButtonText && props.leftButtonText !== '' ? props.leftButtonText : 'Cancel'}
        </OutlinedButton>
      </div>
      <div className="footer-right">
        <FilledButton background={GREEN_PRIMARY} onClick={props.onSave} color={WHITE} loading={props.saving}>
          Save
        </FilledButton>
      </div>
    </Footer>
  );
};

export default FormActions;

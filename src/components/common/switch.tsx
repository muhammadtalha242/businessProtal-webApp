import React from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';

import { GREEN_PRIMARY } from '../../styles/colors';

interface Props {
  text?: string;
  mode?: boolean;
  setMode?: (mode: boolean) => void;
  marginTop?: number;
  textMarginLeft?: number;
  styles?: { [key: string]: number | string };
  textLeft?: string;
  textColorRight?: string;
  loading?: boolean;
  offTextMarginLeft?: number;
  disabled?: boolean;
}

interface ISwitchStyleProps {
  marginTop?: number;
  textMarginLeft?: number;
  textColorRight?: string;
  offTextMarginLeft?: number;
}

const SwitchContainer = styled.div<ISwitchStyleProps>`
  display: flex;
  margin-top: ${(props) => (props.marginTop || props.marginTop === 0 ? props.marginTop : 9)}px;
  align-items: center;

  .left-col {
    margin-left: ${(props) => (props.offTextMarginLeft || props.offTextMarginLeft === 0 ? props.offTextMarginLeft : 44)}px;

    .left-text {
      color: ${GREEN_PRIMARY};
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      padding-right: 4px;
    }
  }

  .right-col {
    .right-text {
      color: ${(props) => props.textColorRight || GREEN_PRIMARY};
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      padding-right: 4px;
      padding-left: 4px;
      margin-left: ${(props) => (props.textMarginLeft || props.textMarginLeft === 0 ? props.textMarginLeft : 60)}px;
    }
  }
`;

const ControlSwitch = styled(Switch)``;

const SwitchController: React.FC<Props> = (props) => {
  const { text, styles, mode, setMode, textLeft } = props;

  return (
    <SwitchContainer marginTop={props.marginTop} textMarginLeft={props.textMarginLeft} textColorRight={props.textColorRight} offTextMarginLeft={props.offTextMarginLeft}>
      {textLeft && (
        <div className="left-col">
          <div className="left-text">{textLeft}</div>
        </div>
      )}
      <div className="right-col">
        <ControlSwitch checked={mode} onChange={setMode} size="small" loading={props.loading} disabled={props.disabled} />
        <div style={styles} className="right-text">
          {text}
        </div>
      </div>
    </SwitchContainer>
  );
};

export default SwitchController;

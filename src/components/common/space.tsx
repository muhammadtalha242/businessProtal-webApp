import styled from 'styled-components';

interface VerticalSpaceProps {
  height: number;
}

interface HorizontalSpaceProps {
  width: number;
}

export const VerticalSpace = styled.div<VerticalSpaceProps>`
  height: ${(props) => props.height}px;
`;

export const HorizontalSpace = styled.div<HorizontalSpaceProps>`
  width: ${(props) => props.width}px;
`;

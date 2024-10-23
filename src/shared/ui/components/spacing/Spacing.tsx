import { FunctionComponent } from 'react';

interface Props {
    size: number;
}

export const Spacing: FunctionComponent<Props> = ({ size }) => <div style={{ height: `${size}px` }} />;

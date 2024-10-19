import { FunctionComponent } from 'react';

interface Props {
    size: number;
}

const Spacing: FunctionComponent<Props> = ({ size }) => <div style={{ height: `${size}px` }} />;

export default Spacing;

import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './OrdinaryLayout.module.scss';

const OrdinaryLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default OrdinaryLayout;

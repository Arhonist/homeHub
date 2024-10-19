import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<unknown> {
    children: ReactNode;
}

const Button: FunctionComponent<Props> = ({ children, ...props }) => (
    <button className={styles.button} {...props}>
        {children}
    </button>
);

export default Button;

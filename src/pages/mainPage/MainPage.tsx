import { FunctionComponent } from 'react';
import styles from './MainPage.module.scss';
import SerialMonitor from '../../widgets/serialMonitor/SerialMonitor.tsx';

const MainPage: FunctionComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <SerialMonitor />
            </div>
        </div>
    );
};

export default MainPage;

import { FunctionComponent, useState } from 'react';
import { Measurement } from '@/entities/measurement';
import styles from './Co2MeasurementsDiagram.module.scss';
import { MeasurementBar } from '@/widgets/co2MeasurementsDiagram/ui/components/measurementBar/MeasurementBar.tsx';
import Button from '@/shared/ui/button/Button.tsx';

interface Props {
    measurements?: Measurement[];
}

export const Co2MeasurementsDiagram: FunctionComponent<Props> = ({ measurements }) => {
    const [divider, setDivider] = useState(1);
    const showAll = () => setDivider(1);
    const showSixth = () => setDivider(6);

    if (!measurements) {
        return null;
    }

    measurements = measurements.filter((_dummy, index) => index % divider === 0);

    return (
        <>
            <div className={styles.controlsRow}>
                {divider === 6 ? (
                    <Button onClick={showAll}>Показывать все</Button>
                ) : (
                    <Button onClick={showSixth}>Показывать меньше</Button>
                )}
            </div>
            <div className={styles.wrapper}>
                {measurements.map((measurement) => (
                    <MeasurementBar key={measurement.date} measurement={measurement} />
                ))}
            </div>
        </>
    );
};

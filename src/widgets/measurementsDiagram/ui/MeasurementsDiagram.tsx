import { FunctionComponent, useState } from 'react';
import { Measurement } from '@/entities/measurement';
import { MeasurementBar } from '@/widgets/measurementsDiagram/ui/components/measurementBar/MeasurementBar.tsx';
import { Button, Spacing } from '@/shared/ui/components';
import { MeasurementMode } from '../model/types/types.ts';
import styles from './MeasurementsDiagram.module.scss';
import clsx from 'clsx';

interface Props {
    measurements?: Measurement[];
}

export const MeasurementsDiagram: FunctionComponent<Props> = ({ measurements }) => {
    const [mode, setMode] = useState<MeasurementMode>('co2PPMValue');

    const [divider, setDivider] = useState(1);
    const showAll = () => setDivider(1);
    const showSixth = () => setDivider(6);

    const setCO2Mode = () => setMode('co2PPMValue');
    const setTemperatureMode = () => setMode('temperature');
    const setHumidityMode = () => setMode('humidity');

    if (!measurements) {
        return null;
    }

    measurements = measurements.filter((_dummy, index) => index % divider === 0);

    return (
        <>
            <div className={styles.controlsRow}>
                <div className={styles.controlsRow}>
                    <span
                        onClick={setCO2Mode}
                        className={clsx(styles.tab, { [styles.activeMode]: mode === 'co2PPMValue' })}
                    >
                        CO2
                    </span>
                    <span
                        className={clsx(styles.tab, { [styles.activeMode]: mode === 'temperature' })}
                        onClick={setTemperatureMode}
                    >
                        Температура
                    </span>
                    <span
                        className={clsx(styles.tab, { [styles.activeMode]: mode === 'humidity' })}
                        onClick={setHumidityMode}
                    >
                        Влажность
                    </span>
                </div>

                {divider === 6 ? (
                    <Button onClick={showAll}>Показывать все</Button>
                ) : (
                    <Button onClick={showSixth}>Показывать меньше</Button>
                )}
            </div>

            <Spacing size={12} />

            <div className={styles.wrapper}>
                {measurements.map((measurement, index) => (
                    <MeasurementBar key={measurement.date} measurement={measurement} mode={mode} index={index} />
                ))}
            </div>
        </>
    );
};

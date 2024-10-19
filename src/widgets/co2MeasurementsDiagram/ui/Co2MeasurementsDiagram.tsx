import { FunctionComponent } from 'react';
import { Co2Measurement } from '@/entities/co2Measurement';
import styles from './Co2MeasurementsDiagram.module.scss';
import { MeasurementBar } from '@/widgets/co2MeasurementsDiagram/ui/components/measurementBar/MeasurementBar.tsx';

interface Props {
    measurements: Co2Measurement[];
}

export const Co2MeasurementsDiagram: FunctionComponent<Props> = ({ measurements }) => {
    return (
        <div className={styles.wrapper}>
            {measurements.map((measurement) => (
                <MeasurementBar key={measurement.date} measurement={measurement} />
            ))}
        </div>
    );
};

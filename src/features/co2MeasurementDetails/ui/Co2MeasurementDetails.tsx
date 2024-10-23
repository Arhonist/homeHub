import { FunctionComponent } from 'react';
import { Measurement } from '@/entities/measurement';
import { colorByMeasurementQuality } from '@/shared/const/ColorByMeasurementQuality.ts';
import styles from './Co2MeasurementDetails.module.scss';
import { getMeasurementQuality } from '@/shared/lib/getMeasurementQuality/getMeasurementQuality.ts';

interface Props {
    measurement?: Measurement;
}

export const Co2MeasurementDetails: FunctionComponent<Props> = ({ measurement }) => {
    if (!measurement) {
        return null;
    }

    const { co2PPMValue, temperature, humidity } = measurement;

    const { co2Quality, temperatureQuality, humidityQuality } = getMeasurementQuality(measurement);
    const co2FontColor = colorByMeasurementQuality[co2Quality];
    const temperatureFontColor = colorByMeasurementQuality[temperatureQuality];
    const humidityFontColor = colorByMeasurementQuality[humidityQuality];

    return (
        <div className={styles.wrapper}>
            <span className={styles.result} style={{ color: co2FontColor }}>
                {co2PPMValue} ppm
            </span>

            <div className={styles.temperatureColumn}>
                <span style={{ color: temperatureFontColor }}>{temperature} °C</span>

                <div className={styles.horizontalDivider} />

                <span style={{ color: humidityFontColor }}>{humidity} %</span>
            </div>
        </div>
    );
};

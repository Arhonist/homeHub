import { FunctionComponent } from 'react';
import { Measurement } from '@/entities/measurement';
import { co2ColorByLevel } from '@/shared/const/Co2ColorByLevel.ts';
import styles from './Co2MeasurementDetails.module.scss';
import { getMeasurementQuality } from '@/shared/lib/getFontColorByCo2Level/getCo2QualityByValue.ts';

interface Props {
    measurement?: Measurement;
}

export const Co2MeasurementDetails: FunctionComponent<Props> = ({ measurement }) => {
    if (!measurement) {
        return null;
    }

    const { co2PPMValue, temperature, humidity } = measurement;

    const {
        co2PPMValue: co2Quality,
        temperature: temperatureQuality,
        humidity: humidityQuality
    } = getMeasurementQuality(measurement);
    const co2FontColor = co2ColorByLevel[co2Quality];
    const temperatureFontColor = co2ColorByLevel[temperatureQuality];
    const humidityFontColor = co2ColorByLevel[humidityQuality];

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

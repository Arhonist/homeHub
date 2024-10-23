import { FunctionComponent } from 'react';
import { Measurement } from '@/entities/measurement';
import styles from './MeasurementBar.module.scss';
import { colorByMeasurementQuality } from '@/shared/const/ColorByMeasurementQuality.ts';
import { getMeasurementQuality } from '@/shared/lib/getMeasurementQuality/getMeasurementQuality.ts';
import dayjs from 'dayjs';
import DateTimeFormat from '@/shared/enum/DateTimeFormat.ts';
import { Optional } from '@/shared/ui/components';

const FULL_BAR_HEIGHT = 200;
const MAX_SENSOR_SENSIBILITY = 5000;

interface Props {
    measurement: Measurement;
    index: number;
}

export const MeasurementBar: FunctionComponent<Props> = ({ measurement, index }) => {
    const { co2PPMValue, temperature, humidity, date } = measurement;

    const { co2Quality, temperatureQuality, humidityQuality } = getMeasurementQuality(measurement);
    const co2Color = colorByMeasurementQuality[co2Quality];
    const temperatureColor = colorByMeasurementQuality[temperatureQuality];
    const humidityColor = colorByMeasurementQuality[humidityQuality];
    const time = dayjs(date).format(DateTimeFormat.HOUR_MINUTE_24H);

    return (
        <div className={styles.fullBar}>
            <div
                className={styles.filament}
                style={{
                    height: `${FULL_BAR_HEIGHT * ((co2PPMValue * 2.5) / MAX_SENSOR_SENSIBILITY)}px`,
                    borderTop: `1px solid ${co2Color}`
                }}
            />
            <Optional visible={index % 14 === 0}>
                <span className={styles.co2PPMValue} style={{ color: co2Color }}>
                    {co2PPMValue}
                </span>

                <span className={styles.temperature} style={{ color: temperatureColor }}>
                    {temperature}
                </span>

                <span className={styles.humidity} style={{ color: humidityColor }}>
                    {humidity}
                </span>

                <span className={styles.time}>{time}</span>
            </Optional>
        </div>
    );
};

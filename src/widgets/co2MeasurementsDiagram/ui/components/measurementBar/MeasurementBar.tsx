import { FunctionComponent } from 'react';
import { Measurement } from '@/entities/measurement';
import styles from './MeasurementBar.module.scss';
import { co2ColorByLevel } from '@/shared/const/Co2ColorByLevel.ts';
import { getMeasurementQuality } from '@/shared/lib/getFontColorByCo2Level/getCo2QualityByValue.ts';
import dayjs from 'dayjs';
import DateTimeFormat from '@/shared/enum/DateTimeFormat.ts';

const FULL_BAR_HEIGHT = 200;
const MAX_SENSOR_SENSIBILITY = 5000;

interface Props {
    measurement: Measurement;
}

export const MeasurementBar: FunctionComponent<Props> = ({ measurement }) => {
    const { co2PPMValue, date } = measurement;

    const { co2PPMValue: co2MeasurementQuality } = getMeasurementQuality(measurement);
    const backgroundColor = co2ColorByLevel[co2MeasurementQuality];
    const time = dayjs(date).format(DateTimeFormat.HOUR_MINUTE_24H);

    return (
        <div className={styles.fullBar}>
            <div
                className={styles.filament}
                style={{
                    height: `${FULL_BAR_HEIGHT * ((co2PPMValue * 2.5) / MAX_SENSOR_SENSIBILITY)}px`,
                    background: backgroundColor
                }}
            />
            <span className={styles.ppmValue}>{co2PPMValue}</span>
            <span className={styles.time}>{time}</span>
        </div>
    );
};

import { FunctionComponent } from 'react';
import { Co2Measurement } from '@/entities/co2Measurement';
import styles from './MeasurementBar.module.scss';
import { co2ColorByLevel } from '@/shared/const/Co2ColorByLevel.ts';
import { getCo2LevelByPpmValue } from '@/shared/lib/getFontColorByCo2Level/getCo2LevelByPpmValue.ts';
import dayjs from 'dayjs';
import DateTimeFormat from '@/shared/enum/DateTimeFormat.ts';

const FULL_BAR_HEIGHT = 200;
const MAX_SENSOR_SENSIBILITY = 5000;

interface Props {
    measurement: Co2Measurement;
}

export const MeasurementBar: FunctionComponent<Props> = ({ measurement }) => {
    const { ppmValue, date } = measurement;

    const backgroundColor = co2ColorByLevel[getCo2LevelByPpmValue(ppmValue)];
    const time = dayjs(date).format(DateTimeFormat.HOUR_MINUTE_24H);

    return (
        <div className={styles.fullBar}>
            <div
                className={styles.filament}
                style={{
                    height: `${FULL_BAR_HEIGHT * ((ppmValue * 2.5) / MAX_SENSOR_SENSIBILITY)}px`,
                    background: backgroundColor
                }}
            />
            <span className={styles.ppmValue}>{ppmValue}</span>
            <span className={styles.time}>{time}</span>
        </div>
    );
};

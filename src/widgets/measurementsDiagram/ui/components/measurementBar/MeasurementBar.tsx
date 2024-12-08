import { FunctionComponent } from 'react';
import { Measurement } from '@/entities/measurement';
import styles from './MeasurementBar.module.scss';
import { colorByMeasurementQuality } from '@/shared/const/ColorByMeasurementQuality.ts';
import { getMeasurementQuality } from '@/shared/lib/getMeasurementQuality/getMeasurementQuality.ts';
import dayjs from 'dayjs';
import DateTimeFormat from '@/shared/enum/DateTimeFormat.ts';
import { Optional } from '@/shared/ui/components';
import { MeasurementMode } from '../../../model/types/types.ts';

// Keep synchronized with --full-bar-height in styles
const FULL_BAR_HEIGHT = 200;

// What's considered the maximum for the graph calculation for each mode
const maxValueByMode: Record<MeasurementMode, number> = {
    co2PPMValue: 3000,
    temperature: 32,
    humidity: 100
};

interface Props {
    measurement: Measurement;
    mode: MeasurementMode;
    index: number;
}

export const MeasurementBar: FunctionComponent<Props> = ({ measurement, mode, index }) => {
    const { date } = measurement;

    const { co2Quality, temperatureQuality, humidityQuality } = getMeasurementQuality(measurement);

    const co2Color = colorByMeasurementQuality[co2Quality];
    const temperatureColor = colorByMeasurementQuality[temperatureQuality];
    const humidityColor = colorByMeasurementQuality[humidityQuality];

    const dayJsDate = dayjs(date);
    const time = dayJsDate.format(DateTimeFormat.HOUR_MINUTE_24H);

    const colorByMode: Record<MeasurementMode, string> = {
        co2PPMValue: co2Color,
        temperature: temperatureColor,
        humidity: humidityColor
    };

    const valueToDisplay = measurement[mode];
    const maxValue = maxValueByMode[mode];
    const graphColor = colorByMode[mode];

    return (
        <div className={styles.fullBar}>
            <div
                className={styles.filament}
                style={{
                    height: `${FULL_BAR_HEIGHT * (valueToDisplay / maxValue)}px`,
                    borderTop: `1px solid ${graphColor}`
                }}
            />

            <Optional visible={index % 14 === 0}>
                <span className={styles.time}>{time}</span>

                <span className={styles.co2PPMValue} style={{ color: graphColor }}>
                    {valueToDisplay}
                </span>
            </Optional>
        </div>
    );
};

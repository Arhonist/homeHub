import { FunctionComponent } from 'react';
import { Measurement } from '@/entities/measurement';
import { getCo2LevelByPpmValue } from '@/shared/lib/getFontColorByCo2Level/getCo2LevelByPpmValue.ts';
import { co2ColorByLevel } from '@/shared/const/Co2ColorByLevel.ts';
import styles from './Co2MeasurementDetails.module.scss';

interface Props {
    measurement?: Measurement;
}

export const Co2MeasurementDetails: FunctionComponent<Props> = ({ measurement }) => {
    if (!measurement) {
        return null;
    }

    const { co2PPMValue } = measurement;

    const fontColor = co2ColorByLevel[getCo2LevelByPpmValue(co2PPMValue)];

    return (
        <span className={styles.result} style={{ color: fontColor }}>
            {co2PPMValue} ppm
        </span>
    );
};

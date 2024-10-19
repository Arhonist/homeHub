import { FunctionComponent } from 'react';
import { Co2Measurement } from '@/entities/co2Measurement';
import { getCo2LevelByPpmValue } from '@/shared/lib/getFontColorByCo2Level/getCo2LevelByPpmValue.ts';
import { co2ColorByLevel } from '@/shared/const/Co2ColorByLevel.ts';
import styles from './Co2MeasurementDetails.module.scss';

interface Props {
    measurement?: Co2Measurement;
}

export const Co2MeasurementDetails: FunctionComponent<Props> = ({ measurement }) => {
    if (!measurement) {
        return null;
    }

    const { ppmValue } = measurement;

    const fontColor = co2ColorByLevel[getCo2LevelByPpmValue(ppmValue)];

    return (
        <span className={styles.result} style={{ color: fontColor }}>
            {ppmValue} ppm
        </span>
    );
};

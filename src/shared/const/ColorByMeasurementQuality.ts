import { MeasurementQuality } from '@/shared/enum/MeasurementQuality.ts';

export const colorByMeasurementQuality: Record<MeasurementQuality, string> = {
    [MeasurementQuality.EXCELLENT]: '#00ff04',
    [MeasurementQuality.GOOD]: '#75ab2b',
    [MeasurementQuality.MEDIOCRE]: '#e3980e',
    [MeasurementQuality.BAD]: '#ed3107',
    [MeasurementQuality.TERRIBLE]: '#5e0909'
};

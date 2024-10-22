import { MeasurementQuality } from '@/shared/enum/MeasurementQuality.ts';
import { Measurement } from '@/entities/measurement';

const getCo2QualityByValue = (ppmValue: number): MeasurementQuality => {
    if (ppmValue < 600) {
        return MeasurementQuality.EXCELLENT;
    }
    if (ppmValue < 800) {
        return MeasurementQuality.GOOD;
    }
    if (ppmValue < 1000) {
        return MeasurementQuality.MEDIOCRE;
    }
    if (ppmValue < 1400) {
        return MeasurementQuality.BAD;
    }
    return MeasurementQuality.TERRIBLE;
};

const getTemperatureQualityByValue = (temperature: number): MeasurementQuality => {
    if (temperature < 20 || temperature > 27) {
        return MeasurementQuality.TERRIBLE;
    }

    if (temperature >= 20 && temperature <= 22) {
        return MeasurementQuality.MEDIOCRE;
    }

    if (temperature > 22 && temperature < 25) {
        return MeasurementQuality.EXCELLENT;
    }

    return MeasurementQuality.MEDIOCRE;
};

const getHumidityQualityByValue = (humidity: number): MeasurementQuality => {
    if (humidity < 20 || humidity > 70) {
        return MeasurementQuality.TERRIBLE;
    }

    if (humidity < 30 || humidity > 60) {
        return MeasurementQuality.BAD;
    }

    if (humidity < 40) {
        return MeasurementQuality.MEDIOCRE;
    }

    return MeasurementQuality.EXCELLENT;
};

export const getMeasurementQuality = ({
    co2PPMValue,
    temperature,
    humidity
}: Measurement): Record<keyof Omit<Measurement, 'date'>, MeasurementQuality> => ({
    co2PPMValue: getCo2QualityByValue(co2PPMValue),
    temperature: getTemperatureQualityByValue(temperature),
    humidity: getHumidityQualityByValue(humidity)
});

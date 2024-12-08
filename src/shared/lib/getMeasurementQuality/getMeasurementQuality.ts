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
    if (temperature < 21 || temperature > 27) {
        return MeasurementQuality.TERRIBLE;
    }

    if ((temperature >= 21 && temperature < 23) || (temperature > 26 && temperature <= 27)) {
        return MeasurementQuality.MEDIOCRE;
    }

    return MeasurementQuality.EXCELLENT;
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

export const getMeasurementQuality = ({ co2PPMValue, temperature, humidity }: Measurement) => ({
    co2Quality: getCo2QualityByValue(co2PPMValue),
    temperatureQuality: getTemperatureQualityByValue(temperature),
    humidityQuality: getHumidityQualityByValue(humidity)
});

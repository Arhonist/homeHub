import { Co2Level } from '@/shared/enum/Co2Level.ts';

export const getCo2LevelByPpmValue = (ppmValue: number): Co2Level => {
    if (ppmValue < 600) {
        return Co2Level.EXCELLENT;
    }
    if (ppmValue < 800) {
        return Co2Level.GOOD;
    }
    if (ppmValue < 1000) {
        return Co2Level.MEDIOCRE;
    }
    if (ppmValue < 1400) {
        return Co2Level.BAD;
    }
    return Co2Level.TERRIBLE;
};

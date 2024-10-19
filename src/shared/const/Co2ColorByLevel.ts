import { Co2Level } from '@/shared/enum/Co2Level.ts';

export const co2ColorByLevel: Record<Co2Level, string> = {
    [Co2Level.EXCELLENT]: '#00ff04',
    [Co2Level.GOOD]: '#75ab2b',
    [Co2Level.MEDIOCRE]: '#e3980e',
    [Co2Level.BAD]: '#ed3107',
    [Co2Level.TERRIBLE]: '#5e0909'
};

import { Measurement } from '@/entities/measurement';

export type MeasurementMode = keyof Omit<Measurement, 'date'>;

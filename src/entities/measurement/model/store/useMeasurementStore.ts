import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Measurement } from '../types/types.ts';

interface MeasurementStore {
    measurements?: Measurement[];
    addMeasurement(measurement: Measurement): void;
}

export const useMeasurementStore = create<MeasurementStore, [['zustand/immer', never]]>(
    immer((set) => ({
        addMeasurement: (measurement: Measurement) => {
            if (isNaN(measurement.co2PPMValue)) {
                return;
            }

            set((state) => ({ measurements: [...(state.measurements ?? []), measurement] }));
        }
    }))
);

// Для сохранения стора при HMR
if (import.meta.hot) {
    let savedState: any = undefined;
    useMeasurementStore.subscribe((state: any) => (savedState = state));
    import.meta.hot!.accept((newModule) => {
        if (newModule) {
            useMeasurementStore.setState(savedState);
        }
    });
}

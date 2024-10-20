import { useShallow } from 'zustand/react/shallow';

// noinspection ES6PreferShortImport
import { useMeasurementStore } from '../store/useMeasurementStore';

export const useMeasurementState = () =>
    useMeasurementStore(
        useShallow((state) => ({
            measurements: state.measurements
        }))
    );

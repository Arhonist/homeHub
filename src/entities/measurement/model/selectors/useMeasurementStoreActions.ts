import { useShallow } from 'zustand/react/shallow';

// noinspection ES6PreferShortImport
import { useMeasurementStore } from '../store/useMeasurementStore';

export const useMeasurementStoreActions = () =>
    useMeasurementStore(
        useShallow((state) => ({
            addMeasurement: state.addMeasurement
        }))
    );

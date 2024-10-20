import { FunctionComponent, useRef, useState } from 'react';
import Spacing from '@/shared/ui/spacing/Spacing.tsx';
import Button from '@/shared/ui/button/Button.tsx';
import { Co2MeasurementDetails } from '@/features/co2MeasurementDetails';
import { Co2MeasurementsDiagram } from '@/widgets/co2MeasurementsDiagram';
import { useMeasurementState, useMeasurementStoreActions } from '@/entities/measurement';
import styles from './SerialMonitor.module.scss';

const SerialMonitor: FunctionComponent = () => {
    const { measurements } = useMeasurementState();
    const { addMeasurement } = useMeasurementStoreActions();

    const [errorText, setErrorText] = useState<string | undefined>();
    const [isPolling, setIsPolling] = useState(false);

    const readerRef = useRef<ReadableStreamDefaultReader>(); // Чтобы сохранить доступ к reader при остановке
    const portRef = useRef<SerialPort>(); // Чтобы сохранить доступ к reader при остановке

    const lastMeasurement = measurements ? measurements[measurements.length - 1] : undefined;

    const startPolling = async () => {
        setIsPolling(true);

        let port: SerialPort;

        try {
            port = await navigator.serial.requestPort();
            portRef.current = port;
        } catch (error) {
            setErrorText(`Ошибка открытия последовательного порта: ${error}`);
            setIsPolling(false);
            return;
        }

        const textDecoder = new TextDecoder();

        try {
            await port.open({ baudRate: 9600 });

            const reader = port.readable.getReader();
            readerRef.current = reader;

            let readingChunk = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                const decodedValue = textDecoder.decode(value);
                const isEndOfMessage = decodedValue === '!';

                if (isEndOfMessage) {
                    const chunkToAdd = readingChunk;
                    addMeasurement({ co2PPMValue: Number(chunkToAdd), date: Date.now() });
                    readingChunk = '';
                } else {
                    readingChunk += decodedValue;
                }
            }
        } catch (error) {
            setErrorText(`Ошибка чтения последовательного порта: ${error}`);
        }
    };

    const stopPolling = async () => {
        setIsPolling(false);
        if (readerRef.current) {
            await readerRef.current.cancel(); // Останавливаем чтение
            readerRef.current.releaseLock(); // Освобождаем reader
        }
        if (portRef.current) {
            await portRef.current.close();
        }
    };

    return (
        <div>
            <Spacing size={12} />

            <div className={styles.controlsRow}>
                <Button onClick={startPolling} disabled={isPolling}>
                    Начать чтение
                </Button>
                <Button onClick={stopPolling} disabled={!isPolling}>
                    Остановить чтение
                </Button>
            </div>

            <Spacing size={12} />

            <div className={styles.lastResult}>
                <Co2MeasurementDetails measurement={lastMeasurement} />
            </div>

            <Spacing size={12} />

            {Boolean(errorText) && <p className={styles.error}>{errorText}</p>}

            <Co2MeasurementsDiagram measurements={measurements} />
        </div>
    );
};

export default SerialMonitor;

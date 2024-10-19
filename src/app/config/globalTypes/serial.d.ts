interface SerialPort {
    open(options: { baudRate: number }): Promise<void>;
    close(): Promise<void>;
    readable: ReadableStream;
    writable: WritableStream;
}

interface Serial {
    getPorts(): Promise<SerialPort[]>;
    requestPort(): Promise<SerialPort>;
}

interface Navigator {
    serial: Serial;
}

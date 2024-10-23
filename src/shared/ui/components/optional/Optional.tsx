import { FunctionComponent, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    visible?: boolean;
}

export const Optional: FunctionComponent<Props> = ({ visible: isVisible, children }) => {
    if (!isVisible) {
        return null;
    }

    return <>{children}</>;
};

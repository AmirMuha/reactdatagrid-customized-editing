import React from 'react';

interface Props {
    onClick: () => void;
}
declare const Button: React.FC<React.PropsWithChildren<Props>>;

export { Button };

import React from 'react';

interface PixelIconProps {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    size?: number;
    color?: string;
    title?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    className?: string;
}

const PixelIcon: React.FC<PixelIconProps> = ({
    Icon,
    size = 24,
    color = 'inherit',
    title,
    onClick,
    style,
    className
}) => {
    return (
        <Icon
            width={size}
            height={size}
            fill={color}
            role="img"
            aria-label={title}
            onClick={onClick}
            className={className}
            style={{
                imageRendering: 'pixelated',
                cursor: onClick ? 'pointer' : 'default',
                ...style,
            }}
        >
            {title && <title>{title}</title>}
        </Icon>
    );
};

export default PixelIcon;


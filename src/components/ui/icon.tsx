import { icons } from 'lucide-react';

interface IconProps {
    name: string;
    className?: string;
}

const Icon = ({ name, className }: IconProps) => {
    // @ts-ignore
    const LucideIcon = icons[name];

    if (!LucideIcon) {
        return null;
    }

    return <LucideIcon className={className} />;
};

export default Icon;

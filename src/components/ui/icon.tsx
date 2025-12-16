import { icons } from 'lucide-react';

interface IconProps {
    name: string;
    className?: string;
}

const Icon = ({ name, className }: IconProps) => {
    // @ts-expect-error: icons is not strictly typed as Record<string, Icon>
    const LucideIcon = icons[name];

    if (!LucideIcon) {
        return null;
    }

    return <LucideIcon className={className} />;
};

export default Icon;

import clsx from "clsx";

interface MenuItemProps {
    children: React.ReactNode;
    className?: string;
}

export const MenuItem = ({ children, className }: MenuItemProps) => {
    return (
        <div className={clsx("border-r border-slate-900 dark:border-slate-800 px-6 py-4", className)}>
            <>{children}</>
        </div>
    );
};

import React from "react";
import classNames from "classnames";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    primary?: boolean;
    success?: boolean;
    danger?: boolean;
    secondary?: boolean;
    outline?: boolean;
    rounded?: boolean;
    warning?: boolean;
}

export default function Alert(props: AlertProps) {
    const {
        children,
        className,
        primary,
        success,
        danger,
        secondary,
        outline,
        rounded,
        warning,
        ...others
    } = props;

    const defaultClass = "p-2 rounded-lg border";

    const classes = classNames(
        defaultClass,
        { "bg-blue-200 text-blue-600 border-blue-600": primary },
        { "bg-red-200 text-red-600 border-red-600": danger },
        { "bg-gray-200 text-gray-600 border-gray-600": secondary },
        { "bg-yellow-200 text-yellow-600 border-yellow-600": warning },
        { "bg-green-200 text-green-600 border-green-600": success }
    );

    return (
        <div className={classes} {...others}>
            {children}
        </div>
    );
}

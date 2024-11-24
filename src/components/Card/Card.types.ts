import React from "react";

export type CardProps = {
    size?: 'sm' | 'md' | 'lg';

    children: React.ReactElement;
}
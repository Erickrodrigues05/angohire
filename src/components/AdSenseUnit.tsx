import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdSenseUnitProps {
    slot: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    layoutKey?: string;
    style?: React.CSSProperties;
    className?: string;
}

export const AdSenseUnit = ({ slot, format = 'auto', layoutKey, style, className }: AdSenseUnitProps) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    if (import.meta.env.DEV) {
        return (
            <div
                className={`flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-400 text-gray-500 text-sm p-4 ${className}`}
                style={{ minHeight: '100px', ...style }}
            >
                AdSense Placeholder (Slot: {slot})
            </div>
        );
    }

    return (
        <div className={`ads-container overflow-hidden my-8 text-center ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center', ...style }}
                data-ad-client="ca-pub-7263943042738568"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
                {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
            />
        </div>
    );
};

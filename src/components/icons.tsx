export const Logo = () => (
    <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DISC Assessment Logo"
    >
        <title>DISC Assessment Logo</title>
        <circle cx="25" cy="25" r="24" stroke="hsl(var(--border))" strokeWidth="2" fill="hsl(var(--card))" />
        <path d="M25 1 V 49" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <path d="M1 25 H 49" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <path d="M25 25 A 24 24 0 0 1 49 25 L 25 25 Z" fill="hsl(var(--chart-1) / 0.7)" />
        <path d="M25 25 A 24 24 0 0 1 25 49 L 25 25 Z" fill="hsl(var(--chart-2) / 0.7)" />
        <path d="M25 25 A 24 24 0 0 1 1 25 L 25 25 Z" fill="hsl(var(--chart-3) / 0.7)" />
        <path d="M25 25 A 24 24 0 0 1 25 1 L 25 25 Z" fill="hsl(var(--chart-4) / 0.7)" />
    </svg>
);

export const Logo = () => (
    <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo"
    >
        <circle cx="25" cy="25" r="24" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <path d="M25 1V49" stroke="hsl(var(--border))" />
        <path d="M1 25H49" stroke="hsl(var(--border))" />
        <path d="M25 25C38.8071 25 50 13.8071 50 0V25H25Z" fill="hsl(var(--primary) / 0.7)" />
        <path d="M25 25C11.1929 25 0 13.8071 0 0V25H25Z" fill="hsl(var(--primary) / 0.4)" />
        <path d="M25 25C11.1929 25 0 36.1929 0 50V25H25Z" fill="hsl(var(--primary) / 0.9)" />
        <path d="M25 25C38.8071 25 50 36.1929 50 50V25H25Z" fill="hsl(var(--primary) / 0.5)" />
    </svg>
)

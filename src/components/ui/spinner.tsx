import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the spinner (applied to both width and height)
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl" | number
  /**
   * Color of the spinner
   * @default "current"
   */
  color?: "current" | "primary" | "destructive" | "muted" | string
  /**
   * Speed of the animation
   * @default "normal"
   */
  speed?: "slow" | "normal" | "fast"
  /**
   * Custom stroke width
   * @default 2
   */
  strokeWidth?: number
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
}

const speedMap = {
  slow: "1.5s",
  normal: "1s",
  fast: "0.5s",
}

export function Spinner({
  size = "md",
  color = "current",
  speed = "slow",
  strokeWidth = 2,
  className,
  ...props
}: SpinnerProps) {
  const dimensions = typeof size === "number" ? size : sizeMap[size]
  const animationSpeed = speedMap[speed]

  const colorClasses = {
    current: "text-current",
    primary: "text-primary",
    destructive: "text-destructive",
    muted: "text-muted-foreground",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        typeof color === "string" && color in colorClasses
          ? colorClasses[color as keyof typeof colorClasses]
          : null,
        className
      )}
      style={
        {
          "--spinner-size": `${dimensions}px`,
          "--spinner-speed": animationSpeed,
          "--spinner-color": color && !(color in colorClasses) ? color : undefined,
        } as React.CSSProperties
      }
      {...props}
    >
      <svg
        className="animate-spin" // Custom animation defined in your CSS
        width={dimensions}
        height={dimensions}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M17.1475 6.8525L16.0625 7.9375"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M19.25 12H17.75" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M17.1475 17.1475L16.0625 16.0625"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M6.8525 17.1475L7.9375 16.0625"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4.75 12H6.25" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M6.8525 6.8525L7.9375 7.9375"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
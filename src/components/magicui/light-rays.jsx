"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "../../lib/utils"



const createRays = (count, cycle) => {
  if (count <= 0) return []

  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84
    const rotate = -28 + Math.random() * 56
    const width = 160 + Math.random() * 160
    const swing = 0.8 + Math.random() * 1.8
    const delay = Math.random() * cycle
    const duration = cycle * (0.75 + Math.random() * 0.5)
    const intensity = 0.6 + Math.random() * 0.5

    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity,
    }
  })
}

const Ray = ({
  left,
  rotate,
  width,
  swing,
  delay,
  duration,
  intensity,
}) => {
  return (
    <motion.div
      style={
        {
          position: 'absolute',
          top: '-12%',
          left: `${left}%`,
          height: 'var(--light-rays-length)',
          width: `${width}px`,
          transformOrigin: 'top center',
          transform: 'translateX(-50%)',
          borderRadius: '9999px',
          background: `linear-gradient(to bottom, var(--light-rays-color) 0%, transparent 100%)`,
          opacity: 0,
          mixBlendMode: 'screen', // Better for dark luxury backgrounds
          filter: 'blur(var(--light-rays-blur))',
          pointerEvents: 'none',
        }
      }
      initial={{ rotate: rotate }}
      animate={{
        opacity: [0, intensity, 0],
        rotate: [rotate - swing, rotate + swing, rotate - swing],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
        repeatDelay: duration * 0.1,
      }}
    />
  )
}

export function LightRays({
  className,
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  ref,
  ...props
}) {
  const [rays, setRays] = useState([])
  const cycleDuration = Math.max(speed, 0.1)

  useEffect(() => {
    setRays(createRays(count, cycleDuration))
  }, [count, cycleDuration])

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          "--light-rays-color": color,
          "--light-rays-blur": `${blur}px`,
          "--light-rays-length": length,
          ...style,
        }
      }
      {...props}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div
          aria-hidden
          style={
            {
              position: 'absolute',
              inset: 0,
              opacity: 0.4,
              background: "radial-gradient(circle at 20% 0%, var(--light-rays-color) 0%, transparent 50%)",
            }
          }
        />
        <div
          aria-hidden
          style={
            {
              position: 'absolute',
              inset: 0,
              opacity: 0.3,
              background: "radial-gradient(circle at 80% 0%, var(--light-rays-color) 0%, transparent 60%)",
            }
          }
        />
        {rays.map((ray) => (
          <Ray key={ray.id} {...ray} />
        ))}
      </div>
    </div>
  )
}

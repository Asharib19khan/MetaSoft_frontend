"use client"

import { useEffect, useRef } from "react"

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.vx = (Math.random() - 0.5) * 1.5
    this.vy = (Math.random() - 0.5) * 1.5
    this.radius = Math.random() * 2 + 0.5
    // MetaSoft Brand Colors: Teal (#1E9B97) or Gold (#FFBA49)
    this.color = Math.random() > 0.5 ? "#1E9B97" : "#FFBA49"
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx
    this.y += this.vy

    // Bounce off edges
    if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx
    if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.shadowBlur = 15
    ctx.shadowColor = this.color
    ctx.fill()
    ctx.shadowBlur = 0 // Reset for lines
  }
}

export function HeroParticleNexus() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      // Adjust density based on screen size
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000)
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    resize()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background ambient glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0, 
        canvas.width / 2, canvas.height / 2, canvas.width
      )
      gradient.addColorStop(0, 'rgba(3, 10, 9, 1)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        p1.update(canvas.width, canvas.height)
        p1.draw(ctx)

        // Check connection with mouse
        const dxMouse = p1.x - mouseRef.current.x
        const dyMouse = p1.y - mouseRef.current.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (distMouse < mouseRef.current.radius) {
          ctx.beginPath()
          // Mouse lines glow in brand Gold (#FFBA49 -> rgb 255, 186, 73)
          ctx.strokeStyle = `rgba(255, 186, 73, ${1 - distMouse / mouseRef.current.radius})`
          ctx.lineWidth = 1.5
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.stroke()
          
          // Slight attraction
          p1.x -= dxMouse * 0.02
          p1.y -= dyMouse * 0.02
        }

        // Check connection with other particles
        for (let j = i; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            ctx.beginPath()
            // Inter-particle lines glow in brand Teal (#1E9B97 -> rgb 30, 155, 151)
            ctx.strokeStyle = `rgba(30, 155, 151, ${0.2 - dist / 500})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none -z-20 w-full h-full"
      style={{ display: "block" }}
    />
  )
}

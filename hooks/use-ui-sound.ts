"use client"

import { useCallback, useRef } from 'react'

export function useUiSound() {
  const audioCtx = useRef<AudioContext | null>(null)

  const initAudio = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (audioCtx.current.state === 'suspended') {
      audioCtx.current.resume()
    }
    return audioCtx.current
  }, [])

  const playTick = useCallback(() => {
    try {
      const ctx = initAudio()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05)
      
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.05)
    } catch (e) {
      // Ignore audio errors
    }
  }, [initAudio])

  const playThud = useCallback(() => {
    try {
      const ctx = initAudio()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2)
      
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.2)
    } catch (e) {
      // Ignore audio errors
    }
  }, [initAudio])

  return { playTick, playThud }
}

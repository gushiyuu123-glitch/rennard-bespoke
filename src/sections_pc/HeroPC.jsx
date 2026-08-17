import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from './HeroPC.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function HeroPC() {
  const heroRef = useRef(null)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const image = imageRef.current

    if (!hero || !image) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const titleLines = hero.querySelectorAll(`.${styles.lineText}`)
      const divider = hero.querySelector(`.${styles.divider}`)
      const tagline = hero.querySelector(`.${styles.tagline}`)
      const brand = hero.querySelector(`.${styles.brand}`)

      /*
       * Hero entrance
       */
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      /*
       * Image
       */
      tl.fromTo(
        image,
        {
          scale: 1.075,
          opacity: 0,
        },
        {
          scale: 1.035,
          opacity: 1,
          duration: 1.7,
        }
      )

      /*
       * Copy
       * 1行目 → 2行目
       * 左から静かにフェードイン
       */
      tl.fromTo(
        titleLines,
        {
          x: -28,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.18,
        },
        '-=1.05'
      )

      /*
       * Divider
       */
      tl.fromTo(
        divider,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 0.78,
          duration: 0.8,
        },
        '-=0.35'
      )

      /*
       * English copy
       */
      tl.fromTo(
        tagline,
        {
          x: -12,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
        },
        '-=0.42'
      )

      /*
       * Brand
       */
      tl.fromTo(
        brand,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.9,
        },
        '-=0.25'
      )

      /*
       * Subtle image parallax
       */
      gsap.fromTo(
        image,
        {
          y: -12,
        },
        {
          y: 32,
          ease: 'none',

          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-label="RENNARD BESPOKE"
    >
      <div className={styles.visual}>
        <img
          ref={imageRef}
          className={styles.image}
          src="/images/hero.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.lineText}>
            スーツで、
          </span>

          <span className={styles.lineText}>
            人生をスマートに
            <span className={styles.period}>。</span>
          </span>
        </h1>

        <div
          className={styles.divider}
          aria-hidden="true"
        />

        <p className={styles.tagline}>
          Live smarter, in a suit.
        </p>
      </div>

      <div className={styles.brand}>
        <span className={styles.brandName}>
          RENNARD
        </span>

        <span className={styles.brandSub}>
          BESPOKE
        </span>
      </div>
    </section>
  )
}
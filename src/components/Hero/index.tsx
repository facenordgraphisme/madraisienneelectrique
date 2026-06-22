'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const scopeRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.6')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(statsRef.current?.children || [], {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        }, '-=0.2')

      // Parallax effect on background
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, scopeRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={scopeRef} className={styles.hero}>
      {/* Background Image */}
      <div ref={bgRef} className={styles.heroBg}>
        <Image
          src="/hero-bg.jpg"
          alt="Draisienne électrique en ville"
          fill
          className={styles.heroImg}
          priority
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className="badge badge--white">Expertise 2025</span>
          <span style={{ color: 'var(--color-accent)', fontWeight: 900 }}>•</span>
          <span style={{ color: '#FFFFFF', fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Comparatifs & Tests
          </span>
        </div>

        <h1 ref={headlineRef} className={styles.headline}>
          L'Élite de la <span className={styles.highlight}>Draisienne Électrique</span>
        </h1>

        <p ref={subRef} className={styles.sub}>
          Découvrez les meilleurs modèles 2025 à travers nos guides d'achat complets, 
          nos comparatifs détaillés et nos avis d'experts indépendants.
        </p>

        <div ref={ctaRef} className={styles.ctas}>
          <Link href="/meilleures-draisiennes-electriques-pour-adultes-en-2025" className="btn btn--primary">
            Nos Tops 2025
          </Link>
          <Link href="/blog" className="btn btn--white">
            Lire le Blog
          </Link>
        </div>

        <div ref={statsRef} className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>32</span>
            <span className={styles.statLabel}>Guides Experts</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>12k</span>
            <span className={styles.statLabel}>Lecteurs / mois</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Avis Réels</span>
          </div>
        </div>
      </div>

      {/* Transition to light content */}
      <div className={styles.bottomFade} />
    </section>
  )
}

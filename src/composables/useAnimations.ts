import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useReveal() {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    document.querySelectorAll('.reveal').forEach((el) => observer!.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}

export function useSmoothScroll() {
  function handleClick(e: Event) {
    const anchor = e.currentTarget as HTMLAnchorElement
    const href = anchor.getAttribute('href')
    if (!href?.startsWith('#')) return

    e.preventDefault()
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return { handleClick }
}

export function useActiveSection(sectionIds: string[], offset = 140) {
  const activeSection = ref('')

  function updateActiveSection() {
    let current = ''

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= offset) {
        current = id
      }
    }

    activeSection.value = current
  }

  onMounted(() => {
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection)
    window.removeEventListener('resize', updateActiveSection)
  })

  return { activeSection }
}

export function useHeroParallax(
  heroImgRef: Ref<HTMLImageElement | null>,
  kineticTextRef: Ref<HTMLElement | null>,
) {
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function onMouseMove(e: MouseEvent) {
    if (prefersReducedMotion()) return

    const { clientX, clientY } = e
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const moveX = (clientX - centerX) / 40
    const moveY = (clientY - centerY) / 40

    if (heroImgRef.value) {
      heroImgRef.value.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`
    }
    if (kineticTextRef.value) {
      kineticTextRef.value.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`
    }
  }

  function onScroll() {
    if (prefersReducedMotion() || !heroImgRef.value) return

    const scrollVal = window.scrollY
    heroImgRef.value.style.transform = `translateY(${scrollVal * 0.15}px) scale(${1 + scrollVal * 0.0002})`
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('scroll', onScroll)
  })
}

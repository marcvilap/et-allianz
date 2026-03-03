// Horizontal scroll fallback for browsers without scroll-driven animations (Firefox)
function initHorizontalScrollFallback() {
	if (CSS.supports('animation-timeline: view()')) return
	if (!window.matchMedia('(min-width: 80rem)').matches) return

	const container = document.getElementById('scroll-container')
	const wrapper = document.getElementById('scroll-wrapper')
	const progress = document.getElementById('scroll-progress')
	const indicator = document.getElementById('scroll-indicator')

	if (!container || !wrapper) return

	container.style.height = '300vw'
	wrapper.style.position = 'sticky'
	wrapper.style.top = '0'
	wrapper.style.display = 'grid'
	wrapper.style.width = '300vw'
	wrapper.style.gridTemplateColumns = 'repeat(3, 1fr)'
	wrapper.style.willChange = 'transform'

	if (progress) {
		progress.style.position = 'fixed'
		progress.style.bottom = '3rem'
		progress.style.left = '0'
		progress.style.height = '0.25rem'
		progress.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
	}

	if (indicator) {
		indicator.style.transform = 'rotate(0deg)'
	}

	const onScroll = () => {
		const scrollableHeight = container.offsetHeight - window.innerHeight
		const scrolled = -container.getBoundingClientRect().top
		const fraction = Math.max(0, Math.min(1, scrolled / scrollableHeight))

		wrapper.style.transform = `translateX(${-200 * fraction}vw)`

		if (progress) {
			progress.style.width = `${100 * fraction}vw`
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
}

initHorizontalScrollFallback()

const revealsObserver = new IntersectionObserver(entries => {
	entries.forEach(({ isIntersecting, target }) => {
		target.classList.toggle('reveal', !isIntersecting)
		target.classList.toggle('revealed', isIntersecting)
	})
})

document.querySelectorAll('.reveal').forEach(element => revealsObserver.observe(element))

// Header position and color
const header = document.getElementById('header')
const headerSubtitle = document.getElementById('header-subtitle')
const nav = document.getElementById('nav')
const sectionFooter = document.getElementById('section-footer')

if (header) {
	const headerLogo = document.getElementById('header-logo')
	const GAP = 24

	const updateHeader = () => {
		// Move header up as nav scrolls away
		if (nav) {
			const navBottom = Math.max(0, nav.getBoundingClientRect().bottom)
			header.style.top = `${navBottom + GAP}px`
		}

		// Change color when logo overlaps footer section
		if (headerLogo && sectionFooter) {
			const logoRect = headerLogo.getBoundingClientRect()
			const footerRect = sectionFooter.getBoundingClientRect()
			const overlaps = logoRect.right > footerRect.left && logoRect.left < footerRect.right && logoRect.bottom > footerRect.top && logoRect.top < footerRect.bottom
			header.classList.toggle('text-white', !overlaps)
			header.classList.toggle('text-blue-950', overlaps)
			headerSubtitle?.classList.toggle('text-white/50', !overlaps)
			headerSubtitle?.classList.toggle('text-blue-950/50', overlaps)
		}
	}

	window.addEventListener('scroll', updateHeader, { passive: true })
	updateHeader()
}

const buttonsTab = document.querySelectorAll<HTMLButtonElement>('[data-tab]')
const tabs = document.querySelectorAll<HTMLDivElement>('[id^="tab-"]')

buttonsTab.forEach(button => {
	button.addEventListener('click', () => {
		buttonsTab.forEach(item => item.classList.replace('bg-stone-200', 'bg-stone-100'))
		button.classList.replace('bg-stone-100', 'bg-stone-200')
		tabs.forEach(item => item.classList.add('hidden'))
		document.querySelector(button.dataset.tab!)?.classList.remove('hidden')
	})
})

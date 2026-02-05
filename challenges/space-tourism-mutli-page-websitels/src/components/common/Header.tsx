import { FC, useState, useEffect, useRef } from 'react'

const routes = ['home', 'destination', 'crew', 'technology']

interface IHome {
  page: string
}

export const Header: FC<IHome> = ({ page }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof Node && menuRef.current?.contains(e.target)) return
    setIsMenuOpen(false)
  }

  return (
    <header className='relative 2xl:mx-auto 2xl:max-w-[1536px]'>
      <nav className='container flex items-center justify-between py-4'>
        <a href='/'>
          <img
            src='/assets/shared/logo.svg'
            alt='logo'
            width={48}
            height={48}
          />
        </a>

        <button className='md:hidden' onClick={() => setIsMenuOpen(true)}>
          <img src='/assets/shared/icon-hamburger.svg' alt='' />
          <span className='sr-only'>Open Menu</span>
        </button>

        {/* line */}
        <span className='absolute left-[15%] top-11 z-10 hidden h-[1px] w-4/6 bg-white/25 mix-blend-normal lg:block'></span>

        {/* Menu */}
        <div
          ref={menuRef}
          className={`fixed top-0 z-10 h-screen w-4/6 bg-white/[0.04] text-white backdrop-blur-2xl transition-[right] duration-0 md:absolute md:right-0 md:top-4 md:flex md:h-auto md:max-w-4xl md:items-center md:justify-center md:p-4 lg:p-6 ${
            isMenuOpen ? 'right-0 !duration-300' : '-right-[80%]'
          } `}
        >
          <button
            className='absolute right-7 top-8 md:hidden'
            onClick={() => setIsMenuOpen(false)}
          >
            <img src='/assets/shared/icon-close.svg' alt='close menu' />
            <span className='sr-only'>Close Menu</span>
          </button>

          <ul className='ml-8 mt-40 flex flex-col gap-4 md:ml-0 md:mt-0 md:flex-row md:items-center md:gap-6'>
            {routes.map((r, i) => (
              <li
                data-index={`0${i}`}
                className={`relative mb-8 w-fit uppercase leading-5 tracking-[2.7px] before:content-[attr(data-index)] after:absolute after:left-0 after:top-8 after:h-1 after:w-full after:duration-200 after:content-[""] hover:after:bg-white/50 md:mb-0 lg:after:top-10 ${
                  page === r && 'after:block after:bg-white'
                }`}
                key={r}
              >
                <a
                  className='pl-3 uppercase md:pl-1'
                  href={`/${r === 'home' ? '' : r}`}
                >
                  {r}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
export default Header

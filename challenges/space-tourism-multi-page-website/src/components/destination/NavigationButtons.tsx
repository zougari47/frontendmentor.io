import type { FC } from 'react'
import type { IDestination } from './Destination'

interface INavigationButtons {
  destinationsArr: IDestination[]
  currentDestination: IDestination
  setCurrentDestination: (d: IDestination) => void
}

const NavigationButtons: FC<INavigationButtons> = ({
  destinationsArr,
  currentDestination,
  setCurrentDestination,
}) => {
  return (
    <ul className='item-center text-light-blueish-gray mb-5 mt-[26px] flex justify-center gap-7 md:mb-6 md:mt-[53px] lg:justify-start'>
      {destinationsArr.map((d) => (
        <li key={d.name}>
          <button
            className={`relative mb-8 w-fit text-[14px] uppercase leading-[16.8px] tracking-[2.36px] after:absolute after:left-0 after:top-8 after:h-1 after:w-full after:duration-200 after:content-[""] hover:after:bg-white/50 md:mb-0 md:text-[16px] md:leading-[19.2px] md:tracking-[2.7px] lg:mb-[52px] lg:text-base lg:leading-[19.2px] lg:tracking-[2.7px] lg:after:top-10 ${
              d.name === currentDestination.name &&
              'text-white after:block after:bg-white'
            }`}
            onClick={() => setCurrentDestination(d)}
          >
            {d.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default NavigationButtons

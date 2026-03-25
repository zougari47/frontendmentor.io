import type { ITechnology } from './Technology'

interface INavigationButtons {
  technologiesArr: ITechnology[]
  currentTechnology: ITechnology
  setCurrentTechnology: (tech: ITechnology) => void
}

const NavigationButtons: React.FC<INavigationButtons> = ({
  technologiesArr,
  currentTechnology,
  setCurrentTechnology,
}) => {
  return (
    <ul className='flex items-center justify-center gap-4 lg:w-fit lg:flex-col'>
      {technologiesArr.map((tech, index) => (
        <li key={tech.name}>
          <button
            className={`aspect-square w-10 rounded-full lg:w-20 ${
              currentTechnology.name == tech.name
                ? 'text-dark bg-white'
                : 'border border-white/25 bg-transparent text-white'
            }`}
            onClick={() => setCurrentTechnology(tech)}
          >
            <span className='font-bellefair text-[16px] leading-[18.34px] lg:text-[32px] lg:leading-[36.67px] lg:tracking-[2px]'>
              {index + 1}
            </span>
            <span className='sr-only'>{tech.name}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default NavigationButtons

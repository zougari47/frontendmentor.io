import type { ICrew } from './Crew'

interface INavigationButtons {
  crewArr: ICrew[]
  currentMember: ICrew
  setCurrentMember: (member: ICrew) => void
}

const NavigationButtons: React.FC<INavigationButtons> = ({
  crewArr,
  currentMember,
  setCurrentMember,
}) => {
  return (
    <ul className='flex items-center justify-center gap-4'>
      {crewArr.map((member) => (
        <li key={member.name}>
          <button
            className={`ful aspect-square w-[10px] rounded-full bg-white lg:w-[15px] ${
              currentMember.name == member.name ? 'opacity-100' : 'opacity-25'
            }`}
            onClick={() => setCurrentMember(member)}
          >
            <span className='sr-only'>{member.name}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default NavigationButtons

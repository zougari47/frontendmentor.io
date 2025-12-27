import CrewMember from './Crew'
import crewArr from '../../data/crew.json'
import { useState } from 'react'
import NavigationButtons from './NavigationButtons'

const Wrapper = () => {
  const [currentMember, setCurrentMember] = useState(crewArr[0])
  return (
    <section className='container md:px-12 lg:px-24'>
      <CrewMember {...currentMember} key={currentMember.name}>
        <NavigationButtons {...{ crewArr, currentMember, setCurrentMember }} />
      </CrewMember>
    </section>
  )
}

export default Wrapper

import technologiesArr from '../../data/technology.json'
import { useState } from 'react'
import Technology from './Technology'
import NavigationButtons from './NavigationButtons'

const Wrapper = () => {
  const [currentTechnology, setCurrentTechnology] = useState(technologiesArr[0])
  return (
    <div className=''>
      <Technology {...currentTechnology}>
        <NavigationButtons
          {...{ currentTechnology, technologiesArr, setCurrentTechnology }}
        />
      </Technology>
    </div>
  )
}

export default Wrapper

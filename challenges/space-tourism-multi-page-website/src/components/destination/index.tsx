import { useCallback, useMemo, useState } from 'react'
import destinationsArr from '../../data/destinations.json'
import Destination, { IDestination } from './Destination'
import NavigationButtons from './NavigationButtons'

const Wrapper = () => {
  const [currentDestination, setCurrentDestination] = useState(
    destinationsArr[0]
  )

  return (
    <section className='container px-14 text-center lg:px-[111.5px] lg:text-left'>
      <Destination {...currentDestination} key={currentDestination.name}>
        <NavigationButtons
          {...{ destinationsArr, currentDestination, setCurrentDestination }}
        />
      </Destination>
    </section>
  )
}

export default Wrapper

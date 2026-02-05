export interface ICrew {
  name: string
  images: {
    png: string
    webp: string
  }
  role: string
  bio: string
  children?: React.ReactNode
}

const CrewMember: React.FC<ICrew> = ({ name, images, role, bio, children }) => {
  return (
    <div
      className='animate-fade-in relative text-center text-white lg:text-left'
      key={name}
    >
      <h1
        className={`mb-8 mt-6 text-base uppercase leading-[19.2px] tracking-[2.7px] text-white before:pr-[18px] before:font-bold before:opacity-25 before:content-["02"] md:mb-[60px] md:text-left md:text-[20px] md:leading-6 md:tracking-[3.38px] lg:mb-[97px] lg:whitespace-nowrap lg:text-[28px] lg:leading-[33.6px] lg:tracking-[4.72px]`}
      >
        Meet your crew
      </h1>

      {/* grid container */}
      <div className='ahmed grid grid-cols-1 gap-4 md:gap-10 lg:grid-cols-2 lg:gap-0'>
        <div className='md:order-3 lg:order-2'>
          <div className='mx-auto w-[177.12px] items-center md:w-[400px] lg:w-[500px]'>
            <img
              src={images.webp}
              alt={name}
              className='block h-auto w-full'
              loading='lazy'
            />
          </div>
          <hr className='border-[#383B4B]' />
        </div>

        {/* navigation button */}
        <div className='p-4 md:order-2 lg:order-3 lg:-mt-[200px] lg:h-fit 2xl:-mt-[280px]'>
          {children}
        </div>

        <div className='px-10 md:order-1 md:px-32 lg:h-fit lg:px-0'>
          <span className='font-bellefair mb-2 block text-[16px] uppercase leading-[18px] opacity-50 md:text-[24px] md:leading-[27px] lg:mb-[15px] lg:text-[32px] lg:leading-[36.67px]'>
            {role}
          </span>
          <span className='font-bellefair mb-4 block text-[24px] uppercase leading-[27.5px] md:text-[40px] md:leading-[45.84px] lg:mb-[27px] lg:text-[56px] lg:leading-[64.18px]'>
            {name}
          </span>
          <p className='text-light-blueish-gray text-[15px] leading-[25px] md:text-[16px] md:leading-[28px] lg:text-[18px] lg:leading-[32px] 2xl:pr-40'>
            {bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CrewMember

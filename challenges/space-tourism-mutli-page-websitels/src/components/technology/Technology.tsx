export interface ITechnology {
  name: string
  images: {
    portrait: string
    landscape: string
  }
  description: string
  children?: React.ReactNode
}

const Technology: React.FC<ITechnology> = ({
  name,
  images,
  description,
  children,
}) => {
  return (
    <div className='animate-fade-in text-center lg:text-left' key={name}>
      <div className='container lg:px-20'>
        <h1
          className={`mb-8 mt-6 text-base uppercase leading-[19.2px] tracking-[2.7px] text-white before:pr-[18px] before:font-bold before:opacity-25 before:content-["03"] md:mb-[60px] md:text-left md:text-[20px] md:leading-6 md:tracking-[3.38px] lg:mb-[97px] lg:whitespace-nowrap lg:text-[28px] lg:leading-[33.6px] lg:tracking-[4.72px]`}
        >
          SPACE LAUNCH 101
        </h1>
      </div>

      {/* grid container */}
      <div className='gg text-white lg:container lg:flex lg:px-20'>
        <div className='lg:order-3'>
          {/* <img
            src={images.landscape}
            alt={name}
            className='block h-auto w-full'
          /> */}
          <picture className='lg:-mr-40 lg:block'>
            <source
              media='(max-width: 1024px)'
              srcSet={images.landscape}
              className='block h-auto w-full'
            />
            <source
              media='(min-width: 1024px)'
              srcSet={images.portrait}
              className='block h-auto w-full'
            />
            <img
              src={images.landscape}
              alt={name}
              className='block h-auto w-full'
              loading='lazy'
            />
          </picture>
        </div>

        <div className='container mb-[26px] mt-[34px] w-fit md:mb-[44px] md:mt-14 lg:mb-0 lg:mt-0'>
          {children}
        </div>

        <div className='container lg:order-1 lg:ml-20 lg:mr-[130px] lg:w-2/5'>
          <span className='text-light-blueish-gray mb-[9px] block text-[14px] uppercase leading-[16.8px] tracking-[2.36px] md:text-[16px] md:leading-[19.2px] md:tracking-[2.7px] lg:mb-[11px] lg:text-[16px] lg:leading-[19.2px] lg:tracking-[2.7px]'>
            THE TERMINOLOGY…
          </span>
          <span className='font-bellefair mb-4 block text-[24px] uppercase leading-[28px] text-white md:text-[40px] md:leading-[45.84px] lg:mb-[17px] lg:text-[56px] lg:leading-[64.18px]'>
            {name}
          </span>
          <p className='text-light-blueish-gray text-[15px] leading-[25px] md:px-20 md:text-[16px] md:leading-[28px] lg:px-0 lg:text-[18px] lg:leading-[32px]'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Technology

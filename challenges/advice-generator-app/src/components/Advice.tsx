import useAdvice from '../hooks/useAdvice'

export default function Advice() {
  const { advice, loading, error, getNewAdvice } = useAdvice()

  return (
    <main className='advice-shadow bg-dark-grayish-blue absolute left-1/2 top-1/2 w-[min(90%,540px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl px-[19.67px] pb-[66.48px] pt-[39px] text-center font-["Manrope"] lg:px-[48px] lg:pb-[79px] lg:pt-[47px]'>
      {/* error */}
      {error && (
        <h1 className='mb-5 text-center text-3xl text-white'>
          Something went wrong! Please try again.
        </h1>
      )}

      {/* loading */}
      {loading && !error && (
        <div role='status' className='w-full animate-pulse'>
          <div className='bg-neon-green/50 mx-auto mb-6 h-2.5 w-48 rounded-full'></div>

          <div className='bg-light-cyan mb-2.5 h-2 w-full rounded-full'></div>
          <div className='bg-light-cyan mb-2.5 h-2 rounded-full'></div>
          <div className='bg-light-cyan mb-[26px] h-2 w-4/5 rounded-full'></div>
        </div>
      )}

      {/* normal behavior */}
      {!loading && !error && (
        <>
          <small className='text-neon-green mb-6 block font-extrabold uppercase tracking-[0.25em]'>
            advice #{advice?.slip?.id}
          </small>
          <blockquote
            key={advice?.slip?.id}
            className='text-light-cyan mb-[26px] animate-[text-focus-in_0.65s_ease-in-out] text-[28px] font-extrabold leading-[38px] lg:mb-10'
          >
            <h1 className='before:content-["“"] after:content-["”"]'>
              {advice?.slip?.advice}
            </h1>
          </blockquote>
        </>
      )}

      <img
        src='/pattern-divider-desktop.svg'
        sizes='(min-width: 768px) 786px, 500px'
        srcSet='/pattern-divider-mobile.svg 500w, /pattern-divider-mobile.svg 786w'
        alt='pattern divider'
        className='h-auto w-full'
      />
      <button
        onClick={getNewAdvice}
        className='lef-1/2 bg-neon-green hover:shadow-neon-green/20 absolute -bottom-8 -translate-x-1/2 rounded-full p-5 duration-300 hover:shadow-[0_6px_30px_15px] disabled:cursor-progress'
        disabled={loading}
      >
        <img
          src='/icon-dice.svg'
          alt='dice'
          className='animate-rotate'
          key={advice?.slip.id}
        />
      </button>
    </main>
  )
}

import preloader from '../../../assets/images/preloader.svg'

const Preloader = () => {
  return (
    <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1000px' } }>
      <img src={ preloader } alt='Preloader' />
    </div>
  )
}

export default Preloader
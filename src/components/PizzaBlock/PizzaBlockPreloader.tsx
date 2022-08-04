import ContentLoader from "react-content-loader"

const PizzaBlockPreloader = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      speed={2}
      width={270}
      height={493}
      viewBox="0 0 270 493"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="20" y="310" rx="10" ry="10" width="230" height="22" />
      <rect x="0" y="342" rx="23" ry="23" width="270" height="88" />
      <rect x="18" y="445" rx="28" ry="30" width="234" height="50" />
      <circle cx="135" cy="173" r="123" />
    </ContentLoader>
  </div>
)

export default PizzaBlockPreloader

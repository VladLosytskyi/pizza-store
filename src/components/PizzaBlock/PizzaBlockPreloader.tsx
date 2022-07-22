import ContentLoader from "react-content-loader"

const PizzaBlockPreloader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={468.25}
    viewBox="0 0 280 468.25"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="19" y="260" rx="10" ry="10" width="240" height="24" />
    <circle cx="138" cy="120" r="120" />
    <rect x="3" y="301" rx="23" ry="23" width="275" height="84" />
    <rect x="2" y="421" rx="10" ry="10" width="122" height="27" />
    <rect x="169" y="411" rx="30" ry="30" width="112" height="48" />
  </ContentLoader>
)

export default PizzaBlockPreloader

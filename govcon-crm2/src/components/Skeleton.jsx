export default function Skeleton({ width, height, style = {} }) {
  return <div className="skeleton" style={{ width: width||'100%', height: height||16, borderRadius:4, ...style }} />
}

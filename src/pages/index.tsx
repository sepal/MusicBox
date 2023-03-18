import Grid from "@/components/Grid"
import Hello from "@/components/Hello"

export default function Home() {
  return (
    <>
      <Grid onTileClick={(x, y, isActive) => {
        console.log(`${x}:${y} ${isActive ? "on" : "off"}`)
      }} />
    </>
  )
}

import Grid from "@/components/Grid"
import { playNote } from "@/lib/audioUtils"

export default function Home() {
  return (
    <>
      <Grid onTileClick={(x, y, isActive) => {
        console.log(`${x}:${y} ${isActive ? "on" : "off"}`)
        playNote(60);
      }} />
    </>
  )
}

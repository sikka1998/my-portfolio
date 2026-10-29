import { Hero } from '../sections/hero'
import { Words } from '../sections/words'
import { Approach } from '../sections/approach'
import { SelectedWork } from '../sections/work'
import { Experience } from '../sections/experience'
import { BeyondWork } from '../sections/beyond'

export function HomePage() {
  return (
    <>
      <Hero />
      <Words />
      <Approach />
      <SelectedWork />
      <Experience />
      <BeyondWork />
    </>
  )
}

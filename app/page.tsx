import Image from 'next/image'
import MaxWrapper from './components/MaxWidthWrapper'
import MaxWidthWrapper from './components/MaxWidthWrapper'
import NavBar from './components/NavBar'
import MainList from './components/MainList'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { Toaster } from 'sonner'
import CategoriesRow from './components/CategoriesRow'
import PlatformsRow from './components/PlatformsRow'

library.add(fas, faTwitter, faFontAwesome)
export default function Home() {
  return (
    <main className="flex items-center justify-center w-full">
      <MaxWidthWrapper>
        <Toaster />
        <NavBar />
        <PlatformsRow/>
        <CategoriesRow/>
        <MainList></MainList>
      </MaxWidthWrapper>
    </main>
  )
}

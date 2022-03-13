import { useState } from 'react'
import BannerView from '../views/BannerView'

const Banner = ({ bannerContent, linkToAction }) => {
    const [bannerState, setBannerState] = useState({
        hidden: false,
        content: bannerContent,
    })

    const toggleHidden = () => {
        setBannerState({
            ...bannerState,
            hidden: !bannerState.hidden,
        })
    }

    return (
        <BannerView bannerContent={ bannerState.content } linkToAction={ linkToAction } hidden={ bannerState.hidden } toggleHidden={ toggleHidden } />
    )
}

export default Banner

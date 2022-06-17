import React from 'react'
import ActionButton from './GenericViews/ActionButton'
import { BorealisCloseBannerIcon } from './Icons'

interface BannerViewProps {
    bannerContent: string,
    linkToAction: string,
    hidden: boolean,
    toggleHidden: () => void,
}

const BannerView = ({ bannerContent, linkToAction, hidden, toggleHidden }: BannerViewProps) => {
    return (
        !hidden
            ? <div className='borealis-bottom-banner-container'>
                <div className='borealis-bottom-banner-content'><a href={ linkToAction } rel='noreferrer' target='_blank'>{ bannerContent }</a></div>
                <ActionButton value={ <BorealisCloseBannerIcon /> } onClick={ toggleHidden } title='Close' className='borealis-bottom-banner-btn' />
            </div>
            : null
    )
}

export default BannerView

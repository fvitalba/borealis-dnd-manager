import React from 'react'
import { ActionButton } from '@/components/ActionButton'
import { BorealisCloseBannerIcon } from '@/views/Icons'
import { BannerViewProps } from './types'

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

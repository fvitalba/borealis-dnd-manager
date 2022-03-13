import Button from './Button'
import { XAltOutlineIcon } from './Icons'

const BannerView = ({ bannerContent, linkToAction, hidden, toggleHidden }) => {
    return (
        !hidden
            ? <div className='bottom-banner-container'>
                <div className='bottom-banner-content'><a href={ linkToAction } rel='noreferrer' target='_blank'>{ bannerContent }</a></div>
                <Button value={ <XAltOutlineIcon className='bottom-banner-action-btn' /> } onClick={ toggleHidden } title='Close' customClass='bottom-banner-btn' />
            </div>
            : null
    )
}

export default BannerView

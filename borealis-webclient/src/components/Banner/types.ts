export interface BannerProps {
    bannerContent: string,
    linkToAction: string,
}

export interface BannerViewProps {
    bannerContent: string,
    linkToAction: string,
    hidden: boolean,
    toggleHidden: () => void,
}

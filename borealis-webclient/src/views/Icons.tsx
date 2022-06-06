import React, { CSSProperties } from 'react'
import {
    IconPlayerPlay,
    IconArrowBarLeft,
    IconArrowBarRight,
    IconSettings,
    IconMap,
    IconUsers,
    IconChartBar,
    IconBackpack,
    IconBook,
    IconMouse,
    IconMouseOff,
    IconLink,
    IconLiveView,
    IconWorldDownload,
    IconWorldUpload,
    IconCloud,
    IconCloudOff,
    IconHandFinger,
    IconWriting,
    IconWind,
    IconPlus,
    IconSquare,
    IconSquareCheck,
    IconTrash,
    IconEraser,
    IconPencil,
    IconPencilOff,
    IconColorSwatch,
    IconCloudFog,
} from '@tabler/icons'
// These icons were copied from https://github.com/la-moore/scarlab-icons/tree/master/react
// I had to copy them, because they are written as JSX.Elements, whereas I need React Function Components
const defaultWidth = '33'
const defaultHeight = '33'
const defaultSize = 24

interface IconProps {
    className?: string,
    id?: string,
    style?: CSSProperties,
    size?: number,
}

export const PlusCircleOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M9 12H15' />
        <path d='M12 9L12 15' />
        <path d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' />
    </svg>
}

export const EyeSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12ZM6.24234 6.34315C9.36653 3.21895 14.4319 3.21895 17.556 6.34315L19.7239 8.511C20.3508 9.13781 20.8909 9.67788 21.2653 10.1685C21.6665 10.6944 21.9703 11.2792 21.9703 12C21.9703 12.7208 21.6665 13.3056 21.2653 13.8315C20.8909 14.3221 20.3508 14.8622 19.7239 15.489L17.556 17.6569C14.4319 20.781 9.36653 20.781 6.24234 17.6569L4.07447 15.489C3.44759 14.8622 2.90746 14.3221 2.5331 13.8315C2.1319 13.3056 1.82812 12.7208 1.82812 12C1.82812 11.2792 2.1319 10.6944 2.5331 10.1685C2.90746 9.67788 3.44759 9.13781 4.07447 8.51101C4.08994 8.49555 4.10545 8.48003 4.12102 8.46447L6.24234 6.34315Z' />
        <path d='M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z' />
    </svg>
}

export const UserCircleSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9999 6C9.79077 6 7.99991 7.79086 7.99991 10C7.99991 12.2091 9.79077 14 11.9999 14C14.209 14 15.9999 12.2091 15.9999 10C15.9999 7.79086 14.209 6 11.9999 6ZM17.1115 15.9974C17.8693 16.4854 17.8323 17.5491 17.1422 18.1288C15.7517 19.2966 13.9581 20 12.0001 20C10.0551 20 8.27215 19.3059 6.88556 18.1518C6.18931 17.5723 6.15242 16.5032 6.91351 16.012C7.15044 15.8591 7.40846 15.7251 7.68849 15.6097C8.81516 15.1452 10.2542 15 12 15C13.7546 15 15.2018 15.1359 16.3314 15.5954C16.6136 15.7102 16.8734 15.8441 17.1115 15.9974Z' />
    </svg>
}

export const MapSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M7.42237 2.50959C7.90046 2.23354 8.41151 2.03459 9.01156 2.04997C9.61162 2.06534 10.1118 2.2902 10.5751 2.59038C11.0045 2.86853 11.4811 3.26576 12.0271 3.72088L14.0076 5.37123C14.4445 5.73537 14.5392 5.80583 14.6171 5.84493C14.8831 5.97831 15.1947 5.98629 15.4672 5.86672C15.5471 5.83166 15.6452 5.76614 16.1002 5.42485L16.2775 5.29156C16.5959 5.0518 16.9148 4.81172 17.2458 4.58979C17.5453 4.38894 17.8684 4.19785 18.2201 4.10314C19.6886 3.70779 21.2206 4.4738 21.7855 5.8858C21.9208 6.22405 21.9617 6.59713 21.9808 6.95727C22 7.3219 22 7.78387 22 8.34635V15L22.0002 15.1676C22.0017 15.98 22.003 16.7022 21.6833 17.3416C21.3636 17.981 20.785 18.4133 20.1342 18.8996C19.6676 19.2482 19.2018 19.598 18.736 19.9477L18.0857 20.4357L18.0857 20.4357L18.0856 20.4359C17.5169 20.8624 17.0207 21.2346 16.5777 21.4904C16.0996 21.7665 15.5886 21.9654 14.9885 21.95C14.3884 21.9346 13.8883 21.7098 13.4249 21.4096C12.9956 21.1315 12.519 20.7343 11.973 20.2792L11.9729 20.2791L9.9925 18.6288C9.55553 18.2646 9.46091 18.1942 9.38293 18.1551C9.11693 18.0217 8.80535 18.0137 8.53287 18.1333C8.45299 18.1683 8.35489 18.2339 7.89984 18.5751L7.72313 18.708L7.72308 18.7081C7.40448 18.9479 7.08546 19.1882 6.75429 19.4102C6.45474 19.6111 6.13171 19.8021 5.77993 19.8969C4.31144 20.2922 2.77943 19.5262 2.21461 18.1142C2.07931 17.7759 2.03836 17.4029 2.01931 17.0427C2.00002 16.6781 2.00003 16.2162 2.00003 15.6537C2.00003 14.9086 2.00045 14.1634 2.00087 13.4183C2.00174 11.8897 2.0026 10.361 1.99983 8.83239C1.99836 8.01998 1.99705 7.29776 2.31675 6.65835C2.63645 6.01895 3.21502 5.58666 3.86583 5.1004L3.86583 5.1004C4.32252 4.75917 4.77842 4.41689 5.23432 4.07461L5.23437 4.07457L5.8694 3.59797L5.91435 3.56426C6.48303 3.13769 6.97937 2.7654 7.42237 2.50959ZM15 8C15.5523 8 16 8.44772 16 9V19C16 19.5523 15.5523 20 15 20C14.4477 20 14 19.5523 14 19V9C14 8.44772 14.4477 8 15 8ZM10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5V15C8 15.5523 8.44772 16 9 16C9.55228 16 10 15.5523 10 15V5Z' />
    </svg>
}

export const GhostSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M12 2C6.47715 2 2 6.47715 2 12V19.0093C2 21.6066 5.07633 22.9767 7.00689 21.2392L7.65579 20.6552C7.9614 20.3801 8.40422 20.3201 8.77197 20.504L10.6584 21.4472C11.5029 21.8695 12.4971 21.8695 13.3416 21.4472L15.228 20.504C15.5958 20.3201 16.0386 20.3801 16.3442 20.6552L16.9931 21.2392C18.9237 22.9767 22 21.6066 22 19.0093V12C22 6.47715 17.5228 2 12 2ZM8.79957 13.3994C8.46788 12.9578 7.84101 12.8687 7.39942 13.2004C6.95783 13.5321 6.86874 14.159 7.20043 14.6006C8.29339 16.0557 10.0367 17 12.0004 17C13.964 17 15.7073 16.0557 16.8003 14.6006C17.132 14.159 17.0429 13.5321 16.6013 13.2004C16.1597 12.8687 15.5329 12.9578 15.2012 13.3994C14.4697 14.3732 13.3084 15 12.0004 15C10.6924 15 9.53103 14.3732 8.79957 13.3994ZM9 9C9.55228 9 10 9.44772 10 10V10.0112C10 10.5635 9.55228 11.0112 9 11.0112C8.44772 11.0112 8 10.5635 8 10.0112V10C8 9.44772 8.44772 9 9 9ZM16 10C16 9.44772 15.5523 9 15 9C14.4477 9 14 9.44772 14 10V10.0112C14 10.5635 14.4477 11.0112 15 11.0112C15.5523 11.0112 16 10.5635 16 10.0112V10Z' />
    </svg>
}

export const RefreshOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M21 3L15.6 3C15.2686 3 15 3.26863 15 3.6V3.6L15 9' />
        <path d='M15.5 3.5C18.7983 4.80851 21 8.29825 21 12C21 16.8715 16.9706 21 12 21C7.02944 21 3 16.8715 3 12C3 8.73514 4.80989 5.52512 7.5 4' />
    </svg>
}

export const LocationSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V4.06189C7.38128 4.51314 4.51314 7.38128 4.06189 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H4.06189C4.51314 16.6187 7.38128 19.4869 11 19.9381V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V19.9381C16.6187 19.4869 19.4869 16.6187 19.9381 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H19.9381C19.4869 7.38128 16.6187 4.51314 13 4.06189V3ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z' />
    </svg>
}

export const EditSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M12 21C12 20.4477 12.4477 20 13 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H13C12.4477 22 12 21.5523 12 21Z' />
        <path d='M20.7736 8.09994C22.3834 6.48381 22.315 4.36152 21.113 3.06183C20.5268 2.4281 19.6926 2.0233 18.7477 2.00098C17.7993 1.97858 16.8167 2.34127 15.91 3.09985C15.8868 3.11925 15.8645 3.13969 15.8432 3.16111L2.87446 16.1816C2.31443 16.7438 2 17.5051 2 18.2987V19.9922C2 21.0937 2.89197 22 4.00383 22H5.68265C6.48037 22 7.24524 21.6823 7.80819 21.1171L20.7736 8.09994ZM17.2071 5.79295C16.8166 5.40243 16.1834 5.40243 15.7929 5.79295C15.4024 6.18348 15.4024 6.81664 15.7929 7.20717L16.7929 8.20717C17.1834 8.59769 17.8166 8.59769 18.2071 8.20717C18.5976 7.81664 18.5976 7.18348 18.2071 6.79295L17.2071 5.79295Z' />
    </svg>
}

export const CloudOffSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M8.75 3C8.75 2.44772 9.19772 2 9.75 2C13.4633 2 16.5282 4.68197 17.3077 8.22257C19.9376 8.2545 22 10.465 22 13.1111C22 13.6634 21.5523 14.1111 21 14.1111C20.4477 14.1111 20 13.6634 20 13.1111C20 11.481 18.7348 10.2222 17.25 10.2222C17.1112 10.2222 16.9753 10.233 16.8431 10.2535C16.1857 10.3557 15.5383 9.90357 15.4504 9.20732C15.0756 6.24027 12.6398 4 9.75 4C9.19772 4 8.75 3.55228 8.75 3Z' />
        <path d='M3.64021 2.2318C3.21593 1.87824 2.58537 1.93556 2.2318 2.35984C1.87824 2.78412 1.93556 3.41468 2.35984 3.76825L3.75441 4.93038C2.65635 6.31284 2.00003 8.08016 2.00003 10C2.00003 14.3837 5.43585 18 9.75003 18H17.25C17.8745 18 18.4715 17.8756 19.0179 17.65L20.3598 18.7682C20.7841 19.1218 21.4147 19.0645 21.7682 18.6402C22.1218 18.2159 22.0645 17.5854 21.6402 17.2318L3.64021 2.2318Z' />
    </svg>
}

export const CloudFogSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M2 10C2 5.61631 5.43583 2 9.75 2C13.4633 2 16.5282 4.68197 17.3077 8.22257C19.9376 8.2545 22 10.465 22 13.1111C22 15.7766 19.9073 18 17.25 18H9.75C5.43583 18 2 14.3837 2 10Z' />
        <path d='M4 21C4 20.4477 4.44772 20 5 20H19C19.5523 20 20 20.4477 20 21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21Z' />
    </svg>
}

export const CloudDownloadSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M14 13C14 12.4477 13.5523 12 13 12C12.4477 12 12 12.4477 12 13L12 18.5858L10.7071 17.2929C10.3166 16.9024 9.68342 16.9024 9.29289 17.2929C8.90237 17.6834 8.90237 18.3166 9.29289 18.7071L12.2929 21.7071C12.4804 21.8946 12.7348 22 13 22C13.2652 22 13.5196 21.8946 13.7071 21.7071L16.7071 18.7071C17.0976 18.3166 17.0976 17.6834 16.7071 17.2929C16.3166 16.9024 15.6834 16.9024 15.2929 17.2929L14 18.5858' />
        <path d='M2 10C2 5.61631 5.43583 2 9.75 2C13.4089 2 16.4383 4.60401 17.272 8.06762C17.2938 8.15801 17.3739 8.22292 17.4668 8.22718C20.0202 8.3442 22 10.5186 22 13.1111C22 15.4412 20.4008 17.4334 18.2233 17.8979C18.1051 17.9231 17.9967 17.8325 17.9794 17.7129C17.9199 17.3005 17.7315 16.9031 17.4142 16.5858C16.8463 16.0178 16.0217 15.8629 15.3137 16.1209C15.169 16.1737 15 16.0748 15 15.9208L15 13.5661C15 12 14.5 11 13 11C11.5 11 11 12 11 13.5661L11 15.9208C11 16.0748 10.831 16.1737 10.6863 16.1209C9.97831 15.8629 9.15375 16.0178 8.58579 16.5858C8.30451 16.8671 8.12453 17.2113 8.04584 17.5731C8.02016 17.6912 7.9054 17.7738 7.78867 17.7425C4.43962 16.8429 2 13.6939 2 10Z' />
    </svg>
}

export const CloudUploadSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M13 12C13.2729 12 13.5202 12.1093 13.7006 12.2865C13.7028 12.2886 13.705 12.2907 13.7071 12.2929L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L14 15.4142V21C14 21.5523 13.5523 22 13 22C12.4477 22 12 21.5523 12 21L12 15.4142L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071C8.90237 16.3166 8.90237 15.6834 9.29289 15.2929L12.2926 12.2932C12.4802 12.1056 12.7348 12 13 12Z' />
        <path d='M2 10C2 5.61631 5.43583 2 9.75 2C13.4089 2 16.4383 4.60401 17.272 8.06762C17.2938 8.15801 17.3739 8.22292 17.4668 8.22718C20.0202 8.3442 22 10.5186 22 13.1111C22 15.7766 19.9073 18 17.25 18H17.0051C16.936 18 16.8799 17.9439 16.8799 17.8748C16.8799 17.827 16.9073 17.7836 16.9494 17.7609C17.1163 17.6708 17.2732 17.5553 17.4142 17.4142C18.1953 16.6332 18.1953 15.3668 17.4142 14.5858L14.4152 11.5868C14.0532 11.2243 13.5528 11 13 11C12.4472 11 11.9468 11.2243 11.5848 11.5868L8.58579 14.5858C7.80474 15.3668 7.80474 16.6332 8.58579 17.4142C8.74604 17.5745 8.92672 17.7018 9.11945 17.7963C9.15152 17.8121 9.17249 17.8443 9.17249 17.88C9.17249 17.933 9.12704 17.9748 9.07425 17.9702C5.08252 17.6159 2 14.1522 2 10Z' />
    </svg>
}

export const DatabaseSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M21 7C21 5.3126 19.6581 4.05416 18.1041 3.27715C16.4902 2.47023 14.3307 2 12 2C9.66928 2 7.50977 2.47023 5.89593 3.27715C4.34191 4.05416 3 5.3126 3 7V17C3 18.6874 4.34191 19.9458 5.89593 20.7229C7.50977 21.5298 9.66928 22 12 22C14.3307 22 16.4902 21.5298 18.1041 20.7229C19.6581 19.9458 21 18.6874 21 17V7ZM5.12992 14.1529C5.40214 13.6724 6.01238 13.5035 6.49291 13.7757C7.77337 14.5011 9.738 15 12.0001 15C14.2621 15 16.2267 14.5011 17.5072 13.7757C17.9877 13.5035 18.598 13.6724 18.8702 14.1529C19.1424 14.6334 18.9736 15.2436 18.493 15.5159C16.8417 16.4514 14.5168 17 12.0001 17C9.48328 17 7.15841 16.4514 5.50709 15.5159C5.02656 15.2436 4.85769 14.6334 5.12992 14.1529ZM6.49283 8.77571C6.0123 8.50349 5.40207 8.67235 5.12984 9.15289C4.85762 9.63342 5.02648 10.2437 5.50702 10.5159C7.15833 11.4514 9.48321 12 12 12C14.5168 12 16.8416 11.4514 18.4929 10.5159C18.9735 10.2437 19.1423 9.63342 18.8701 9.15289C18.5979 8.67235 17.9877 8.50349 17.5071 8.77571C16.2267 9.50111 14.262 10 12 10C9.73792 10 7.77329 9.50111 6.49283 8.77571Z' />
    </svg>
}

export const PlusSquareSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z' />
    </svg>
}

export const UserAddSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z' />
        <path d='M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z' />
        <path d='M19 3C19 2.44772 18.5523 2 18 2C17.4477 2 17 2.44772 17 3V5H15C14.4477 5 14 5.44772 14 6C14 6.55228 14.4477 7 15 7H17V9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9V7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19V3Z' />
    </svg>
}

export const GlobeSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M10.139 13C9.55133 13 9.08639 13.5059 9.19698 14.0831C9.52905 15.8163 10.2679 17.4049 11.3109 18.7462C11.6638 19.2 12.3364 19.2 12.6893 18.7462C13.7324 17.4049 14.4712 15.8164 14.8032 14.0831C14.9138 13.5059 14.4489 13 13.8612 13H10.139Z' />
        <path d='M17.889 13C17.3661 13 16.9358 13.4037 16.8591 13.9209C16.5115 16.267 15.5369 18.409 14.1122 20.1704C13.8041 20.5512 13.8482 21.1177 14.2355 21.4176V21.4176C14.4404 21.5762 14.7082 21.6325 14.9557 21.556C18.3847 20.4967 21.0257 17.6424 21.7812 14.0908C21.9043 13.5124 21.4379 13 20.8465 13H17.889Z' />
        <path d='M3.15352 13C2.56218 13 2.09582 13.5124 2.21886 14.0908C3.00142 17.7696 5.80689 20.7002 9.41564 21.6629C9.66029 21.7281 9.91894 21.6492 10.0955 21.4678V21.4678C10.3689 21.1868 10.3695 20.7413 10.1148 20.4433C8.56666 18.6322 7.50675 16.3896 7.14096 13.9209C7.06432 13.4037 6.63392 13 6.11108 13H3.15352Z' />
        <path d='M21.7812 9.90924C21.9042 10.4876 21.4379 11 20.8465 11H17.889C17.3661 11 16.9357 10.5963 16.8591 10.0791C16.5115 7.73297 15.5369 5.59097 14.1122 3.82959C13.8041 3.44877 13.8482 2.88228 14.2355 2.58243V2.58243C14.4404 2.42382 14.7082 2.36751 14.9557 2.44399C18.3847 3.50334 21.0257 6.35759 21.7812 9.90924Z' />
        <path d='M14.8033 9.91687C14.9138 10.4941 14.4489 11 13.8612 11H10.139C9.55133 11 9.08639 10.4941 9.19698 9.91686C9.52906 8.18365 10.2679 6.59508 11.3109 5.25376C11.6638 4.79998 12.3364 4.79999 12.6893 5.25376C13.7324 6.59508 14.4712 8.18365 14.8033 9.91687Z' />
        <path d='M9.04277 2.44442C9.29111 2.36766 9.55976 2.42446 9.76494 2.58405V2.58405C10.1512 2.88448 10.1947 3.45023 9.88695 3.83073C8.46272 5.59188 7.48852 7.73344 7.14096 10.079C7.06432 10.5962 6.63392 11 6.11108 11H3.15352C2.56218 11 2.09581 10.4876 2.21885 9.90919C2.97422 6.35808 5.61452 3.50417 9.04277 2.44442Z' />
    </svg>
}

export const PencilAltSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M9.65451 3.34098C10.7432 1.6173 13.2568 1.6173 14.3455 3.34098L18.5365 9.97669C18.8393 10.4561 19 11.0116 19 11.5787V19C19 20.6568 17.6569 22 16 22H8C6.34315 22 5 20.6568 5 19V11.5787C5 11.0116 5.16072 10.4561 5.46353 9.97669L9.65451 3.34098ZM12.6545 4.40896C12.3507 3.92797 11.6493 3.92797 11.3455 4.40896L10.303 6.0595C10.657 6.62504 11.2856 6.99997 12 6.99997C12.7144 6.99997 13.343 6.625 13.6969 6.05942L12.6545 4.40896ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H8Z' />
    </svg>
}

export const PencilAltOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M6 11.5787V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V11.5787C18 11.2007 17.8929 10.8303 17.691 10.5107L13.5 3.875C12.8038 2.77266 11.1962 2.77266 10.5 3.875L6.30902 10.5107C6.10715 10.8303 6 11.2007 6 11.5787Z' />
        <path d='M14.8293 6C14.4175 7.16519 13.3062 8 12 8C10.6938 8 9.58255 7.16519 9.17072 6' />
        <path d='M6 13L18 13' />
    </svg>
}

export const DropletSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M21 13.5C21 18.4706 16.9706 22.5 12 22.5C7.02944 22.5 3 18.4706 3 13.5C3 10.796 4.40858 8.44449 5.97593 6.65272C7.55461 4.84799 9.3972 3.49253 10.4939 2.76287C11.411 2.15267 12.589 2.15267 13.5061 2.76287C14.6028 3.49253 16.4454 4.84799 18.0241 6.65272C19.5914 8.44449 21 10.796 21 13.5Z' />
    </svg>
}

export const SquareOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z' />
    </svg>
}

export const PlaySolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M15.5963 10.3318C16.8872 11.0694 16.8872 12.9307 15.5963 13.6683L11.154 16.2068C9.9715 16.8825 8.5002 16.0287 8.5002 14.6667L8.5002 9.33339C8.5002 7.97146 9.9715 7.11762 11.154 7.79333L15.5963 10.3318Z' />
    </svg>
}

export const CheckSquareOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z' />
        <path d='M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10' />
    </svg>
}

export const DocumentXOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M9.5 11L14.5 16' />
        <path d='M14.5 11L9.5 16' />
        <path d='M17.8284 6.82843C18.4065 7.40649 18.6955 7.69552 18.8478 8.06306C19 8.4306 19 8.83935 19 9.65685L19 17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21H9C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17L5 7C5 5.11438 5 4.17157 5.58579 3.58579C6.17157 3 7.11438 3 9 3H12.3431C13.1606 3 13.5694 3 13.9369 3.15224C14.3045 3.30448 14.5935 3.59351 15.1716 4.17157L17.8284 6.82843Z' />
    </svg>
}

export const DesktopOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M3 7C3 5.11438 3 4.17157 3.58579 3.58579C4.17157 3 5.11438 3 7 3H12H17C18.8856 3 19.8284 3 20.4142 3.58579C21 4.17157 21 5.11438 21 7V10V13C21 14.8856 21 15.8284 20.4142 16.4142C19.8284 17 18.8856 17 17 17H12H7C5.11438 17 4.17157 17 3.58579 16.4142C3 15.8284 3 14.8856 3 13V10V7Z' />
        <path d='M13.3333 17L14.6667 19V19C15.2366 19.8549 14.6238 21 13.5963 21H12H10.4037C9.37624 21 8.7634 19.8549 9.33333 19V19L10.6667 17' />
        <path d='M3 13H21' />
    </svg>
}

export const CursorAltOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M8.68602 16.288L8.10556 9.37387C7.96399 7.68752 9.85032 6.59846 11.24 7.56424L16.9375 11.524C18.6256 12.6972 17.6579 15.348 15.611 15.1577L14.8273 15.0849C13.9821 15.0063 13.1795 15.4697 12.825 16.2409L12.4962 16.9561C11.6376 18.8238 8.858 18.3365 8.68602 16.288Z' />
    </svg>
}

export const UserXOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M3 19C3.69137 16.6928 5.46998 16 9.5 16C13.53 16 15.3086 16.6928 16 19' />
        <path d='M13 9.5C13 11.433 11.433 13 9.5 13C7.567 13 6 11.433 6 9.5C6 7.567 7.567 6 9.5 6C11.433 6 13 7.567 13 9.5Z' />
        <path d='M16 3L21 8' />
        <path d='M21 3L16 8' />
    </svg>
}

export const UserSquareOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z' />
        <path d='M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z' />
        <path d='M6 19C6.63819 16.6928 8.27998 16 12 16C15.72 16 17.3618 16.6425 18 18.9497' />
    </svg>
}

export const UserCheckOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M3 19C3.69137 16.6928 5.46998 16 9.5 16C13.53 16 15.3086 16.6928 16 19' />
        <path d='M13 9.5C13 11.433 11.433 13 9.5 13C7.567 13 6 11.433 6 9.5C6 7.567 7.567 6 9.5 6C11.433 6 13 7.567 13 9.5Z' />
        <path d='M15 5L16.5 6.5V6.5C16.7761 6.77614 17.2239 6.77614 17.5 6.5V6.5L21 3' />
    </svg>
}

export const DuplicateOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M8 15.9615C3.92665 15.7245 3 14.3107 3 9.5C3 4.14725 4.14725 3 9.5 3C14.3107 3 15.7245 3.92665 15.9615 8' />
        <path d='M8 14.5C8 9.14725 9.14725 8 14.5 8C19.8527 8 21 9.14725 21 14.5C21 19.8527 19.8527 21 14.5 21C9.14725 21 8 19.8527 8 14.5Z' />
    </svg>
}

export const XSquareOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M9 9L15 15' />
        <path d='M15 9L9 15' />
        <path d='M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z' />
    </svg>
}

export const CursorOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M7.236 14.1235L10.1904 7.84548C10.9109 6.31427 13.0891 6.31427 13.8096 7.84548L16.764 14.1235C17.6393 15.9835 15.4758 17.7954 13.7983 16.6071L13.156 16.1522C12.4634 15.6616 11.5366 15.6616 10.844 16.1522L10.2017 16.6072C8.52417 17.7954 6.36069 15.9835 7.236 14.1235Z' />
    </svg>
}

export const CursorSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M10.7797 17.4231C8.26348 19.2055 5.01827 16.4877 6.33123 13.6977L9.28559 7.41965C10.3664 5.12284 13.6337 5.12285 14.7145 7.41966L17.6689 13.6977C18.9818 16.4877 15.7366 19.2055 13.2204 17.4231L12.5781 16.9682C12.2318 16.7229 11.7683 16.7229 11.422 16.9682L10.7797 17.4231Z' />
    </svg>
}

export const RepeatOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M20.5 15C18.9558 18.0448 15.7622 21 12 21C7.14776 21 3.58529 17.5101 3 13' />
        <path d='M3.5 9C4.89106 5.64934 8.0647 3 12 3C16.7819 3 20.4232 6.48993 21 11' />
        <path d='M21 21L21 15.6C21 15.2686 20.7314 15 20.4 15V15L15 15' />
        <path d='M9 9L3.6 9V9C3.26863 9 3 8.73137 3 8.4L3 3' />
    </svg>
}

export const MinusCircleOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' />
        <path d='M9 12H15' />
    </svg>
}

export const ChatOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M8 10H8.01' />
        <path d='M12 10H12.01' />
        <path d='M16 10H16.01' />
        <path d='M21 13V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H7.5C7.77614 17 8 17.2239 8 17.5V20V20.1499C8 20.5037 8.40137 20.7081 8.6875 20.5L13.0956 17.2941C13.3584 17.103 13.675 17 14 17H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13Z' />
    </svg>
}

export const XCircleOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' />
        <path d='M9 9L15 15' />
        <path d='M15 9L9 15' />
    </svg>
}

export const EyeOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z' />
        <path d='M6.94975 7.05025C9.68342 4.31658 14.1156 4.31658 16.8492 7.05025L18.9706 9.17157C20.3039 10.5049 20.9706 11.1716 20.9706 12C20.9706 12.8284 20.3039 13.4951 18.9706 14.8284L16.8492 16.9497C14.1156 19.6834 9.68342 19.6834 6.94975 16.9497L4.82843 14.8284C3.49509 13.4951 2.82843 12.8284 2.82843 12C2.82843 11.1716 3.49509 10.5049 4.82843 9.17157L6.94975 7.05025Z' />
    </svg>
}

export const EyeOffOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M3.17163 5.12988L21.1716 19.1299' />
        <path d='M14.3653 13.8456C13.8162 14.5483 12.9609 15 12 15C10.3431 15 9 13.6569 9 12C9 11.3256 9.22253 10.7032 9.59817 10.2021' />
        <path d='M9 5.62667C11.5803 4.45322 14.7268 4.92775 16.8493 7.05025L19.8511 10.052C20.3477 10.5486 20.5959 10.7969 20.7362 11.0605C21.0487 11.6479 21.0487 12.3521 20.7362 12.9395C20.5959 13.2031 20.3477 13.4514 19.8511 13.948V13.948L19.799 14' />
        <path d='M7.01596 8.39827C7.40649 8.00774 7.40649 7.37458 7.01596 6.98406C6.62544 6.59353 5.99228 6.59353 5.60175 6.98406L7.01596 8.39827ZM7.65685 16.2427L5.53553 14.1213L4.12132 15.5356L6.24264 17.6569L7.65685 16.2427ZM16.1421 16.2427C13.799 18.5858 10 18.5858 7.65685 16.2427L6.24264 17.6569C9.36684 20.7811 14.4322 20.7811 17.5563 17.6569L16.1421 16.2427ZM5.53553 9.8787L7.01596 8.39827L5.60175 6.98406L4.12132 8.46449L5.53553 9.8787ZM16.7465 15.6383L16.1421 16.2427L17.5563 17.6569L18.1607 17.0526L16.7465 15.6383ZM5.53553 14.1213C4.84888 13.4347 4.40652 12.9893 4.12345 12.6183C3.85798 12.2704 3.82843 12.1077 3.82843 12L1.82843 12C1.82843 12.7208 2.1322 13.3056 2.53341 13.8315C2.917 14.3342 3.47464 14.8889 4.12132 15.5356L5.53553 14.1213ZM4.12132 8.46449C3.47464 9.11116 2.917 9.6658 2.53341 10.1686C2.1322 10.6944 1.82843 11.2792 1.82843 12H3.82843C3.82843 11.8924 3.85798 11.7297 4.12345 11.3817C4.40652 11.0107 4.84888 10.5654 5.53553 9.8787L4.12132 8.46449Z' />
    </svg>
}

export const FormattingOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M6 6V4.5V4.5C6 4.22386 6.22386 4 6.5 4H17.5C17.7761 4 18 4.22386 18 4.5V4.5V6' />
        <path d='M12 4V20' />
        <path d='M10 20H14' />
    </svg>
}

export const FormattingClearOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M5 6V4.5V4.5C5 4.22386 5.22386 4 5.5 4H17.5C17.7761 4 18 4.22386 18 4.5V4.5V6' />
        <path d='M12 4L7 20' />
        <path d='M14 15L19 20' />
        <path d='M19 15L14 20' />
        <path d='M5 20H9' />
    </svg>
}

export const XAltOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M9 9L15 15' />
        <path d='M15 9L9 15' />
    </svg>
}

export const CheckAltOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M7 12L9.89075 14.8907V14.8907C9.95114 14.951 10.049 14.9511 10.1094 14.8907V14.8907L17 8' />
    </svg>
}

export const HelpCircleSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 9C11.7015 9 11.4344 9.12956 11.2497 9.33882C10.8843 9.75289 10.2523 9.79229 9.83827 9.42683C9.4242 9.06136 9.3848 8.42942 9.75026 8.01535C10.2985 7.3942 11.1038 7 12 7C13.6569 7 15 8.34315 15 10C15 11.3072 14.1647 12.4171 13 12.829V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V12.5C11 11.6284 11.6873 11.112 12.2482 10.9692C12.681 10.859 13 10.4655 13 10C13 9.44772 12.5523 9 12 9ZM12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17H12.01C12.5623 17 13.01 16.5523 13.01 16C13.01 15.4477 12.5623 15 12.01 15H12Z' />
    </svg>
}

export const HelpCircleOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' />
        <path d='M10.5 8.67709C10.8665 8.26188 11.4027 8 12 8C13.1046 8 14 8.89543 14 10C14 10.9337 13.3601 11.718 12.4949 11.9383C12.2273 12.0064 12 12.2239 12 12.5V12.5V13' />
        <path d='M12 16H12.01' />
    </svg>
}

export const ChartBarAltSquareSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M12 6C12.5523 6 13 6.44772 13 7L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 7C11 6.44772 11.4477 6 12 6ZM16 8C16.5523 8 17 8.44772 17 9L17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16L15 9C15 8.44772 15.4477 8 16 8ZM9 11C9 10.4477 8.55229 10 8 10C7.44772 10 7 10.4477 7 11V16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16L9 11ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z' />
    </svg>
}

export const BookOpenSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M6.85489 2.33342C7.40589 2.16023 8.07253 2 8.7 2C9.65538 2 10.7453 2.37638 11.4382 2.65435C11.7959 2.79783 12.2041 2.79784 12.5618 2.65435C13.2547 2.37638 14.3446 2 15.3 2C15.9275 2 16.5941 2.16023 17.1451 2.33342C17.7104 2.51111 18.2266 2.72613 18.5739 2.8818C18.7427 2.95746 18.9316 3.00194 19.1308 3.01153C19.9531 3.05113 20.841 3.20681 21.4154 3.94051C21.9357 4.60517 22 5.51982 22 6.39995V18.6C22 19.4801 21.9357 20.3948 21.4154 21.0594C20.841 21.7931 19.9532 21.9488 19.1308 21.9884C18.6138 22.0133 18.1427 21.8803 17.7558 21.7068C17.4501 21.5698 17.0108 21.3877 16.5454 21.2414C16.0656 21.0906 15.6263 21 15.3 21C14.7601 21 13.9806 21.2401 13.3064 21.5106C12.4708 21.8458 11.5292 21.8458 10.6936 21.5106C10.0194 21.2401 9.23991 21 8.7 21C8.37371 21 7.93438 21.0906 7.45463 21.2414C6.98918 21.3877 6.54987 21.5698 6.24423 21.7068C5.85729 21.8803 5.38617 22.0133 4.86919 21.9884C4.04685 21.9488 3.15896 21.7931 2.58458 21.0594C2.06425 20.3948 2 19.4801 2 18.6V6.39995C2 5.51982 2.06425 4.60517 2.58459 3.94051C3.15897 3.20681 4.04687 3.05113 4.86922 3.01153C5.0684 3.00194 5.2573 2.95746 5.4261 2.8818C5.77336 2.72613 6.28958 2.5111 6.85489 2.33342ZM12 4.5C12.5523 4.5 13 4.94772 13 5.5V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V5.5C11 4.94772 11.4477 4.5 12 4.5Z' />
    </svg>
}

export const BoxSolidIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='currentColor' stroke='none' fillRule='evenodd' clipRule='evenodd' {...props}>
        <path d='M11.0195 2.40431C11.6283 2.06184 12.3717 2.06184 12.9805 2.40431L19.9805 6.34181C20.6103 6.69605 21 7.36241 21 8.08496V15.8296C21 16.4661 20.6634 17.0551 20.1151 17.3783L12.8867 21.6382C12.3396 21.9607 11.6604 21.9607 11.1133 21.6382L3.88495 17.3783C3.33659 17.0551 3 16.4661 3 15.8296V8.08496C3 7.36241 3.38972 6.69605 4.01948 6.34181L11.0195 2.40431ZM5.1286 8.13479C5.39937 7.65344 6.00908 7.48272 6.49044 7.75348L12.0002 10.8527L17.5099 7.75348C17.9913 7.48272 18.601 7.65344 18.8718 8.13479C19.1425 8.61615 18.9718 9.22587 18.4904 9.49663L13.0002 12.5849V19C13.0002 19.5523 12.5525 20 12.0002 20C11.4479 20 11.0002 19.5523 11.0002 19V12.5849L5.50992 9.49663C5.02856 9.22587 4.85784 8.61615 5.1286 8.13479Z' />
    </svg>
}

export const FloppyOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M19.4558 6.79893C20.2141 7.38874 20.5933 7.68365 20.7966 8.09946C21 8.51528 21 8.99563 21 9.95634L21 15V17C21 18.8856 21 19.8284 20.4142 20.4142C19.8284 21 18.8856 21 17 21H7C5.11438 21 4.17157 21 3.58579 20.4142C3 19.8284 3 18.8856 3 17V15L3 6C3 5.06812 3 4.60218 3.15224 4.23463C3.35523 3.74458 3.74458 3.35523 4.23463 3.15224C4.60218 3 5.06812 3 6 3V3H13H13.199C13.8788 3 14.2188 3 14.5343 3.10825C14.8498 3.21651 15.1181 3.4252 15.6548 3.84259L19.4558 6.79893Z' />
        <path d='M15 15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15Z' />
        <path d='M6 3V6C6 7.10457 6.89543 8 8 8H11C12.1046 8 13 7.10457 13 6V3' />
    </svg>
}

export const LinkOutlineIcon = (props: IconProps) => {
    return <svg xmlns='http://www.w3.org/2000/svg' width={ defaultWidth } height={ defaultHeight } viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round' {...props}>
        <path d='M9 8L7 8C5.11438 8 4.17157 8 3.58578 8.58579C3 9.17158 3 10.1144 3 12V12C3 13.8856 3 14.8284 3.58579 15.4142C4.17157 16 5.11438 16 7 16L9 16' />
        <path d='M15 16L17 16C18.8856 16 19.8284 16 20.4142 15.4142C21 14.8284 21 13.8856 21 12V12C21 10.1144 21 9.17157 20.4142 8.58578C19.8284 8 18.8856 8 17 8L15 8' />
        <path d='M8 12H16' />
    </svg>
}




// New Icons to use
// Generic Icons
export const BorealisPlayIcon = (props: IconProps) => {
    return <IconPlayerPlay
        size={ props.size ? props.size : defaultSize }
    />
}

// Control Panel Icons
export const BorealisCollapseIcon = (props: IconProps) => {
    return <IconArrowBarLeft
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisExpandIcon = (props: IconProps) => {
    return <IconArrowBarRight
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisUserSettingsIcon = (props: IconProps) => {
    return <IconSettings
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisMapControlIcon = (props: IconProps) => {
    return <IconMap
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisTokenControlIcon = (props: IconProps) => {
    return <IconUsers
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisCharacterStatsControlIcon = (props: IconProps) => {
    return <IconChartBar
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisCharacterInventoryControlIcon = (props: IconProps) => {
    return <IconBackpack
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisCharacterSpellsControlIcon = (props: IconProps) => {
    return <IconBook
        size={ props.size ? props.size : defaultSize }
    />
}

// User Settings Icons
export const BorealisShareMouseIcon = (props: IconProps) => {
    return <IconMouse
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisStopShareMouseIcon = (props: IconProps) => {
    return <IconMouseOff
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisShareLinkIcon = (props: IconProps) => {
    return <IconLink
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisDefaultWorldIcon = (props: IconProps) => {
    return <IconLiveView
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisShowFogIcon = (props: IconProps) => {
    return <IconCloud
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisHideFogIcon = (props: IconProps) => {
    return <IconCloudOff
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisSaveWorldIcon = (props: IconProps) => {
    return <IconWorldUpload
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisLoadWorldIcon = (props: IconProps) => {
    return <IconWorldDownload
        size={ props.size ? props.size : defaultSize }
    />
}

// Map Control Icons
export const BorealisAddNewMapIcon = (props: IconProps) => {
    return <IconPlus
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisSelectedMapIcon = (props: IconProps) => {
    return <IconSquareCheck
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisUnselectedMapIcon = (props: IconProps) => {
    return <IconSquare
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisDeleteMapIcon = (props: IconProps) => {
    return <IconTrash
        size={ props.size ? props.size : defaultSize }
    />
}



// Control Tool Icons
export const BorealisMoveToolIcon = (props: IconProps) => {
    return <IconHandFinger
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisDrawToolIcon = (props: IconProps) => {
    return <IconWriting
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisFogToolIcon = (props: IconProps) => {
    return <IconWind
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisFreeHandDrawIcon = (props: IconProps) => {
    return <IconPencil
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisFreeHandEreaseIcon = (props: IconProps) => {
    return <IconEraser
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisColorPickerIcon = (props: IconProps) => {
    return <IconColorSwatch
        size={ props.size ? props.size : defaultSize }
        style={ props.style }
    />
}

export const BorealisResetDrawingsIcon = (props: IconProps) => {
    return <IconPencilOff
        size={ props.size ? props.size : defaultSize }
    />
}

export const BorealisResetFogIcon = (props: IconProps) => {
    return <IconCloudFog
        size={ props.size ? props.size : defaultSize }
    />
}

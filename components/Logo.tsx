export default function Logo() {
    return (
        <svg width="46" height="23" viewBox="0 0 46 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_n_32_43)">
                <path d="M24.9259 13.3857L27.5031 16.0398L28.7786 17.3011L29.6067 17.9464C30.0428 18.2862 30.5109 18.5827 31.0045 18.8318C32.0601 19.3646 33.2151 19.6718 34.3959 19.7339L35.1043 19.7711C35.8462 19.7711 36.5837 19.6576 37.2912 19.4344L37.4732 19.377L38.1513 19.0765C39.1123 18.6506 39.9767 18.0338 40.692 17.2636C41.2669 16.6446 41.7369 15.9357 42.0832 15.1651L42.3674 14.5329C42.6782 13.8414 42.8937 13.1109 43.0079 12.3614C43.1354 11.525 43.1354 10.6742 43.0079 9.8378L42.9549 9.49029C42.8756 8.97003 42.7505 8.4578 42.581 7.95957L42.5081 7.74523C42.1408 6.66582 41.5442 5.67875 40.7592 4.85188C40.3573 4.42856 39.9097 4.0511 39.4246 3.72644L39.1293 3.52875C38.2259 2.92417 37.2071 2.51341 36.137 2.3224C34.4213 2.01615 32.6525 2.28852 31.1084 3.09672L31.065 3.11943C30.3433 3.49719 29.6834 3.98288 29.1082 4.55971L22.0104 11.6777L17.9494 15.9084L15.945 17.8003L15.7094 17.9975C14.4736 19.032 12.9485 19.6597 11.3425 19.7948C10.906 19.8315 10.4671 19.8315 10.0306 19.7948L9.83856 19.7786C8.35103 19.6535 6.92815 19.1149 5.73067 18.2235C5.23561 17.8551 4.78484 17.4305 4.38733 16.9585L4.10051 16.6179L3.69893 16.0337C3.37743 15.5659 3.10414 15.0668 2.88326 14.544C2.6026 13.8797 2.40863 13.182 2.30614 12.4682L2.28808 12.3424C2.22957 11.9348 2.2002 11.5236 2.2002 11.1118C2.2002 10.3191 2.30905 9.53016 2.52371 8.76706L2.79893 7.78866C3.10724 6.76854 3.64424 5.83221 4.36905 5.05096L4.80337 4.58282L5.63544 3.88897C6.27323 3.35713 6.99949 2.94147 7.7811 2.66094C8.54954 2.38514 9.35984 2.24414 10.1763 2.24414H10.5936C11.2601 2.24414 11.9236 2.33189 12.5672 2.50513C13.2195 2.68071 13.8455 2.94256 14.4285 3.28373L14.611 3.39052C15.1001 3.67674 15.5616 4.00769 15.9896 4.37912L16.83 5.10837L18.1316 6.42224L20.3964 8.76092" stroke="url(#paint0_linear_32_43)" strokeWidth="4.4" strokeLinejoin="round" />
            </g>
            <defs>
                <filter id="filter0_n_32_43" x="0" y="0" width="45.3037" height="22.0223" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="5 5" stitchTiles="stitch" numOctaves="3" result="noise" seed="3363" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect1_noise_32_43">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
                <linearGradient id="paint0_linear_32_43" x1="43.2262" y1="10.8368" x2="2.2002" y2="10.8368" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f12778" stopOpacity="0.6" />
                    <stop offset="0.4" stopColor="#f12778" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#f12778" />
                </linearGradient>
            </defs>
        </svg>
    )
}
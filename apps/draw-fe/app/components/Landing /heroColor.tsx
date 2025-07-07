export default function (){
    return(
        <>
        {/* Bottom crescent shapes - layered */}
        <div className="fixed bottom-0 left-0 w-full pointer-events-none">
            <div className="relative h-24">
                {/* Biggest crescent shape behind - DARKEST */}
                <svg 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2" 
                    width="1250" 
                    height="600" 
                    viewBox="0 0 1000 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="orangeGradientBig" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9a3412" />
                            <stop offset="100%" stopColor="#7c2d12" />
                        </linearGradient>
                    </defs>
                    {/* Biggest crescent shape opening upward */}
                    <path 
                        d="M0 100 Q500 20 1000 100 L1000 100 L0 100 Z" 
                        fill="url(#orangeGradientBig)"
                    />
                </svg>

                {/* Medium crescent shape in middle - MEDIUM */}
                <svg 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2" 
                    width="1000" 
                    height="400" 
                    viewBox="0 0 800 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ea580c" />
                            <stop offset="100%" stopColor="#c2410c" />
                        </linearGradient>
                    </defs>
                    {/* Medium crescent shape opening upward */}
                    <path 
                        d="M0 100 Q400 20 800 100 L800 100 L0 100 Z" 
                        fill="url(#orangeGradient)"
                    />
                </svg>

                {/* Smallest crescent shape on top - LIGHT ORANGE */}
                <svg 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2" 
                    width="600" 
                    height="200" 
                    viewBox="0 0 600 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="orangeGradientSmall" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff8c00" />
                            <stop offset="100%" stopColor="#ff6600" />
                        </linearGradient>
                    </defs>
                    {/* Smallest crescent shape opening upward */}
                    <path 
                        d="M0 100 Q300 20 600 100 L600 100 L0 100 Z" 
                        fill="url(#orangeGradientSmall)"
                    />
                </svg>
            </div>
        </div>
        </>
    )
}
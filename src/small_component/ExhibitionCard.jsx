import { Link } from "react-router";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ExhibitionCard({
    imageSrc,
    eyebrow,
    title,
    subtitle,
    description,
    link,
    imageOnRight = false,
}) {
    const textOrder = imageOnRight ? 'lg:order-2' : 'lg:order-1';
    const imageOrder = imageOnRight ? 'lg:order-1' : 'lg:order-2';

    useScrollReveal();

    return (
        <Link to={link} className="group headline flex flex-col max-w-[82.2vw] mx-auto space-y-[30px] lg:space-y-0 lg:flex-row lg:justify-center lg:items-center lg:gap-[100px] p-4">
            {/* Text Section */}
            <div className={`flex flex-col space-y-[10px] ${textOrder}`}>
                <p className="text-primary">{eyebrow}</p>
                <div className="flex items-center space-x-2 text-primary">
                    <h2 className='heading-bold lg:heading-bold-web'>{title}</h2>
                    <span>|</span>
                    <h2 className='heading-bold lg:heading-bold-web'>{subtitle}</h2>
                    <svg
                        className="w-5 h-5 text-primary transform transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] group-hover:translate-x-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
                <p className="bodyText lg:bodyText-web text-primary">{description}</p>
            </div>

            {/* Image Section */}
            <div className={`lg:w-[40vw] h-[50vh] ${imageOrder}`}>
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
        </Link>
    );
}

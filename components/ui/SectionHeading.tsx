interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, center = false, light = false }: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className={`text-3xl md:text-4xl font-heading font-bold pb-2 ${light ? 'text-white' : 'text-mta-black'}`}>
        {title}
      </h2>
      <span className={`block w-12 h-1 bg-mta-gold mb-4 ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${light ? 'text-gray-300' : 'text-gray-600'} ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

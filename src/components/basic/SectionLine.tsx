interface SectionLineProps {
	className?: string;
}

export default function SectionLine({ className }: SectionLineProps) {
	return (
		<div className={`flex items-center ${className}`}>
			<div className="w-full border-t border-gray-300 my-4" />
		</div>
	);
}

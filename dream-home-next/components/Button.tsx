import Image from "next/image";
import Link from "next/link";

type ButtonProps = {
  type: "button" | "link" | "submit";
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  link?: string;
  onClick?: () => void;
};

const Button = ({
  type,
  title,
  icon,
  variant,
  full,
  link,
  onClick,
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return type == "link" ? (
    <Link href={link || "#"}>
      <div
        onClick={handleClick}
        className={`flexCenter gap-2 rounded-full border ${variant} ${
          !full && "w-auto"
        }`}
        role="button"
      >
        {icon && <Image src={icon} alt={title} width={24} height={24} />}
        <label className="whitespace-nowrap cursor-pointer">{title}</label>
      </div>
    </Link>
  ) : (
    <button
      onClick={handleClick}
      className={`flexCenter gap-2 rounded-full border ${variant} ${
        !full && "w-auto"
      }`}
      type={type}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="whitespace-nowrap cursor-pointer">{title}</label>
    </button>
  );
};

export default Button;

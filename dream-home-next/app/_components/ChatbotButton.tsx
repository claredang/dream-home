import Image from "next/image";
import "../chatbot-style/main.scss";

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton = ({ onClick }: ChatbotButtonProps) => {
  return (
    <button
      className="rounded-full overflow-hidden border-none cursor-pointer flex items-center justify-center p-[10px]"
      onClick={onClick}
    >
      <Image src="/camp.svg" alt="camp" width={40} height={40} />
      <Image
        src="/comment-dots.svg"
        alt="camp"
        width={30}
        height={30}
        className="fixed bottom-[8px] right-[10px]"
      />
    </button>
  );
};

export default ChatbotButton;

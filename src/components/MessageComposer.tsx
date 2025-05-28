
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";

interface MessageComposerProps {
  message: string;
  onMessageChange: (message: string) => void;
  maxLength?: number;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  message,
  onMessageChange,
  maxLength = 1000,
}) => {
  const charsLeft = maxLength - message.length;

  return (
    <div className="space-y-2">
      <Label htmlFor="message-composer" className="flex items-center">
        <MessageSquare className="mr-2 h-4 w-4" />
        Conteúdo da Mensagem
      </Label>
      <Textarea
        id="message-composer"
        placeholder="Digite sua mensagem aqui..."
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        rows={8}
        maxLength={maxLength}
        className="resize-none"
      />
      <p className="text-sm text-muted-foreground text-right">
        {charsLeft} caracteres restantes
      </p>
    </div>
  );
};

export default MessageComposer;

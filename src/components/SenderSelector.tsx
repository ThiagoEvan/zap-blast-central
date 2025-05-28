
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Smartphone } from "lucide-react";

interface Sender {
  id: string;
  name: string;
  number: string;
}

interface SenderSelectorProps {
  senders: Sender[];
  selectedSenderId: string | undefined;
  onSenderChange: (senderId: string) => void;
}

const SenderSelector: React.FC<SenderSelectorProps> = ({
  senders,
  selectedSenderId,
  onSenderChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="sender-select" className="flex items-center">
        <Smartphone className="mr-2 h-4 w-4" />
        Remetente
      </Label>
      <Select value={selectedSenderId} onValueChange={onSenderChange}>
        <SelectTrigger id="sender-select" className="w-full">
          <SelectValue placeholder="Selecione o número remetente" />
        </SelectTrigger>
        <SelectContent>
          {senders.map((sender) => (
            <SelectItem key={sender.id} value={sender.id}>
              {sender.name} ({sender.number})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SenderSelector;

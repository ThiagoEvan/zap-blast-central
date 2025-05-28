
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ListChecks } from "lucide-react";

export interface Contact {
  id: string;
  name: string;
  number: string;
}

export interface ContactList {
  id: string;
  name: string;
  memberCount: number;
}

interface RecipientSelectorProps {
  availableContacts: Contact[];
  selectedContactIds: string[];
  onContactChange: (contactId: string, checked: boolean) => void;
  availableLists: ContactList[];
  selectedListIds: string[];
  onListChange: (listId: string, checked: boolean) => void;
}

const RecipientSelector: React.FC<RecipientSelectorProps> = ({
  availableContacts,
  selectedContactIds,
  onContactChange,
  availableLists,
  selectedListIds,
  onListChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Users className="mr-2 h-5 w-5" />
            Contatos Individuais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-60 overflow-y-auto">
          {availableContacts.length === 0 && <p className="text-sm text-muted-foreground">Nenhum contato disponível.</p>}
          {availableContacts.map((contact) => (
            <div key={contact.id} className="flex items-center space-x-2">
              <Checkbox
                id={`contact-${contact.id}`}
                checked={selectedContactIds.includes(contact.id)}
                onCheckedChange={(checked) =>
                  onContactChange(contact.id, !!checked)
                }
              />
              <Label htmlFor={`contact-${contact.id}`} className="font-normal">
                {contact.name} ({contact.number})
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <ListChecks className="mr-2 h-5 w-5" />
            Listas de Contatos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-60 overflow-y-auto">
          {availableLists.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma lista disponível.</p>}
          {availableLists.map((list) => (
            <div key={list.id} className="flex items-center space-x-2">
              <Checkbox
                id={`list-${list.id}`}
                checked={selectedListIds.includes(list.id)}
                onCheckedChange={(checked) => onListChange(list.id, !!checked)}
              />
              <Label htmlFor={`list-${list.id}`} className="font-normal">
                {list.name} ({list.memberCount} membros)
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipientSelector;

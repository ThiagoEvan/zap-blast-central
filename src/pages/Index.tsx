import { useState } from "react";
import SenderSelector from "@/components/SenderSelector";
import RecipientSelector, { Contact, ContactList } from "@/components/RecipientSelector";
import MessageComposer from "@/components/MessageComposer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

// Mock Data
const mockSenders = [{
  id: "sender1",
  name: "Principal",
  number: "+5511987654321"
}, {
  id: "sender2",
  name: "Marketing",
  number: "+5521912345678"
}];
const mockContacts: Contact[] = [{
  id: "c1",
  name: "Ana Silva",
  number: "+5511999990001"
}, {
  id: "c2",
  name: "Bruno Costa",
  number: "+5521988880002"
}, {
  id: "c3",
  name: "Carla Dias",
  number: "+5531977770003"
}, {
  id: "c4",
  name: "Daniel Alves",
  number: "+5541966660004"
}];
const mockLists: ContactList[] = [{
  id: "l1",
  name: "Clientes VIP",
  memberCount: 50
}, {
  id: "l2",
  name: "Leads (Dezembro)",
  memberCount: 120
}, {
  id: "l3",
  name: "Interessados Produto X",
  memberCount: 75
}];
const Index = () => {
  const [selectedSenderId, setSelectedSenderId] = useState<string | undefined>(mockSenders[0]?.id);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const {
    toast
  } = useToast();
  const handleContactChange = (contactId: string, checked: boolean) => {
    setSelectedContactIds(prev => checked ? [...prev, contactId] : prev.filter(id => id !== contactId));
  };
  const handleListChange = (listId: string, checked: boolean) => {
    setSelectedListIds(prev => checked ? [...prev, listId] : prev.filter(id => id !== listId));
  };
  const handleSendMessage = async () => {
    if (!selectedSenderId) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, selecione um remetente.",
        variant: "destructive"
      });
      return;
    }
    if (selectedContactIds.length === 0 && selectedListIds.length === 0) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, selecione ao menos um destinatário ou lista.",
        variant: "destructive"
      });
      return;
    }
    if (!message.trim()) {
      toast({
        title: "Erro de Validação",
        description: "A mensagem não pode estar vazia.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);

    const payload = {
      senderId: selectedSenderId,
      contacts: selectedContactIds,
      lists: selectedListIds,
      message
    };

    try {
      console.log("Enviando payload para /api/send-whatsapp:", payload);
      // Simulação de chamada de API com fetch
      // Substitua '/api/send-whatsapp' pelo seu endpoint real
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Tenta ler a mensagem de erro do backend, se houver
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Falha ao enviar mensagens. Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      // const responseData = await response.json(); // Se o backend retornar dados
      // console.log("Resposta da API:", responseData);

      toast({
        title: "Sucesso!",
        description: "Requisição de envio de mensagens enviada para a API."
      });

      // Opcional: Resetar o formulário após o envio bem-sucedido
      // setSelectedContactIds([]);
      // setSelectedListIds([]);
      // setMessage("");

    } catch (error: any) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro no Envio",
        description: error.message || "Ocorreu um erro desconhecido ao tentar enviar as mensagens.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">WhatsApp Bulk Messenger</h1>
        <p className="text-slate-600">Crie e gerencie seus envios de mensagens em massa.</p>
      </header>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Configuração do Envio</CardTitle>
            <CardDescription>
              Escolha o número remetente e os destinatários da sua mensagem.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <SenderSelector senders={mockSenders} selectedSenderId={selectedSenderId} onSenderChange={setSelectedSenderId} />
            <RecipientSelector availableContacts={mockContacts} selectedContactIds={selectedContactIds} onContactChange={handleContactChange} availableLists={mockLists} selectedListIds={selectedListIds} onListChange={handleListChange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo da Mensagem</CardTitle>
            <CardDescription>
              Escreva a mensagem que será enviada para os destinatários selecionados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MessageComposer message={message} onMessageChange={setMessage} />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSendMessage} size="lg" className="font-normal" disabled={isSending}>
              {isSending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              {isSending ? "Enviando..." : "Enviar Mensagens"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default Index;

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { from: "bot" | "user"; text: string };

const FAQ: { question: string; answer: string; keywords: string[] }[] = [
  {
    question: "Comment publier une annonce ?",
    answer:
      'Cliquez sur "Publier une annonce" en haut du site, connectez-vous ou créez un compte, puis remplissez le formulaire avec vos photos, un titre, une description et un prix.',
    keywords: ["publier", "annonce", "vendre", "poster", "deposer"],
  },
  {
    question: "Est-ce gratuit ?",
    answer: "Oui, publier une annonce sur ASD Annonces est totalement gratuit.",
    keywords: ["gratuit", "prix", "payer", "cout", "combien"],
  },
  {
    question: "Comment contacter un vendeur ?",
    answer:
      "Ouvrez l'annonce qui vous intéresse : vous y trouverez les coordonnées du vendeur pour le contacter directement.",
    keywords: ["contacter", "vendeur", "acheteur", "joindre", "appeler"],
  },
  {
    question: "Comment créer un compte ?",
    answer:
      'Cliquez sur "Connexion" puis sur "Créer un compte", renseignez votre email et un mot de passe.',
    keywords: ["compte", "inscription", "creer", "inscrire", "connexion"],
  },
  {
    question: "Comment modifier/supprimer mon annonce ?",
    answer:
      'Rendez-vous dans "Mes annonces" depuis votre compte pour modifier ou supprimer une annonce déjà publiée.',
    keywords: ["modifier", "supprimer", "gerer", "editer"],
  },
  {
    question: "Conseils de sécurité",
    answer:
      "Privilégiez une rencontre en lieu public, ne payez jamais d'avance et vérifiez toujours l'article avant de conclure la transaction.",
    keywords: ["securite", "arnaque", "conseil", "danger", "fraude"],
  },
];

const WELCOME =
  "Bonjour 👋 Je suis l'assistant ASD Annonces. Choisissez une question ci-dessous ou écrivez la vôtre.";

const FALLBACK =
  'Je n\'ai pas encore de réponse toute prête pour cette question. Vous pouvez consulter la page "Contact" pour nous écrire directement.';

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function findAnswer(text: string) {
  const lower = normalize(text);
  const match = FAQ.find((item) => item.keywords.some((k) => lower.includes(k)));
  return match ? match.answer : FALLBACK;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: WELCOME },
  ]);
  const [input, setInput] = useState("");

  function ask(text: string) {
    if (!text.trim()) return;
    const answer = findAnswer(text);
    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "bot", text: answer },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[420px] w-80 flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-xl">
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
            <span className="text-sm font-semibold text-white">
              Assistant ASD Annonces
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.from === "bot"
                    ? "bg-gray-800 text-gray-200"
                    : "ml-auto bg-brand-600 text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 px-3 py-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {FAQ.slice(0, 4).map((item) => (
                <button
                  key={item.question}
                  onClick={() => ask(item.question)}
                  className="rounded-full border border-gray-700 px-2.5 py-1 text-xs text-gray-300 hover:border-brand-500 hover:text-brand-400"
                >
                  {item.question}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Votre question..."
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-white placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Envoyer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Ouvrir le chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-colors hover:bg-brand-700"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}

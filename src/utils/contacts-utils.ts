import { Facebook, Globe, Mail, MessageCircle, MessageSquare, Phone, Send } from "lucide-react";

import type { ContactsType } from "@/types/contacts";

export const getPlaceholder = (type: ContactsType | undefined) => {
  switch (type) {
    case "PHONE":
      return "+380501234567"
    case "EMAIL":
      return "example@email.com" 
    case "VIBER":
      return "+380501234567"
    case "TELEGRAM":
      return "@username"
    case "WHATSAPP":
      return "+380501234567"
    case "FACEBOOK":
      return "username або посилання"
    default:
      return "Введіть значення контакту"
  }
}

export const contactIconMap = {
  PHONE: Phone,
  EMAIL: Mail,
  VIBER: MessageCircle,
  TELEGRAM: Send,
  WHATSAPP: MessageSquare,
  FACEBOOK: Facebook,
  OTHER: Globe,
} as const
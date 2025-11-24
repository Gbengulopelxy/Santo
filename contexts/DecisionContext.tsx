// contexts/DecisionContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface DecisionContextType {
  // VAT Decision
  vatDecision: boolean | null
  setVatDecision: (decision: boolean | null) => void
  
  // Form Validation
  isFormComplete: boolean
  setFormComplete: (complete: boolean) => void
  
  // Legal Compliance
  legalComplianceAccepted: boolean
  setLegalComplianceAccepted: (accepted: boolean) => void
  showPrimarySidebar: boolean
  setShowPrimarySidebar: (show: boolean) => void
}

const DecisionContext = createContext<DecisionContextType | undefined>(undefined)

export function DecisionProvider({ children }: { children: ReactNode }) {
  const [vatDecision, setVatDecision] = useState<boolean | null>(null)
  const [isFormComplete, setFormComplete] = useState(false)
  const [legalComplianceAccepted, setLegalComplianceAccepted] = useState(false)
  const [showPrimarySidebar, setShowPrimarySidebar] = useState(false)

  return (
    <DecisionContext.Provider
      value={{
        vatDecision,
        setVatDecision,
        isFormComplete,
        setFormComplete,
        legalComplianceAccepted,
        setLegalComplianceAccepted,
        showPrimarySidebar,
        setShowPrimarySidebar,
      }}
    >
      {children}
    </DecisionContext.Provider>
  )
}

export function useDecision() {
  const context = useContext(DecisionContext)
  if (context === undefined) {
    throw new Error("useDecision must be used within a DecisionProvider")
  }
  return context
}


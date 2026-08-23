# SAKSHI: Evidence Intelligence & Court-Readiness Platform
### Smart India Hackathon (SIH PS 26190) Presentation Master Slide & Flowchart

---

## 🚀 Core Value Pipeline

```mermaid
flowchart LR
    A["📷 DIGITAL EVIDENCE\n(CCTV, Phone Dump, CDR, Audio)"] --> B["🔒 VERIFIED\n(Instant SHA-256 Hash\n& Bit-Rot Tamper Alarm)"]
    B --> C["⛓️ TRACEABLE\n(Immutable Custody Ledger\n& BSA Sec 57 Provenance)"]
    C --> D["🧠 INTELLIGENT\n(Source-Grounded RAG AI\n& Entity Knowledge Graph)"]
    D --> E["🏛️ COURT-READY\n(BSA Sec 63 Certificate\n& One-Click Court Bundle)"]
    
    style A fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff
    style B fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff
    style C fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff
    style D fill:#1e293b,stroke:#8b5cf6,stroke-width:2px,color:#fff
    style E fill:#1e293b,stroke:#ef4444,stroke-width:2px,color:#fff
```

---

## 🏗️ End-to-End System Solution Flowchart

```mermaid
flowchart TD
    subgraph S1["1. EXISTING SYSTEM INTEGRATION (NO REPLACEMENT)"]
        IN1["eSakshya Connector\n(Crime-scene Photos & Videos)"]
        IN2["CCTNS / ICJS FIR Linker\n(Case Metadata & Legal Sections)"]
        IN3["Forensic Laboratory Exports\n(Cellebrite UFDR, CDR CSV)"]
    end

    subgraph S2["2. CANONICAL INGESTION & COMPLIANCE CORE"]
        EID["Canonical Evidence Object (EID)\n(e.g., EVD-2026-DL-9042)"]
        HASH["Instant SHA-256 Hasher\n(< 2 sec calculation)"]
        LEDGER["Append-Only Chain of Custody\n(Immutable Audit Block Log)"]
        TAMPER["Simulate Tamper Alarm\n(Bit-Rot Mismatch Detector)"]
    end

    subgraph S3["3. AI INVESTIGATION & COMPLIANCE WORKSPACE"]
        BSA["BSA Section 63 Engine\n(Statutory Readiness 0-100%)"]
        GRAPH["AI-Powered Evidence Graph\n(Persons, Devices, Files, Locations)"]
        RAG["Source-Grounded AI Search\n(Zero Hallucination with EID Citations)"]
        TIME["Timeline & Anomaly Synthesis\n(Chronological Event Builder)"]
    end

    subgraph S4["4. COURT-READY PRESENTATION LAYER"]
        CERT["Signed BSA Sec 63 Certificate\n(Digital Signature & Hash Report)"]
        PKG["One-Click Court Bundle Package\n(ZIP/PDF Manifest with Annexures)"]
        JUDGE["Judge & Prosecutor Portal\n(Verifiable e-Court Index)"]
    end

    IN1 --> EID
    IN2 --> EID
    IN3 --> EID

    EID --> HASH
    HASH --> LEDGER
    LEDGER --> TAMPER

    LEDGER --> BSA
    EID --> GRAPH
    EID --> RAG
    RAG --> TIME

    BSA --> CERT
    TIME --> PKG
    CERT --> PKG
    PKG --> JUDGE

    classDef primary fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef secondary fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc;
    classDef success fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#f8fafc;
    classDef accent fill:#0f172a,stroke:#c084fc,stroke-width:2px,color:#f8fafc;

    class IN1,IN2,IN3 primary;
    class EID,HASH,LEDGER,TAMPER secondary;
    class BSA,GRAPH,RAG,TIME accent;
    class CERT,PKG,JUDGE success;
```

---

## 📌 Executive Summary Matrix

| Category | Key Capabilities & Features | Strategic Impact |
| :--- | :--- | :--- |
| **💡 IDEA / SOLUTION** | • **Evidence Intelligence & Court-Readiness Platform** for secure management and intelligent processing of digital evidence.<br>• **Evidence ID (EID)** for unique identification and traceability.<br>• **SHA-256 Integrity Verification** for tamper detection.<br>• **Digital Chain-of-Custody** for complete evidence provenance.<br>• **AI-Powered Evidence Graph** for relationships and timelines.<br>• **BSA Section 63 Readiness** and automated court-package generation. | Positions SAKSHI as an interoperability layer sitting above CCTNS / eSakshya without replacing existing police infrastructure. |
| **🎯 PROBLEM RESOLUTION** | • **Centralizes fragmented evidence workflows** without replacing existing systems.<br>• **Ensures authenticity, integrity and provenance** throughout the evidence lifecycle.<br>• **Reduces manual effort** in evidence verification and court preparation.<br>• **Enables investigators to derive traceable, source-backed intelligence** from authorized evidence. | Solves the critical operational gap between raw crime-scene uploads and courtroom trial admissibility. |
| **⭐ UNIQUE VALUE PROPOSITIONS (UVP)** | • **Source-Grounded AI**: Every insight traces back to its source evidence ID.<br>• **Continuous Integrity Verification**: Cryptographic hashing and real-time mismatch alarm.<br>• **Evidence Intelligence Graph**: Connecting people, devices, files & events.<br>• **BSA-Ready Workflow**: Automatically identifies missing statutory compliance requirements.<br>• **One-Click Court Package**: Complete with evidence index, hashes & custody records. | Guarantees legally defensible AI output that judges can trust without risk of hallucination. |

---

## 🏛️ Bharatiya Sakshya Adhiniyam (BSA) 2023 Statutory Mapping

```mermaid
flowchart LR
    A["Section 57 BSA\n(Primary Evidence)"] --> B["Raw Media & Original Device Serial Registration"]
    C["Section 63 BSA\n(Secondary Evidence)"] --> D["Statutory Checklist & Certificate Generation"]
    E["BSA Schedule\n(Hash Report)"] --> F["SHA-256 Digest & Timestamp Verification"]

    style A fill:#0f172a,stroke:#f59e0b,color:#fff
    style C fill:#0f172a,stroke:#3b82f6,color:#fff
    style E fill:#0f172a,stroke:#10b981,color:#fff
```

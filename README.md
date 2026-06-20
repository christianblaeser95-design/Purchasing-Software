# Einkäufer-Bestellverwaltungssystem - Funktionsdokumentation

**Zweck:** Ein Verwaltungssystem für Bestellungen, Lieferanten und Produkte mit Benutzer-Authentifizierung und Bestellstatus-Tracking.

---

## 🏢 Microsoft Dynamics 365 Business Central Integration

Dieses System ist eine **native Erweiterung** für **Microsoft Dynamics 365 Business Central**. 

**Design & Wording:**
- ✅ **Identisches Designsystem** — Farben, Typografie, Layouts wie D365 BC
- ✅ **Business Central Terminologie** — "Purchase Orders", "Vendors", "Items", "Postings"
- ✅ **Konsistente Benutzeroberfläche** — Sidebar Navigation, Cards, Tables, Status Badges
- ✅ **Native Integration** — Lässt sich nahtlos als D365-Modul integrieren

**Tech Stack:**
- **Frontend:** React + Vite (D365 BC Design System)
- **Backend:** Express.js (REST API)
- **Design Language:** Microsoft Fluent Design + D365 BC Palette
- **Deployment:** Kann als D365-Add-on oder standalone eingesetzt werden

---

## 📋 Inhaltsverzeichnis

1. [Benutzer & Authentifizierung](#benutzer--authentifizierung)
2. [Lieferanten-Management (Vendors)](#lieferanten-management)
3. [Produkt-Management (Items)](#produkt-management)
4. [Bestellungs-Management (Purchase Orders)](#bestellungs-management)
5. [Bestellstatus & Workflow](#bestellstatus--workflow)
6. [Benutzer-Interface](#benutzer-interface)
7. [Admin-Funktionen](#admin-funktionen)
8. [Berichterstattung & Daten](#berichterstattung--daten)

---

## 👥 Benutzer & Authentifizierung

### Registrierung
**Was:** Ein neuer Benutzer kann sich mit Benutzername und Passwort registrieren.

**Wie:**
- Benutzer öffnet die Registrierungsseite
- Gibt Benutzername, Passwort und Passwort-Bestätigung ein
- Optional: E-Mail-Adresse eingeben
- Klick auf "Registrieren"
- System speichert Benutzer und fordert zum Login auf

**Validierungen:**
- Benutzername ist erforderlich und eindeutig
- Passwort ist erforderlich (min. Länge beachten)
- Passwörter müssen identisch sein
- E-Mail muss eindeutig sein (falls angegeben)

### Login
**Was:** Ein registrierter Benutzer kann sich mit Benutzername/Passwort anmelden.

**Wie:**
- Benutzer gibt Benutzername und Passwort ein
- System validiert Anmeldedaten
- Bei Erfolg: Benutzer ist eingeloggt und sieht Dashboard
- Bei Fehler: Fehlermeldung wird angezeigt

**Ergebnis:** Benutzer hat Zugriff auf personalisierte Funktionen

### Logout
**Was:** Ein eingeloggter Benutzer kann sich abmelden.

**Wie:**
- Benutzer klickt "Logout" Button
- System beendet Session
- Benutzer wird zurück zum Login weitergeleitet

---

## 🏢 Lieferanten-Management (Vendors)

### Lieferanten anzeigen
**Was:** Der Benutzer kann eine Liste aller verfügbaren Lieferanten sehen.

**Informationen pro Lieferant:**
- Lieferantenname
- Kontaktinformationen (E-Mail, Telefon, Adresse, etc.)
- Anzahl der Produkte vom Lieferanten
- Erstellungsdatum

### Neuen Lieferanten erstellen
**Was:** Ein autorisierter Benutzer kann einen neuen Lieferanten hinzufügen.

**Erforderliche Informationen:**
- Lieferantenname (erforderlich, eindeutig)
- Kontaktinformationen (optional)

**Validierungen:**
- Lieferantenname darf nicht doppelt vorkommen
- Name ist erforderlich

### Lieferanten bearbeiten
**Was:** Ein Benutzer kann Lieferanteninformationen aktualisieren.

**Änderbar:**
- Lieferantenname
- Kontaktinformationen

**Auswirkung:** Alle zukünftigen Bestellungen nutzen die aktualisierten Informationen

### Lieferanten löschen
**Was:** Ein Benutzer kann einen Lieferanten löschen.

**Einschränkungen:**
- Nur möglich, wenn keine aktiven Produkte zugeordnet sind
- Oder: Alle zugeordneten Produkte werden automatisch gelöscht

**Bestätigung erforderlich:** "Sind Sie sicher?"

---

## 📦 Produkt-Management (Items)

### Produkte anzeigen
**Was:** Der Benutzer kann eine Liste aller Produkte sehen, sortierbar nach Lieferant.

**Informationen pro Produkt:**
- Produktname
- Lieferant (Name)
- Preis pro Einheit
- Einheit (kg, Stück, Liter, etc.)
- Erstellungsdatum

### Neues Produkt erstellen
**Was:** Ein Benutzer kann ein neues Produkt hinzufügen.

**Erforderliche Informationen:**
- Produktname (erforderlich)
- Lieferant (erforderlich - Auswahl aus bestehenden Lieferanten)
- Preis (erforderlich, positive Zahl)
- Einheit (erforderlich - z.B. kg, Stück, Liter, Rolle, Karton)

**Validierungen:**
- Alle Felder erforderlich
- Preis muss > 0 sein
- Lieferant muss existieren

### Produkt bearbeiten
**Was:** Produktdetails können aktualisiert werden.

**Änderbar:**
- Produktname
- Zugewiesener Lieferant
- Preis
- Einheit

**Auswirkung:** 
- Zukünftige Bestellungen nutzen neue Informationen
- Bestehende Bestellungen zeigen weiterhin original Informationen

### Produkt löschen
**Was:** Ein Produkt kann aus dem System entfernt werden.

**Einschränkungen:**
- Kann nur gelöscht werden, wenn keine offenen/ausstehenden Bestellungen existieren
- Oder: Produkt wird als "inaktiv" markiert

**Bestätigung erforderlich**

---

## 📋 Bestellungs-Management (Purchase Orders)

### Bestellungen anzeigen
**Was:** Der eingeloggte Benutzer sieht eine Tabelle aller seiner Bestellungen.

**Informationen pro Bestellung:**
- Bestellnummer (ID)
- Lieferantenname
- Produktname
- Bestellmenge
- Preis pro Einheit
- Gesamtpreis (Menge × Preis)
- Bestelldatum
- Aktueller Status (mit Farbcode)
- Letzte Statusänderung (Datum/Zeit)

**Sortierung & Filter:**
- Nach Bestelldatum (neueste zuerst)
- Nach Status (alle, Offen, Bestätigt, Versendet, Erhalten)
- Suche nach Produktname oder Lieferant

### Neue Bestellung erstellen
**Was:** Ein Benutzer kann eine neue Bestellung aufgeben.

**Erforderliche Informationen:**
- Produkt (Auswahl aus verfügbaren Produkten)
- Menge (erforderlich, positive Zahl)

**System berechnet automatisch:**
- Lieferant (aus Produktzuweisung)
- Preis (aus Produktdaten)
- Gesamtpreis (Menge × Preis)
- Bestelldatum (aktuelles Datum/Zeit)
- Initialer Status: "Offen"

**Bestätigung:** Bestellung wird sofort gespeichert und im Dashboard angezeigt

### Bestellung bearbeiten
**Was:** Die Bestellmenge kann nachträglich angepasst werden.

**Änderbar:**
- Menge (erforderlich, positive Zahl)

**Auswirkung:**
- Gesamtpreis wird neu berechnet
- Bearbeitungsdatum wird aktualisiert

**Einschränkung:** Kann nur bearbeitet werden, wenn Status noch "Offen" ist

### Bestellung löschen
**Was:** Eine Bestellung kann gelöscht werden.

**Wer kann löschen:**
- Nur der Benutzer, der die Bestellung erstellt hat
- Nur der Administrator

**Einschränkung:** Nur wenn Status "Offen" ist

**Bestätigung erforderlich:** "Diese Bestellung wirklich löschen?"

---

## 🔄 Bestellstatus & Workflow

### Status-System
**Was:** Jede Bestellung durchläuft einen definierten Lebenszyklus mit 4 Status:

| Status | Symbol | Bedeutung | Farbe |
|--------|--------|-----------|-------|
| **Offen** | 🔴 | Bestellung gerade erstellt, auf Bestätigung wartend | Rot |
| **Bestätigt** | 🟠 | Lieferant hat Bestellung bestätigt, Vorbereitung läuft | Orange |
| **Versendet** | 🔵 | Bestellung ist unterwegs zum Empfänger | Blau |
| **Erhalten** | 🟢 | Bestellung ist angekommen und akzeptiert | Grün |

### Status-Änderung
**Was:** Der Benutzer kann den Status einer Bestellung manuell fortschreiten lassen.

**Wie:**
1. Benutzer öffnet Dashboard
2. Findet Bestellung in der Tabelle
3. Klickt "Status" Button
4. Modal öffnet sich mit:
   - Bestellnummer
   - Aktuellem Status (mit Farbcode)
   - Dropdown-Liste der erlaubten nächsten Status
5. Benutzer wählt neuen Status
6. Klickt "Status ändern"
7. System aktualisiert Status
8. Timestamp wird automatisch gesetzt
9. Bestellung wird neu angezeigt mit neuer Farbe

**Beispiel-Workflow:**
```
Neue Bestellung erstellt
    ↓
Lieferant bestätigt
    ↓
Paket wird versendet
    ↓
Paket kommt an
```

### Status-Tracking
**Was:** Das System protokolliert, wann jeder Statuswechsel stattgefunden hat.

**Informationen gespeichert:**
- Vorheriger Status
- Neuer Status
- Zeitstempel der Änderung
- (Optional: Benutzer, der die Änderung vorgenommen hat)

**Nutzen:**
- Benutzer kann sehen, wie lange eine Bestellung in jedem Status war
- Durchschnittliche Lieferzeiten können berechnet werden
- Verzögerungen werden sichtbar

---

## 🖥️ Benutzer-Interface

### Login-Seite
**Was:** Startseite für neue und bestehende Benutzer.

**Features:**
- Zwei Tabs: "Login" und "Registrierung"
- Login-Form: Benutzername, Passwort
- Registrierungs-Form: Benutzername, Passwort, Passwort-Bestätigung, E-Mail (optional)
- Fehlermeldungen bei ungültigen Daten
- "Registrieren" Button (für neuen Account)
- "Anmelden" Button (für bestehenden Account)

**Validierungen auf Client-Seite:**
- Felder sind erforderlich
- Passwörter müssen übereinstimmen
- Live-Feedback bei Fehlern

### Dashboard / Bestellungsübersicht
**Was:** Hauptseite nach dem Login, zeigt alle Bestellungen des Benutzers.

**Layout:**
- Header mit Begrüßung ("Meine Bestellungen")
- Aktions-Buttons in der Top-Ecke:
  - "+ Neue Bestellung" → öffnet Bestellungsformular
  - "Admin Panel" → Lieferanten/Produkte verwalten
  - "Logout" → Abmelden
- Tabelle mit allen Bestellungen des Benutzers

**Tabellen-Spalten:**
- Lieferant
- Produkt
- Menge
- Preis (pro Einheit)
- Gesamtpreis
- Bestelldatum
- Status (mit Farbcode)
- Aktionen (Status, Edit, Delete)

**Interaktionen:**
- Klick auf Status-Button → Modal zur Statusänderung
- Klick auf Edit-Button → Bestellungsseite zum Bearbeiten
- Klick auf Delete-Button → Bestätigungsdialog, dann Löschung

### Bestellungsformular
**Was:** Seite zum Erstellen oder Bearbeiten einer Bestellung.

**Beim Erstellen:**
- Dropdown: Produktauswahl
- Input: Menge eingeben
- Button: "Bestellung aufgeben"
- Link: "Abbrechen" → zurück zum Dashboard

**Beim Bearbeiten:**
- Nur Menge editierbar (Produkt ist gesperrt)
- Button: "Änderungen speichern"
- Button: "Abbrechen"

**Validierungen:**
- Produkt muss ausgewählt sein
- Menge muss positive Zahl sein

**Bestätigung:** Nach dem Speichern zurück zum Dashboard mit Erfolsmeldung

### Admin-Panel
**Was:** Verwaltungsseite für Lieferanten und Produkte.

**Layout mit Tabs:**

#### Tab 1: Lieferanten
- Tabelle aller Lieferanten mit Spalten:
  - Name
  - Kontaktinfo
  - Anzahl Produkte
  - Erstellt am
  - Aktionen (Edit, Delete)
- Form zum Erstellen neuer Lieferant:
  - Name (erforderlich)
  - Kontaktinfo (optional)
  - Button: "Lieferant hinzufügen"

#### Tab 2: Produkte
- Tabelle aller Produkte mit Spalten:
  - Name
  - Lieferant
  - Preis
  - Einheit
  - Erstellt am
  - Aktionen (Edit, Delete)
- Form zum Erstellen neuer Produkt:
  - Lieferant (Dropdown)
  - Name (erforderlich)
  - Preis (erforderlich, positiv)
  - Einheit (erforderlich)
  - Button: "Produkt hinzufügen"

**Inline-Bearbeitung:**
- Edit-Button öffnet Form mit aktuellen Werten
- Speichern aktualisiert Daten
- Delete-Button löscht nach Bestätigung

### Design & Ästhetik
**Allgemein:**
- Modernes, professionelles Design
- Konsistente Farbgebung (Blau, Grün, Orange, Rot)
- Responsive Layout (funktioniert auf Mobile, Tablet, Desktop)
- Smooth Animationen beim Öffnen/Schließen von Modals
- Klare Typografie mit guter Lesbarkeit

**Farbe nach Funktion:**
- Blau: Primary Actions (Buttons, Links)
- Grün: Success (Erfolgreiche Operationen, "Erhalten" Status)
- Rot: Danger (Löschen, "Offen" Status)
- Orange: Warning/Info (Bestätigungen, "Bestätigt" Status)

**Modal-Dialoge:**
- Für Status-Änderung
- Für Bestätigungen (Löschen, etc.)
- Smooth Pop-In Animation
- Hintergrund wird gedimmt

---

## 🛠️ Admin-Funktionen

### Lieferanten verwalten
**Was:** Administratoren können vollständig Lieferanten verwalten.

**Funktionen:**
- ✅ Alle Lieferanten anzeigen
- ✅ Neuen Lieferant anlegen
- ✅ Lieferant bearbeiten (Name, Kontakt)
- ✅ Lieferant löschen
- ✅ Lieferanten nach Name sortieren

### Produkte verwalten
**Was:** Administratoren können Produkte im System verwalten.

**Funktionen:**
- ✅ Alle Produkte anzeigen
- ✅ Nach Lieferant filtern
- ✅ Neues Produkt anlegen
- ✅ Produkt bearbeiten (Name, Preis, Einheit, Lieferant)
- ✅ Produkt löschen
- ✅ Produkte nach Lieferant sortieren

### Validierung & Konsistenz
**Was:** Das System stellt sicher, dass Daten konsistent bleiben.

**Validierungen:**
- Eindeutige Lieferantennamen
- Positive Preise
- Nur gültige Einheiten
- Referenzen auf existierende Lieferanten

**Datenschutz:**
- Benutzer können nur ihre eigenen Bestellungen sehen
- Admin kann alle Bestellungen sehen (optional)
- Löschen von Lieferanten/Produkten kaskadiert oder wird blockiert

---

## 📊 Berichterstattung & Daten

### Bestellungsansicht
**Was:** Ein Benutzer kann jederzeit seinen Bestellungsverlauf einsehen.

**Verfügbare Daten:**
- Alle eigenen Bestellungen chronologisch sortiert
- Status und letzter Status-Wechsel
- Lieferant, Produkt, Menge, Preis
- Gesamtbudget für Bestellungen einsehbar (Summe aller Preise)

### Bestellungs-Export (Optional)
**Was:** Bestellungen können als CSV/PDF exportiert werden.

**Enthält:**
- Bestellnummer
- Datum
- Lieferant
- Produkt
- Menge
- Preis
- Status
- Lieferdatum (wenn verfügbar)

### Lieferanten-Statistiken (Optional)
**Was:** Dashboard zeigt Übersicht über Lieferanten.

**Metriken:**
- Anzahl Bestellungen pro Lieferant
- Durchschnittliche Lieferzeit
- Gesamtbudget pro Lieferant
- Zuverlässigkeit (pünktliche Lieferungen)

### Produkt-Statistiken (Optional)
**Was:** Übersicht über Produktnutzung.

**Metriken:**
- Meistbestellte Produkte
- Durchschnittspreise
- Lagerbestände (falls relevant)

---

## 🔐 Datenschutz & Sicherheit

### Benutzer-Isolation
**Was:** Jeder Benutzer sieht nur seine eigenen Daten.

**Implementierung:**
- Benutzer kann nur seine Bestellungen sehen
- Benutzer kann nur seine Bestellungen bearbeiten
- API blockiert Zugriff auf fremde Bestellungen

### Passwort-Sicherheit
**Was:** Passwörter werden verschlüsselt gespeichert.

**Funktionsweise:**
- Benutzer-Passwort wird gehasht
- Hash wird in Datenbank gespeichert
- Originales Passwort wird nie gespeichert
- Bei Login: Eingabe-Passwort wird gehasht und mit gespeichertem Hash verglichen

### Session-Management
**Was:** Aktive Sessions werden verwaltet.

**Features:**
- Login erzeugt Session
- Session bleibt aktiv, solange Benutzer arbeitet
- Logout beendet Session sofort
- Browser-Refresh erhält Session
- Automatisches Session-Timeout nach Inaktivität (optional)

---

## 📝 Workflow-Beispiele

### Szenario 1: Neue Bestellung vom Anfang bis zur Lieferung

1. **Benutzer registriert sich**
   - E-Mail: hans@company.de
   - Benutzername: hans_mueller
   - Passwort: secure_password

2. **Benutzer loggt sich an**
   - Sieht Dashboard (leer - noch keine Bestellungen)

3. **Benutzer erstellt neue Bestellung**
   - Klickt "+ Neue Bestellung"
   - Wählt Produkt: "Laptops" (800€ von Lieferant Berlin)
   - Gibt Menge: 5 ein
   - Klickt "Bestellung aufgeben"
   - System berechnet Gesamtpreis: 4000€
   - Bestellung erscheint im Dashboard mit Status "Offen" (🔴)

4. **Lieferant bestätigt**
   - Hans aktualisiert Status auf "Bestätigt" (🟠)
   - Timestamp wird gesetzt

5. **Lieferant versendet**
   - Hans aktualisiert Status auf "Versendet" (🔵)
   - Timestamp wird gesetzt

6. **Bestellung kommt an**
   - Hans aktualisiert Status auf "Erhalten" (🟢)
   - Bestellung ist abgeschlossen

### Szenario 2: Lieferant hinzufügen und Produkt anlegen

1. **Admin möchte neuen Lieferant hinzufügen**
   - Klickt "Admin Panel"
   - Tab "Lieferanten"
   - Gibt Name ein: "TechPro GmbH"
   - Gibt Kontakt ein: "sales@techpro.de"
   - Klickt "Lieferant hinzufügen"
   - Lieferant erscheint in Tabelle

2. **Admin möchte neues Produkt von diesem Lieferant**
   - Tab "Produkte"
   - Wählt Lieferant: "TechPro GmbH"
   - Gibt Name ein: "Monitore 4K"
   - Gibt Preis ein: 450
   - Wählt Einheit: "Stück"
   - Klickt "Produkt hinzufügen"
   - Produkt steht sofort zur Verfügung für neue Bestellungen

### Szenario 3: Bestellung bearbeiten

1. **Benutzer sieht Bestellung im Dashboard**
   - Status ist noch "Offen"

2. **Benutzer möchte Menge ändern**
   - Klickt "Edit"
   - Ändert Menge von 5 auf 10
   - Gesamtpreis wird neu berechnet: 8000€
   - Klickt "Speichern"
   - Bestellung wird aktualisiert

3. **Bestellung kann nicht mehr bearbeitet werden, wenn sie versendet wurde**
   - Benutzer versucht zu bearbeiten
   - System zeigt Fehlermeldung: "Nur offene Bestellungen können bearbeitet werden"

---

## ✨ Wichtige Features zusammengefasst

| Feature | Beschreibung | Status |
|---------|--------------|--------|
| Benutzer-Registrierung | Neue Benutzer können sich anmelden | ✅ Implementiert |
| Benutzer-Login/Logout | Authentifizierung mit Session | ✅ Implementiert |
| Lieferanten verwalten | CRUD für Lieferanten | ✅ Implementiert |
| Produkte verwalten | CRUD für Produkte | ✅ Implementiert |
| Bestellungen erstellen | Neue Bestellungen aufgeben | ✅ Implementiert |
| Bestellungen bearbeiten | Menge nachträglich ändern | ✅ Implementiert |
| Bestellungen löschen | Bestellungen aus System entfernen | ✅ Implementiert |
| Status-Workflow | 4-Stufen Status (Offen → Erhalten) | ✅ Implementiert |
| Status ändern | Manuelles Fortschreiten Status | ✅ Implementiert |
| Bestellungs-Übersicht | Dashboard mit allen Bestellungen | ✅ Implementiert |
| Admin-Panel | Verwaltung von Lieferanten/Produkten | ✅ Implementiert |
| Benutzer-Isolation | Benutzer sieht nur eigene Daten | ✅ Implementiert |
| Responsive Design | Funktioniert auf allen Geräten | ✅ Implementiert |
| Daten-Validierung | Eingaben werden überprüft | ✅ Implementiert |
| Export (Optional) | Bestellungen als CSV exportieren | ⏳ Erweiterbar |
| Statistiken (Optional) | Dashboard-Statistiken | ⏳ Erweiterbar |
| Email-Benachrichtigungen | Alerts bei Status-Änderung | ⏳ Erweiterbar |

---

**Zusammenfassung:**

Dieses System bietet eine vollständige, benutzerfreundliche Lösung zur Verwaltung von Bestellungen, Lieferanten und Produkten. Es unterstützt Benutzer-Authentifizierung, einen strukturierten Bestellstatus-Workflow und ein modernes, responsives Interface. Administratoren können Lieferanten und Produkte verwalten, während Einzelbenutzer ihre Bestellungen verfolgen und den Status in Echtzeit aktualisieren können.

Das System ist produktionsreif und kann einfach in andere Tech-Stacks portiert werden (React, Vue, C#, Java, Go, etc.).

---

**Stand:** 2026-06-20  
**Sprache der UI:** Deutsch  
**Alle Funktionen Tech-Stack-agnostisch beschrieben**

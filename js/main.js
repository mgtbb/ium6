/*
Digitale Werkstatt - JavaScript-Funktionalitäten
Hauptfunktionalität: Kopieren von Feedback-Vorlagen in die Zwischenablage
*/

/**
 * Kopiert den Inhalt eines Feedback-Templates in die Zwischenablage
 * und zeigt eine visuelle Bestätigung an.
 * 
 * @param {HTMLElement} button - Der geklickte Kopieren-Button
 */
function copyToClipboard(button) {
    // Finde das übergeordnete Container-Element
    const container = button.closest('.copy-container');
    
    // Finde das <pre><code> Element mit dem zu kopierenden Text
    const codeElement = container.querySelector('code');
    
    if (!codeElement) {
        console.error('Kein Code-Element gefunden');
        return;
    }
    
    // Hole den Textinhalt
    const textToCopy = codeElement.textContent;
    
    // Versuche, den Text in die Zwischenablage zu kopieren
    try {
        // Moderne Methode mit Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            // Verwende die moderne Clipboard API
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopySuccess(button);
            }).catch(err => {
                console.error('Fehler beim Kopieren mit Clipboard API:', err);
                // Fallback auf ältere Methode
                fallbackCopyTextToClipboard(textToCopy, button);
            });
        } else {
            // Fallback für ältere Browser
            fallbackCopyTextToClipboard(textToCopy, button);
        }
    } catch (error) {
        console.error('Unerwarteter Fehler beim Kopieren:', error);
        showCopyError(button);
    }
}

/**
 * Fallback-Methode zum Kopieren von Text für ältere Browser
 * Verwendet die execCommand-Methode
 * 
 * @param {string} text - Der zu kopierende Text
 * @param {HTMLElement} button - Der geklickte Button
 */
function fallbackCopyTextToClipboard(text, button) {
    // Erstelle ein temporäres Textarea-Element
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Mache das Element unsichtbar
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    
    // Füge das Element zum DOM hinzu
    document.body.appendChild(textArea);
    
    try {
        // Wähle den Text und kopiere ihn
        textArea.select();
        textArea.setSelectionRange(0, 99999); // Für mobile Geräte
        
        const successful = document.execCommand('copy');
        
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        console.error('Fallback-Kopieren fehlgeschlagen:', err);
        showCopyError(button);
    }
    
    // Entferne das temporäre Element
    document.body.removeChild(textArea);
}

/**
 * Zeigt eine Erfolgsmeldung an, nachdem der Text kopiert wurde
 * 
 * @param {HTMLElement} button - Der geklickte Button
 */
function showCopySuccess(button) {
    // Ändere den Button-Text und -Farbe
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Kopiert!';
    button.classList.add('copied');
    
    // Deaktiviere den Button vorübergehend
    button.disabled = true;
    
    // Speichere den Original-Text für die Wiederherstellung
    const originalText = button.textContent;
    
    // Setze eine Zeitverzögerung zur Wiederherstellung des ursprünglichen Zustands
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
        button.disabled = false;
    }, 2000); // 2 Sekunden anzeigen
}

/**
 * Zeigt eine Fehlermeldung an, wenn das Kopieren fehlgeschlagen ist
 * 
 * @param {HTMLElement} button - Der geklickte Button
 */
function showCopyError(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Fehler!';
    button.style.backgroundColor = '#dc3545'; // Rot für Fehler
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.backgroundColor = ''; // Originalfarbe wiederherstellen
    }, 2000);
}

/**
 * Initialisiert alle Kopier-Buttons auf der Seite
 * Wird beim Laden der DOM aufgerufen
 */
function initializeCopyButtons() {
    // Finde alle Kopier-Buttons auf der Seite
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    // Füge jedem Button einen Event-Listener hinzu
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            copyToClipboard(this);
        });
        
        // Füge einen Tooltip für bessere Benutzererfahrung hinzu
        button.title = 'Klicken, um den Text zu kopieren';
    });
}

/**
 * Verbessert die Benutzererfahrung durch Hervorheben des Code-Blocks
 * beim Überfahren mit der Maus
 */
function initializeCodeBlockHighlights() {
    const copyContainers = document.querySelectorAll('.copy-container');
    
    copyContainers.forEach(container => {
        const preElement = container.querySelector('pre');
        
        container.addEventListener('mouseenter', function() {
            preElement.style.backgroundColor = '#f1f3f4';
        });
        
        container.addEventListener('mouseleave', function() {
            preElement.style.backgroundColor = '#F8F9FA';
        });
    });
}

/**
 * Fügt Tastatur-Shortcuts für verbesserte Zugänglichkeit hinzu
 */
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Strg+C oder Cmd+C sollte nicht blockiert werden, aber wir können
        // eine spezielle Funktion für Strg+Alt+C hinzufügen
        if ((event.ctrlKey || event.metaKey) && event.altKey && event.key === 'c') {
            // Finde den ersten Kopier-Button und führe ihn aus
            const firstCopyButton = document.querySelector('.copy-btn');
            if (firstCopyButton) {
                event.preventDefault();
                copyToClipboard(firstCopyButton);
            }
        }
    });
}

/**
 * Initialisiert alle JavaScript-Funktionalitäten, wenn das DOM geladen ist
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere alle Kopier-Buttons
    initializeCopyButtons();
    
    // Initialisiere Code-Block-Hervorhebungen
    initializeCodeBlockHighlights();
    
    // Initialisiere Tastatur-Shortcuts
    initializeKeyboardShortcuts();
    
    console.log('Digitale Werkstatt - JavaScript initialisiert');
});

/**
 * Fallback für das Laden ohne DOMContentLoaded (für ältere Browser)
 */
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Wenn das DOM bereits geladen ist, führe die Initialisierung direkt aus
    initializeCopyButtons();
    initializeCodeBlockHighlights();
    initializeKeyboardShortcuts();
}

// Exportiere die Hauptfunktion für die Verwendung in anderen Skripten
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        copyToClipboard: copyToClipboard,
        initializeCopyButtons: initializeCopyButtons
    };
}
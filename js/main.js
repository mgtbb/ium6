

// Funktion zum Laden von gemeinsamen Inhalten
function loadSharedContent(elementId, contentPath) {
    fetch(contentPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading shared content:', error);
        });
}

// Funktion zum Einbinden von Feedback-Vorlagen
function loadFeedbackTemplate(templateType) {
    const templateMap = {
        'powerpoint': 'shared/feedback-vorlage-powerpoint.html',
        'word': 'shared/feedback-vorlage-word.html',
        'excel': 'shared/feedback-vorlage-excel.html'
    };
    
    if (templateMap[templateType]) {
        const feedbackContainer = document.getElementById('feedback-container');
        if (feedbackContainer) {
            loadSharedContent('feedback-container', templateMap[templateType]);
        }
    }
}

// Beim Laden der Seite prüfen, ob Feedback-Vorlagen geladen werden müssen
document.addEventListener('DOMContentLoaded', function() {
    const pageType = document.body.getAttribute('data-page-type');
    if (pageType) {
        loadFeedbackTemplate(pageType);
    }
});

// Funktion zum Kopieren von Text in die Zwischenablage
function copyToClipboard(button) {
    const codeElement = button.previousElementSibling;
    const text = codeElement.textContent;
    
    // Erstelle ein temporäres Textarea-Element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    
    // Wähle den Text und kopiere ihn
    textarea.select();
    document.execCommand('copy');
    
    // Entferne das temporäre Element
    document.body.removeChild(textarea);
    
    // Ändere den Button-Text kurzzeitig
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Kopiert!';
    
    // Setze den ursprünglichen Text nach 2 Sekunden wieder zurück
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
}

// Funktion für ausklappbare Elemente
document.addEventListener('DOMContentLoaded', function() {
    const collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

// Funktion zum Laden von gemeinsamen Inhalten
function loadSharedContent(elementId, contentPath) {
    fetch(contentPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading shared content:', error);
        });
}

// Funktion zum Einbinden von Feedback-Vorlagen
function loadFeedbackTemplate(templateType) {
    const templateMap = {
        'powerpoint': 'shared/feedback-vorlage-powerpoint.html',
        'word': 'shared/feedback-vorlage-word.html',
        'excel': 'shared/feedback-vorlage-excel.html'
    };
    
    if (templateMap[templateType]) {
        const feedbackContainer = document.getElementById('feedback-container');
        if (feedbackContainer) {
            loadSharedContent('feedback-container', templateMap[templateType]);
        }
    }
}

// Beim Laden der Seite prüfen, ob Feedback-Vorlagen geladen werden müssen
document.addEventListener('DOMContentLoaded', function() {
    const pageType = document.body.getAttribute('data-page-type');
    if (pageType) {
        loadFeedbackTemplate(pageType);
    }
});

let installButton = document.querySelector(".install-button")

let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log(e);
        deferredPrompt = e;
    });

    installButton.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    })
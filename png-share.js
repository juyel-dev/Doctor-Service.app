/**
 * png-share.js — PNG generation and sharing for doctor cards.
 * Uses html2canvas to capture a card and triggers download/share.
 * Adds watermark "Cooch Behar Healthcare".
 */
const PngShare = (() => {
    /**
     * Generate a PNG from a doctor card element and trigger download.
     * @param {Object} doctor - doctor data object
     * @param {HTMLElement} cardElement - the card DOM node to capture
     */
    async function generateAndShare(doctor, cardElement) {
        if (typeof html2canvas === 'undefined') {
            alert('Sharing is not available right now. Please try again later.');
            return;
        }
        try {
            // Clone the card into the hidden render target to avoid UI interference
            const target = document.getElementById('shareRenderTarget');
            target.innerHTML = '';
            const clone = cardElement.cloneNode(true);
            // Remove action buttons from clone to keep share image clean
            const actionBtns = clone.querySelectorAll('.card__actions');
            actionBtns.forEach(btn => btn.remove());
            // Add watermark
            const watermark = document.createElement('div');
            watermark.style.textAlign = 'center';
            watermark.style.padding = '0.5rem';
            watermark.style.fontSize = '0.8rem';
            watermark.style.color = '#718096';
            watermark.textContent = 'Cooch Behar Healthcare Directory';
            clone.appendChild(watermark);
            target.appendChild(clone);

            const canvas = await html2canvas(clone, {
                backgroundColor: '#ffffff',
                scale: 2, // higher resolution
                logging: false
            });

            // Convert to blob and trigger download
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const filename = `doctor-${doctor.name.replace(/\s+/g, '-').toLowerCase()}.png`;

                // Try Web Share API first (mobile)
                if (navigator.share && navigator.canShare) {
                    const file = new File([blob], filename, { type: 'image/png' });
                    if (navigator.canShare({ files: [file] })) {
                        navigator.share({
                            files: [file],
                            title: `Dr. ${doctor.name}`,
                            text: `Find Dr. ${doctor.name} on Cooch Behar Healthcare Directory`
                        }).catch(() => fallbackDownload(url, filename));
                        return;
                    }
                }
                fallbackDownload(url, filename);
            }, 'image/png');

            // Clean up clone after short delay
            setTimeout(() => { target.innerHTML = ''; }, 1000);
        } catch (error) {
            console.error('PNG generation failed:', error);
            alert('Could not generate image. Please try again.');
        }
    }

    function fallbackDownload(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    return { generateAndShare };
})();

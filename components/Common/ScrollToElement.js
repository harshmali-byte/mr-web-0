
export default function ScrollToElement(event, elementId) {
    const anchor = (
        event.target.ownerDocument || document
    ).querySelector(elementId);

    if (anchor) {
        anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }
}
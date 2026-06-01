
export default function HtmlViewer({ id, htmlText }) {
    return (
        <div id={id} className="htmlContent" dangerouslySetInnerHTML={{ __html: htmlText }} />
    )
}
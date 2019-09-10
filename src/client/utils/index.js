import Marked from 'marked'
import SanitizeHtml from 'sanitize-html'

const sanitizeOptions = {
  allowedTags: [
    'a',
    'b',
    'br',
    'blockquote',
    'caption',
    'code',
    'div',
    'em',
    'h1',
    'h2',
    'h3',
    'hr',
    'i',
    'img',
    'li',
    'nl',
    'ol',
    'p',
    'pre',
    'strong',
    'strike',
    'table',
    'tbody',
    'td',
    'thead',
    'tr',
    'ul',
  ],
  allowedAttributes: {
    a: ['href'],
    img: ['src'],
  },
  allowedSchemes: ['http', 'https'],
  allowedSchemesAppliedToAttributes: ['href'],
}

export const removeHtmlTags = string => string.replace(/<(.|\n)*?>/g, '')

export const renderMarkdown = markdown => {
  const dirty = Marked(markdown)
  return SanitizeHtml(dirty, sanitizeOptions)
}

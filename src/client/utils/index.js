import Marked from 'marked'
import SanitizeHtml from 'sanitize-html'
import Toml from 'toml'

const metaDataRegex = /\+{3}[^]+\+{3}/gm

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

export const defaultState = {
  article: {
    markdown: '',
    tags: [],
    title: '',
    translations: {},
  },
  description: '',
  menu: false,
  outline: [],
  searchResults: [],
  tags: [],
  title: '',
}

export const getMetaData = content => {
  metaDataRegex.lastIndex = 0
  const match = metaDataRegex.exec(content)
  if (match) {
    const tomlLength = match[0].length
    const toml = match[0].substring(3, tomlLength - 3)
    const metadata = Toml.parse(toml)
    const markdown = content.replace(match[0], '')
    return { ...metadata, markdown }
  }
  return {
    markdown: content,
  }
}

export const removeHtmlTags = string => string.replace(/<(.|\n)*?>/g, '')

export const renderMarkdown = markdown => {
  const dirty = Marked(markdown)
  return SanitizeHtml(dirty, sanitizeOptions)
}

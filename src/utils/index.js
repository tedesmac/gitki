import { createRenderer } from 'vue-server-renderer'

const imgTagRegex = /!\[.*\]\(.*\)/g
const imgUrlRegex = /\(.*\)/g

export const fixImgTags = markdown => {
  return markdown
    .match(imgTagRegex)
    .map(match => {
      const index = match.search(imgUrlRegex)
      const url = match.substring(index)
      return [url, `(/static/${  url.substring(1)}`]
    })
    .reduce((acc, replacement) => {
      const faultyUrl = replacement[0]
      const fixedUrl = replacement[1]
      return acc.replace(faultyUrl, fixedUrl)
    }, markdown)
}

export const renderer = createRenderer({
  template: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/static/css/main.css">
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
`,
})

import {parse, process, stringify} from 'https://unpkg.com/cssomtools'

function mediaExpander(stylesheet) {
  const rules = []
  process(
    parse(stylesheet),
    (rule, name='media') => {
      const queries = []
      if (
        rule.style
        && [...rule.style].some(property => 
          property.startsWith(`--${name}`)
          && rule.style.getPropertyValue(property).trim().match(/^\([^)]+\)/)
          && rule.style.getPropertyValue(property).trim().match(/\{[^}]+\}$/)
        )
      ) {
        [...rule.style]
          .filter(property => property.startsWith(`--${name}`))
          .forEach(property => {
            const value = rule.style.getPropertyValue(property).trim()
            rule.style.removeProperty(property)
            queries.push(
              `@media ${value.match(/^\([^)]+\)/)} {
                ${rule.selectorText} ${value.match(/\{[^}]+\}$/)}
              }`
            )
          })
      }
      rules.push(rule.cssText)
      queries.forEach(query => rules.push(query))
    }
  )
  return parse(rules.join(''))
}

function render(event) {
  localStorage[pluginName] = input.getSession().getValue()

  output.getSession().setValue(
    stringify(
      mediaExpander(localStorage[pluginName])
    )
  )

  return beautify.beautify(output.session)
}

// Demo setup below
const pluginName = 'mediaexpander'
const input = ace.edit('input')
const output = ace.edit('output')
const beautify = ace.require('ace/ext/beautify')

input.setTheme('ace/theme/cobalt')
input.session.setMode('ace/mode/css')
input.setFontSize(18)
input.session.setTabSize(2)
input.container.style.lineHeight = 1.4
input.renderer.setScrollMargin(10, 10)
input.session.setUseSoftTabs(true)
input.session.setUseWrapMode(true)
input.getSession().setUseWorker(false)

if (localStorage[pluginName] !== undefined) {
  input.getSession().setValue(localStorage[pluginName])
}

['keyup', 'blur', 'paste'].forEach(evt =>
  input.textInput.getElement().addEventListener(evt, render)
)

output.setTheme('ace/theme/cobalt')
output.session.setMode('ace/mode/css')
output.setFontSize(18)
output.session.setTabSize(2)
output.container.style.lineHeight = 1.4
output.renderer.setScrollMargin(10, 10)
output.session.setUseSoftTabs(true)
output.session.setUseWrapMode(true)
output.getSession().setUseWorker(false)

window.addEventListener('load', render)
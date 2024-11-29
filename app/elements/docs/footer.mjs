function readNext (nextLink) {
  if (nextLink && nextLink.label && nextLink.path) {
    return /* html */ `
      <doc-callout level="none" mark="${nextLink.mark || 'none'}">
        <a class="font-medium" href="${nextLink.path}">${nextLink.label} →</a>
        ${nextLink.description
    ? `<p class="mbs-4 leading2">${nextLink.description}</p>`
    : ''
}
      </doc-callout>
    `
  }
  else {
    return ''
  }
}

function communityResources (communityLinks) {
  if (communityLinks?.length > 0) {
    const links = communityLinks
      .map((link) => {
        const url = link?.url || ''
        const label = link?.label || ''
        const description = link?.description || ''

        return /* html */ `
          <h4 class="font-medium"><a href="${url}" target="_blank">${label}</a></h4>
          <p class="mbe0">
            ${description}
          </p>
        `
      })
      .join('')

    return /* html */ `
      <footer class="p0 leading3">
        <h3 class="mbe0">Community Resources</h3>
        ${links}
      </footer>
    `
  }
  else {
    return ''
  }
}

export default function Footer ({ html, state }) {
  const {
    store: { doc, otherLinks },
  } = state

  return html`
    <style>
      :host {
        display: block;
      }

      :host > footer {
        color: var(--inky-lily);
        background-color: var(--cloud-ateneo);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      }
    </style>

    ${readNext(doc.frontmatter?.['read-next'])}

    <hr class="block mb3 border1" />

    <docs-pager></docs-pager>

    ${communityResources(otherLinks?.community?.items)}
  `
}

/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo } from 'react'
import { defineMessages } from 'react-intl'
import { canUseDOM } from 'vtex.render-runtime'
import insane from 'insane'

declare const _ltk: any

const sanitizerConfig = {
  allowedTags: [
    'p',
    'span',
    'a',
    'div',
    'br',
    'img',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
  ],
  allowedAttributes: {
    a: ['class', 'href', 'title', 'target', 'style'],
    span: ['class', 'style'],
    p: ['class', 'style'],
    div: ['class', 'style'],
    img: ['class', 'src', 'title', 'alt', 'style'],
    h1: ['class', 'style'],
    h2: ['class', 'style'],
    h3: ['class', 'style'],
    h4: ['class', 'style'],
    h5: ['class', 'style'],
    h6: ['class', 'style'],
    ul: ['class', 'style'],
    ol: ['class', 'style'],
    li: ['class', 'style'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
}

const OnSiteRecommendations: StorefrontFunctionComponent<Props> = ({
  merchandiseBlockId,
  templateHTML,
}) => {
  const html = useMemo(() => {
    return insane(templateHTML, sanitizerConfig)
  }, [templateHTML])

  useEffect(() => {
    _ltk.Recommender.AddField('SalePrice')
    _ltk.Recommender.AddField('Price')
    _ltk.Recommender.AddField('Brand')
    _ltk.Recommender.AddField('MSRP')
    _ltk.Recommender.Render()
  }, [])
  if (merchandiseBlockId == '' || templateHTML == '' || !canUseDOM) return null
  return (
    <div
      className="ltk-recommendations"
      data-ltk-merchandiseblock={merchandiseBlockId}
    >
      <script
        type="text/html"
        dangerouslySetInnerHTML={{ __html: html }}
      ></script>
    </div>
  )
}

interface Props {
  merchandiseBlockId: string
  templateHTML: string
}

OnSiteRecommendations.defaultProps = {
  merchandiseBlockId: '',
  templateHTML: '',
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.listrakOnSiteRecommendationsBlock.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.listrakOnSiteRecommendationsBlock.description',
  },
  merchandiseBlockId: {
    defaultMessage: '',
    id:
      'admin/editor.listrakOnSiteRecommendationsBlock.merchandiseBlockId.title',
  },
  templateHTML: {
    defaultMessage: '',
    id: 'admin/editor.listrakOnSiteRecommendationsBlock.templateHTML.title',
  },
})

OnSiteRecommendations.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    merchandiseBlockId: {
      title: messages.merchandiseBlockId.id,
      type: 'string',
      isLayout: false,
      default: '',
    },
    templateHTML: {
      title: messages.templateHTML.id,
      type: 'string',
      isLayout: false,
      default: '',
    },
  },
}

export default OnSiteRecommendations

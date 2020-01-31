/* eslint-disable no-var */
/* eslint-disable no-undef */
import { canUseDOM } from 'vtex.render-runtime'

import { PixelMessage } from './typings/events'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare var _ltk: any

function addPixelImage() {
  const token = window.__listrak_merchant_id
  const img = document.createElement('img')
  const url = `https://fp.listrakbi.com/fp/${token}.jpg`

  img.setAttribute('src', url)
  img.setAttribute('height', '1')
  img.setAttribute('width', '1')

  document.body.appendChild(img)
}

export function handleEvents(event: PixelMessage) {
  switch (event.data.eventName) {
    case 'vtex:pageView': {
      _ltk.SCA.CaptureEmail('newsletter-input')
      if (window.__listrak_email_ids.length > 0) {
        window.__listrak_email_ids.forEach(emailId => {
          _ltk.SCA.CaptureEmail(emailId)
        })
      }
      _ltk.Activity.AddPageBrowse()
      _ltk.Activity.Submit()
      break
    }
    case 'vtex:productView': {
      const { product } = event.data
      if (product.selectedSku && product.selectedSku.itemId) {
        _ltk.Activity.AddProductBrowse(product.selectedSku.itemId)
      }
      break
    }
    case 'vtex:cartChanged': {
      const { items } = event.data
      if (items.length > 0) {
        items.forEach(item => {
          _ltk.SCA.AddItemWithLinks(
            item.skuId,
            item.quantity,
            item.price.toString(),
            item.name,
            item.imageUrl,
            item.detailUrl
          )
        })
        _ltk.SCA.Submit()
      } else {
        _ltk.SCA.ClearCart()
      }
      break
    }
    case 'vtex:orderPlaced': {
      addPixelImage()
      const {
        transactionProducts,
        visitorContactInfo,
        transactionId,
        transactionSubtotal,
        transactionShipping,
        transactionTax,
        transactionTotal,
      } = event.data
      _ltk.Order.SetCustomer(
        visitorContactInfo[0],
        visitorContactInfo[1],
        visitorContactInfo[2]
      )
      _ltk.Order.OrderNumber = transactionId
      _ltk.Order.ItemTotal = transactionSubtotal.toString()
      _ltk.Order.ShippingTotal = transactionShipping.toString()
      _ltk.Order.TaxTotal = transactionTax.toString()
      _ltk.Order.HandlingTotal = '0'
      _ltk.Order.OrderTotal = transactionTotal.toString()
      transactionProducts.forEach(product => {
        _ltk.Order.AddItem(
          product.id,
          product.quantity,
          product.sellingPrice.toString()
        )
      })
      _ltk.Order.Submit()
      break
    }
    default: {
      return
    }
  }
}

if (canUseDOM && _ltk) {
  window.addEventListener('message', handleEvents)
}

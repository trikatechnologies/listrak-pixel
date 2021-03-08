/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-var */
/* eslint-disable no-undef */
import { canUseDOM } from 'vtex.render-runtime'

import {
  PixelMessage,
  CartItem,
  ProductDetail,
  ProductOrder,
} from './typings/events'

declare var _ltk: any
declare var _ltk_util: any

function addPixelImage() {
  const token = window.__listrak_merchant_id
  const img = document.createElement('img')
  const url = `https://fp.listrakbi.com/fp/${token}.jpg`

  img.setAttribute('src', url)
  img.setAttribute('height', '1')
  img.setAttribute('width', '1')

  document.body.appendChild(img)
}

function getProductId(product: ProductDetail) {
  if (window.__listrak_useRefIdSetting) {
    return product.selectedSku.referenceId[0]?.Value
  }
  return product.selectedSku.itemId
}

function getCartProductId(product: CartItem) {
  if (window.__listrak_useRefIdSetting) {
    return product.referenceId
  }
  return product.skuId
}

function getOrderProductId(product: ProductOrder) {
  if (window.__listrak_useRefIdSetting) {
    return product.skuRefId
  }
  return product.id
}

export function handleEvents(event: PixelMessage) {
  switch (event.data.eventName) {
    case 'vtex:pageView': {
      ;(() => {
        if (typeof _ltk === 'object') {
          ltkCode()
        } else {
          ;(d => {
            if (document.addEventListener)
              document.addEventListener('ltkAsyncListener', d)
            else {
              const e = document.documentElement
              e.ltkAsyncProperty = 0
              e.attachEvent('onpropertychange', (f: any) => {
                if (f.propertyName === 'ltkAsyncProperty') {
                  d()
                }
              })
            }
          })(() => {
            ltkCode()
          })
        }
        function ltkCode() {
          _ltk_util.ready(() => {
            if (window.__listrak_email_ids.length > 0) {
              window.__listrak_email_ids.forEach(emailId => {
                _ltk.SCA.CaptureEmail(emailId)
              })
            }
            _ltk.Activity.AddPageBrowse()
            _ltk.Activity.Submit()
          })
        }
      })()
      break
    }
    case 'vtex:productView': {
      const { product } = event.data
      ;(() => {
        if (typeof _ltk === 'object') {
          ltkCode()
        } else {
          ;(d => {
            if (document.addEventListener)
              document.addEventListener('ltkAsyncListener', d)
            else {
              const e = document.documentElement
              e.ltkAsyncProperty = 0
              e.attachEvent('onpropertychange', (f: any) => {
                if (f.propertyName === 'ltkAsyncProperty') {
                  d()
                }
              })
            }
          })(() => {
            ltkCode()
          })
        }
        function ltkCode() {
          _ltk_util.ready(() => {
            if (!product.selectedSku) return
            const productId = getProductId(product)
            if (!productId) return
            _ltk.Activity.AddProductBrowse(productId)
          })
        }
      })()
      break
    }
    case 'vtex:cartChanged': {
      const { items } = event.data
      ;(() => {
        if (typeof _ltk === 'object') {
          ltkCode()
        } else {
          ;(d => {
            if (document.addEventListener)
              document.addEventListener('ltkAsyncListener', d)
            else {
              const e = document.documentElement
              e.ltkAsyncProperty = 0
              e.attachEvent('onpropertychange', (f: any) => {
                if (f.propertyName === 'ltkAsyncProperty') {
                  d()
                }
              })
            }
          })(() => {
            ltkCode()
          })
        }
        function ltkCode() {
          _ltk_util.ready(() => {
            if (items.length > 0) {
              items.forEach(item => {
                _ltk.SCA.AddItemWithLinks(
                  getCartProductId(item),
                  item.quantity,
                  (item.price / 100).toString(),
                  item.name,
                  item.imageUrl,
                  item.detailUrl
                )
              })
              _ltk.SCA.Submit()
            } else {
              _ltk.SCA.ClearCart()
            }
          })
        }
      })()
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
      ;(() => {
        if (typeof _ltk === 'object') {
          ltkCode()
        } else {
          ;(d => {
            if (document.addEventListener)
              document.addEventListener('ltkAsyncListener', d)
            else {
              const e = document.documentElement
              e.ltkAsyncProperty = 0
              e.attachEvent('onpropertychange', (f: any) => {
                if (f.propertyName === 'ltkAsyncProperty') {
                  d()
                }
              })
            }
          })(() => {
            ltkCode()
          })
        }
        function ltkCode() {
          _ltk_util.ready(() => {
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
                getOrderProductId(product),
                product.quantity,
                product.sellingPrice.toString()
              )
            })

            _ltk.Order.Submit()
          })
        }
      })()
      break
    }
    case 'vtex:newsletterInput': {
      ;(() => {
        if (typeof _ltk === 'object') {
          ltkCode()
        } else {
          ;(d => {
            if (document.addEventListener)
              document.addEventListener('ltkAsyncListener', d)
            else {
              const e = document.documentElement
              e.ltkAsyncProperty = 0
              e.attachEvent('onpropertychange', (f: any) => {
                if (f.propertyName === 'ltkAsyncProperty') {
                  d()
                }
              })
            }
          })(() => {
            ltkCode()
          })
        }
        function ltkCode() {
          _ltk_util.ready(() => {
            _ltk.SCA.CaptureEmail('newsletter-input')
          })
        }
      })()
      break
    }
    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}

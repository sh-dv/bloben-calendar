
/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
import base64url from './base64url'
import {BASE_URL} from "../../bloben-common/globals/url";
import Axios from "../../bloben-common/utils/axios";

/**
 * Client
 * @ignore
 */
class Client {
  constructor (options = {}) {
    const defaults = {
      pathPrefix: BASE_URL + '/webauthn',
      credentialEndpoint: '/register',
      assertionEndpoint: '/login',
      challengeEndpoint: '/response',
      logoutEndpoint: '/logout',
    }

    Object.assign(this, defaults, options)
  }

  static publicKeyCredentialToJSON (pubKeyCred) {
    if (ArrayBuffer.isView(pubKeyCred)) {
      return Client.publicKeyCredentialToJSON(pubKeyCred.buffer)
    }

    if (pubKeyCred instanceof Array) {
      const arr = []

      for (let i of pubKeyCred) {
        arr.push(Client.publicKeyCredentialToJSON(i))
      }

      return arr
    }

    if (pubKeyCred instanceof ArrayBuffer) {
      return base64url.encode(pubKeyCred)
    }

    if (pubKeyCred instanceof Object) {
      const obj = {}

      for (let key in pubKeyCred) {
        obj[key] = Client.publicKeyCredentialToJSON(pubKeyCred[key])
      }

      return obj
    }

    return pubKeyCred
  }

  static generateRandomBuffer (len) {
    const buf = new Uint8Array(len || 32)
    window.crypto.getRandomValues(buf)
    return buf
  }

  static preformatMakeCredReq (makeCredReq) {
    makeCredReq.challenge = base64url.decode(makeCredReq.challenge)
    makeCredReq.user.id = base64url.decode(makeCredReq.user.id)
    return makeCredReq
  }

  static preformatGetAssertReq (getAssert) {
    return new Promise((resolve ) => {
      getAssert.challenge = base64url.decode(getAssert.challenge)

      for (let i=0; i< getAssert.allowCredentials.length; i++) {
        let allowCred = getAssert.allowCredentials[i];
        allowCred.id = base64url.decode(allowCred.id)

        if (i+1 === getAssert.allowCredentials.length) {
          resolve(getAssert)
        }
      }
    })
  }

  // Register endpoint
  async getMakeCredentialsChallenge (formBody) {
    const response = await fetch(`${this.pathPrefix}${this.credentialEndpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formBody)
    })

    if (response.status === 403) {
      const failureMessage = (await response.json()).message
      const errorMessage = 'Registration failed'
      throw new Error(failureMessage ? `${errorMessage}: ${failureMessage}.` : `${errorMessage}.`)
    }

    if (response.status < 200 || response.status > 205) {
      throw new Error('Server responded with error.')
    }

    return await response.json()
  }

  async sendWebAuthnResponse (body) {
    const response = await fetch(`${this.pathPrefix}${this.challengeEndpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (response.status !== 200) {
      throw new Error('Server responded with error.')
    }

    return await response.json()
  }

  async getGetAssertionChallenge (formBody) {
    const response = await fetch(`${this.pathPrefix}${this.assertionEndpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formBody)
    })

    if (response.status !== 200) {
      throw new Error('Server responded with error.')
    }

    return await response.json()
  }

   async register (data = {}) {
    // Register endpoint
    const challenge = await this.getMakeCredentialsChallenge(data)

    const publicKey = Client.preformatMakeCredReq(challenge)

    const credential = await navigator.credentials.create({ publicKey })

    const credentialResponse = Client.publicKeyCredentialToJSON(credential)

    return await this.sendWebAuthnResponse(credentialResponse)
  }

  async login (data = {}) {
    const challenge = await this.getGetAssertionChallenge(data)

    Client.preformatGetAssertReq(challenge).then(publicKey2 => {
      const publicKey = {allowCredentials: publicKey2.allowCredentials,
        challenge: publicKey2.challenge,
        userVerification: "preferred",
        timeout: 60000}
      navigator.credentials.get({ publicKey }).then(credential => {
        const credentialResponse = Client.publicKeyCredentialToJSON(credential)

        return  this.sendWebAuthnResponse(credentialResponse)
      })
    })
  }

  async logout () {
    const response = await fetch(`${this.pathPrefix}${this.logoutEndpoint}`, {
      method: 'GET',
      credentials: 'include',
    })

    if (response.status !== 200) {
      throw new Error('Server responded with error.')
    }

    return await response.json()
  }

}

/**
 * Exports
 * @ignore
 */
export default Client

import { strict as assert } from 'assert'
import { get_token } from '../src/Machine'

const CLIENT_ID = 'cvpzAi37wmF3KYfyxsONtxvLCcDehjZpPgl3XVlfanBQU2io4CaSFFdfbrMUS'
const CLIENT_SCRET = '40uSaqULTh8aKhFHjvljrOkheEPMVvgmXGU5QoVuc8d57nOxRuFZCEGj4aWUH'

describe('Machine', function () {
  it('Machine', async function () {
    this.timeout(3000)
    const res = await get_token(CLIENT_ID, CLIENT_SCRET)
    assert.deepEqual(Object.keys(res), ['access_token', 'expires_in', 'scope', 'refresh_token', 'token_type'])
  })
})

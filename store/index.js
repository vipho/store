import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import fetch from 'isomorphic-unfetch'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

export class Store {
    @observable generalInfo = {}

    @action setGeneralInfo = data => {
        this.generalInfo = data
    }
}

export async function fetchGeneralInfo() {
    const res = await fetch(`${process.env.API_URL}/info/general`)
    const { data } = await res.json()
    return data
}

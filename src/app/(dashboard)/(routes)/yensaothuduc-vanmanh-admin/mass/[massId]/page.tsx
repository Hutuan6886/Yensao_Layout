import React from 'react'
import MassForm from './components/MassForm'
import { getMassById } from '@/actions/getPrismaData'

const page = async ({ params }: { params: { massId: string } }) => {
    const mass = await getMassById(params.massId)

    return (
        <MassForm massData={mass} />
    )
}

export default page

'use client'
import React, { useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { customIcon } from './services/map-icon'
import { map } from './services/contact-data'
import ContactMapPopup from './ContactMapPopup'
import "leaflet/dist/leaflet.css"

const ContactMap = () => {
    const markerRef = useRef<L.Marker>(null)
    return (
        <div className='w-full h-[300px]'>
            <MapContainer style={{ width: '100%', height: '100%' }} center={map.center} zoom={map.zoom} scrollWheelZoom={map.isScrollZoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={map.marker} icon={customIcon} ref={markerRef} eventHandlers={{
                    add: () => {
                        //* Auto-open popup after component mount
                        markerRef.current?.openPopup();
                    },
                }}>
                    <Popup>
                        <ContactMapPopup />
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default ContactMap

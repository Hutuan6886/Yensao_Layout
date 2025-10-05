'use client'
import React, { useEffect } from 'react'

declare global {
    interface Window {
        FB: any
    }
}

const ContactMapPopup = () => {
    useEffect(() => {
        // Hàm load SDK
        const loadFacebookSDK = () => {
            if (document.getElementById('facebook-jssdk')) return

            const script = document.createElement('script')
            script.id = 'facebook-jssdk'
            script.src = 'https://connect.facebook.net/vi_VN/sdk.js'
            script.async = true
            script.defer = true
            script.crossOrigin = 'anonymous'
            script.onload = () => {
                if (window.FB) {
                    window.FB.init({
                        xfbml: true,
                        version: 'v20.0',
                    })
                }
            }
            document.body.appendChild(script)
        }

        loadFacebookSDK()

        // Parse lại fb-page nếu SDK đã sẵn sàng
        if (window.FB) {
            window.FB.XFBML.parse()
        }
    }, [])

    return (
        <div>
            <div id="fb-root"></div>
            <div
                className="fb-page"
                data-href=""
                data-tabs="timeline"
                data-width="400"
                data-height="600"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
            ></div>
        </div>
    )
}

export default ContactMapPopup

import { SiZalo } from 'react-icons/si'
import { TbBrandShopee } from 'react-icons/tb'
import { FaFacebookSquare } from 'react-icons/fa'
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5'
import { LatLngExpression } from 'leaflet'
export const contact = [
  {
    content: [{
      icon: <IoLocationOutline size={50} />,
      title: 'Cửa Hàng',
      desc: '523a Đỗ Xuân Hợp, Phước Long, Hồ Chí Minh, Việt Nam'
    }]
  }, {
    content: [{
      icon: <IoCalendarOutline size={50} />,
      title: 'Thời Gian Hoạt Động',
      desc: '09:00 am – 09:00 pm'
    }]
  }, {
    content: [
      {
        icon: <FaFacebookSquare size={50} />,
        title: 'Facebook',
        desc: 'Yến sào Hữu Tuân',
        href: 'facebook.com/yensaohuutuan/'
      }, {
        icon: <TbBrandShopee size={50} />,
        title: 'Shopee',
        desc: 'Yến sào Hữu Tuân',
        href: 'https://shopee.vn/thuducnest'
      }, {
        icon: <SiZalo size={50} />,
        title: 'Zalo',
        desc: '(+84) 353 898 846',
        href: 'https://zalo.me/0353898846'
      }
    ]
  }]

type Map = {
  center: LatLngExpression;
  marker: LatLngExpression;
  zoom: number;
  isScrollZoom: boolean
}
export const map: Map = {
  center: [10.8231, 106.7426],
  zoom: 12,
  marker: [10.813980123810955, 106.77862225239637],
  isScrollZoom: true
}
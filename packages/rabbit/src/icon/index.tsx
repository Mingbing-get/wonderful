import React, { SVGProps } from 'react'
import classNames from 'classnames'

import './index.scss'

const pathMap = {
  add: <path d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z" p-id="16458" />,
  scissor: <path d="M160.731429 464.530286c74.715429 0 86.710857-30.774857 119.862857-30.774857 7.588571 0 13.184 1.590857 23.186285 6.4l67.913143 35.949714c7.990857 4.388571 14.774857 8.393143 20.370286 11.995428h2.395429c9.197714-33.572571 23.972571-55.149714 49.554285-71.131428v-2.377143l-91.099428-48.347429c-28.361143-15.177143-30.774857-27.574857-30.774857-63.140571 0-90.294857-71.899429-162.194286-161.408-162.194286C71.643429 140.909714 0.128 213.211429 0.128 303.085714c0 89.508571 71.515429 161.426286 160.603429 161.426286z m0-65.133715c-52.333714 0-95.085714-43.556571-95.085715-96.292571 0-53.942857 42.752-96.676571 95.085715-96.676571 53.942857 0 96.292571 42.752 96.292571 96.676571a96.073143 96.073143 0 0 1-96.292571 96.292571z m0 519.789715c89.508571 0 161.408-71.917714 161.408-162.194286 0-33.170286 1.609143-46.354286 25.965714-59.538286L1024.128 338.267429c-16.384-59.922286-81.499429-70.308571-180.992-34.742858l-341.211429 122.642286c-47.926857 17.188571-68.315429 40.758857-81.499428 85.101714l-7.972572 29.165715c-5.997714 20.772571-15.177143 31.158857-46.354285 47.140571l-62.336 32.768c-9.984 5.193143-15.579429 6.784-23.168 6.784-33.152 0-45.147429-31.158857-119.862857-31.158857C71.643429 595.968 0.128 667.885714 0.128 756.973714c0 89.892571 71.515429 162.212571 160.603429 162.212572z m350.390857-377.161143c-17.974857 0-33.554286-14.774857-33.554286-33.152 0-19.181714 15.579429-33.572571 33.554286-33.572572 18.377143 0 33.956571 14.390857 33.956571 33.572572 0 18.377143-15.579429 33.152-33.956571 33.152z m332.013714 215.753143c100.278857 37.156571 164.608 25.161143 180.992-36.352l-325.211429-171.812572L533.888 636.342857v4.790857zM160.731429 853.668571c-52.333714 0-95.085714-42.752-95.085715-96.694857 0-52.736 42.752-95.890286 95.085715-95.890285 53.942857 0 96.292571 43.154286 96.292571 95.890285 0 53.942857-42.349714 96.694857-96.292571 96.694857z" p-id="4908" />,
  expand: <path d="M853.333333 213.333333a42.666667 42.666667 0 0 0-42.666666-42.666666h-213.333334a42.666667 42.666667 0 0 0 0 85.333333h109.653334l-139.946667 140.373333a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0L768 316.586667V426.666667a42.666667 42.666667 0 0 0 42.666667 42.666666 42.666667 42.666667 0 0 0 42.666666-42.666666zM456.96 567.04a42.666667 42.666667 0 0 0-60.586667 0L256 706.986667V597.333333a42.666667 42.666667 0 0 0-42.666667-42.666666 42.666667 42.666667 0 0 0-42.666666 42.666666v213.333334a42.666667 42.666667 0 0 0 42.666666 42.666666h213.333334a42.666667 42.666667 0 0 0 0-85.333333H316.586667l140.373333-140.373333a42.666667 42.666667 0 0 0 0-60.586667z" p-id="5378" />,
  shrink: <path d="M456.96 481.706667l-106.666667-106.666667a42.666667 42.666667 0 1 0-60.586666 60.586667l34.133333 33.706666H128a42.666667 42.666667 0 0 0 0 85.333334h195.84l-34.133333 33.706666a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586666 0l106.666667-106.666667a42.666667 42.666667 0 0 0 8.96-14.08 42.666667 42.666667 0 0 0 0-32.426666 42.666667 42.666667 0 0 0-8.96-14.08zM896 469.333333h-195.84l34.133333-33.706666a42.666667 42.666667 0 0 0-60.586666-60.586667l-106.666667 106.666667a42.666667 42.666667 0 0 0-8.96 14.08 42.666667 42.666667 0 0 0 0 32.426666 42.666667 42.666667 0 0 0 8.96 14.08l106.666667 106.666667a42.666667 42.666667 0 0 0 60.586666 0 42.666667 42.666667 0 0 0 0-60.586667l-34.133333-33.706666H896a42.666667 42.666667 0 0 0 0-85.333334z" p-id="10915" />,
  repeat: (
    <>
      <path d="M832 736H352c-35.2 0-64-28.8-64-64V192c0-35.2 28.8-64 64-64h480c35.2 0 64 28.8 64 64v480c0 35.2-28.8 64-64 64z" fill="" p-id="21611" />
      <path d="M288 800c-35.2 0-64-28.8-64-64V288H192c-35.2 0-64 28.8-64 64v480c0 35.2 28.8 64 64 64h480c35.2 0 64-28.8 64-64v-32H288z" fill="" p-id="21612" />
    </>
  ),
  arrowDown: <path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z" p-id="1850"></path>,
  arrowUp: <path d="M500.8 461.909333L267.306667 695.296l-45.226667-45.269333 278.741333-278.613334L779.306667 650.026667l-45.248 45.226666z" p-id="1892"></path>,
  arrowLeft: <path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="1962"></path>,
  arrowRight: <path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="2074"></path>,
  arrowDownFill: <path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z" p-id="26523"></path>,
  loading: <path d="M834.7648 736.3584a5.632 5.632 0 1 0 11.264 0 5.632 5.632 0 0 0-11.264 0z m-124.16 128.1024a11.1616 11.1616 0 1 0 22.3744 0 11.1616 11.1616 0 0 0-22.3744 0z m-167.3216 65.8944a16.7936 16.7936 0 1 0 33.6384 0 16.7936 16.7936 0 0 0-33.6384 0zM363.1616 921.6a22.3744 22.3744 0 1 0 44.7488 0 22.3744 22.3744 0 0 0-44.7488 0z m-159.744-82.0224a28.0064 28.0064 0 1 0 55.9616 0 28.0064 28.0064 0 0 0-56.0128 0zM92.672 700.16a33.6384 33.6384 0 1 0 67.2256 0 33.6384 33.6384 0 0 0-67.2256 0zM51.2 528.9984a39.168 39.168 0 1 0 78.336 0 39.168 39.168 0 0 0-78.336 0z m34.1504-170.0864a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 0 0-89.6 0zM187.904 221.7984a50.432 50.432 0 1 0 100.864 0 50.432 50.432 0 0 0-100.864 0zM338.432 143.36a55.9616 55.9616 0 1 0 111.9232 0 55.9616 55.9616 0 0 0-111.9744 0z m169.0112-4.9152a61.5936 61.5936 0 1 0 123.2384 0 61.5936 61.5936 0 0 0-123.2384 0z m154.7776 69.632a67.1744 67.1744 0 1 0 134.3488 0 67.1744 67.1744 0 0 0-134.3488 0z m110.0288 130.816a72.8064 72.8064 0 1 0 145.5616 0 72.8064 72.8064 0 0 0-145.5616 0z m43.7248 169.472a78.3872 78.3872 0 1 0 156.8256 0 78.3872 78.3872 0 0 0-156.8256 0z" fill="" p-id="3150"></path>,
  close: <path d="M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z" p-id="3469"></path>,
  delete: <path d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768zM416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768zM928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160zM736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z" p-id="4177"></path>,
  eye: <path d="M512 832c-213.888 0-384.512-106.688-512-320 129.408-213.312 300.032-320 512-320 211.968 0 382.592 106.688 512 320-127.488 213.312-298.112 320-512 320z m0-64a256 256 0 1 0 0-512 256 256 0 0 0 0 512z m0-128a128 128 0 1 0 0-256 128 128 0 0 0 0 256z" fill="#262626" p-id="8073"></path>,
  closeEye: <path d="M247.36 246.528L176.704 175.872l46.336-46.4 85.76 85.76C375.296 186.496 447.296 172.16 524.672 172.16c217.216 0 392.128 112.96 524.672 338.752-59.52 103.04-128.32 182.528-206.272 238.528l98.624 98.624-46.4 46.4-109.12-109.184a531.2 531.2 0 0 1-1.024 0.512l-126.272-126.208 0.832-0.768-70.016-69.952a99.968 99.968 0 0 1-0.768 0.64l-140.8-140.736 0.64-0.832-71.552-71.616a202.752 202.752 0 0 0-0.64 0.832L246.336 247.104l0.96-0.576z m451.584 358.848c14.4-28.16 22.464-60.288 22.464-94.4C721.408 398.72 633.344 307.84 524.672 307.84c-35.264 0-68.352 9.6-96.96 26.368l78.528 78.528c6.016-1.28 12.288-1.856 18.688-1.856 54.272 0 98.368 45.44 98.368 101.632 0 5.44-0.448 10.816-1.28 16l76.928 76.928zM191.296 284.8l150.656 150.72a208.64 208.64 0 0 0-14.08 75.52c0 112.256 88.128 203.264 196.8 203.264 28.16 0 54.848-6.08 79.04-17.024l117.888 117.824A551.04 551.04 0 0 1 524.672 849.792c-219.136 0-394.048-112.96-524.672-338.816C56.128 415.36 119.936 339.904 191.232 284.8z m329.216 329.216L426.816 520.32c3.776 51.008 43.904 91.52 93.696 93.696z" fill="#262626" p-id="8185"></path>,
  menu: <path d="M92 92l840 0C965.104 92 992 118.864 992 152c0 33.136-26.896 60-60 60L92 212C58.864 212 32 185.136 32 152 32 118.864 58.864 92 92 92zM92 452l840 0c33.104 0 60 26.864 60 60 0 33.104-26.896 60-60 60L92 572C58.864 572 32 545.104 32 512 32 478.864 58.864 452 92 452zM92 812l840 0c33.104 0 60 26.896 60 60s-26.896 60-60 60L92 932C58.864 932 32 905.104 32 872S58.864 812 92 812z" p-id="8968"></path>,
  sync: <path d="M293.376 645.290667A256.085333 256.085333 0 0 0 753.408 597.333333h89.173333a341.461333 341.461333 0 0 1-610.816 109.568L128 810.666667v-256h256l-90.624 90.624z m437.290667-266.624A256.170667 256.170667 0 0 0 270.506667 426.666667H181.333333a341.546667 341.546667 0 0 1 610.986667-109.653334L896 213.333333v256h-256l90.666667-90.666666z" p-id="11591"></path>,
  edit: <path d="M618.666667 192l213.333333 213.333333 89.002667-89.002666a85.333333 85.333333 0 0 0 0-120.661334l-92.672-92.672a85.333333 85.333333 0 0 0-120.661334 0L618.666667 192zM95.872 901.76l71.765333-251.136a42.666667 42.666667 0 0 1 10.837334-18.432L554.666667 256l213.333333 213.333333-376.192 376.192a42.666667 42.666667 0 0 1-18.432 10.837334l-251.136 71.765333a21.333333 21.333333 0 0 1-26.368-26.368z" p-id="10729"></path>,
  text: (
    <>
      <path d="M853.333333 955.733333H170.666667c-66.030933 0-102.4-36.369067-102.4-102.4V170.666667c0-66.030933 36.369067-102.4 102.4-102.4h682.666666c66.030933 0 102.4 36.369067 102.4 102.4v682.666666c0 66.030933-36.369067 102.4-102.4 102.4zM170.666667 102.4c-47.223467 0-68.266667 21.0432-68.266667 68.266667v682.666666c0 47.223467 21.0432 68.266667 68.266667 68.266667h682.666666c47.223467 0 68.266667-21.0432 68.266667-68.266667V170.666667c0-47.223467-21.0432-68.266667-68.266667-68.266667H170.666667z" p-id="16775"></path>
      <path d="M768 785.066667H597.333333a17.066667 17.066667 0 1 1 0-34.133334h170.666667a17.066667 17.066667 0 1 1 0 34.133334z m-341.333333 0H256a17.066667 17.066667 0 1 1 0-34.133334h73.045333l53.282134-159.010133v-0.034133l113.476266-341.265067a17.066667 17.066667 0 1 1 32.392534 10.769067L422.161067 580.266667H626.346667a17.066667 17.066667 0 1 1 0 34.133333H410.794667l-45.738667 136.533333H426.666667a17.066667 17.066667 0 1 1 0 34.133334z" p-id="16776"></path>
      <path d="M656.213333 721.083733a34.133333 34.133333 0 0 1-32.375466-23.3472l-29.866667-89.6v-0.017066l-114.3296-341.282134a34.133333 34.133333 0 0 1 64.733867-21.691733l114.346666 341.333333 0.034134 0.136534 29.8496 89.514666a34.133333 34.133333 0 0 1-32.392534 44.9536z" p-id="16777"></path>
      <path d="M688.657067 676.369067l26.453333 81.066666-64.904533 21.162667-26.453334-81.0496z" p-id="16778"></path>
    </>
  ),
  container: <path d="M880 112H144c-17.673 0-32 14.327-32 32v736c0 17.673 14.327 32 32 32h736c17.673 0 32-14.327 32-32V144c0-17.673-14.327-32-32-32z m-40 728H184V184h656v656zM704 704h64v64h-64zM256 704h64v64h-64zM256 256h64v64h-64zM704 256h64v64h-64zM704 368h64v64h-64zM704 480h64v64h-64zM704 592h64v64h-64zM256 368h64v64h-64zM256 480h64v64h-64zM256 592h64v64h-64zM592 704h64v64h-64zM480 704h64v64h-64zM368 704h64v64h-64zM592 256h64v64h-64zM480 256h64v64h-64zM368 256h64v64h-64z" p-id="17773"></path>,
  image: <path d="M928 128H96C42.98 128 0 170.98 0 224v576c0 53.02 42.98 96 96 96h832c53.02 0 96-42.98 96-96V224c0-53.02-42.98-96-96-96z m-12 672H108a12 12 0 0 1-12-12V236a12 12 0 0 1 12-12h808a12 12 0 0 1 12 12v552a12 12 0 0 1-12 12zM256 304c-44.182 0-80 35.818-80 80s35.818 80 80 80 80-35.818 80-80-35.818-80-80-80zM192 704h640v-160l-175.03-175.03c-9.372-9.372-24.568-9.372-33.942 0L384 608l-79.03-79.03c-9.372-9.372-24.568-9.372-33.942 0L192 608v96z" p-id="18265"></path>,
  play: <path d="M755.552 495.36l-384-296.672a31.936 31.936 0 0 0-51.552 25.28v593.504a32 32 0 0 0 51.552 25.28l384-296.704a32 32 0 0 0 0-50.656" p-id="19052"></path>,
  restart: <path d="M347.591 528.95l383.21 301.024C745.05 841.166 766 831.078 766 813.024v-602.05c0-18.05-20.95-28.14-35.199-16.948l-383.21 301.023c-11.01 8.65-11.01 25.252 0 33.901M330 864h-64a8 8 0 0 1-8-8V168a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v688a8 8 0 0 1-8 8" p-id="23033"></path>,
  pause: <path d="M304 176h80v672h-80zM712 176h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z" p-id="23622"></path>,
  backward: <path d="M485.6 249.9L198.2 498c-8.3 7.1-8.3 20.8 0 27.9l287.4 248.2c10.7 9.2 26.4 0.9 26.4-14V263.8c0-14.8-15.7-23.2-26.4-13.9z m320 0L518.2 498c-4.1 3.6-6.2 8.8-6.2 14 0 5.2 2.1 10.4 6.2 14l287.4 248.2c10.7 9.2 26.4 0.9 26.4-14V263.8c0-14.8-15.7-23.2-26.4-13.9z" p-id="24549"></path>,
  
}

export type Props = {
  type: keyof (typeof pathMap);
  className?: string;
} & SVGProps<any>

export default function Icon({
  type,
  className,
  ...extra
}: Props) {
  return (
    <svg
      className={classNames('rabbit-icon', className)}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1764"
      {...extra}
    >
      {pathMap[type]}
    </svg>
  )
}
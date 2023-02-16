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
  doubleArrowLeft: <path d="M535.76 806.16c-12.5 12.5-32.76 12.5-45.25 0l-248.9-248.9c-24.99-24.99-24.99-65.52 0-90.51l248.9-248.9c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25L286.86 512l248.9 248.9c12.5 12.5 12.5 32.76 0 45.26zM791.76 806.16c-12.5 12.5-32.76 12.5-45.25 0l-248.9-248.9c-24.99-24.99-24.99-65.52 0-90.51l248.9-248.9c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25L542.86 512l248.9 248.9c12.5 12.5 12.5 32.76 0 45.26z" p-id="3991"></path>,
  doubleArrowRight: <path d="M488.24 217.84c12.5-12.5 32.76-12.5 45.25 0l248.9 248.9c24.99 24.99 24.99 65.52 0 90.51l-248.9 248.9c-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25L737.14 512l-248.9-248.9c-12.5-12.5-12.5-32.76 0-45.26zM232.24 217.84c12.5-12.5 32.76-12.5 45.25 0l248.9 248.9c24.99 24.99 24.99 65.52 0 90.51l-248.9 248.9c-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25L481.14 512l-248.9-248.9c-12.5-12.5-12.5-32.76 0-45.26z" p-id="4246"></path>,
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
  home: <path d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" p-id="33903"></path>,
  user: <path d="M908.6432 802.848q0 68.576-41.728 108.288t-110.848 39.712l-499.424 0q-69.152 0-110.848-39.712t-41.728-108.288q0-30.272 2.016-59.136t8-62.272 15.136-62.016 24.576-55.712 35.424-46.272 48.864-30.56 63.712-11.424q5.152 0 24 12.288t42.56 27.424 61.728 27.424 76.288 12.288 76.288-12.288 61.728-27.424 42.56-27.424 24-12.288q34.848 0 63.712 11.424t48.864 30.56 35.424 46.272 24.576 55.712 15.136 62.016 8 62.272 2.016 59.136zM725.7952 292.576q0 90.848-64.288 155.136t-155.136 64.288-155.136-64.288-64.288-155.136 64.288-155.136 155.136-64.288 155.136 64.288 64.288 155.136z" p-id="35116"></path>,
  upload: <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163c-3.2-4.1-9.4-4.1-12.6 0l-112 141.7c-4.1 5.3-0.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" p-id="35387"></path>,
  success: (
    <>
      <path d="M512 832c-176.448 0-320-143.552-320-320S335.552 192 512 192s320 143.552 320 320-143.552 320-320 320m0-704C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128" p-id="36164"></path>
      <path d="M619.072 429.088l-151.744 165.888-62.112-69.6a32 32 0 1 0-47.744 42.624l85.696 96a32 32 0 0 0 23.68 10.688h0.192c8.96 0 17.536-3.776 23.616-10.4l175.648-192a32 32 0 0 0-47.232-43.2" p-id="36165"></path>
    </>
  ),
  info: (
    <>
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="37026"></path>
      <path d="M512 336m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" p-id="37027"></path>,
      <path d="M536 448h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" p-id="37028"></path>
    </>
  ),
  warn: <path d="M512.000012 2.310963c-282.180781 0-510.844518 228.663737-510.844518 510.844518 0 282.180781 228.663737 510.844518 510.844518 510.844518 282.180781 0 510.844518-228.663737 510.844518-510.844518C1022.84453 231.09633 794.059164 2.310963 512.000012 2.310963L512.000012 2.310963zM512.000012 963.914953c-248.975888 0-450.759472-201.783585-450.759472-450.759472 0-248.975888 201.783585-450.759472 450.759472-450.759472 248.975888 0 450.759472 201.783585 450.759472 450.759472C962.637855 762.131369 760.85427 963.914953 512.000012 963.914953L512.000012 963.914953zM512.000012 257.733222c-23.474522 0-42.570376 19.095855-42.570376 42.570376l0 276.707447c0 23.474522 19.095855 42.570376 42.570376 42.570376 23.474522 0 42.570376-19.095855 42.570376-42.570376L554.570389 300.303599C554.448759 276.829077 535.474534 257.733222 512.000012 257.733222L512.000012 257.733222zM512.000012 683.436987c-23.474522 0-42.570376 19.095855-42.570376 42.570376 0 23.474522 19.095855 42.570376 42.570376 42.570376 23.474522 0 42.570376-19.095855 42.570376-42.570376C554.448759 702.532842 535.474534 683.436987 512.000012 683.436987L512.000012 683.436987zM512.000012 683.436987" p-id="38069"></path>,
  error: (
    <>
      <path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" p-id="38585"></path>
      <path d="M657.066667 360.533333c-12.8-12.8-32-12.8-44.8 0l-102.4 102.4-102.4-102.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l102.4 102.4-102.4 102.4c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334l102.4-102.4 102.4 102.4c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334c12.8-12.8 12.8-32 0-44.8l-106.666666-100.266666 102.4-102.4c12.8-12.8 12.8-34.133333 0-46.933334z" p-id="38586"></path>
    </>
  ),
  ellipsis: <path d="M184.9344 583.0656c-39.3216 0-71.0656-31.8464-71.0656-71.0656s31.8464-71.0656 71.0656-71.0656c39.3216 0 71.0656 31.8464 71.0656 71.0656 0 39.3216-31.8464 71.0656-71.0656 71.0656z m327.0656 0c-39.3216 0-71.0656-31.8464-71.0656-71.0656s31.8464-71.0656 71.0656-71.0656c39.3216 0 71.0656 31.8464 71.0656 71.0656 0 39.3216-31.744 71.0656-71.0656 71.0656z m327.0656 0c-39.3216 0-71.0656-31.8464-71.0656-71.0656s31.8464-71.0656 71.0656-71.0656c39.3216 0 71.0656 31.8464 71.0656 71.0656 0.1024 39.3216-31.744 71.0656-71.0656 71.0656z" p-id="39952"></path>,
  starFill: <path d="M512 837.12L255.6928 950.0672c-14.336 6.3488-31.1296-0.2048-37.4784-14.5408-1.9456-4.5056-2.7648-9.4208-2.2528-14.336l28.16-278.6304-186.5728-208.896c-10.4448-11.6736-9.4208-29.696 2.2528-40.1408 3.6864-3.2768 8.0896-5.5296 12.9024-6.5536L346.5216 327.68 487.424 85.7088c7.8848-13.6192 25.2928-18.1248 38.912-10.24 4.3008 2.4576 7.7824 6.0416 10.24 10.24L677.4784 327.68l273.7152 59.2896c15.36 3.2768 25.088 18.432 21.8112 33.792-1.024 4.8128-3.2768 9.216-6.5536 12.9024l-186.6752 208.896L807.936 921.1904c1.536 15.6672-9.8304 29.5936-25.3952 31.1296-4.9152 0.512-9.8304-0.3072-14.336-2.2528L512 837.12z" fill="currentColor" p-id="41465"></path>,
  star: <path d="M969.728 404.48c-2.048-7.168-9.216-13.312-16.384-14.336L660.48 348.16 530.432 82.944c-3.072-7.168-10.24-11.264-18.432-11.264s-15.36 4.096-18.432 11.264L363.52 348.16 70.656 390.144c-8.192 1.024-14.336 6.144-16.384 14.336s0 15.36 5.12 20.48l210.944 206.848-50.176 290.816c-1.024 8.192 2.048 15.36 8.192 20.48 6.144 4.096 14.336 5.12 21.504 2.048L512 806.912l261.12 137.216c3.072 2.048 6.144 2.048 9.216 2.048 4.096 0 8.192-1.024 12.288-4.096 6.144-4.096 9.216-12.288 8.192-20.48l-49.152-290.816 210.944-206.848c5.12-4.096 7.168-12.288 5.12-19.456zM716.8 610.304c-5.12 5.12-7.168 11.264-6.144 18.432l44.032 260.096-233.472-122.88c-3.072-2.048-6.144-2.048-9.216-2.048-3.072 0-6.144 1.024-9.216 2.048l-234.496 122.88 45.056-260.096c1.024-6.144-1.024-13.312-6.144-18.432L117.76 424.96l262.144-37.888c7.168-1.024 12.288-5.12 15.36-11.264L512 138.24l116.736 237.568c3.072 6.144 9.216 10.24 15.36 11.264l262.144 37.888L716.8 610.304z" p-id="1013"></path>,
  search: <path d="M469.333 192c153.174 0 277.334 124.16 277.334 277.333 0 68.054-24.534 130.411-65.216 178.688L846.336 818.24l-48.341 49.877L630.4 695.125a276.053 276.053 0 0 1-161.067 51.542C316.16 746.667 192 622.507 192 469.333S316.16 192 469.333 192z m0 64C351.51 256 256 351.51 256 469.333s95.51 213.334 213.333 213.334 213.334-95.51 213.334-213.334S587.157 256 469.333 256z" p-id="1368"></path>,
  empty: <path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z" p-id="1440"></path>,
  folder: <path d="M970.666667 213.333333H546.586667a10.573333 10.573333 0 0 1-7.54-3.126666L429.793333 100.953333A52.986667 52.986667 0 0 0 392.08 85.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333334v704a53.393333 53.393333 0 0 0 53.333333 53.333333h874.666667a53.393333 53.393333 0 0 0 53.333333-53.333333V266.666667a53.393333 53.393333 0 0 0-53.333333-53.333334zM661.333333 554.666667H405.333333a21.333333 21.333333 0 0 1 0-42.666667h256a21.333333 21.333333 0 0 1 0 42.666667z" p-id="3296"></path>,
  folderOpen: <path d="M81.16 412.073333L0 709.653333V138.666667a53.393333 53.393333 0 0 1 53.333333-53.333334h253.413334a52.986667 52.986667 0 0 1 37.713333 15.62l109.253333 109.253334a10.573333 10.573333 0 0 0 7.54 3.126666H842.666667a53.393333 53.393333 0 0 1 53.333333 53.333334v74.666666H173.773333a96.2 96.2 0 0 0-92.613333 70.74z m922-7.113333a52.933333 52.933333 0 0 0-42.386667-20.96H173.773333a53.453333 53.453333 0 0 0-51.453333 39.333333L11.773333 828.666667a53.333333 53.333333 0 0 0 51.453334 67.333333h787a53.453333 53.453333 0 0 0 51.453333-39.333333l110.546667-405.333334a52.953333 52.953333 0 0 0-9.073334-46.373333z" p-id="3282"></path>,
  file: <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326z m1.8 562H232V136h302v216c0 23.2 18.8 42 42 42h216v494z" p-id="3817"></path>,
  draggle: <path d="M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z"></path>,
  component: <path d="M914.5 653.5c-5.5 0-11 1.1-16 3.3l-0.2 0.1h-0.2L510.2 822.2 122.2 657h-0.2l-0.2-0.1c-5-2.1-10.3-3.3-16-3.3-23.1 0-41.8 19.3-41.8 43.1 0 18 10.7 33.3 25.8 39.8l403.9 172.1 0.4 0.1c10.2 4.4 21.8 4.4 32 0l0.2-0.1c0.1 0 0.1-0.1 0.2-0.1l403.9-172.1c15.1-6.5 25.8-21.8 25.8-39.8 0.1-23.8-18.6-43.1-41.7-43.1z m0-186.5c-7.9-0.2-16 3.2-16 3.2L510.2 635.6 121.8 470.2s-10.3-3.2-16-3.2C82.7 467 64 486.2 64 510c0 17.9 10.7 33.3 25.8 39.7l403.9 172c0.1 0 0.1 0.1 0.2 0.1l0.1 0.1c5 2.1 10.3 3.3 16 3.3 5.7 0 11.1-1.2 16-3.3l0.2-0.1c0.1 0 0.1 0 0.2-0.1l403.9-172c15.1-6.4 25.8-21.8 25.9-39.7 0.1-23.8-18.6-43-41.7-43zM89.8 363.2l403.9 172.1c0.1 0 0.1 0 0.2 0.1l0.1 0.1c5 2.1 10.3 3.2 16 3.2 5.5 0 10.9-1.1 16-3.2l0.2-0.1 0.2-0.1 403.9-172c15.1-6.5 25.8-21.8 25.9-39.7 0-18-10.7-33.3-25.8-39.8L526.5 111.6c-0.1 0-0.1 0-0.2-0.1l-0.2-0.1c-10.2-4.4-21.8-4.4-32 0l-0.1 0.1L89.8 283.7C74.7 290.1 64 305.5 64 323.5c0 17.9 10.7 33.2 25.8 39.7z" p-id="5558"></path>,
  right: <path d="M822.464 265.344a28.256 28.256 0 0 0-43.072 1.312l-352.96 417.664-181.92-212.992a28.288 28.288 0 0 0-43.104-1.088 37.12 37.12 0 0 0-0.96 48.256l204.096 238.944c5.76 6.752 13.696 10.56 22.016 10.56h0.096a29.088 29.088 0 0 0 22.048-10.656L823.68 313.6c11.52-13.728 11.008-35.328-1.216-48.256" p-id="1362"></path>,
  clock: <path d="M512 901.12a389.12 389.12 0 1 1 389.12-389.12 389.5296 389.5296 0 0 1-389.12 389.12z m0-737.28a348.16 348.16 0 1 0 348.16 348.16A348.5696 348.5696 0 0 0 512 163.84zM491.52 225.28h40.96v81.92h-40.96zM225.28 491.52h81.92v40.96h-81.92zM491.52 716.8h40.96v81.92h-40.96zM716.8 491.52h81.92v40.96h-81.92zM512 541.0816L374.784 403.456l28.672-28.672 108.544 108.1344 169.984-169.5744 28.672 28.672-198.656 199.0656z" p-id="2887"></path>,
  date: <path d="M805.49888 981.49888l-602.3168-0.76288c-86.59456-8.192-154.56768-81.3056-154.56768-170.01472L48.6144 291.73248c0-94.1568 76.60032-170.75712 170.7776-170.75712l586.10176 0c94.1568 0 170.73152 76.60032 170.73152 170.75712L976.22528 810.7008C976.2304 904.87296 899.63008 981.49888 805.49888 981.49888L805.49888 981.49888zM219.3664 190.57152c-55.79776 0-101.20192 45.38368-101.20192 101.18144l0 518.96832c0 55.79776 45.40416 101.20704 101.20192 101.20704l586.13248 0c55.77728 0 101.16096-45.40928 101.16096-101.20704L906.65984 291.73248c0-55.79776-45.38368-101.18656-101.16096-101.18656L219.3664 190.54592 219.3664 190.57152zM698.84416 290.51904c-25.60512 0-46.38208-20.77696-46.38208-46.38208l0-158.6688c0-25.6 20.77696-46.38208 46.38208-46.38208 25.6 0 46.38208 20.78208 46.38208 46.38208L745.22624 244.1216C745.22624 269.7472 724.46976 290.51904 698.84416 290.51904L698.84416 290.51904zM315.65824 290.51904c-25.60512 0-46.38208-20.77696-46.38208-46.38208l0-158.6688c0-25.6 20.77696-46.38208 46.38208-46.38208 25.6 0 46.38208 20.78208 46.38208 46.38208L362.04032 244.1216C362.04032 269.7472 341.28896 290.51904 315.65824 290.51904L315.65824 290.51904zM534.8864 794.78784l-44.27264 0c-25.6 0-46.38208-20.77696-46.38208-46.38208 0-25.6 20.78208-46.38208 46.38208-46.38208l44.27264 0c25.6 0 46.38208 20.78208 46.38208 46.38208C581.26848 774.01088 560.4864 794.78784 534.8864 794.78784L534.8864 794.78784zM930.79552 452.608 121.24672 452.608c-25.60512 0-46.38208-20.78208-46.38208-46.38208 0-25.60512 20.77696-46.38208 46.38208-46.38208l809.5744 0c25.6 0 46.38208 20.77696 46.38208 46.38208C977.2032 431.82592 956.42624 452.608 930.79552 452.608L930.79552 452.608zM327.92576 649.03168l-44.27264 0c-25.6 0-46.38208-20.78208-46.38208-46.38208 0-25.60512 20.78208-46.38208 46.38208-46.38208l44.27264 0c25.6 0 46.38208 20.77696 46.38208 46.38208C374.30784 628.25472 353.52576 649.03168 327.92576 649.03168L327.92576 649.03168zM534.8864 649.03168l-44.27264 0c-25.6 0-46.38208-20.78208-46.38208-46.38208 0-25.60512 20.78208-46.38208 46.38208-46.38208l44.27264 0c25.6 0 46.38208 20.77696 46.38208 46.38208S560.4864 649.03168 534.8864 649.03168L534.8864 649.03168zM741.27872 649.03168l-44.26752 0c-25.60512 0-46.38208-20.78208-46.38208-46.38208 0-25.60512 20.77696-46.38208 46.38208-46.38208l44.26752 0c25.60512 0 46.38208 20.77696 46.38208 46.38208C787.6608 628.25472 766.90944 649.03168 741.27872 649.03168L741.27872 649.03168zM327.92576 794.78784l-44.27264 0c-25.6 0-46.38208-20.77696-46.38208-46.38208 0-25.6 20.78208-46.38208 46.38208-46.38208l44.27264 0c25.6 0 46.38208 20.78208 46.38208 46.38208C374.30784 774.01088 353.52576 794.78784 327.92576 794.78784L327.92576 794.78784zM741.27872 794.78784l-44.26752 0c-25.60512 0-46.38208-20.77696-46.38208-46.38208 0-25.6 20.77696-46.38208 46.38208-46.38208l44.26752 0c25.60512 0 46.38208 20.78208 46.38208 46.38208C787.6608 774.01088 766.90944 794.78784 741.27872 794.78784L741.27872 794.78784z" p-id="2933"></path>,
  sortDesc: <path d="M853.333333 170.666667v512h128l-170.666666 213.333333-170.666667-213.333333h128V170.666667h85.333333z m-341.333333 597.333333v85.333333H128v-85.333333h384z m85.333333-298.666667v85.333334H128v-85.333334h469.333333z m0-298.666666v85.333333H128V170.666667h469.333333z" p-id="9432"></path>,
  sortAsc: <path d="M810.666667 128l170.666666 213.333333h-128v512h-85.333333V341.333333h-128l170.666667-213.333333z m-213.333334 640v85.333333H128v-85.333333h469.333333z m0-298.666667v85.333334H128v-85.333334h469.333333z m-85.333333-298.666666v85.333333H128V170.666667h384z" p-id="9985"></path>,
  sort: (<>
    <path d="M548.352 320H112V256h436.352v64zM766.528 133.504l171.2 171.2-51.456 51.392-119.68-119.68-119.808 119.68-51.392-51.392 171.136-171.2zM766.528 890.88l-171.136-171.136 51.392-51.392 119.744 119.68 119.744-119.68 51.456 51.392-171.2 171.2zM548.352 544H112v-64h436.352v64zM548.352 768H112v-64h436.352v64z" p-id="15457"></path>,
    <path d="M730.24 803.2V221.248h72.704v581.824h-72.768z" p-id="15458"></path>
  </>),
  filter: <path d="M608.256 960c-17.696 0-32-14.304-32-32V448a31.912 31.912 0 0 1 8.256-21.44l208.8-234.496h-562.88L439.648 426.72a32.03 32.03 0 0 1 8.096 21.312V736.8l50.848 41.152c13.76 11.136 15.872 31.264 4.736 44.992s-31.264 15.84-44.992 4.736l-62.72-50.752c-7.52-6.048-11.872-15.232-11.872-24.864V460.192L135.136 181.344c-8.384-9.408-10.464-22.88-5.312-34.4 5.152-11.488 16.608-18.912 29.216-18.912h706.336c12.672 0 24.128 7.456 29.248 19.008s2.976 25.056-5.504 34.432L640.256 460.288V928c0 17.696-14.304 32-32 32z" p-id="16094"></path>,
  
}

export type IconType = keyof (typeof pathMap)

export type Props = {
  type: IconType;
  className?: string;
} & SVGProps<any>

function Icon({
  type,
  className,
  ...extra
}: Props, ref?: React.ForwardedRef<SVGSVGElement>) {
  return (
    <svg
      className={classNames('rabbit-icon', className)}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1764"
      {...extra}
      ref={ref}
    >
      {pathMap[type]}
    </svg>
  )
}

export default React.forwardRef<SVGSVGElement, Props>(Icon)

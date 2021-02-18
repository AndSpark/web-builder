;(function() {
	var xPro = document.getElementById('x-product6')
	if (xPro) {
		var tabs = xPro.getElementsByClassName('pro-op-item')
		var cts = xPro.getElementsByClassName('pro-ct-block')
		tabControl(tabs, cts, 'pro-op-item--active', 'pro-ct-block--show')
	}
})()
;(function() {
	if (document.getElementById('x-swiper')) {
		var clientWidth = parseInt(window.innerWidth)
		new Swiper('.swiper-container-x', {
			loop: true,
			speed: 1500,
			autoplay: { disableOnInteraction: false, delay: 3000 },
			pagination: { el: '' },
			navigation: { nextEl: '.swiper-button-next-m2', prevEl: '.swiper-button-prev-m2' },
			slidesPerView: 1,
		})
	}
})()
;(function() {
	var revealElements1 = document.getElementsByClassName('sc-main')
	for (var i = 0; i < revealElements1.length; i++) {
		new ScrollMagic.Scene({ triggerElement: revealElements1[i], offset: 100, triggerHook: 0.9 })
			.setClassToggle(revealElements1[i], 'sc-main--show')
			.addTo(new ScrollMagic.Controller())
	}
})()
;(function() {
	var controller2 = new ScrollMagic.Controller()
	var demo = new countUp.CountUp('client-num', 13, { duration: 2, useEasing: false })
	new ScrollMagic.Scene({
		triggerElement: document.getElementById('client-num'),
		offset: 50,
		triggerHook: 0.9,
	})
		.on('enter', function() {
			demo.start()
		})
		.addTo(controller2)
})()
;(function() {
	if (!document.querySelector('#dituContent')) {
		return
	}
	function initMap() {
		createMap()
		setMapEvent()
		addMapControl()
		addMarker()
	}
	function createMap() {
		var map = new BMap.Map('dituContent')
		var point = new BMap.Point(121.390404, 30.164905)
		map.centerAndZoom(point, 18)
		window.map = map
	}
	function setMapEvent() {
		map.enableDragging()
		map.enableDoubleClickZoom()
		map.enableKeyboard()
	}
	function addMapControl() {
		var ctrl_nav = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT,
			type: BMAP_NAVIGATION_CONTROL_LARGE,
		})
		map.addControl(ctrl_nav)
		var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 })
		map.addControl(ctrl_ove)
		var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT })
		map.addControl(ctrl_sca)
	}
	var markerArr = [
		{
			title: '宁波嘉喜电器有限公司',
			content: '地址：慈溪市观海卫镇三北西路371号<br>电话：0574-63580859<br>手机：13777093229',
			point: '121.390404|30.164905',
			isOpen: 1,
			icon: { w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5 },
		},
	]
	function addMarker() {
		for (var i = 0; i < markerArr.length; i++) {
			var json = markerArr[i]
			var p0 = json.point.split('|')[0]
			var p1 = json.point.split('|')[1]
			var point = new BMap.Point(p0, p1)
			var iconImg = createIcon(json.icon)
			var marker = new BMap.Marker(point)
			var iw = createInfoWindow(i)
			var label = new BMap.Label(json.title, {
				offset: new BMap.Size(json.icon.lb - json.icon.x + 10, -20),
			})
			marker.setLabel(label)
			map.addOverlay(marker)
			label.setStyle({ borderColor: '#808080', color: '#333', cursor: 'pointer' })
			;(function() {
				var index = i
				var _iw = createInfoWindow(i)
				var _marker = marker
				_marker.addEventListener('click', function() {
					this.openInfoWindow(_iw)
				})
				_iw.addEventListener('open', function() {
					_marker.getLabel().hide()
				})
				_iw.addEventListener('close', function() {
					_marker.getLabel().show()
				})
				label.addEventListener('click', function() {
					_marker.openInfoWindow(_iw)
				})
				if (!!json.isOpen) {
					label.hide()
					_marker.openInfoWindow(_iw)
				}
			})()
		}
	}
	function createInfoWindow(i) {
		var json = markerArr[i]
		var iw = new BMap.InfoWindow(
			"<b class='iw_poi_title' title='" +
				json.title +
				"'>" +
				json.title +
				"</b><div class='iw_poi_content'>" +
				json.content +
				'</div>'
		)
		return iw
	}
	function createIcon(json) {
		var icon = new BMap.Icon(
			'http://app.baidu.com/map/images/us_mk_icon.png',
			new BMap.Size(json.w, json.h),
			{
				imageOffset: new BMap.Size(-json.l, -json.t),
				infoWindowOffset: new BMap.Size(json.lb + 5, 1),
				offset: new BMap.Size(json.x, json.h),
			}
		)
		return icon
	}
	initMap()
})()
;(function() {
	var xheader = document.getElementById('x-header4')
	var header = xheader.querySelector('.header-navbar')
	var clientWidth = parseInt(window.innerWidth)
	if (header && clientWidth > 768) {
		document.addEventListener('scroll', function(e) {
			if (window.scrollY > 60) {
				header.classList.add('header-navbar--down')
				xheader.classList.add('xheader--down')
			} else {
				header.classList.remove('header-navbar--down')
				xheader.classList.remove('xheader--down')
			}
		})
	}
	if (header && clientWidth < 768) {
		var iconfont = document.querySelector('.icon-List-1')
		var sidelist = document.querySelector('.navbar-side-list')
		iconfont.addEventListener('click', function(e) {
			var left = parseInt(sidelist.style.left)
			if (left !== 0) {
				sidelist.style.left = 0
				iconfont.classList.add('icon-right')
				iconfont.classList.remove('icon-List-1')
				iconfont.style.transform = 'rotate(180deg)'
			} else {
				sidelist.style.left = '-100%'
				iconfont.classList.add('icon-List-1')
				iconfont.classList.remove('icon-right')
				iconfont.style.transform = 'rotate(0deg)'
			}
		})
	}
})()
;(function() {
	var xbanner = document.getElementById('x-banner')
	if (xbanner) {
		var isBanner1 = xbanner.classList.contains('banner1')
		var isBanner2 = xbanner.classList.contains('banner2')
		if (isBanner1) {
			new Swiper('#x-banner', {
				loop: true,
				speed: 1500,
				autoplay: { disableOnInteraction: false, delay: 5000 },
				pagination: { el: '' },
				navigation: { nextEl: '.swiper-button-next-m', prevEl: '.swiper-button-prev-m' },
				slidesPerView: 1,
				on: {
					init: function init(swiper) {
						var slide = this.slides.eq(0).find('.slide-inner')
						slide.addClass('ani-slide')
					},
					transitionStart: function transitionStart() {
						for (var i = 0; i < this.slides.length; i++) {
							var slide = this.slides.eq(i).find('.slide-inner')
							slide.removeClass('ani-slide')
						}
						this.slides.eq(this.activeIndex - 1).addClass('bg-none-move')
					},
					transitionEnd: function transitionEnd() {
						var slide = this.slides.eq(this.activeIndex).find('.slide-inner')
						slide.addClass('ani-slide')
						for (var i = 0; i < this.slides.length; i++) {
							var slide1 = this.slides.eq(i)
							slide1.removeClass('bg-none-move')
						}
					},
				},
			})
		}
		if (isBanner2) {
			new Swiper('#x-banner', {
				loop: true,
				speed: 1200,
				autoplay: { disableOnInteraction: false, delay: 5000 },
				pagination: { el: '' },
				navigation: { nextEl: '.swiper-button-next-m', prevEl: '.swiper-button-prev-m' },
				slidesPerView: 1,
				effect: 'fade',
				on: {
					init: function init(swiper) {
						var slide = this.slides.eq(0).find('.slide-inner')
						slide.addClass('ani-slide')
					},
					transitionStart: function transitionStart() {
						for (var i = 0; i < this.slides.length; i++) {
							var slide = this.slides.eq(i).find('.slide-inner')
							slide.removeClass('ani-slide')
						}
					},
					transitionEnd: function transitionEnd() {
						var slide = this.slides.eq(this.activeIndex).find('.slide-inner')
						slide.addClass('ani-slide')
					},
				},
			})
		}
	}
})()
;(function() {
	var sidebar = document.getElementById('x-sideBar')
	if (sidebar && parseInt(window.innerWidth) > 768) {
		var up = sidebar.querySelector('.icon-up_1')
		var call = sidebar.querySelector('.icon-call')
		var callMsg = sidebar.querySelector('.call-msg')
		call.addEventListener('mouseover', showMsg)
		callMsg.addEventListener('mouseover', showMsg)
		call.addEventListener('mouseout', hideMsg)
		callMsg.addEventListener('mouseout', hideMsg)
		var timer = null
		function showMsg() {
			if (timer) {
				clearTimeout(timer)
			}
			callMsg.style.opacity = '1'
			callMsg.style.display = 'block'
		}
		function hideMsg() {
			callMsg.style.opacity = '0'
			timer = setTimeout(function() {
				callMsg.style.display = 'none'
			}, 300)
		}
		document.addEventListener('scroll', function(e) {
			var y = window.scrollY
			if (y > 400) {
				sidebar.style.opacity = 1
			} else {
				sidebar.style.opacity = 0
			}
		})
		up.addEventListener('click', function(e) {
			scrollToWithAnimation(
				document.documentElement,
				'scrollTop',
				0,
				800,
				'easeInOutCirc',
				function() {
					console.log('done!')
				}
			)
		})
	}
})()
;(function() {})()
;(function() {
	var tel = document.getElementById('tel')
	if (tel) {
		tel.href = tel.href.slice(0, 15)
	}
})()
;(function() {
	var form = document.getElementById('forms')
	if (form) {
		var inputs = form.querySelectorAll('input')
		var text = form.querySelector('textarea')
		var _loop = function _loop(i) {
			var input = inputs[i]
			input.onchange = function() {
				if (input.value) {
					input.classList.add('exist')
				} else {
					input.classList.remove('exist')
				}
			}
		}
		for (var i = 0; i < inputs.length; i++) {
			_loop(i)
		}
		text.onchange = function() {
			if (text.value) {
				text.classList.add('exist')
			} else {
				text.classList.remove('exist')
			}
		}
	}
})()
;(function() {
	var lesofax = document.getElementById('lesofax')
	if (lesofax) {
		var span = lesofax.querySelector('span')
		if (span.innerHTML.length < 8) {
			lesofax.style.display = 'none'
		}
	}
})()
;(function() {
	var proImgs = document.querySelector('.pro-imgs')
	if (proImgs) {
		var oImg = document.querySelector('.pro-img-cover img')
		proImgs.addEventListener('click', function(e) {
			console.log(e.target)
			if (e.target.className === 'imgs-cover') {
				var img = e.target.querySelector('img')
				oImg.src = img.src
				var imgs = proImgs.getElementsByClassName('imgs-cover')
				for (var i = 0; i < imgs.length; i++) {
					imgs[i].classList.remove('imgs-active')
				}
				e.target.classList.add('imgs-active')
			}
			if (e.target.nodeName.toLowerCase() === 'img') {
				var _img = e.target
				oImg.src = _img.src
				var _imgs = proImgs.getElementsByClassName('imgs-cover')
				for (var _i = 0; _i < _imgs.length; _i++) {
					_imgs[_i].classList.remove('imgs-active')
				}
				e.target.parentNode.classList.add('imgs-active')
			}
		})
	}
})()
;(function() {
	var revealArr = ['digit-l', 'digit-r', 'digit-b']
	revealArr.forEach(function(v) {
		var nodes = document.getElementsByClassName(v)
		for (var i = 0; i < nodes.length; i++) {
			new ScrollMagic.Scene({ triggerElement: nodes[i], offset: -50, triggerHook: 0.9 })
				.setClassToggle(nodes[i], 'visible')
				.addTo(new ScrollMagic.Controller())
		}
	})
})()

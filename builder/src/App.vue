<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" app width="400">
			<tabs
				ref="tabs"
				:area.sync="area"
				@areaChange="tabSelect"
				@areaRemove="areaRemove"
				@areaUpdate="areaUpdate"
				@savePage="savePage"
				@updateOptions="updateOptions"
			></tabs>
		</v-navigation-drawer>

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Application</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<div ref="main" style="height:100%">
				<iframe :srcdoc="template" width="100%" height="100%"></iframe>
			</div>
		</v-main>
	</v-app>
</template>

<script>
import { astToTextArr, createZip } from '@/tool/tool'
import Tabs from '@/components/tabs/Tabs'
export default {
	name: 'App',
	components: { Tabs },
	data: () => ({
		drawer: null,
		area: [],
		styleNode: null,
		options: null,
		styleHref: '',
		jsSrc: '',
		preload: '',
	}),
	computed: {
		template() {
			return `
				<!DOCTYPE html>
				<html lang="en">
					<head>
						<meta charset="utf-8">
						<meta http-equiv="X-UA-Compatible" content="IE=edge">
						<meta name="viewport" content="width=device-width,initial-scale=1.0">
						<title>template</title>
						${this.preload}
						${this.styleHref}
						<style>
						${this.style}
						</style>
					</head>
					<body>
						${this.html}
						${this.jsSrc}
						<script>
						${this.js}
						<\/script>
					</body>
				</html>
				`
		},
		templateHtml() {
			return `
				<!DOCTYPE html>
				<html lang="en">
					<head>
						<meta charset="utf-8">
						<meta http-equiv="X-UA-Compatible" content="IE=edge">
						<meta name="viewport" content="width=device-width,initial-scale=1.0">
						<title>template</title>
						${this.preload}
						${this.styleHref}
						 <link rel="stylesheet" href="${this.options.cssName}">
					</head>
					<body>
						${this.html}
						${this.jsSrc}
						 <script src="${this.options.jsName}"><\/script>
					</body>
				</html>
				`
		},
		style() {
			return this.area.reduce((p, c) => {
				return p + c.css
			}, '')
		},
		html() {
			return this.area.reduce((p, c) => {
				return p + c.html
			}, '')
		},
		js() {
			return this.area.reduce((p, c) => {
				return p + c.js
			}, '')
		},
		zipFiles() {
			return [
				{ name: this.options.htmlName, content: this.templateHtml },
				{ name: this.options.cssName, content: this.style },
				{ name: this.options.jsName, content: this.js },
			]
		},
	},
	methods: {
		async tabSelect(code) {
			let index = this.area.findIndex(v => v.id === code.id)
			if (index != -1) {
				this.area.splice(index, 1)
			} else {
				let { data } = await this.$http.get(`component/${code.id}`)
				data.texts = astToTextArr(data.ast)
				this.area.push(data)
			}
			this.styleNode.innerText = this.style
		},
		areaRemove(item) {
			this.area = this.area.filter(v => {
				v.title != item.title
			})
		},
		async areaUpdate(item) {
			this.area = this.area.map(v => {
				if (v.id === item.id) {
					return item
				}
				return v
			})
		},
		savePage() {
			createZip('test.zip', this.zipFiles)
		},
		styleHrefUpdate() {
			let { styles } = this.options
			if (styles.length) {
				this.styleHref = styles.reduce((p, c) => {
					return p + `<link rel="stylesheet" href="${c.link}">`
				}, '')
			} else {
				this.styleHref = ''
			}
		},
		jsSrcUpdate() {
			let { scripts } = this.options
			if (scripts.length) {
				this.jsSrc = scripts.reduce((p, c) => {
					return p + `<script src="${c.link}"><\/script>`
				}, '')
			} else {
				this.jsSrc = ''
			}
		},
		preloadUpdate() {
			let { styles, scripts } = this.options
			let stylesPreload = ''
			let sripctsPreload = ''
			if (styles.length) {
				stylesPreload = styles.reduce((p, c) => {
					if (c.preload) {
						return p + `<link rel="preload" href="${c.link}" as="style">`
					}
					return p
				}, '')
			} else {
				stylesPreload = ''
			}
			if (scripts.length) {
				sripctsPreload = scripts.reduce((p, c) => {
					if (c.preload) {
						return p + `<link rel="preload" href="${c.link}" as="script">`
					}
					return p
				}, '')
			} else {
				sripctsPreload = ''
			}
			this.preload = stylesPreload + sripctsPreload
		},
		updateOptions() {
			this.options = JSON.parse(localStorage.getItem('options'))
			this.styleHrefUpdate()
			this.jsSrcUpdate()
			this.preloadUpdate()
		},
	},
	mounted() {
		this.styleNode = document.createElement('style')
		this.styleNode.innerText = this.style
		this.$refs.main.appendChild(this.styleNode)
		this.updateOptions()
	},
}
</script>

<style>
::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 4px;
	/*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}

::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 5px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
}

::selection {
	color: #a1c4fd;
}
</style>

import lodash from 'lodash'
import parser from 'posthtml-parser'
import render from 'posthtml-render'
import JSZip from 'jszip'
import axios from 'axios'
import OSS from 'ali-oss'

// 可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。

function upload(fileName = null) {
	return new Promise((resolve, reject) => {
		let input = document.createElement('input')
		input.type = 'file'
		input.onchange = async e => {
			let file = e.path[0].files[0]
			try {
				let res = await uploadAliOSS(file, fileName)
				resolve(res)
			} catch (error) {
				reject(error)
			}
		}
		input.click()
	})
}

async function uploadAliOSS(file, fileName = null) {
	const { data: credentials } = await axios.get(process.env.VUE_APP_URL + '/sts')
	const { name: originFileName } = file
	const ext = originFileName.match(/\..*/)[0]
	const client = new OSS({
		accessKeyId: credentials.AccessKeyId,
		accessKeySecret: credentials.AccessKeySecret,
		stsToken: credentials.SecurityToken,
		region: credentials.aliOSS_region,
		bucket: credentials.aliOSS_bucket,
	})

	let name
	fileName ? (name = fileName) : (name = new Date().getTime().toString() + ext)
	const res = await client.put(name, file)

	return { res, client, url: credentials.aliOSS_baseUrl + res.name }
}

async function createZip(fileName, files) {
	const zip = new JSZip()
	files.forEach(file => {
		zip.file(file.name, file.content)
	})
	const content = await zip.generateAsync({ type: 'blob' })
	downloadFile(fileName, content, 'application/zip')
}

function downloadFile(fileName, content, type) {
	var aLink = document.createElement('a')
	var blob = new Blob([content], { type })
	aLink.download = fileName
	aLink.href = URL.createObjectURL(blob)
	aLink.click()
}

function htmlToAst(html) {
	return parser(html)
}

function astToHtml(ast) {
	return render(ast)
}

function astToTextArr(ast) {
	let texts = []
	ast.forEach((item, index) => transform(item, `[${index}]`, texts))
	return texts
}

function textArrToAst(ast, path, content) {
	lodash.set(ast, path, content)
}

function transform(node, path = '', texts) {
	const isStyle = node.tag === 'style'
	const isScript = node.tag === 'script'
	const isA = node.tag === 'a'
	const isImg = node.tag === 'img'
	const isString = typeof node === 'string'
	const hasContent = !!node.content
	if (isStyle || isScript) return
	if (isA) {
		const href = node.attrs.href
		texts.push({ path: `${path}.attrs.href`, text: href })
	}
	if (isImg) {
		const src = node.attrs.src
		texts.push({ path: `${path}.attrs.src`, text: src })
	}
	if (hasContent) {
		node.content.forEach((item, index) => {
			transform(item, `${path}.content[${index}]`, texts)
		})
		return
	}
	if (!isString) return
	const text = node.replace(/\s+/g, ' ').trim()
	const isEmpty = !text
	if (isEmpty) return
	const isDOCTYPE = !!text.match(/<!DOCTYPE/)
	const isComment = !!text.match(/<!--/)
	if (isDOCTYPE || isComment) return
	const isDivider = text === '|'
	if (isDivider) return
	texts.push({ path, text })
}

export {
	astToTextArr,
	textArrToAst,
	htmlToAst,
	astToHtml,
	downloadFile,
	createZip,
	upload,
	uploadAliOSS,
}

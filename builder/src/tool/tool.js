import lodash from 'lodash'
import parser from 'posthtml-parser'
import render from 'posthtml-render'
import JSZip from 'jszip'

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

export { astToTextArr, textArrToAst, htmlToAst, astToHtml, downloadFile, createZip }

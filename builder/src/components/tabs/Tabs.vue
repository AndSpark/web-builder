<template>
	<div id="tabs" style="height:100vh" class="d-flex flex-column">
		<v-sheet>
			<add-dialog
				:addDialogStatus.sync="addDialogStatus"
				@updateData="updateComponentsList"
			></add-dialog>
			<update-dialog
				:updateDialogStatus.sync="updateDialogStatus"
				:originComponent="originComponent"
				@updateData="updateComponent"
			></update-dialog>
			<change-dialog
				v-if="changeDialogStatus"
				:componentsList="componentsList"
				:selectComponentsList="selectComponentsList"
				:changeDialogStatus.sync="changeDialogStatus"
				@replaceArea="replaceArea"
			></change-dialog>
			<option-dialog
				:optionDialogStatus.sync="optionDialogStatus"
				:totalRef="totalRef"
			></option-dialog>
			<v-toolbar flat color="primary" dark>
				<v-toolbar-title>组件选项</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-icon large @click="addDialogStatus = true">mdi-plus-circle-outline</v-icon>
			</v-toolbar>
			<v-tabs vertical v-if="clearAble">
				<v-tab v-for="(content, category) in componentsList" :key="category">
					{{ category }}
				</v-tab>
				<v-tab-item
					v-for="(content, category) in componentsList"
					:key="category"
					:ref="'list-' + category"
				>
					<v-card flat>
						<v-list dense>
							<v-list-item-group
								:ref="'group-' + category"
								multiple
								@change="selectComponentsListChange(category, $event)"
							>
								<v-list-item
									v-for="(component, index) in content"
									:key="index"
									@click="$emit('areaChange', component)"
								>
									<template v-slot:default="{ active }">
										<v-list-item-content>
											<v-list-item-title v-text="component.title"></v-list-item-title>
										</v-list-item-content>
										<v-list-item-action>
											<v-icon v-if="!active" color="grey lighten-1" v-text="'mdi-star-outline'">
											</v-icon>
											<v-icon v-else color="yellow darken-3" v-text="'mdi-star'"> </v-icon>
										</v-list-item-action>
									</template>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</v-sheet>

		<v-sheet class="mt-10 pa-1" style="overflow-Y:auto">
			<v-expansion-panels>
				<v-expansion-panel v-for="(item, i) in area" :key="i">
					<v-expansion-panel-header>
						{{ item.title }}
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-sheet max-height="250" style="overflow-Y:auto">
							<v-text-field
								v-for="(text, i) in astToTextArr(item.ast)"
								:key="i"
								:value="text.text"
								@input="changeText(item, text, $event)"
							></v-text-field>
						</v-sheet>
						<v-sheet class="d-flex">
							<v-spacer></v-spacer>
							<v-btn
								class="mx-2"
								dark
								color="green"
								small
								@click="showChangeComponentDialog(item, i)"
							>
								<v-icon dark>
									mdi-cached
								</v-icon>
								替换
							</v-btn>
							<v-btn class="mx-2" dark color="cyan" small @click="showUpdateComponentDialog(item)">
								<v-icon dark>
									mdi-pencil
								</v-icon>
								编辑
							</v-btn>
						</v-sheet>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-sheet>
		<v-spacer></v-spacer>
		<v-sheet class="my-4 pr-4 d-flex " v-if="area.length">
			<v-btn rounded color="success" class="ml-5" @click="optionDialogStatus = true">配置</v-btn>
			<v-spacer></v-spacer>
			<v-btn rounded color="error" class="mr-5" @click="clearArea">清空</v-btn>
			<v-btn rounded color="primary" @click="$emit('savePage')">保存</v-btn>
		</v-sheet>
	</div>
</template>

<script>
import { astToTextArr, textArrToAst, htmlToAst, astToHtml } from '@/tool/tool.js'
import addDialog from '@/components/dialog/addDialog'
import updateDialog from '@/components/dialog/updateDialog'
import changeDialog from '@/components/dialog/changeDialog'
import optionDialog from '@/components/dialog/optionDialog'
export default {
	name: 'tabs',
	components: {
		addDialog,
		updateDialog,
		changeDialog,
		optionDialog,
	},
	props: { area: Array },
	data() {
		return {
			componentsList: {},
			selectComponentsList: {},
			addDialogStatus: false,
			updateDialogStatus: false,
			changeDialogStatus: false,
			optionDialogStatus: false,
			originComponent: {},
			originReplaceComponent: {},
			clearAble: true,
		}
	},
	computed: {
		totalRef() {
			let refs = this.area.reduce(
				(p, c) => {
					if (c.styles && c.styles.length) p.styles.push(...c.styles)
					if (c.scripts && c.scripts.length) p.scripts.push(...c.scripts)
					return p
				},
				{ scripts: [], styles: [] }
			)
			refs.scripts = [...new Set(refs.scripts)]
			refs.styles = [...new Set(refs.styles)]
			return refs
		},
	},
	created() {},
	watch: {
		optionDialogStatus(n) {
			if (!n) {
				this.$emit('updateOptions')
			}
		},
		totalRef(n) {
			this.$emit('updateOptions')
		},
	},
	async mounted() {
		let { data } = await this.$http.get('component')
		this.componentsList = data.componentsList
		Object.keys(this.componentsList).forEach(v => {
			this.selectComponentsList[v] = []
		})
		await this.$nextTick()
		Object.keys(this.componentsList).forEach(category => {
			this.$refs['list-' + category][0].isBooted = true
		})
	},
	methods: {
		async updateComponentsList() {
			let { data } = await this.$http.get('component')
			this.componentsList = data.componentsList
		},
		showUpdateComponentDialog(item) {
			this.updateDialogStatus = true
			this.originComponent = item
		},
		showChangeComponentDialog(item, i) {
			this.changeDialogStatus = true
			this.originReplaceComponent = item
			this.originReplaceComponent.sort = i
		},
		updateComponent(item) {
			this.$emit('areaUpdate', item)
		},
		astToTextArr(ast) {
			return astToTextArr(ast)
		},
		changeText(item, text, e) {
			textArrToAst(item.ast, text.path, e)
			item.html = astToHtml(item.ast)
		},
		selectComponentsListChange(category, e) {
			this.selectComponentsList[category] = this.componentsList[category].filter((v, i) =>
				e.includes(i)
			)
		},
		async replaceArea(selectComponent) {
			this.$refs['group-' + this.originReplaceComponent.category][0].internalLazyValue = this.$refs[
				'group-' + this.originReplaceComponent.category
			][0].internalLazyValue.filter((v, i) => v !== this.originReplaceComponent.sort)

			this.$refs['group-' + selectComponent.category][0].internalLazyValue.push(
				selectComponent.sort
			)

			let newArea = JSON.parse(JSON.stringify(this.area))
			let newId = selectComponent[selectComponent.category].id
			newArea = await Promise.all(
				newArea.map(async v => {
					if (v.id === this.originReplaceComponent.id) {
						let { data } = await this.$http.get(`component/${newId}`)
						data.texts = astToTextArr(data.ast)
						return data
					}
					return v
				})
			)
			this.$emit('update:area', newArea)
		},
		clearArea() {
			this.$emit('update:area', [])
			this.clearAble = false
			this.$nextTick().then(_ => (this.clearAble = true))
		},
	},
}
</script>

<style lang="scss">
#tabs {
}
</style>

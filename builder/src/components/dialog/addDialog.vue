<template>
	<div id="addDialog">
		<v-dialog v-model="addDialogStatus" persistent max-width="600px">
			<v-card>
				<v-toolbar flat color="primary" dark>
					<v-icon class="text-h4 mr-3">mdi-xml</v-icon>
					<span class="headline">添加组件</span>
				</v-toolbar>
				<v-form @submit.prevent="createComponentFunc">
					<v-card-text>
						<v-container>
							<v-sheet style="overflow-y:auto" height="600">
								<v-row class="mx-1">
									<v-col cols="12">
										<v-text-field
											filled
											label="标题"
											v-model="createComponent.title"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-select
											filled
											:items="category"
											label="选择分类"
											v-model="createComponent.category"
										></v-select>
									</v-col>
									<v-col cols="12">
										<ref-list :category.sync="types"></ref-list>
									</v-col>
									<v-col cols="12">
										<v-tabs
											background-color="transparent"
											color="basil"
											grow
											v-model="currentComponent"
										>
											<v-tab v-for="item in components" :key="item">
												{{ item }}
											</v-tab>
										</v-tabs>

										<v-tabs-items v-model="currentComponent">
											<v-tab-item v-for="item in components" :key="item">
												<v-card color="basil" flat>
													<v-textarea
														height="250"
														filled
														:label="item"
														v-model="createComponent[item]"
													></v-textarea>
												</v-card>
											</v-tab-item>
										</v-tabs-items>
									</v-col>

									<v-col cols="12" v-if="isAddError">
										<v-subheader>
											<v-icon color="danger">mdi-alert-circle</v-icon>
											添加失败！
										</v-subheader>
									</v-col>
								</v-row>
							</v-sheet>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
						<v-btn color="blue darken-1" text type="submit"> 添加 </v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
		<v-snackbar v-model="isAddSuccess" centered :timeout="3000"
			><v-icon color="success">mdi-check</v-icon> 添加成功！</v-snackbar
		>
	</div>
</template>

<script>
import { htmlToAst } from '@/tool/tool.js'
import RefList from '@/components/dialog/ref-list/RefList.vue'
export default {
	name: 'addDialog',
	components: {
		RefList,
	},
	props: {
		addDialogStatus: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			createComponent: {
				title: '',
				category: '',
				html: '',
				css: '',
				js: '',
				ast: '',
				styles: [],
				scripts: [],
			},
			types: {
				styles: [],
				scripts: [],
			},
			category: [
				'header',
				'banner',
				'about',
				'product',
				'news',
				'partner',
				'footer',
				'other',
				'plugins',
			],
			isAddSuccess: false,
			isAddError: false,
			components: ['html', 'css', 'js'],
			currentComponent: 'html',
		}
	},
	watch: {
		types(n) {
			this.createComponent.styles = n.styles
			this.createComponent.scripts = n.scripts
		},
	},
	computed: {},
	methods: {
		async createComponentFunc() {
			this.createComponent.ast = htmlToAst(this.createComponent.html)
			try {
				await this.$http.post('component', {
					component: this.createComponent,
				})
				this.isAddSuccess = true
				this.close()
				this.$emit('updateData')
			} catch (error) {
				this.isAddError = true
			}
		},
		close() {
			this.createComponent = {
				title: '',
				category: '',
				html: '',
				css: '',
				js: '',
				ast: '',
			}
			this.$emit('update:addDialogStatus', false)
		},
	},
}
</script>

<style lang="scss">
#addDialog {
}
</style>

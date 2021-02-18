<template>
	<div id="updateDialog">
		<v-dialog v-model="updateDialogStatus" persistent max-width="600px">
			<v-card>
				<v-toolbar flat color="primary" dark>
					<v-icon class="text-h4 mr-3">mdi-pencil</v-icon>
					<span class="headline">编辑代码</span>
				</v-toolbar>
				<v-form @submit.prevent="updateComponentFunc">
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field filled label="标题" v-model="updateComponent.title"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-select
										filled
										:items="category"
										label="选择分类"
										v-model="updateComponent.category"
									></v-select>
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
													height="400"
													filled
													:label="item"
													v-model="updateComponent[item]"
												></v-textarea>
											</v-card>
										</v-tab-item>
									</v-tabs-items>
								</v-col>

								<v-col cols="12" v-if="isUpdateError">
									<v-subheader>
										<v-icon color="danger">mdi-alert-circle</v-icon>
										修改失败！
									</v-subheader>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
						<v-btn color="blue darken-1" text type="submit"> 修改 </v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
		<v-snackbar v-model="isUpdateSuccess" centered :timeout="3000"
			><v-icon color="success">mdi-check</v-icon> 修改成功！</v-snackbar
		>
	</div>
</template>

<script>
import { htmlToAst } from '@/tool/tool.js'
export default {
	name: 'updateDialog',
	components: {},
	props: {
		updateDialogStatus: {
			type: Boolean,
			default: false,
		},
		originComponent: Object,
	},
	data() {
		return {
			updateComponent: {
				id: '',
				title: '',
				category: '',
				html: '',
				css: '',
				js: '',
				ast: '',
			},
			category: ['header', 'banner', 'about', 'product', 'news', 'partner', 'other', 'plugins'],
			isUpdateSuccess: false,
			isUpdateError: false,
			components: ['html', 'css', 'js'],
			currentComponent: 'html',
		}
	},
	computed: {},
	watch: {
		updateDialogStatus(n) {
			if (n) {
				this.updateComponent = Object.assign({}, this.originComponent)
			}
		},
	},
	methods: {
		async updateComponentFunc() {
			this.updateComponent.ast = htmlToAst(this.updateComponent.html)
			try {
				await this.$http.put('component', {
					component: this.updateComponent,
				})
				this.isUpdateSuccess = true
				this.$emit('updateData', this.updateComponent)

				this.close()
			} catch (error) {
				this.isUpdateError = true
			}
		},
		close() {
			this.updateComponent = {
				id: '',
				title: '',
				category: '',
				html: '',
				css: '',
				js: '',
				ast: '',
			}
			this.$emit('update:updateDialogStatus', false)
		},
	},
}
</script>

<style lang="scss">
#updateDialog {
}
</style>
